export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  authStore.init()
  if (to.path === '/auth/login' && authStore.isAuth) return navigateTo('/')

  if (to.path !== '/auth/login' && !authStore.isAuth)
    return navigateTo('/auth/login')
})
