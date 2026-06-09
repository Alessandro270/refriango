export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  return $fetch.create({
    baseURL: config.public.apiUrl,
    onRequest({ options }) {
      if (authStore.isAuth)
        options.headers = {
          ...options.headers,
          authorization: `Bearer ${authStore.token}`
        }
    },
    async onResponseError({ request, response, options }) {
      if (options._retry) {
        options._retry = false
        console.log(options)
        return
      }

      if (response.status === 401) {
        try {
          await authStore.refresh()
          console.log(options.retry)

          await $fetch(request, {
            ...options,
            headers: {
              ...options.headers,
              authorization: `Bearer ${authStore.token}`
            }
          })
          options._retry = true
        } catch {
          authStore.logout()
        }
      }
    }
  })
}
