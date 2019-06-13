import axios from '@/libs/api.request'

/*
  修改密码
*/
/*
  
*/
/*
  changePWD
*/
export const setNewPWD = (data) => {
  return axios.request({
    url: '/shop/ShopUser/updatePassword',
    data,
    method: 'post'
  })
}



















