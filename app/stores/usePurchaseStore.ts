export const usePurchaseStore = defineStore('purchase', {
  state: () => {
    return { purchases: [], hasLoaded: false, isLoading: true }
  },
  actions: {
    async getAll() {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()
      try {
        await authStore.checkToken()

        const purchases = await $fetch('/order', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          baseURL: config.public.apiUrl
        })

        purchases?.forEach(purchase => {
          this.purchases.push(purchase)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async create(body) {
      const config = useRuntimeConfig()
      const toast = useToast()
      const authStore = useAuthStore()
      try {
        await authStore.checkToken()

        const purchase = await $fetch('/order', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body,
          baseURL: config.public.apiUrl
        })

        this.purchases.push(purchase)

        toast.add({
          title: 'Pedido efetuado criado com sucesso!',
          icon: 'lucide:file-check'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
})
