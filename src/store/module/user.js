import {
  login,
  logout,
  getUserInfo
} from '@/api/user'
import { setToken, getToken, setUsername, setSessionAccess , setStoreId  } from '@/libs/util'

export default {
  state: {
    userName: '',
    fullName: '',
    userId: '',
    token: '',
    access: [],
    hasGetInfo: false,
    store_paper:{},
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
      setUsername(username)
    },
    setStoreId (state, shop_id) {
      state.shop_id = shop_id
      setStoreId(shop_id)
    },
    setUserId (state, id) {
      state.userId = id
    },
    setKitchenId (state, kitchen_id) {
      state.kitchenId = kitchen_id
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    sethasGetInfo (state, isGetInfo) {
      state.hasGetInfo = isGetInfo
    },
    setStorePaper (state, info) {
      state.store_paper = info
    },
    // setExpendParams (state, expend_params) {
    //   state.expend_params = '';
    //   state.expend_params = expend_params ;
    // },
  },
  getters: {
    
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {username, password, captcha}) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          captcha
        }).then(res => {
          const dbody = res.data
          if (dbody.code == 0) {
            const data = dbody.data
            const info = data.info
            commit('setToken', data.token)
            commit('sethasGetInfo', true)
            commit('setUsername', info.fullname)
            commit('setStoreId', info.shop_id)
          }
          resolve(dbody)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    setUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          let token = getToken() || state.token
          if (token) {
            getUserInfo(token).then(res => {
              const dbody = res.data
              const data = dbody.data
              commit('sethasGetInfo', true)
              commit('setUsername', data.fullname)
              commit('setStoreId', data.shop_id)
              resolve(dbody)
            }).catch(err => {
              reject(err)
            })
          }else{
            console.log(token)
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setUsername', '')
          commit('setToken', '')
          commit('setStoreId', [])
          commit('sethasGetInfo', false)
          resolve()
        }).catch(err => {
          reject(err)
        })
        resolve()
      })
    }
  }
}
