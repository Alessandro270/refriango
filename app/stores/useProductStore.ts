export const useProductStore = defineStore('product', {
  state: () => {
    return { products: [] }
  },
  actions: {
    async getProducts() {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()

      try {
        const token = useCookie(AUTH_TOKEN_KEY).value

        if (!token) throw new Error('Nao autenticado')

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
    async createProduct(body) {
      const config = useRuntimeConfig()
      const toast = useToast()
      const authStore = useAuthStore()
      try {
        const token = useCookie(AUTH_TOKEN_KEY).value
        if (!token) throw new Error('Nao autenticado')
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
          title: 'Produto criada com sucesso!',
          icon: 'lucide:file-check'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
})
