export const useDeliveryStore = defineStore('delivery', {
  state: () => ({ deliveries: [], hasLoaded: false, isLoading: true }),
  actions: {
    async getAll() {
      const api = useApi()

      try {
        const deliveries = await api('/delivery')

        deliveries?.forEach(delivery => {
          this.deliveries.push(delivery)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async create(body) {
      const toast = useToast()
      const api = useApi()

      try {
        const delivery = await api('/delivery', {
          method: 'POST',
          body
        })

        this.deliveries.push(delivery)

        toast.add({
          title: 'Pedido efetuado com sucesso!',
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
        await api(`/delivery/${id}`, { method: 'DELETE' })

        this.deliveries = this.deliveries.filter(delivery => delivery.id !== id)
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
    }
  }
})
