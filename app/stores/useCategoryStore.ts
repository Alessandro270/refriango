export const useCategoryStore = defineStore('category', {
  state: () => {
    return { categories: [], isLoading: true, hasLoaded: false }
  },
  getters: {
    categoryCount: state => state.categories.length || 0
  },
  actions: {
    async getCategories() {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()
      try {
        await authStore.checkToken()

        const categories = await $fetch('/category', {
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          baseURL: config.public.apiUrl
        })

        categories?.forEach(category => {
          this.categories.push(category)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },

    async getCategory(id: string) {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()
      try {
        await authStore.checkToken()

        const category = await $fetch(`/category/${id}`, {
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          baseURL: config.public.apiUrl
        })
        return category
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async createCategory(body) {
      const config = useRuntimeConfig()
      const authStore = useAuthStore()
      const toast = useToast()

      try {
        await authStore.checkToken()

        const category = await $fetch('/category', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authStore.token}`
          },
          body,
          baseURL: config.public.apiUrl
        })

        this.categories.push(category)

        toast.add({
          title: 'Categoria criada com sucesso!',
          icon: 'lucide:file-check'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
})
