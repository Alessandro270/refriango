export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  authStore.init()

  const isLoginPage = to.path === '/auth/login'

  if (!authStore.isAuth && !isLoginPage) return navigateTo('/auth/login')

  if (authStore.isAuth && isLoginPage) return navigateTo('/')

  if (authStore.isAuth && authStore.user.role === 'admin') {
    if (to.path.startsWith('/admin')) return
    return navigateTo('/admin')
  }

  if (authStore.isAuth && authStore.user.role !== 'admin') {
    const fromAdmin = from.path.startsWith('/admin')
    const toAdmin = to.path.startsWith('/admin')

    if (fromAdmin && toAdmin) return navigateTo('/')
    if (toAdmin) return navigateTo(from.path)
  }
})
