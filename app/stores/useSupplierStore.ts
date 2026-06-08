export const useSupplierStore = defineStore('supplier', {
  state: () => {
    return { suppliers: [], isLoading: true, hasLoaded: false }
  },
  getters: {
    suppliersCount: state => state.suppliers.length || 0
  },
  actions: {
    async getAll() {
      const api = useApi()
      const authStore = useAuthStore()

      try {
        await authStore.checkToken()

        const suppliers = await api('/supplier', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          }
        })
        suppliers?.forEach(supplier => {
          this.suppliers.push(supplier)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async create(body) {
      const api = useApi()
      const toast = useToast()
      const authStore = useAuthStore()

      try {
        await authStore.checkToken()

        const supplier = await api('/supplier', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body
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
