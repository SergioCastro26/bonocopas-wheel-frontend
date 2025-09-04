<template>
  <div class="flex flex-col items-center space-y-8">
    <!-- Vue3 Roulette Wheel -->
    <div class="relative wheel-container">
      <!-- Tropical glow effect wrapper -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-400 opacity-40 blur-xl scale-110 animate-pulse"></div>
      
      <div class="relative z-10 rounded-full shadow-2xl" style="box-shadow: inset 0 0 50px rgba(6, 182, 212, 0.3), 0 0 30px rgba(251, 146, 60, 0.5);">
        <component 
          v-if="Roulette"
          :is="Roulette" 
          ref="wheel" 
          :items="rouletteItems" 
          :size="wheelSize"
          :duration="6"
          :display-shadow="false"
          :display-border="true"
          :display-indicator="false"
          :centered-indicator="true"
          :base-display="true"
          :base-display-indicator="false"
          :base-display-shadow="false"
          :base-size="Math.floor(wheelSize * 0.28)"
          :base-background="''"
          indicator-position="top"
          easing="ease-out"
          :counter-clockwise="true"
          :horizontal-content="false"
          :result-variation="90"
          @wheel-start="onWheelStart"
          @wheel-end="onWheelEnd"
        >
          <template #baseContent>
            <div class="arrow-roulette flex items-center justify-center w-full h-full">
              <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
            </div>
          </template>
        </component>
        <!-- Loading placeholder while component loads -->
        <div v-else class="rounded-full border-8 border-gray-300 animate-pulse flex items-center justify-center bg-gray-800" :style="`width: ${wheelSize}px; height: ${wheelSize}px;`">
          <div class="text-gray-300">Cargando ruleta...</div>
        </div>
      </div>
    </div>

    <!-- Spin Button -->
    <button
      @click="spin"
      :disabled="isSpinning || !canSpin"
      class="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-cyan-500 via-orange-500 to-pink-500 hover:from-cyan-600 hover:via-orange-600 hover:to-pink-600 text-white font-bold text-base md:text-lg rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-white/20 backdrop-blur-sm min-w-[200px] touch-manipulation"
      style="box-shadow: 0 0 20px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);"
    >
      <span v-if="!isSpinning" class="flex items-center justify-center">
        <svg class="w-5 h-5 md:w-6 md:h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
        </svg>
        ¡Girar Ruleta!
      </span>
      <span v-else class="flex items-center justify-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Girando...
      </span>
    </button>

    <!-- Spin Status -->
    <div v-if="nextSpinTime" class="text-center">
      <p class="text-sm text-gray-200">
        Próximo giro disponible en: {{ timeUntilNextSpin }}
      </p>
    </div>

    <!-- Confetti Effect -->
    <div v-if="showConfetti" class="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <div class="confetti-container">
        <div v-for="i in 50" :key="i" class="confetti-piece" :style="getConfettiStyle(i)"></div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div v-if="notification.show" class="fixed top-4 right-4 z-50 max-w-sm">
      <div 
        :class="[
          'p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 backdrop-blur-sm',
          notification.type === 'success' ? 'bg-cyan-900/90 border-cyan-400 text-white' : '',
          notification.type === 'error' ? 'bg-red-900/90 border-red-400 text-white' : '',
          notification.type === 'warning' ? 'bg-yellow-900/90 border-yellow-400 text-white' : '',
          notification.type === 'info' ? 'bg-blue-900/90 border-blue-400 text-white' : ''
        ]"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <span v-if="notification.type === 'success'" class="text-cyan-300 text-xl">🎉</span>
            <span v-else-if="notification.type === 'error'" class="text-red-300 text-xl">❌</span>
            <span v-else-if="notification.type === 'warning'" class="text-yellow-300 text-xl">⚠️</span>
            <span v-else-if="notification.type === 'info'" class="text-blue-300 text-xl">ℹ️</span>
          </div>
          <div class="ml-3 flex-1">
            <p class="font-medium text-white">{{ notification.title }}</p>
            <p v-if="notification.message" class="mt-1 text-sm text-gray-200">{{ notification.message }}</p>
          </div>
          <button 
            @click="hideNotification"
            class="ml-4 text-gray-300 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()
