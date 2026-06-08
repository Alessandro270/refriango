export const useProductStore = defineStore('product', {
  state: () => {
    return { products: [], hasLoaded: false, isLoading: true }
  },
  actions: {
    async getAll() {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()

      try {
        await authStore.checkToken()

        const products = await $fetch('/product', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          baseURL: config.public.apiUrl
        })

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
        await authStore.checkToken()

        const product = await $fetch('/product', {
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
    }
  }
})
