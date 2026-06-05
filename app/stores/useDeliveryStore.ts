export const useDeliveryStore = defineStore('delivery', {
  state: () => ({ deliveries: [], hasLoaded: false, isLoading: true }),
  actions: {
    async getAll() {
      const authStore = useAuthStore()
      const api = useApi()
      try {
        await authStore.checkToken()

        const deliveries = await api('/delivery', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          }
        })

        deliveries?.forEach(delivery => {
          this.deliveries.push(delivery)
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

        const delivery = await api('/delivery', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body
        })

        this.deliveries.push(delivery)

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
