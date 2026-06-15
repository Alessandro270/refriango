export const useSupplierStore = defineStore('supplier', {
  state: () => {
    return {
      suppliers: [],
      seen: new Set<string>(),
      isLoading: true,
      hasLoaded: false
    }
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

        if (suppliers) this.suppliers = suppliers
        // suppliers?.forEach(supplier => {
        //   if (this.seen.has(supplier.id)) return
        //   this.suppliers.push(supplier)
        //   this.seen.add(supplier.id)
        // })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async export() {
      const toast = useToast()
      try {
        await handleDownload('/supplier/export', 'fornecedores.xlsx')

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
        await api('/supplier/upload', {
          method: 'POST',
          body
        })

        toast.add({
          title: 'Ficheiro enviado com sucesso!',
          icon: 'lucide:file-check',
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
      const api = useApi()
      const toast = useToast()

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
      }
    },
    async update(id: string, body: any) {
      const api = useApi()
      const toast = useToast()

      try {
        const res = await api(`/supplier/${id}`, { method: 'PATCH', body })

        const idx = this.suppliers.findIndex(supplier => id === supplier.id)
        this.suppliers[idx] = res
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
