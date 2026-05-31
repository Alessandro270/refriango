export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
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
      this.token = useCookie('auth_token').value
      this.user = useCookie('auth_user').value
      this.initialized = true
    },
    async validateToken() {
      const config = useRuntimeConfig()
      try {
        if (!this.token) throw new Error('Nao autenticado')
        const result = await $fetch('/auth/validate-token', {
          method: 'POST',
          baseURL: config.public.apiUrl
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

        const { token } = await $fetch('/auth/login', {
          method: 'POST',
          baseURL: config.public.apiUrl,
          body: payload
        })
        const tokenCookie = useCookie('auth_token')
        const userCookie = useCookie('auth_user')
        this.token = token
        await this.getAuthUser()
        tokenCookie.value = token
        userCookie.value = JSON.stringify(this.user)
        const toast = useToast()
        toast.add({
          title: 'Login efetuado com sucesso',
          icon: 'lucide:user-check'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
})
