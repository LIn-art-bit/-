import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

class Request {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    // 请求拦截器
    this.instance.interceptors.request.use((res: InternalAxiosRequestConfig) => {
      // 逻辑
      console.log('全局请求拦截器')
      return res
    }, (err: any) => err)
    // 响应拦截器
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      // 逻辑
      console.log('全局响应拦截器')
      return res
    }, (err: any) => err)
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // get请求
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: 'get'
    })
  }

  // post请求
  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: 'post'
    })
  }
}

export default Request