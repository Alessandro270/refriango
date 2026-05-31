export const useCategoryStore = defineStore('category', {
  state: () => {
    return { categories: [] }
  },
  actions: {
    async getCategories() {
      const config = useRuntimeConfig()
      try {
        const token = useCookie(AUTH_TOKEN_KEY).value

        if (!token) throw new Error('Nao autenticado')

        const categories = await $fetch('/category', {
          headers: {
            authorization: `Bearer ${token}`
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
      try {
        const token = useCookie(AUTH_TOKEN_KEY).value
        if (!token) throw new Error('Nao autenticado')
        const category = await $fetch(`/category/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
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
      const toast = useToast()
      try {
        const token = useCookie(AUTH_TOKEN_KEY).value
        if (!token) throw new Error('Nao autenticado')
        const category = await $fetch('/category', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${token}`
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