const emit = defineEmits(['prize-won'])

// Dynamic import to avoid SSR issues
const Roulette = ref(null)

// Responsive wheel size
const wheelSize = computed(() => {
  if (process.client) {
    const screenWidth = window.innerWidth
    if (screenWidth < 768) {
      // Mobile: 70% of screen width, max 280px
      return Math.min(screenWidth * 0.7, 280)
    } else {
      // Desktop: 400-450px
      return 425
    }
  }
  return 425 // Default for SSR
})

onMounted(async () => {
  if (process.client) {
    const { Roulette: RouletteComponent } = await import('vue3-roulette')
    Roulette.value = RouletteComponent
  }
})

// Wheel state
const wheel = ref(null)
const isSpinning = ref(false)
const canSpin = ref(true)
const nextSpinTime = ref(null)
const timeUntilNextSpin = ref('')
const currentSpin = ref(null)

// Confetti effect
const showConfetti = ref(false)

const triggerConfetti = () => {
  showConfetti.value = true
  setTimeout(() => {
    showConfetti.value = false
  }, 3000)
}

// Notification system
const notification = ref({
  show: false,
  type: 'info', // success, error, warning, info
  title: '',
  message: ''
})

const showNotification = (type, title, message = '') => {
  notification.value = {
    show: true,
    type,
    title,
    message
  }
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    hideNotification()
  }, 5000)
}

const hideNotification = () => {
  notification.value.show = false
}

// Sample prizes with tropical theme colors
const prizes = ref([
  { id: 1, name: 'Premio 1', color: '#06b6d4' }, // Tropical cyan
  { id: 2, name: 'Premio 2', color: '#fb923c' }, // Sunset orange
  { id: 3, name: 'Premio 3', color: '#ec4899' }, // Coral pink
  { id: 4, name: 'Premio 4', color: '#10b981' }, // Ocean green
  { id: 5, name: 'Premio 5', color: '#f59e0b' }, // Golden yellow
  { id: 6, name: 'Premio 6', color: '#8b5cf6' }, // Tropical purple
  { id: 7, name: 'Premio 7', color: '#ef4444' }, // Sunset red
  { id: 8, name: 'Premio 8', color: '#06d6a0' }  // Turquoise
])

// Convert prizes to roulette format
const rouletteItems = computed(() => {
  return prizes.value.map((prize, index) => ({
    id: prize.id,
    name: prize.name,
    htmlContent: prize.name,
    textColor: '#FFFFFF', // White text for better contrast on dark colors
    background: prize.color
  }))
})

// Wheel event handlers
const onWheelStart = () => {
  console.log('Wheel started spinning')
  showNotification('info', '🎯 Girando...', 'La ruleta está girando, ¡buena suerte!')
}

const onWheelEnd = (result) => {
  console.log('Wheel stopped at:', result)
  isSpinning.value = false
  
  if (currentSpin.value) {
    const prizeName = currentSpin.value.prize?.name || 'Premio desconocido'
    showNotification('success', '🎉 ¡Felicidades!', `Has ganado: ${prizeName}`)
    
    // Trigger confetti effect
    triggerConfetti()
    
    // Emit the prize won event
    emit('prize-won', currentSpin.value)
  }
}

