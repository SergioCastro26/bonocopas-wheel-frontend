<template>
  <div class="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative" 
       style="background-image: url('https://res.cloudinary.com/dphpfdsk3/image/upload/v1756999777/paisaje-natural-impresionante_ge01xh.jpg');">
    <!-- Dark overlay for better text readability -->
    <div class="absolute inset-0 bg-black/40"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl shadow-black/50 tracking-wide mb-4">
        🏆 Mis Premios
      </h1>
      <p class="text-xl text-white drop-shadow-lg shadow-black/60 font-medium mb-8">
        Aquí puedes ver todos tus premios ganados y su estado
      </p>
      
      <!-- User Info -->
      <div v-if="user" class="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-800 rounded-full mb-8 shadow-lg border border-white/30">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm font-medium">{{ user.email }}</span>
        <button @click="handleLogout" class="ml-4 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
          Salir
        </button>
      </div>

      <!-- Wheel Type Tabs -->
      <div class="flex justify-center mb-8">
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-white/30">
          <button
            @click="activeTab = 'normal'"
            :class="[
              'px-6 py-2 text-sm font-medium rounded-md transition-all duration-200',
              activeTab === 'normal'
                ? 'bg-white text-blue-800 shadow-md'
                : 'text-white hover:bg-white/10'
            ]"
          >
            🎯 Ruleta Normal
          </button>
          <button
            @click="activeTab = 'hot'"
            :class="[
              'px-6 py-2 text-sm font-medium rounded-md transition-all duration-200',
              activeTab === 'hot'
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md'
                : 'text-white hover:bg-white/10'
            ]"
          >
            🔥 Ruleta Hot
          </button>
        </div>
      </div>
    </div>

    <!-- Warning Message -->
    <div class="mb-8 p-4 bg-red-50/90 backdrop-blur-sm rounded-lg border border-red-200/50 shadow-lg">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-lg font-semibold text-red-800">
            ⚠️ IMPORTANTE - LEE ANTES DE CONTINUAR
          </h3>
          <p class="text-sm text-red-700 mt-2">
            Para poder reclamar tu premio <strong>NO oprimas el botón 'Autorización Camarero'</strong>. 
            Este debe ser usado únicamente por el encargado de barra. 
            Si lo haces tú, el premio se eliminará y no podrás reclamarlo.
          </p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      <p class="mt-4 text-white drop-shadow-lg">Cargando premios...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredSpins.length === 0" class="text-center py-12">
      <div class="mx-auto h-24 w-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-lg">
        <svg class="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-white drop-shadow-lg mb-2">
        {{ activeTab === 'hot' ? 'No tienes premios de Ruleta Hot aún' : 'No tienes premios de Ruleta Normal aún' }}
      </h3>
      <p class="text-white/90 drop-shadow-lg mb-6">
        {{ activeTab === 'hot' ? '¡Accede a la Ruleta Hot y gana premios exclusivos!' : '¡Ve a la ruleta y gana tu primer premio!' }}
      </p>
      <NuxtLink
        :to="activeTab === 'hot' ? '/wheelHot' : '/wheel'"
        :class="[
          'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200',
          activeTab === 'hot' 
            ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:ring-orange-500' 
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        ]"
      >
        {{ activeTab === 'hot' ? '🔥 Ir a Ruleta Hot' : '🎯 Ir a la Ruleta' }}
      </NuxtLink>
    </div>

    <!-- Prizes List -->
    <div v-else>
      <!-- Active Prizes -->
      <div v-if="activePrizes.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold text-white drop-shadow-lg mb-6">
          {{ activeTab === 'hot' ? '🔥 Premios Hot Activos' : '🎯 Premios Activos' }} ({{ activePrizes.length }})
        </h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="spin in activePrizes"
            :key="spin.id"
            class="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-white/30 p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ spin.prize.name }}
                  </h3>
                  <span v-if="activeTab === 'hot'" class="text-xs bg-gradient-to-r from-orange-500 to-red-600 text-white px-2 py-0.5 rounded-full font-medium">
                    🔥 HOT
                  </span>
                </div>
                <p v-if="spin.prize.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {{ spin.prize.description }}
                </p>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Activo
              </span>
            </div>
            
            <!-- Countdown Timer -->
            <div class="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-medium text-orange-800 dark:text-orange-600">
                  Expira en: {{ getTimeRemaining(spin.expiresAt) }}
                </span>
              </div>
            </div>

            <div class="text-xs text-gray-600 mb-4">
              <p>Ganado: {{ formatDate(spin.date) }}</p>
              <p>Expira: {{ formatDate(spin.expiresAt) }}</p>
            </div>

            <button
              @click="claimPrize(spin)"
              :disabled="isClaimingPrize === spin.id"
              class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <span v-if="isClaimingPrize !== spin.id">🎁 Autorización Camarero</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Reclamando...
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Expired Prizes -->
      <div v-if="expiredPrizes.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold text-white drop-shadow-lg mb-6">
          {{ activeTab === 'hot' ? '⏰ Premios Hot Expirados' : '⏰ Premios Expirados' }} ({{ expiredPrizes.length }})
        </h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="spin in expiredPrizes"
            :key="spin.id"
            class="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/30 p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ spin.prize.name }}
                  </h3>
                  <span v-if="activeTab === 'hot'" class="text-xs bg-gradient-to-r from-orange-500 to-red-600 text-white px-2 py-0.5 rounded-full font-medium">
                    🔥 HOT
                  </span>
                </div>
                <p v-if="spin.prize.description" class="text-sm text-gray-700 mt-1">
                  {{ spin.prize.description }}
                </p>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Expirado
              </span>
            </div>

            <div class="text-xs text-gray-600 mb-4">
              <p>Ganado: {{ formatDate(spin.date) }}</p>
              <p>Expiró: {{ formatDate(spin.expiresAt) }}</p>
            </div>

            <button
              disabled
              class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-600 bg-gray-100 cursor-not-allowed"
            >
              ❌ Premio Expirado
            </button>
          </div>
        </div>
      </div>

      <!-- Claimed Prizes -->
      <div v-if="claimedPrizes.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold text-white drop-shadow-lg mb-6">
          {{ activeTab === 'hot' ? '✅ Premios Hot Reclamados' : '✅ Premios Reclamados' }} ({{ claimedPrizes.length }})
        </h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="spin in claimedPrizes"
            :key="spin.id"
            class="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/30 p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ spin.prize.name }}
                  </h3>
                  <span v-if="activeTab === 'hot'" class="text-xs bg-gradient-to-r from-orange-500 to-red-600 text-white px-2 py-0.5 rounded-full font-medium">
                    🔥 HOT
                  </span>
                </div>
                <p v-if="spin.prize.description" class="text-sm text-gray-700 mt-1">
                  {{ spin.prize.description }}
                </p>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Reclamado
              </span>
            </div>

            <div class="text-xs text-gray-600 mb-4">
              <p>Ganado: {{ formatDate(spin.date) }}</p>
              <p>Reclamado: {{ formatDate(spin.expiresAt) }}</p>
            </div>

            <button
              disabled
              class="w-full inline-flex justify-center items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 cursor-not-allowed"
            >
              ✅ Ya Reclamado
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Wheel -->
    <div class="text-center mt-12">
      <NuxtLink
        to="/wheel"
        class="inline-flex items-center px-6 py-3 border border-white/30 shadow-lg text-base font-medium rounded-md text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-200"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a la Ruleta
      </NuxtLink>
    </div>

    <!-- Claim Success Modal -->
    <div v-if="showClaimModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div class="p-6">
          <div class="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div class="text-center">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🏆 Premio Verificado
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 whitespace-pre-line">
              {{ claimMessage }}
            </p>
            
            <button
              @click="closeClaimModal"
              class="w-full inline-flex justify-center items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
