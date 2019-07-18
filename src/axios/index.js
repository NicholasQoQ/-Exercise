import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
})

// 请求拦截器
instance.interceptors.request.use(config => {
  const user = window.sessionStorage.getItem('heima')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  console.log(config.headers.Authorization)
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    window.location.hash = '/login'
  }
  return Promise.reject(error)
})
export default instance
