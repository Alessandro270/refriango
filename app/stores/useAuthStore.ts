export const AUTH_TOKEN_KEY = 'auth_token'
export const AUTH_USER_KEY = 'auth_user'
export const AUTH_REFRESH_TOKEN_KEY = 'auth_refresh_token'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      refreshToken: null,
      token: null,
      user: null,
      initialized: false
    }
  },
  getters: {
    isAuth: (state): boolean => !!state.user && !!state.token
  },
  actions: {
    init() {
      if (this.initialized) return
      const userJson = useCookie(AUTH_USER_KEY).value
      const token = useCookie(AUTH_TOKEN_KEY).value
      const refreshToken = useCookie(AUTH_REFRESH_TOKEN_KEY).value

      this.token = token || null
      this.refreshToken = refreshToken || null
      this.user = userJson ? JSON.parse(userJson) : null
      this.initialized = true
    },
    async refreshToken() {
      const config = useRuntimeConfig()
      try {
        if (!this.token) throw new Error('Nao autenticado')
        const result = await $fetch('/auth/refresh', {
          method: 'POST',
          body: { refreshToken: this.refreshToken },
          baseURL: config.public.apiUrl
        })
        if (!result) throw new Error('Nao autenticado')
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async validateToken() {
      const config = useRuntimeConfig()
      try {
        if (!this.token) throw new Error('Nao autenticado')
        const result = await $fetch('/auth/validate-token', {
          method: 'POST',
          baseURL: config.public.apiUrl,
          body: { token: this.token }
        })
        if (!result) throw new Error('Nao autenticado')
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async getAuthUser() {
      try {
        const config = useRuntimeConfig()

        const user = await $fetch('user/me', {
          baseURL: config.public.apiUrl,
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
      try {
        const config = useRuntimeConfig()

        const { token, user, refreshToken } = await $fetch('/auth/login', {
          method: 'POST',
          baseURL: config.public.apiUrl,
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
          icon: 'lucide:user-check'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.refreshToken = null
      this.initialized = false

      useCookie(AUTH_TOKEN_KEY).value = undefined
      useCookie(AUTH_REFRESH_TOKEN_KEY).value = undefined
      useCookie(AUTH_USER_KEY).value = undefined
      navigateTo('/auth/login')
    }
  }
})
