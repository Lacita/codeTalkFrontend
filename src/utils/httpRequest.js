import axios from 'axios'
import qs from 'qs' // 字符串处理
import merge from 'lodash/merge' // 合并对象工具
import {Spin , Message} from 'view-design'
import router from '../router'

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true, // 当前请求为跨域类型时是否在请求中协带cookie
})

/**
 * 拦截器
 */
http.interceptors.request.use(
  config =>{
    if (localStorage.getItem("currentManager")) {
      config.headers["currentManager"] = localStorage.getItem("currentManager"); // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    Spin.show({
    })
    return config
  },
  function (error) {
    if (error.code === 'ECONNABORTED' || error.message === "Network Error" || error.message.includes("timeout")) {
      Spin.hide()
      Message.warning('接口异常')
    }
  }
)

/**
 * 请求响应器
 */
http.interceptors.response.use(function (response){
  Spin.hide()
  if (response.data.code === 4000){
    Message.warning('登录失效')
    localStorage.clear()
    setTimeout(()=>{
      router.push("/login")
    })
  }
  return response
}, function (error) {
  if(error.code === 'ECONNABORTED' || error.message ==="Network Error" ||  error.message.includes("timeout")){
    Spin.hide()
    Message.error('请求超时')
  }
  return Promise.resolve(error);
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
}

/**
 * get 请求参数处理
 * @param params
 * @param openDefaultParams
 * @returns {*}
 */
http.adornParams = (params = {}, openDefaultParams = true) => {
  var defaluts = {
    't': new Date().getTime()
  }
  return openDefaultParams ? merge(defaluts, params) : params
}
/**
 * post请求参数处理
 * @param data
 * @param openDefaultdata
 * @param contentType
 * @returns {string}
 */
http.adornDatas = (data = {}) => {
  return qs.stringify(data)
}

http.adornData = (data = {}, openDefaultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefaultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
