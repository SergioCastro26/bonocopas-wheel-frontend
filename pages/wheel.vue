<template>
  <div class="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative" 
       style="background-image: url('https://res.cloudinary.com/dphpfdsk3/image/upload/v1756999777/paisaje-natural-impresionante_ge01xh.jpg');">
    <!-- Dark overlay for better text readability -->
    <div class="absolute inset-0 bg-black/40"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Wheel Disabled Banner -->
    <div v-if="!wheelConfig?.isActive" class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <p class="font-semibold">🔒 Ruleta Temporalmente Desactivada</p>
              <p class="text-sm opacity-90">Mira nuestras redes para estar pendiente de cuándo vuelve</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <a 
              href="https://instagram.com/bonocopas" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.132-1.551-.684-.94-.684-2.12 0-3.06.684-.94 1.835-1.551 3.132-1.551s2.448.611 3.132 1.551c.684.94.684 2.12 0 3.06-.684.94-1.835 1.551-3.132 1.551zm7.718 0c-1.297 0-2.448-.611-3.132-1.551-.684-.94-.684-2.12 0-3.06.684-.94 1.835-1.551 3.132-1.551s2.448.611 3.132 1.551c.684.94.684 2.12 0 3.06-.684.94-1.835 1.551-3.132 1.551z"/>
              </svg>
              <span class="text-sm font-medium">Instagram</span>
            </a>
            <a 
              href="https://facebook.com/bonocopas" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="text-sm font-medium">Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="text-center mb-12" :class="{ 'mt-20': !wheelConfig?.isActive }">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
        🎯 Ruleta de Premios
      </h1>
      <p class="text-xl text-gray-200 mb-8 drop-shadow-md">
        ¡Gira la ruleta y gana increíbles premios!
      </p>
      
      <!-- User Info -->
      <div v-if="user" class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full mb-8 shadow-lg">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm font-medium">{{ user.email }}</span>
        <button @click="handleLogout" class="ml-4 text-xs text-gray-200 hover:text-white transition-colors">
          Salir
        </button>
      </div>
    </div>

    <!-- Wheel Component -->
    <div class="flex justify-center mb-12">
      <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
        <WheelSpinner @prize-won="onPrizeWon" />
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex justify-center space-x-4 mb-12">
      <NuxtLink 
        to="/history" 
        class="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg text-base font-medium rounded-md text-white hover:bg-white/30 transition-all duration-200"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Ver Mis Premios
      </NuxtLink>
      
      <button 
        @click="refreshPage"
        class="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg text-base font-medium rounded-md text-white hover:bg-white/30 transition-all duration-200"
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
  </div>
</template>

<script setup>
const { user, logout, checkAuth } = useAuth()
const { $api } = useNuxtApp()

// Modal state
const showPrizeModal = ref(false)
const wonSpin = ref(null)

// Wheel configuration state
const wheelConfig = ref(null)

// Load wheel configuration
const loadWheelConfig = async () => {
  try {
    const response = await $api.get('/spin/status')
    wheelConfig.value = response.data.config
  } catch (error) {
    console.error('Error loading wheel config:', error)
  }
}

// Check authentication on mount
onMounted(async () => {
  // If user is already set from login, don't check again
  if (!user.value) {
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      await navigateTo('/login')
    }
  }
  
  // Load wheel configuration
  await loadWheelConfig()
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
