export default defineNuxtRouteMiddleware((to, from) => {
  const { user, checkAuth } = useAuth()
  
  // If user is not logged in, redirect to login
  if (!user.value) {
    return navigateTo('/login')
  }
})
