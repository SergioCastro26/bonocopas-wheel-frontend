<template>
  <div class="min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-no-repeat bg-fixed relative" 
       style="background-image: url('https://res.cloudinary.com/dphpfdsk3/image/upload/v1756999777/paisaje-natural-impresionante_ge01xh.jpg');">
    <!-- Dark overlay with gradient for premium feel -->
    <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-orange-900/30 to-red-900/40"></div>
    
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
    <!-- Premium Header -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-6 shadow-2xl">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      </div>
      
      <h1 class="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 mb-4 drop-shadow-2xl">
        🔥 RULETA HOT 🔥
      </h1>
      <p class="text-xl text-white mb-8 drop-shadow-lg font-medium">
        ¡Premios exclusivos y experiencias únicas te esperan!
      </p>
      
      <!-- Premium User Info -->
      <div v-if="user" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-sm border border-orange-400/30 text-white rounded-full mb-8 shadow-2xl">
        <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-3">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="text-sm font-medium">{{ user.email }}</span>
        <span class="mx-2 text-orange-300">•</span>
        <span class="text-sm font-bold text-orange-300">VIP ACCESS</span>
        <button @click="handleLogout" class="ml-4 text-xs text-orange-200 hover:text-white transition-colors">
          Salir
        </button>
      </div>
    </div>

    <!-- Premium Wheel Component -->
    <div class="flex justify-center mb-6 sm:mb-12 px-2">
      <div class="w-full max-w-4xl bg-gradient-to-br from-orange-500/10 via-red-600/10 to-pink-600/10 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-2xl border border-orange-400/30 relative overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-600/5 animate-pulse"></div>
        <div class="absolute top-0 left-0 w-full h-full">
          <div class="absolute top-4 left-4 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
          <div class="absolute top-8 right-6 w-2 h-2 bg-red-400 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
          <div class="absolute bottom-6 left-8 w-2 h-2 bg-pink-400 rounded-full animate-ping" style="animation-delay: 1s;"></div>
        </div>
        
        <div class="relative z-10">
          <ModernPrizeWheel
            v-if="hotPrizes.length > 0"
            :prizes="hotPrizes"
            :wheel-size="wheelSize"
            :animation-duration="4000"
            :min-spins="3"
            :max-spins="6"
            wheel-type="hot"
            @winner-selected="onWinnerSelected"
            @spin-start="onSpinStart"
            @spin-end="onSpinEnd"
          />
          <div v-else-if="isLoadingPrizes" class="flex justify-center items-center py-12 sm:py-20">
            <div class="text-center">
              <div class="w-12 h-12 sm:w-16 sm:h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-white text-base sm:text-lg">Cargando premios hot...</p>
            </div>
          </div>
          <div v-else class="text-center py-12 sm:py-20">
            <p class="text-white text-base sm:text-lg">No hay premios hot disponibles</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Premium Actions -->
    <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-12 px-4">
      <NuxtLink 
        to="/history" 
        class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-sm border border-orange-400/30 shadow-2xl text-base font-medium rounded-md text-white hover:from-orange-500/30 hover:to-red-600/30 transition-all duration-200 transform hover:scale-105"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Ver Mis Premios
      </NuxtLink>
      
      <NuxtLink 
        to="/wheel" 
        class="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 shadow-2xl text-base font-medium rounded-md text-white hover:bg-white/30 transition-all duration-200"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Ruleta Normal
      </NuxtLink>
      
      <button 
        @click="refreshPage"
        class="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 shadow-2xl text-base font-medium rounded-md text-white hover:bg-white/30 transition-all duration-200"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Actualizar
      </button>
    </div>

    <!-- Premium Features Info -->
    <div class="max-w-4xl mx-auto mb-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-6 bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-sm rounded-xl border border-orange-400/20 shadow-xl">
          <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Premios Exclusivos</h3>
          <p class="text-orange-200 text-sm">
            Accede a premios únicos que solo están disponibles en la Ruleta Hot
          </p>
        </div>
        
        <div class="text-center p-6 bg-gradient-to-br from-red-500/10 to-pink-600/10 backdrop-blur-sm rounded-xl border border-red-400/20 shadow-xl">
          <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Experiencia Premium</h3>
          <p class="text-red-200 text-sm">
            Disfruta de una experiencia mejorada con efectos especiales y animaciones
          </p>
        </div>
        
        <div class="text-center p-6 bg-gradient-to-br from-pink-500/10 to-purple-600/10 backdrop-blur-sm rounded-xl border border-pink-400/20 shadow-xl">
          <div class="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Acceso VIP</h3>
          <p class="text-pink-200 text-sm">
            Solo usuarios con código especial pueden acceder a esta ruleta exclusiva
          </p>
        </div>
      </div>
    </div>

    <!-- Premium Prize Modal -->
    <PrizeModal 
      :is-open="showPrizeModal" 
      :spin="wonSpin" 
      @close="closePrizeModal"
      @prize-claimed="onPrizeClaimed"
      :is-hot="true"
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

