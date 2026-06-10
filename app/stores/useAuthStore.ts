export const AUTH_TOKEN_KEY = 'auth_token'
export const AUTH_USER_KEY = 'auth_user'
export const AUTH_REFRESH_TOKEN_KEY = 'auth_refresh_token'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      refreshToken: null,
      token: null,
      user: null
    }
  },
  getters: {
    isAuth: (state): boolean => !!state.user && !!state.token
  },
  actions: {
    init() {
      const userJson = useCookie(AUTH_USER_KEY).value
      const token = useCookie(AUTH_TOKEN_KEY).value
      const refreshToken = useCookie(AUTH_REFRESH_TOKEN_KEY).value

      this.token = token || null
      this.refreshToken = refreshToken || null
      this.user = userJson ? JSON.parse(userJson) : null
    },
    async refresh() {
      const api = useApi()
      try {
        const { token } = await api('/auth/refresh', {
          method: 'POST',
          body: { refreshToken: this.refreshToken }
        })

        if (!token) throw new Error('Não autenticado')

        this.token = token
        useCookie(AUTH_TOKEN_KEY).value = token
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async validateToken(token: string | null) {
      try {
        if (!token) return false
        const api = useApi()

        const result = await api('/auth/validate-token', {
          method: 'POST',
          body: { token }
        })

        if (!result) return false
        return true
      } catch (e) {
        return false
      }
    },
    async checkToken() {
      this.init()
      try {
        const result = await this.validateToken(this.token)
        if (!result) await this.refresh()
      } catch (e) {
        console.log(e)
      }
    },
    async getAuthUser() {
      const api = useApi()

      try {
        const user = await api('user/me', {
          headers: {
            authorization: `Bearer ${this.token}`
          }
        })
        this.user = user
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async login(payload) {
      const api = useApi()

      try {
        const { token, user, refreshToken } = await api('/auth/login', {
          method: 'POST',
          body: payload
        })

        this.token = token
        this.user = user
        this.refreshToken = refreshToken

        useCookie(AUTH_TOKEN_KEY).value = token
        useCookie(AUTH_USER_KEY).value = JSON.stringify(this.user)
        useCookie(AUTH_REFRESH_TOKEN_KEY).value = this.refreshToken
        const toast = useToast()
        toast.add({
          title: 'Login efetuado com sucesso',
          icon: 'lucide:user-check',
          color: 'success'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async signup(payload) {
      const toast = useToast()
      const api = useApi()

      try {
        await api('/auth/signup', {
          method: 'POST',
          body: payload,
          headers: { authorization: `Bearer ${this.token}` }
        })

        toast.add({
          title: 'Usuario criado com sucesso',
          icon: 'lucide:user-check'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    logout() {
      const toast = useToast()
      toast.add({ title: 'Terminando sessão..', icon: 'lucide:loader-circle' })
      this.user = null
      this.token = null
      this.refreshToken = null

      useCookie(AUTH_TOKEN_KEY).value = null
      useCookie(AUTH_REFRESH_TOKEN_KEY).value = null
      useCookie(AUTH_USER_KEY).value = null
      navigateTo('/auth/login')
    }
  }
})
