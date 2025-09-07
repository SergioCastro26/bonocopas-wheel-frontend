<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
          🎯 Ruleta de Premios Moderna
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Ruleta conectada al backend con premios reales y configuración dinámica
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-white text-lg">Cargando configuración de la ruleta...</p>
        </div>
      </div>

      <!-- Main Wheel Component -->
      <div v-else-if="wheelConfig && prizes.length > 0" class="flex justify-center mb-8">
        <ModernPrizeWheel
          ref="wheelRef"
          :prizes="prizes"
          :wheel-size="450"
          :animation-duration="4000"
          :min-spins="3"
          :max-spins="6"
          @winner-selected="onWinnerSelected"
          @spin-start="onSpinStart"
          @spin-end="onSpinEnd"
        />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-red-400 text-xl mb-4">❌ Error al cargar la configuración</div>
        <p class="text-gray-300 mb-4">{{ error }}</p>
        <button 
          @click="loadWheelConfig"
          class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          🔄 Reintentar
        </button>
      </div>



    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()

// Component reference
const wheelRef = ref(null)

// Reactive state
const totalSpins = ref(0)
const winHistory = ref([])
const lastWinner = ref(null)
const spinTimes = ref([])

// Backend data
const isLoading = ref(true)
const error = ref(null)
const wheelConfig = ref(null)
const prizes = ref([])

// Load wheel configuration from backend
const loadWheelConfig = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await $api.get('/spin/status')
    wheelConfig.value = response.data.config
    prizes.value = response.data.prizes || []
    
    console.log('✅ Configuración cargada:', {
      config: wheelConfig.value,
      prizes: prizes.value.length
    })
  } catch (err) {
    console.error('❌ Error loading wheel config:', err)
    error.value = err.response?.data?.message || 'Error al cargar la configuración'
  } finally {
    isLoading.value = false
  }
}

// Computed properties
const averageSpinTime = computed(() => {
  if (spinTimes.value.length === 0) return 0
  const sum = spinTimes.value.reduce((a, b) => a + b, 0)
  return Math.round(sum / spinTimes.value.length)
})

// Event handlers
const onWinnerSelected = (winner) => {
  lastWinner.value = winner
  winHistory.value.push({
    ...winner,
    timestamp: new Date()
  })
  
  console.log('🎉 Premio ganado:', winner)
}

const onSpinStart = () => {
  totalSpins.value++
  console.log('🎯 Iniciando giro #', totalSpins.value)
}

const onSpinEnd = (winner) => {
  spinTimes.value.push(4000) // Fixed animation duration
  if (spinTimes.value.length > 10) {
    spinTimes.value = spinTimes.value.slice(-10) // Keep only last 10
  }
  
  console.log('✅ Giro completado, ganador:', winner.name)
}

// Utility functions
const resetWheel = () => {
  if (wheelRef.value) {
    wheelRef.value.resetWheel()
  }
  totalSpins.value = 0
  winHistory.value = []
  lastWinner.value = null
  spinTimes.value = []
}

const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(timestamp)
}

// Load configuration on mount
onMounted(() => {
  loadWheelConfig()
})

// Meta tags for the page
useHead({
  title: 'Ruleta de Premios Moderna - Backend',
  meta: [
    { name: 'description', content: 'Ruleta de premios conectada al backend con configuración dinámica' }
  ]
})
</script>

<style scoped>
/* Custom slider styles */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #8b5cf6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #8b5cf6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style>
