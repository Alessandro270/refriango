export const useWarehouseStore = defineStore('warehouse', {
  state: () => {
    return { warehouses: [], hasLoaded: false, isLoading: true }
  },
  actions: {
    async getWarehouses() {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()

      try {
        await authStore.checkToken()

        const warehouses = await $fetch('/warehouse', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          baseURL: config.public.apiUrl
        })

        warehouses?.forEach(warehouse => {
          this.warehouses.push(warehouse)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async createWarehouse(body) {
      const config = useRuntimeConfig()
      const toast = useToast()
      const authStore = useAuthStore()
      try {
        await authStore.checkToken()

        const warehouse = await $fetch('/warehouse', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body,
          baseURL: config.public.apiUrl
        })

        this.warehouses.push(warehouse)

        toast.add({
          title: 'Armazem criado com sucesso!',
          icon: 'lucide:file-check'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
})
