import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui'

import { humpToUnderline, toUnderLine, underlineToHump } from './index'

let loading = null
let loadTotal = 0

function ajaxBefore() {
  if (loading == null) {
    loading = Loading.service({
      lock: true,
      text: '请求执行中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0)'
    })
  }
  loadTotal++
}

function ajaxAfter() {
  if (loading) {
    loadTotal--
    if (loadTotal === 0) {
      loading.close()
      loading = null
    }
  }
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: '',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    console.warn('发送请求:' + config.url, config)

    // data 和 params 的驼峰都转成下划线
    reqPrepared(config)

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
      // config.headers['Authorization'] = getToken()
      config.headers['Accept'] = 'application/json'
    }
    return config
  },
  error => {
    // do something with request error
    console.log('configErr', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    ajaxAfter()
    const res = response.data
    console.warn('返回数据', res)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: `error code ${res.code}: ${res.msg}` || 'Unknow Error',
        type: 'error',
        duration: 3 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401 || res.code === 5000) {
        const map = new Map([[401, '没有授权'], [5000, '登录已过期']])
        // to re-login
        MessageBox.confirm(map.get(res.code), '前往登录', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.msg || 'Error '))
    } else {
      return res
    }
  },
  error => {
    ajaxAfter()
    console.log('res' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

async function http(params = {}) {
  ajaxBefore()
  const data = await service(params)
  resPrepared(data.data)
  ajaxAfter()
  return data
}

/**
 * response数据预处理
 * @param data
 */
export function resPrepared(data) {

  if (data) {
    underlineToHump(data)
  }
}

/**
 * request数据预处理
 *
 * @param data
 */
export function reqPrepared(config) {
  // post 的参数
  if (config.data) {
    humpToUnderline(config.data)
  }

  // get的参数
  if (config.params) {
    humpToUnderline(config.params)
  }

  // 排序时的字段
  // orderby:'userName'
  if (config.params && config.params.orderby) {
    config.params.orderby = toUnderLine(config.params.orderby)
  }
}

export default http