// Hot wheel state
const hotPrizes = ref([])
const isLoadingPrizes = ref(true)

// Responsive wheel size - same as normal wheel but for hot prizes
const wheelSize = computed(() => {
  if (process.client) {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    
    if (screenWidth < 640) {
      // Mobile: Use 85% of screen width, ensure vertical fit
      const maxWidth = Math.min(screenWidth * 0.85, screenHeight * 0.5)
      return Math.max(320, Math.min(450, maxWidth))
    }
    if (screenWidth < 768) return 500 // Small tablets
    if (screenWidth < 1024) return 580 // Tablets
    if (screenWidth < 1280) return 650 // Small desktop
    if (screenWidth < 1536) return 720 // Large desktop
    return 800 // Extra large desktop
  }
  return 650 // Default for SSR
})

// Load hot prizes
const loadHotPrizes = async () => {
  try {
    isLoadingPrizes.value = true
    // Call the API with wheelType=hot to get only hot prizes
    const response = await $api.get('/spin/status?wheelType=hot')
    hotPrizes.value = response.data.prizes || []
    console.log('🔥 Hot prizes loaded:', hotPrizes.value.length)
  } catch (error) {
    console.error('Error loading hot prizes:', error)
    hotPrizes.value = []
  } finally {
    isLoadingPrizes.value = false
  }
}

// Check authentication and hot wheel access on mount
onMounted(async () => {
  // Check if user is authenticated
  if (!user.value) {
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      await navigateTo('/login')
      return
    }
  }
  
  // Load hot prizes
  await loadHotPrizes()
})

// Handle winner selected from modern wheel
const onWinnerSelected = (winner) => {
  console.log('🔥 Premio hot ganado:', winner)
}

const onSpinStart = () => {
  console.log('🔥 Iniciando giro hot...')
}

const onSpinEnd = (winner) => {
  console.log('✅ Giro hot completado, ganador:', winner.name)
  // Create a spin object compatible with the existing modal
  wonSpin.value = {
    id: Date.now(), // Temporary ID
    prize: {
      id: winner.id,
      name: winner.name,
      description: winner.description
    },
    isClaimed: false,
    date: new Date(),
    type: 'hot'
  }
  showPrizeModal.value = true
}

// Handle prize won (legacy - keeping for compatibility)
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
  console.log('Hot wheel prize claimed:', spin)
}

// Handle logout
const handleLogout = async () => {
  await logout()
}

// Refresh page
const refreshPage = () => {
  window.location.reload()
}

// Set page title
useHead({
  title: '🔥 Ruleta Hot - Zona Barceló',
  meta: [
    { name: 'description', content: 'Ruleta Hot exclusiva con premios únicos - Zona Barceló' }
  ]
})
</script>

<style scoped>
/* Custom animations for premium feel */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Gradient text animation */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.bg-clip-text {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}
</style>
