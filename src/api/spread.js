import axios from '@/libs/api.request'


// 获取充值列表
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
export const getShopPayList = (data) => {
  return axios.request({
    url: 'shop/ShopPay/index',
    data,
    method: 'post'
  })
}

// 获取红包申请列表
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
// UserOrder
export const getSpreadUserOrderList = (data) => {
  return axios.request({
    url: '/shop/UserOrder/index',
    data,
    method: 'post'
  })
}


export const searchByOrdersn = (data) => {
  return axios.request({
    url: 'shop/UserOrder/searchOrder',
    data,
    method: 'post'
  })
}




// 获取商余额
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
// UserOrder
export const getShopTotalMoney = (data) => {
  return axios.request({
    url: '/shop/Shop/show',
    data,
    method: 'post'
  })
}




