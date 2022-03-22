import { getItem, removeAllItem, setItem } from '@/utils/storage'
import router from '@/router'
import { TOKEN } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    }
  },
  actions: {
    logout() {
      this.commit('user/setToken', '')
      removeAllItem()
      router.push('/login')
    }
  }
}
