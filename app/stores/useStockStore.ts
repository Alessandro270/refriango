export const useStockStore = defineStore('stock', {
  state: () => {
    return {
      stocks: [],
      seen: new Set<string>(),
      hasLoaded: false,
      isLoading: true
    }
  },
  actions: {
    async getAll(filter?: Record<string, any>) {
      const api = useApi()

      try {
        let url: string = '/stock'
        if (filter) url = url.concat(`?_id=${filter}%`)
        const stocks = await api(url)
        this.stocks = stocks
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async export() {
      const toast = useToast()
      try {
        await handleDownload('/stock/export', 'stock.xlsx')

        toast.add({
          title: 'Ficheiro esta sendo exportado!',
          icon: 'lucide:download',
          color: 'success'
        })
      } catch (e) {
        console.log(e)

        toast.add({
          title: 'Não foi possível enviar o ficheiro',
          icon: 'lucide:file-x',
          color: 'error'
        })
      }
    },
    async upload(body) {
      const api = useApi()
      const toast = useToast()
      try {
        await api('/stock/upload', {
          method: 'POST',
          body
        })

        toast.add({
          title: 'Ficheiro enviado com sucesso!',
          icon: 'lucide:file-check',
          color: 'success'
        })
      } catch {
        toast.add({
          title: 'Não foi possível enviar o ficheiro',
          icon: 'lucide:file-x',
          color: 'error'
        })
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
      }
    },
    async update(id: string, body: any) {
      const api = useApi()
      const toast = useToast()

      try {
        const res = await api(`/stock/${id}`, { method: 'PATCH', body })

        const idx = this.stocks.findIndex(stock => id === stock.id)
        this.stocks[idx] = res
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
