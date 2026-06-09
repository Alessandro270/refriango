export const useStockStore = defineStore('stock', {
  state: () => {
    return { stocks: [], hasLoaded: false, isLoading: true }
  },
  actions: {
    async getAll() {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()

      try {
        await authStore.checkToken()

        const stocks = await $fetch('/stock', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          baseURL: config.public.apiUrl
        })

        stocks?.forEach(stock => {
          this.stocks.push(stock)
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

        const stock = await $fetch('/stock', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body,
          baseURL: config.public.apiUrl
        })

        this.stocks.push(stock)

        toast.add({
          title: 'Produto criado com sucesso!',
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
        await api(`/stock/${id}`, {
          method: 'DELETE',
          headers: { authorization: `Bearer ${authStore.token}` }
        })

        this.stocks = this.stocks.filter(stock => stock.id !== id)
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
