export const useOrderStore = defineStore('order', {
  state: () => {
    return { orders: [], hasLoaded: false, isLoading: true }
  },
  actions: {
    async getAll() {
      const api = useApi()
      const authStore = useAuthStore()

      try {
        const orders = await api('/order', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          }
        })

        orders?.forEach(order => {
          this.orders.push(order)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async create(body) {
      const toast = useToast()
      const authStore = useAuthStore()
      try {
        const api = useApi()

        const order = await api('/order', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body
        })

        this.orders.push(order)

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
        await api(`/order/${id}`, { method: 'DELETE' })

        this.orders = this.orders.filter(order => order.id !== id)
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
