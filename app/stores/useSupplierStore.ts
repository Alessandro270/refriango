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
        const supplier = await api('/supplier', {
          method: 'POST',
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
    },
    async delete(id: string) {
      const api = useApi()
      const toast = useToast()

      try {
        await api(`/supplier/${id}`, {
          method: 'DELETE'
        })

        this.suppliers = this.suppliers.filter(supplier => supplier.id !== id)
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
