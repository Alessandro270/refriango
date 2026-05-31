export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  authStore.init()

  if (authStore.isAuth) {
    let validToken = true
    ;(async () => {
      try {
        validToken = await authStore.validateToken()
      } catch (e) {
        validToken = false
      }
    })()
    if (!validToken) return authStore.logout()
  }
  if (to.path === '/auth/login' && authStore.isAuth) return navigateTo('/')

  if (to.path !== '/auth/login' && !authStore.isAuth)
    return navigateTo('/auth/login')
})