// Spin function
const spin = async () => {
  if (isSpinning.value || !canSpin.value) return

  try {
    isSpinning.value = true
    
    // Call API to play spin
    const response = await $api.post('/spin/play', {}, {
      withCredentials: true
    })

    // Store the spin result for later use
    currentSpin.value = response.data.spin
    
    // Find the winning prize index
    const winningPrize = response.data.spin.prize
    const prizeIndex = prizes.value.findIndex(p => p.id === winningPrize._id || p.name === winningPrize.name)
    
    // Launch the wheel animation with the result index
    if (prizeIndex !== -1) {
      wheel.value.launchWheel(prizeIndex)
    } else {
      wheel.value.launchWheel()
    }

  } catch (error) {
    isSpinning.value = false
    console.error('Spin error:', error)
    
    if (error.response?.status === 403) {
      // Handle wheel disabled
      showNotification('info', '🔒 Ruleta Desactivada', 
        error.response?.data?.message || 'Mira nuestras redes para estar pendiente')
    } else if (error.response?.status === 429) {
      // Handle rate limit
      console.log('Rate limit response:', error.response.data)
      
      if (error.response.data.nextSpinAvailable) {
        const nextSpin = new Date(error.response.data.nextSpinAvailable)
        nextSpinTime.value = nextSpin
        canSpin.value = false
        startCountdown()
      } else {
        // Fallback: set 24h cooldown from now
        const nextSpin = new Date(Date.now() + 24 * 60 * 60 * 1000)
        nextSpinTime.value = nextSpin
        canSpin.value = false
        startCountdown()
      }
      
      // Show user-friendly notification
      showNotification('warning', 'Límite de giros alcanzado', 
        error.response?.data?.message || 'Ya has usado todos tus giros de hoy. Vuelve mañana.')
    } else {
      // Handle other errors
      showNotification('error', 'Error al girar', 
        error.response?.data?.message || 'Error al girar la ruleta')
    }
  }
}

// Countdown timer
const startCountdown = () => {
  const updateCountdown = () => {
    if (!nextSpinTime.value) return
    
    const now = new Date()
    const diff = nextSpinTime.value - now
    
    if (diff <= 0) {
      canSpin.value = true
      nextSpinTime.value = null
      timeUntilNextSpin.value = ''
      return
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    timeUntilNextSpin.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    
    setTimeout(updateCountdown, 1000)
  }
  
  updateCountdown()
}

// Load prizes from API
const loadPrizes = async () => {
  try {
    const response = await $api.get('/spin/prizes', {
      withCredentials: true
    })
    
    const activePrizes = response.data.prizes.filter(p => p.isActive && p.stock > 0)
    
    if (activePrizes.length > 0) {
      // Use actual prizes from database
      prizes.value = activePrizes.map((prize, index) => ({
        id: prize._id,
        name: prize.name,
        color: getColorForIndex(index),
        probability: prize.probability,
        stock: prize.stock,
        description: prize.description
      }))
    }
  } catch (error) {
    console.error('Error loading prizes:', error)
    // Keep default prizes if API fails
  }
}

// Get color for prize based on index - Tropical theme
const getColorForIndex = (index) => {
  const colors = [
    '#06b6d4', // Tropical cyan
    '#fb923c', // Sunset orange
    '#ec4899', // Coral pink
    '#10b981', // Ocean green
    '#f59e0b', // Golden yellow
    '#8b5cf6', // Tropical purple
    '#ef4444', // Sunset red
    '#06d6a0'  // Turquoise
  ]
  return colors[index % colors.length]
}

// Confetti animation styles
const getConfettiStyle = (index) => {
  const colors = ['#06b6d4', '#fb923c', '#ec4899', '#10b981']
  const color = colors[index % colors.length]
  const left = Math.random() * 100
  const animationDelay = Math.random() * 3
  const animationDuration = 3 + Math.random() * 2
  
  return {
    backgroundColor: color,
    left: `${left}%`,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`
  }
}

onMounted(() => {
  loadPrizes()
})
</script>

<style scoped>
.wheel-container {
  max-width: 100vw;
  overflow: visible;
}

.confetti-piece {
  position: absolute;
  width: 8px;
  height: 8px;
  top: -10px;
  animation: confetti-fall linear infinite;
  opacity: 0.8;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .wheel-container {
    transform: scale(0.9);
  }
}

/* Ensure text in roulette segments is readable */
:deep(.roulette-segment) {
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

:deep(.roulette-segment-text) {
  font-size: clamp(10px, 2.5vw, 14px);
  line-height: 1.2;
}
</style>
