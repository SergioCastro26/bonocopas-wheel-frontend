import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const api = axios.create({
    baseURL: config.public.apiBase,
    timeout: 30000, // Increased timeout for mobile networks
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true // Enable cookies for all requests
  })

  // Add request interceptor to include Authorization header for Safari
  api.interceptors.request.use((config) => {
    // Check if we're in Safari and have a stored token
    const isSafari = typeof navigator !== 'undefined' && 
                    /Safari/.test(navigator.userAgent) && 
                    !/Chrome/.test(navigator.userAgent)
    
    if (isSafari && typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken')
      if (authToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authToken}`
      }
    }
    
    return config
  })

  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        navigateTo('/login')
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api
    }
  }
})
