<template>
    <div class="wrap">
        <div>
            <div>
                <button type="button" @click="startVideo">开启本机摄像和音频</button>
                <button type="button" @click="connect">建立连接</button>
                <button type="button" @click="hangUp">挂断</button>
                <button type="button" @click="refreshPage">刷新页面</button>
            </div>
            <div class="video-box">
                <div class="local-video">
                    <video id="local-video" ref="localVideoRef" autoplay></video>
                </div>
                <div class="remote-video">
                    <video id="remote-video" ref="remoteVideoRef" autoplay></video>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const baseURL = import.meta.env.APP_BASE_IP_API;

// ===================以下是socket=======================
var user = Math.round(Math.random() * 1000) + ""
var socketUrl = `ws://${baseURL}/msgServer/` + user;
var socket: any = null
var socketRead = false
window.onload = function () {
    socket = new WebSocket(socketUrl)
    socket.onopen = function () {
        console.log("成功连接到服务器...")
        socketRead = true
    }

    socket.onclose = function (e: any) {
        console.log('与服务器连接关闭: ' + e.code)
        socketRead = false
    }

    socket.onmessage = function (res: any) {
        var evt = JSON.parse(res.data)
        console.log(evt)
        if (evt.type === 'offer') {
            console.log("接收到offer,设置offer,发送answer....")
            onOffer(evt);
        } else if (evt.type === 'answer' && peerStarted) {
            console.log('接收到answer,设置answer SDP');
            onAnswer(evt);
        } else if (evt.type === 'candidate' && peerStarted) {
            console.log('接收到ICE候选者..');
            onCandidate(evt);
        } else if (evt.type === 'bye' && peerStarted) {
            console.log("WebRTC通信断开");
            stop();
        }
    }
}

// ===================以上是socket=======================
let localVideoRef = ref();
let remoteVideoRef = ref();
var localStream: any = null;
var peerConnection: any = null;
var peerStarted = false;
var mediaConstraints = {
    'mandatory': {
        'OfferToReceiveAudio': false,
        'OfferToReceiveVideo': true
    }
};

//----------------------交换信息 -----------------------

function onOffer(evt: any) {
    console.log("接收到offer...")
    console.log(evt);
    setOffer(evt);
    sendAnswer(evt);
    peerStarted = true
}

function onAnswer(evt: any) {
    console.log("接收到Answer...")
    console.log(evt);
    setAnswer(evt);
}

function onCandidate(evt: any) {
    var candidate = new RTCIceCandidate({
        sdpMLineIndex: evt.sdpMLineIndex,
        sdpMid: evt.sdpMid,
        candidate: evt.candidate
    });
    console.log("接收到Candidate...")
    console.log(candidate);
    peerConnection.addIceCandidate(candidate);
}

function sendSDP(sdp: any) {
    var text = JSON.stringify(sdp);
    console.log('发送sdp.....')
    console.log(text); // "type":"offer"....
    // textForSendSDP.value = text;
    // 通过socket发送sdp
    socket.send(text)
}

function sendCandidate(candidate: any) {
    var text = JSON.stringify(candidate);
    console.log(text); // "type":"candidate","sdpMLineIndex":0,"sdpMid":"0","candidate":"....
    socket.send(text) // socket发送
}

//---------------------- 视频处理 -----------------------
function startVideo() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then((stream) => {
        localStream = stream;
        localVideoRef.value.srcObject = stream;
        //localVideo.src = window.URL.createObjectURL(stream);
        localVideoRef.value.play();
        localVideoRef.value.volume = 0;
    }).catch(error => {
        console.error('发生了一个错误: [错误代码：' + error.code + ']');
        return;
    })
}

function refreshPage() {
    location.reload();
}

//---------------------- 处理连接 -----------------------
function prepareNewConnection() {
    var pc_config = {
        "iceServers": []
    };
    var peer: any = null;
    try {
        peer = new RTCPeerConnection(pc_config);
    } catch (e: any) {
        console.log("建立连接失败，错误：" + e.message);
    }

    // 发送所有ICE候选者给对方
    peer.onicecandidate = function (evt: any) {
        if (evt.candidate) {
            console.log(evt.candidate);
            sendCandidate({
                type: "candidate",
                sdpMLineIndex: evt.candidate.sdpMLineIndex,
                sdpMid: evt.candidate.sdpMid,
                candidate: evt.candidate.candidate
            });
        }
    };
    console.log('添加本地视频流...');
    peer.addStream(localStream);

    peer.addEventListener("addstream", onRemoteStreamAdded, false);
    peer.addEventListener("removestream", onRemoteStreamRemoved, false);

    // 当接收到远程视频流时，使用本地video元素进行显示
    function onRemoteStreamAdded(event: any) {
        console.log("添加远程视频流");
        // remoteVideo.src = window.URL.createObjectURL(event.stream);
        remoteVideoRef.value.srcObject = event.stream;
    }

    // 当远程结束通信时，取消本地video元素中的显示
    function onRemoteStreamRemoved(event: any) {
        console.log("移除远程视频流");
        remoteVideoRef.value.src = "";
    }

    return peer;
}

function sendOffer() {
    peerConnection = prepareNewConnection();
    peerConnection.createOffer(function (sessionDescription: any) { //成功时调用
        peerConnection.setLocalDescription(sessionDescription);
        console.log("发送: SDP");
        console.log(sessionDescription);
        sendSDP(sessionDescription);
    }, function (err: any) { //失败时调用
        console.log("创建Offer失败");
    }, mediaConstraints);
}

function setOffer(evt: any) {
    if (peerConnection) {
        console.error('peerConnection已存在!');
        return;
    }
    peerConnection = prepareNewConnection();
    peerConnection.setRemoteDescription(new RTCSessionDescription(evt));
}

function sendAnswer(evt: any) {
    console.log('发送Answer,创建远程会话描述...');
    if (!peerConnection) {
        console.error('peerConnection不存在!');
        return;
    }

    peerConnection.createAnswer(function (sessionDescription: any) { //成功时
        peerConnection.setLocalDescription(sessionDescription);
        console.log("发送: SDP");
        console.log(sessionDescription);
        sendSDP(sessionDescription);
    }, function () { //失败时
        console.log("创建Answer失败");
    }, mediaConstraints);
}

function setAnswer(evt: any) {
    if (!peerConnection) {
        console.error('peerConnection不存在!');
        return;
    }
    peerConnection.setRemoteDescription(new RTCSessionDescription(evt));
}

//-------- 处理用户UI事件 -----
// 开始建立连接
function connect() {
    if (!localStream) {
        alert("请首先捕获本地视频数据.");
    } else if (peerStarted || !socketRead) {
        alert("请刷新页面后重试.");
    } else {
        sendOffer();
        peerStarted = true;
    }
}

// 停止连接
function hangUp() {
    console.log("挂断.");
    stop();
}

function stop() {
    peerConnection.close();
    peerConnection = null;
    peerStarted = false;
}
</script>

<style scoped>
body {
    background: #000;
}

button {
    height: 40px;
    line-height: 40px;
    width: auto;
    padding: 0 15px;
    background: #ccc;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
    overflow: hidden;
}

.wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.video-box {
    border-radius: 20px;
    background: pink;
    position: relative;
    width: 800px;
    height: 600px;
    overflow: hidden;
}

.remote-video {
    width: 800px;
    height: 600px;
    border: 1px solid black;
    overflow: hidden;
}

.local-video {
    width: 320px;
    height: 240px;
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 20px 0 0 0;
    overflow: hidden;
}

video {
    width: 100%;
    height: 100%;
}
</style>