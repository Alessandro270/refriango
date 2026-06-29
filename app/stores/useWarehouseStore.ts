export const useWarehouseStore = defineStore('warehouse', {
  state: () => {
    return {
      warehouses: [],
      seen: new Set<string>(),
      hasLoaded: false,
      isLoading: true
    }
  },
  actions: {
    async getAll(filter?: Record<string, any>) {
      const api = useApi()

      try {
        let url: string = '/warehouse'
        if (filter) url = url.concat(`?_id=${filter}%`)
        const warehouses = await api(url)

        if (warehouses) this.warehouses = warehouses
        // warehouses?.forEach(warehouse => {
        //   if (this.seen.has(warehouse.id)) return
        //   this.warehouses.push(warehouse)
        //   this.seen.add(warehouse.id)
        // })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async export() {
      const toast = useToast()
      try {
        await handleDownload('/warehouse/export', 'armazens.xlsx')

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
        await api('/warehouse/upload', {
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
