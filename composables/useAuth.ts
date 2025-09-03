export const useAuth = () => {
  const { $api } = useNuxtApp()
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isLoading = ref(false)

  // Login function with retry mechanism for mobile networks
  const login = async (email: string, phone: string, retryCount = 0) => {
    const maxRetries = 2
    
    try {
      isLoading.value = true
      const response = await $api.post('/auth/login', { email, phone }, {
        withCredentials: true,
        timeout: 30000 // Extended timeout for mobile networks
      })
      user.value = response.data.user
      return { success: true, user: response.data.user }
    } catch (error: any) {
      console.error('Login error:', error)
      
      // Handle timeout with retry
      if (error.code === 'ECONNABORTED' && retryCount < maxRetries) {
        console.log(`Login timeout, retrying... (${retryCount + 1}/${maxRetries})`)
        return login(email, phone, retryCount + 1)
      }
      
      if (error.code === 'ECONNABORTED') {
        return { 
          success: false, 
          error: 'Connection timeout after multiple attempts. Please check your internet connection.' 
        }
      }
      
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    } finally {
      if (retryCount === 0) { // Only set loading false on final attempt
        isLoading.value = false
      }
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
