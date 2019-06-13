import axios from '@/libs/api.request'


// 登陆接口
export const login = ({ username, password, captcha}) => {
  const data = {
    username,
    password,
    captcha
  }
  return axios.request({
    url: '/shop/Login/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  let data = { token: token }
  return axios.request({
    url: '/shop/ShopUser/getUserInfo',
    data,
    method: 'post'
  })
}

export const getCaptcha = () => {
  return axios.request({
    url: '/shop/Login/captcha',
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/shop/Login/logout',
    method: 'post'
  })
}
