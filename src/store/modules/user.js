import { login, logout, getInfo, getUsers } from "@/api/user"
import { getToken, setToken, removeToken } from "@/utils/auth"
import { resetRouter } from "@/router"

const state = {
  token: getToken(),
  name: "",
  avatar: ""
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // username=>email
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit("SET_TOKEN", data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
      // mock data
      // const data = { token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODU0NTg2Mjh9.3ZOW-3KsiaNSKXpP2uPUZOb08_GHZr9mrEd-FxFkQhM' }
      // commit('SET_TOKEN', data.token)
      // setToken(data.token)
      // 写多了一个resolve导致还没有拿到ajax数据就执行返回了
      // resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          // if (data.code === 5000) {
          reject("Verification failed, please Login again.")
        }

        const { name, avatar } = data

        commit("SET_NAME", name)
        commit("SET_AVATAR", avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })

      // mock data
      // const data = { name: 'testName', avatar: 'testAvatar' }
      // const { name, avatar } = data
      // commit('SET_NAME', name)
      // commit('SET_AVATAR', avatar)
      // resolve(data)
    })
  },

  logout({ commit, state }) {
    // user logout
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit("SET_TOKEN", "")
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "")
      removeToken()
      resolve()
    })
  }
  //   getUsersList() {
  //     return new Promise((resolve, reject) => {
  //       getUsers().then((response) => {
  //         console.log(response)
  //         resolve()
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

