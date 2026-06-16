export const useDeliveryStore = defineStore('delivery', {
  state: () => ({
    deliveries: [],
    seen: new Set<string>(),
    hasLoaded: false,
    isLoading: true
  }),
  actions: {
    async getAll(filter: Record<string, any>) {
      const api = useApi()

      try {
        let url = '/delivery'
        if (filter) url = url.concat(`?_id=${filter}%`)

        const deliveries = await api(url)

        if (deliveries) this.deliveries = deliveries
        // deliveries?.forEach(delivery => {
        //   if (this.seen.has(delivery.id)) return
        //   this.deliveries.push(delivery)
        //   this.seen.add(delivery.id)
        // })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async getOne(id: string) {
      const api = useApi()
      const toast = useToast()

      try {
        const delivery = await api(`/delivery/${id}`)

        toast.add({
          title: 'Recurso carregado com sucesso!',
          icon: 'lucide:file-check',
          color: 'success'
        })
        return delivery
      } catch (e) {
        toast.add({
          title: 'Não foi possível carregar o recurso!',
          icon: 'lucide:file-x',
          color: 'error'
        })
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
    },
    async update(id: string, body: any) {
      const api = useApi()
      const toast = useToast()

      try {
        const res = await api(`/delivery/${id}`, { method: 'PATCH', body })

        const idx = this.deliveries.findIndex(delivery => id === delivery.id)
        this.deliveries[idx] = res
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
