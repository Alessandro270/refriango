export const useSupplierStore = defineStore('supplier', {
  state: () => {
    return { suppliers: [], isLoading: true, hasLoaded: false }
  },
  getters: {
    suppliersCount: () => this.suppliers.length
  },
  actions: {
    async getSuppliers() {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()

      try {
        const token = useCookie(AUTH_TOKEN_KEY).value

        if (!token) throw new Error('Nao autenticado')

        await authStore.checkToken()

        const suppliers = await $fetch('/supplier', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          baseURL: config.public.apiUrl
        })

        suppliers?.forEach(supplier => {
          this.suppliers.push(supplier)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async createSupplier(body) {
      const config = useRuntimeConfig()
      const toast = useToast()
      const authStore = useAuthStore()
      try {
        await authStore.checkToken()

        const supplier = await $fetch('/supplier', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body,
          baseURL: config.public.apiUrl
        })

        this.suppliers.push(supplier)

        toast.add({
          title: 'Fornecedor criado com sucesso!',
          icon: 'lucide:file-check'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
})
