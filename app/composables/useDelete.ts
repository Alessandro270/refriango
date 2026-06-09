export function useDelete() {
  const isLoading = ref<boolean>(false)

  async function deleteOne(id: string, store: any) {
    isLoading.value = true
    try {
      await store.delete(id)
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false
    }
  }
  return [isLoading, deleteOne]
}
