export const useStockStore = defineStore('stock', {
  state: () => {
    return { stocks: [], hasLoaded: false, isLoading: true }
  },
  actions: {
    async getAll() {
      const api = useApi()

      try {
        const stocks = await api('/stock')

        stocks?.forEach(stock => {
          this.stocks.push(stock)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async create(body) {
      const toast = useToast()
      const api = useApi()

      try {
        const stock = await api('/stock', {
          method: 'POST',
          body
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
      const toast = useToast()

      try {
        await api(`/stock/${id}`, {
          method: 'DELETE'
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
