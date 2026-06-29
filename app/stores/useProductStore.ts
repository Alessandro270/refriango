export const useProductStore = defineStore('product', {
  state: () => {
    return {
      products: [],
      seen: new Set<string>(),
      hasLoaded: false,
      isLoading: true
    }
  },
  actions: {
    async getAll(filter?: Record<string, any>) {
      const api = useApi()

      try {
        let url: string = '/product'

        if (filter) url = url.concat(`?_id=${filter}%`)
        const products = await api(url)

        if (products) this.products = products
        // products?.forEach(product => {
        //   if (this.seen.has(product.id)) return
        //   this.products.push(product)
        //   this.seen.add(product.id)
        // })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async upload(body) {
      const api = useApi()
      const toast = useToast()
      try {
        await api('/product/upload', {
          method: 'POST',
          body
        })

        toast.add({
          title: 'Ficheiro enviado com sucesso!',
          icon: 'lucide:file-check',
          color: 'success'
        })
      } catch (e) {
        toast.add({
          title: 'Não foi possível enviar o ficheiro',
          icon: 'lucide:file-x',
          color: 'error'
        })
        throw new Error(e)
      }
    },
    async export() {
      const toast = useToast()
      try {
        await handleDownload('/product/export', 'produtos.xlsx')

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
    async create(body) {
      const toast = useToast()
      try {
        const api = useApi()

        const product = await api('/product', {
          method: 'POST',
          body
        })

        this.products.push(product)

        toast.add({
          title: 'Produto criado com sucesso!',
          icon: 'lucide:file-check'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async getOne(id: string) {
      const api = useApi()
      const toast = useToast()

      try {
        const product = await api(`/product/${id}`)

        toast.add({
          title: 'Recurso carregado com sucesso!',
          icon: 'lucide:file-check',
          color: 'success'
        })
        return product
      } catch {
        toast.add({
          title: 'Não foi possível carregar o recurso!',
          icon: 'lucide:file-x',
          color: 'error'
        })
      }
    },
    async delete(id: string) {
      const api = useApi()
      const toast = useToast()

      try {
        await api(`/product/${id}`, { method: 'DELETE' })

        this.products = this.products.filter(product => product.id !== id)
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
        const res = await api(`/product/${id}`, { method: 'PATCH', body })

        const idx = this.products.findIndex(product => id === product.id)
        this.products[idx] = res
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
