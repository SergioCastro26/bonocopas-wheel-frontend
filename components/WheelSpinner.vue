<template>
  <div class="flex flex-col items-center space-y-8">
    <!-- Vue3 Roulette Wheel -->
    <div class="relative">
      <!-- Custom centered arrow indicator -->
      <div class="absolute top-2 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <div class="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-600 filter drop-shadow-lg"></div>
      </div>
      
      <component 
        v-if="Roulette"
        :is="Roulette" 
        ref="wheel" 
        :items="rouletteItems" 
        :size="400"
        :duration="3"
        :display-shadow="true"
        :display-border="true"
        :display-indicator="false"
        :centered-indicator="false"
        :base-display="true"
        :base-display-indicator="false"
        :base-display-shadow="true"
        indicator-position="top"
        easing="ease"
        @wheel-start="onWheelStart"
        @wheel-end="onWheelEnd"
      />
      <!-- Loading placeholder while component loads -->
      <div v-else class="w-96 h-96 rounded-full border-8 border-gray-300 animate-pulse flex items-center justify-center">
        <div class="text-gray-500">Cargando ruleta...</div>
      </div>
    </div>

    <!-- Spin Button -->
    <button
      @click="spin"
      :disabled="isSpinning || !canSpin"
      class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      <span v-if="!isSpinning">🎯 ¡Girar Ruleta!</span>
      <span v-else class="flex items-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Girando...
      </span>
    </button>

    <!-- Spin Status -->
    <div v-if="nextSpinTime" class="text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Próximo giro disponible en: {{ timeUntilNextSpin }}
      </p>
    </div>

    <!-- Toast Notifications -->
    <div v-if="notification.show" class="fixed top-4 right-4 z-50 max-w-sm">
      <div 
        :class="[
          'p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300',
          notification.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' : '',
          notification.type === 'error' ? 'bg-red-50 border-red-500 text-red-800' : '',
          notification.type === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-800' : '',
          notification.type === 'info' ? 'bg-blue-50 border-blue-500 text-blue-800' : ''
        ]"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <span v-if="notification.type === 'success'" class="text-green-500 text-xl">✅</span>
            <span v-else-if="notification.type === 'error'" class="text-red-500 text-xl">❌</span>
            <span v-else-if="notification.type === 'warning'" class="text-yellow-500 text-xl">⚠️</span>
            <span v-else-if="notification.type === 'info'" class="text-blue-500 text-xl">ℹ️</span>
          </div>
          <div class="ml-3 flex-1">
            <p class="font-medium">{{ notification.title }}</p>
            <p v-if="notification.message" class="mt-1 text-sm opacity-90">{{ notification.message }}</p>
          </div>
          <button 
            @click="hideNotification"
            class="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
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

// Sample prizes (will be replaced with real data)
const prizes = ref([
  { id: 1, name: 'Premio 1', color: '#FF6B6B' },
  { id: 2, name: 'Premio 2', color: '#4ECDC4' },
  { id: 3, name: 'Premio 3', color: '#45B7D1' },
  { id: 4, name: 'Premio 4', color: '#96CEB4' },
  { id: 5, name: 'Premio 5', color: '#FFEAA7' },
  { id: 6, name: 'Premio 6', color: '#DDA0DD' },
  { id: 7, name: 'Premio 7', color: '#FF8A80' },
  { id: 8, name: 'Premio 8', color: '#82B1FF' }
])

// Convert prizes to roulette format
const rouletteItems = computed(() => {
  return prizes.value.map((prize, index) => ({
    id: prize.id,
    name: prize.name,
    htmlContent: prize.name,
    textColor: 'black',
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
    
    if (error.response?.status === 429) {
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

// Get color for prize based on index
const getColorForIndex = (index) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF8A80', '#82B1FF']
  return colors[index % colors.length]
}

onMounted(() => {
  loadPrizes()
})
</script>
