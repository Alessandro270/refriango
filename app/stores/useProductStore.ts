export const useProductStore = defineStore('product', {
  state: () => {
    return { products: [], hasLoaded: false, isLoading: true }
  },
  actions: {
    async getAll() {
      const api = useApi()

      try {
        const products = await api('/product')

        products?.forEach(product => {
          this.products.push(product)
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
        const product = await api('/product', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body,
          baseURL: config.public.apiUrl
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
