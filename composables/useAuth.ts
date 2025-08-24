export const useAuth = () => {
  const { $api } = useNuxtApp()
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isLoading = ref(false)

  // Login function
  const login = async (email: string) => {
    try {
      isLoading.value = true
      const response = await $api.post('/auth/login', { email }, {
        withCredentials: true
      })
      user.value = response.data.user
      return { success: true, user: response.data.user }
    } catch (error: any) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    } finally {
      isLoading.value = false
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await $api.post('/auth/logout', {}, {
        withCredentials: true
      })
      user.value = null
      await navigateTo('/login')
    } catch (error) {
      console.error('Logout error:', error)
      user.value = null
      await navigateTo('/login')
    }
  }

  // Check current user
  const checkAuth = async () => {
    try {
      const response = await $api.get('/auth/me', {
        withCredentials: true
      })
      user.value = response.data.user
      return true
    } catch (error) {
      user.value = null
      return false
    }
  }

  return {
    user: readonly(user),
    isLoggedIn,
    isAdmin,
    isLoading: readonly(isLoading),
    login,
    logout,
    checkAuth
  }
}
