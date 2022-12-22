import axios from "axios"
import {Message} from "element-ui";
import router from "@/router";

let request = axios.create({
    baseURL: "http://localhost:8080", timeout: 5000,
    withCredentials:true
})
// 配置请求拦截器
request.interceptors.request.use(req => {
    let token = localStorage.getItem("token");
    if (token !== null) {
        req.headers["token"] = token
    }
    return req
}, err => {
    console.log(err.message)
})
// 配置响应拦截器
request.interceptors.response.use(res => {
    if (res.data.code === 200) {
        Message({
            duration: 2000, message: res.data.message, type: "success"
        })
    } else {
        Message({
            duration: 2000, message: res.data.message, type: "error"
        })
        switch (res.data.code) {
            case 10001:
                localStorage.clear()
                router.push("/login")
                break;
            default:
                console.log("无对应指令！")
        }
    }
    return res
}, err => {
    Message({
        duration: 1000, message: err.message, type: "error"
    })
})

export default request