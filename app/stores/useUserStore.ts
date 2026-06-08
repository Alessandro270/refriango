export const useUserStore = defineStore('user', {
  state: () => {
    return { users: [], isLoading: true, hasLoaded: false }
  },
  getters: {
    usersCount: state => state.users.length || 0
  },
  actions: {
    async getAll() {
      const authStore = useAuthStore()
      const api = useApi()

      try {
        await authStore.checkToken()

        const users = await api('/user', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          }
        })
        users?.forEach(user => {
          this.users.push(user)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async create(body) {
      const toast = useToast()
      const authStore = useAuthStore()
      const api = useApi()
      try {
        await authStore.checkToken()

        const user = await api('/auth/signup', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body
        })
        console.log(user)

        this.users.push(user)

        toast.add({
          title: 'Usuário criado com sucesso!',
          icon: 'lucide:file-check'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
})
