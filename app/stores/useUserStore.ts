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
    },
    async delete(id: string) {
      const api = useApi()
      const authStore = useAuthStore()
      const toast = useToast()

      try {
        await api(`/user/${id}`, {
          method: 'DELETE',
          headers: { authorization: `Bearer ${authStore.token}` }
        })

        this.users = this.users.filter(user => user.id !== id)
        toast.add({
          title: 'Recurso removido com sucesso!',
          icon: 'lucide:file-check',
          color: 'success'
        })
      } catch (e) {
        toast.add({
          title: 'Não foi possível remover o recurso!',
          icon: 'lucide:file-x',
          color: 'error'
        })
        console.log(e)
      }
    }
  }
})