const { user, logout, checkAuth } = useAuth()
const { $api } = useNuxtApp()

// State
const spins = ref([])
const isLoading = ref(true)
const isClaimingPrize = ref(null)
const countdownInterval = ref(null)
const showClaimModal = ref(false)
const claimMessage = ref('')
const activeTab = ref('normal')

// Check authentication on mount
onMounted(async () => {
  try {
    isLoading.value = true
    
    // Check if user is already loaded
    if (user.value) {
      console.log('User already authenticated:', user.value.email)
      await loadPrizes()
      startCountdownTimer()
      return
    }
    
    // Try to authenticate
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      console.log('Authentication failed, redirecting to login')
      await navigateTo('/login')
      return
    }
    
    console.log('User authenticated successfully:', user.value?.email)
    await loadPrizes()
    startCountdownTimer()
  } catch (error) {
    console.error('Error in authentication flow:', error)
    await navigateTo('/login')
  }
})

onUnmounted(() => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
  }
})

// Computed properties
const filteredSpins = computed(() => {
  return spins.value.filter(spin => {
    const wheelType = spin.wheelType || 'normal'
    return wheelType === activeTab.value
  })
})

const activePrizes = computed(() => {
  const now = new Date()
  return filteredSpins.value.filter(spin => !spin.isExpired && !spin.isClaimed && now <= new Date(spin.expiresAt))
})

const expiredPrizes = computed(() => {
  const now = new Date()
  return filteredSpins.value.filter(spin => spin.isExpired || (!spin.isClaimed && now > new Date(spin.expiresAt)))
})

const claimedPrizes = computed(() => {
  return filteredSpins.value.filter(spin => spin.isClaimed)
})

// Methods
const loadPrizes = async () => {
  try {
    isLoading.value = true
    const response = await $api.get('/spin/history', {
      withCredentials: true,
      params: { limit: 100 }
    })
    
    spins.value = response.data.spins || []
    console.log('Loaded spins:', spins.value.length)
  } catch (error) {
    console.error('Error loading prizes:', error)
    // If API call fails due to auth, redirect to login
    if (error.response?.status === 401) {
      console.log('API returned 401, redirecting to login')
      await navigateTo('/login')
    }
  } finally {
    isLoading.value = false
  }
}

const claimPrize = async (spin) => {
  if (!spin?.id) return
  
  try {
    isClaimingPrize.value = spin.id
    
    const response = await $api.put(`/spin/${spin.id}/claim`, {}, {
      withCredentials: true
    })
    
    // Show styled modal instead of alert
    claimMessage.value = response.data.message
    showClaimModal.value = true
    
    await loadPrizes()
    
  } catch (error) {
    console.error('Error claiming prize:', error)
    // Show error in styled modal too
    claimMessage.value = error.response?.data?.message || 'Error al reclamar el premio'
    showClaimModal.value = true
  } finally {
    isClaimingPrize.value = null
  }
}

const closeClaimModal = () => {
  showClaimModal.value = false
  claimMessage.value = ''
}

const getTimeRemaining = (expiresAt) => {
  if (!expiresAt) return 'Expirado'
  
  const now = new Date()
  const expiry = new Date(expiresAt)
  const diff = expiry - now
  
  if (diff <= 0) return 'Expirado'
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}

const startCountdownTimer = () => {
  countdownInterval.value = setInterval(() => {
    spins.value = [...spins.value]
  }, 1000)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleLogout = async () => {
  await logout()
}

// Remove auth middleware to prevent redirect issues
// definePageMeta({
//   middleware: 'auth'
// })
</script>
