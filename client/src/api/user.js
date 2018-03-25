/* eslint-disable */
import axios from './interceptors'
// 登录
export function login(param){
	let url = 'api/user/login'
	return axios.post(url, param).then(res =>{
		return Promise.resolve(res.data)
	})
}

// 登出
export function logout(param){
	let url = 'api/user/logout'
	return axios.post(url, param).then(res =>{
		return Promise.resolve(res.data)
	})
}