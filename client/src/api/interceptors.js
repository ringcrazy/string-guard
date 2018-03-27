import axios from 'axios'
import {Toast} from 'mint-ui'
import router from '@/router'
/* eslint-disable */
axios.defaults.baseURL = ''
axios.defaults.timeout = 20000

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.code === 1){
            Toast(response.data.msg)
        }else if(response.data.code === 2){
            Toast(response.data.msg)
            router.push('/')
            return Promise.reject()
        }
        return response;
    },
    error => {
        return Promise.reject(error.response)
    });
export default axios