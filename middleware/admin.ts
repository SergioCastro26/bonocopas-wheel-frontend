export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, checkAuth } = useAuth()
  
  // First, ensure we have current user data
  if (!user.value) {
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      return navigateTo('/login')
    }
  }
  
  // Check if user has admin role
  if (user.value?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied. Admin privileges required.'
    })
  }
})
