/* eslint-disable */
import axios from './interceptors'

// 获取
export function get(param){
	let url = 'api/article/get'
	return axios.post(url, param).then(res =>{
		return Promise.resolve(res.data)
	})
}

// 更新
export function update(param){
	let url = 'api/article/update'
	return axios.post(url, param).then(res =>{
		return Promise.resolve(res.data)
	})
}