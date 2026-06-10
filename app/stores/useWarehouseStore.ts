export const useWarehouseStore = defineStore('warehouse', {
  state: () => {
    return { warehouses: [], hasLoaded: false, isLoading: true }
  },
  actions: {
    async getAll() {
      const api = useApi()

      try {
        const warehouses = await api('/warehouse')

        warehouses?.forEach(warehouse => {
          this.warehouses.push(warehouse)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async create(body) {
      const api = useApi()
      const toast = useToast()

      try {
        const warehouse = await api('/warehouse', {
          method: 'POST',
          body
        })

        this.warehouses.push(warehouse)

        toast.add({
          title: 'Armazem criado com sucesso!',
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
        await api(`/warehouse/${id}`, {
          method: 'DELETE'
        })

        this.warehouses = this.warehouses.filter(
          warehouse => warehouse.id !== id
        )
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
    },
    async update(id: string, body: any) {
      const api = useApi()
      const toast = useToast()

      try {
        const res = await api(`/warehouse/${id}`, { method: 'PATCH', body })

        const idx = this.warehouses.findIndex(warehouse => id === warehouse.id)
        this.warehouses[idx] = res
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
