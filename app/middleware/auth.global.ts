export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  authStore.init()

  const isLoginPage = to.path === '/auth/login'

  if (!authStore.isAuth && !isLoginPage) {
    return navigateTo('/auth/login')
  }

  if (authStore.isAuth && isLoginPage) {
    return navigateTo('/')
  }
})
