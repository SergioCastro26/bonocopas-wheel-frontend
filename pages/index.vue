<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        ¡Gira la Ruleta y 
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Gana Premios!
        </span>
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
        Participa en nuestra emocionante ruleta de premios. Cada giro es una nueva oportunidad de ganar increíbles recompensas.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/wheel" class="btn-primary text-lg px-8 py-3">
          🎯 Girar Ruleta
        </NuxtLink>
        <NuxtLink to="/prizes" class="btn-secondary text-lg px-8 py-3">
          🏆 Ver Premios
        </NuxtLink>
      </div>
    </div>

    <!-- Features Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fácil de Usar</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Solo haz clic y gira. Nuestra interfaz intuitiva hace que participar sea súper fácil.
        </p>
      </div>

      <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Premios Reales</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Todos nuestros premios son reales y se entregan a los ganadores de manera garantizada.
        </p>
      </div>

      <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Juego Justo</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Nuestro sistema es completamente transparente y justo para todos los participantes.
        </p>
      </div>
    </div>

    <!-- API Status -->
    <div class="text-center">
      <div class="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
        <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        <span class="text-sm font-medium">{{ apiStatus }}</span>
      </div>
    </div>

    <!-- User Dashboard -->
    <div v-if="user" class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        ¡Bienvenido, {{ user.email }}!
      </h2>
      <div class="space-y-4">
        <!-- Admin Panel Button (only for admins) -->
        <div v-if="isAdmin" class="mb-6">
          <NuxtLink
            to="/admin"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 shadow-lg"
          >
            ⚙️ Panel de Administrador
          </NuxtLink>
        </div>
        
        <!-- Regular User Buttons -->
        <NuxtLink
          to="/wheel"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          🎯 Ir a la Ruleta
        </NuxtLink>
        <br>
        <NuxtLink
          to="/history"
          class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          📋 Ver Historial
        </NuxtLink>
      </div>
    </div>

    <!-- Login Prompt -->
    <div v-if="!user" class="text-center mt-8">
      <NuxtLink 
        to="/login" 
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
      >
        🚀 Comenzar a Jugar
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()
const { user, isAdmin, checkAuth } = useAuth()
const apiStatus = ref('Checking API...')

// Check authentication and redirect if needed
onMounted(async () => {
  // First check if user has valid session
  const isAuthenticated = await checkAuth()
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    await navigateTo('/login')
    return
  }

  // Check API status if user is logged in
  try {
    const response = await $api.get('/')
    apiStatus.value = response.data.message || 'API Connected'
  } catch (error) {
    apiStatus.value = 'API Disconnected'
    console.error('API connection error:', error)
  }
})
</script>
