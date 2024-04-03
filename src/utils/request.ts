import axios from "axios";

const baseURL = import.meta.env.APP_BASE_API;

const request = axios.create({
    timeout: 5000,
    baseURL: baseURL
})


// 响应拦截器
request.interceptors.response.use(res => {
    return res;
}, error => {
    return Promise.reject(error);
})




export default request;