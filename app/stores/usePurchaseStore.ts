export const usePurchaseStore = defineStore('purchase', {
  state: () => {
    return { purchases: [], hasLoaded: false, isLoading: true }
  },
  actions: {
    async getAll() {
      const authStore = useAuthStore()
      const api = useApi()
      try {
        await authStore.checkToken()

        const purchases = await api('/order', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          }
        })

        purchases?.forEach(purchase => {
          this.purchases.push(purchase)
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

        const purchase = await api('/order', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body
        })

        this.purchases.push(purchase)

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
