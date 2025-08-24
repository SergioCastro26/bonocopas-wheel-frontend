<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        🎯 Ruleta de Premios
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
        ¡Gira la ruleta y gana increíbles premios!
      </p>
      
      <!-- User Info -->
      <div v-if="user" class="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-8">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm font-medium">{{ user.email }}</span>
        <button @click="handleLogout" class="ml-4 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
          Salir
        </button>
      </div>
    </div>

    <!-- Wheel Component -->
    <div class="flex justify-center mb-12">
      <WheelSpinner @prize-won="onPrizeWon" />
    </div>

    <!-- Quick Actions -->
    <div class="flex justify-center space-x-4 mb-12">
      <NuxtLink 
        to="/history" 
        class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Ver Historial
      </NuxtLink>
      
      <button 
        @click="refreshPage"
        class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Actualizar
      </button>
    </div>

    <!-- Prize Modal -->
    <PrizeModal 
      :is-open="showPrizeModal" 
      :spin="wonSpin" 
      @close="closePrizeModal"
      @prize-claimed="onPrizeClaimed"
    />
  </div>
</template>

<script setup>
const { user, logout, checkAuth } = useAuth()

// Modal state
const showPrizeModal = ref(false)
const wonSpin = ref(null)

// Check authentication on mount
onMounted(async () => {
  // If user is already set from login, don't check again
  if (!user.value) {
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      await navigateTo('/login')
    }
  }
})

// Handle prize won
const onPrizeWon = (spin) => {
  wonSpin.value = spin
  showPrizeModal.value = true
}

// Close prize modal
const closePrizeModal = () => {
  showPrizeModal.value = false
  wonSpin.value = null
}

// Handle prize claimed
const onPrizeClaimed = (spin) => {
  // You could add a toast notification here
  console.log('Prize claimed:', spin)
}

// Handle logout
const handleLogout = async () => {
  await logout()
}

// Refresh page
const refreshPage = () => {
  window.location.reload()
}

// Remove middleware to prevent conflicts
// definePageMeta({
//   middleware: 'auth'
// })
</script>
