export const useOrderStore = defineStore('order', {
  state: () => {
    return { orders: [], hasLoaded: false, isLoading: true }
  },
  actions: {
    async getAll() {
      const authStore = useAuthStore()
      const api = useApi()
      try {
        await authStore.checkToken()

        const orders = await api('/order', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          }
        })

        orders?.forEach(order => {
          this.orders.push(order)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async create(body) {
      const toast = useToast()
      const authStore = useAuthStore()
      try {
        const api = useApi()
        await authStore.checkToken()

        const order = await api('/order', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body
        })

        this.orders.push(order)

        toast.add({
          title: 'Pedido efetuado com sucesso!',
          icon: 'lucide:file-check'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
})
