import axios from 'axios'
import {Toast} from 'mint-ui'
axios.defaults.timeout = 20000
/* eslint-disable */
axios.defaults.baseURL = ''

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.code === 1){
            Toast(response.data.msg)
        }
        return response;
    },
    error => {
        return Promise.reject(error.response)
    });
export default axios