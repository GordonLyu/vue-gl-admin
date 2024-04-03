<template>
    <div class="login-page">
        <form class="login" @submit.prevent="submit">
            <div class="icon">
                <Icon icon="dashicons:admin-network" color="#0db8de" width="100" height="100" />
            </div>
            <h1 class="title">XX后台管理系统</h1>
            <div class="input">
                <div>
                    <input type="text" autosave="false" v-model="formData.password" required>
                    <label class="text">用户名</label>
                    <div class="line"></div>
                </div>
                <div>
                    <input type="password" autosave="false" v-model="formData.username" required>
                    <label class="text">密码</label>
                    <div class="line"></div>
                </div>
            </div>
            <div class="option">
                <input type="submit" value="登录">
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { reactive } from 'vue';

const formData = reactive({
    username: '',
    password: ''
})

const submit = () => {
    console.log(formData);
}
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    overflow: auto;
}

.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    max-width: 500px;
    min-width: 200px;
    width: 90%;
    padding: 20px 60px;
    gap: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 2px 5px 0 #ccc;
}

.icon {
    border-radius: 8px;
    width: 90px;
    height: 90px;
}

.icon>* {
    width: 100%;
    height: auto;
}

.title {
    text-align: center;
    color: #555;
    font-size: 1.8em;
}

input {
    outline: none;
    border: none;
    box-sizing: border-box;
}

.input {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 50px;
}

.input .text {
    color: #aaa;
    font-weight: bold;
    letter-spacing: 2px;
    position: absolute;
    transition: .2s;
    pointer-events: none;
}

.input>div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    width: 100%;
    height: 30px;
}

.input>div::after {
    display: block;
    background-color: #ccc;
    content: '';
    height: 2px;
}

.input input {
    flex: 1;
    font-size: 1.2em;
    width: 100%;
    background-color: #ffffff00;
    color: #666;
}

.input input:focus {
    color: #000;
}

.input .line {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #0db8de;
    box-shadow: 0px 0px 2px 0 #0db8de;
    width: 0px;
    transition: .2s;
}

.input input:focus~.line {
    width: 100%;
}

.input input:valid~.line {
    width: 100%;
}

.input input:focus~.text {
    transform: translateY(-120%);
    color: #888;
}

.input input:valid~.text {
    transform: translateY(-120%);
    color: #888;
}

.option {
    margin-left: auto;
    margin-top: 20px;
}

input[type=submit] {
    font-size: 1.05em;
    width: 100px;
    height: 40px;
    background-color: #ffffff00;
    border-radius: 10px;
    box-shadow: 0 0 1px 1px #0db8de;
    color: #0db8de;
    font-weight: bold;
    cursor: pointer;
    transition: .1s;
}

input[type=submit]:hover,
input[type=submit]:focus {
    color: white;
    box-shadow: 0 0 3px 0px #0db8de;
    background-color: #0db8de;
}
</style>