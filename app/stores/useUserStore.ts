export const useUserStore = defineStore('user', {
  state: () => {
    return { users: [], isLoading: true, hasLoaded: false }
  },
  getters: {
    usersCount: state => state.users.length || 0
  },
  actions: {
    async getAll() {
      const api = useApi()

      try {
        const users = await api('/user')
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
        const user = await api('/auth/signup', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body
        })

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
      const toast = useToast()

      try {
        await api(`/user/${id}`, {
          method: 'DELETE'
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
      }
    },
    async update(id: string, body: any) {
      const api = useApi()
      const toast = useToast()

      try {
        const res = await api(`/user/${id}`, { method: 'PATCH', body })

        const idx = this.users.findIndex(user => id === user.id)
        this.users[idx] = res
        toast.add({
          title: 'Recurso atualizado com sucesso!',
          icon: 'lucide:file-check',
          color: 'success'
        })
      } catch (e) {
        toast.add({
          title: 'Não foi possível atualizar o recurso!',
          icon: 'lucide:file-x',
          color: 'error'
        })
      }
    }
  }
})
