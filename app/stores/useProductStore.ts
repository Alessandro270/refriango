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
        console.log(e)
      }
    }
  }
})
