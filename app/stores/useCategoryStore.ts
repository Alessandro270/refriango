export const useCategoryStore = defineStore('category', {
  state: () => {
    return { categories: [], isLoading: true, hasLoaded: false }
  },
  getters: {
    categoryCount: state => state.categories.length || 0
  },
  actions: {
    async getAll() {
      const api = useApi()

      try {
        const categories = await api('/category')

        categories?.forEach(category => {
          this.categories.push(category)
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },

    async getCategory(id: string) {
      const api = useApi()

      try {
        const category = await api(`/category/${id}`)
        return category
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async create(body) {
      const api = useApi()
      const toast = useToast()

      try {
        const category = await api('/category', {
          method: 'POST',
          body
        })

        this.categories.push(category)

        toast.add({
          title: 'Recurso criado com sucesso!',
          icon: 'lucide:file-check',
          color: 'success'
        })
      } catch (e) {
        toast.add({
          title: 'Recurso não adicionada',
          icon: 'lucide:file-x',
          color: 'error'
        })
      }
    },
    async delete(id: string) {
      const api = useApi()
      const toast = useToast()

      try {
        await api(`/category/${id}`, { method: 'DELETE' })

        this.categories = this.categories.filter(category => category.id !== id)
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
    async update(id: string, body: Category) {
      const api = useApi()
      const toast = useToast()

      try {
        const res = await api(`/category/${id}`, { method: 'PATCH', body })

        const idx = this.categories.findIndex(category => id === category.id)
        this.categories[idx] = res
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
