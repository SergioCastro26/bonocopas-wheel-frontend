<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          📜 Historial de Premios
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Revisa todos los premios que has ganado
        </p>
      </div>
      <NuxtLink 
        to="/wheel" 
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a la Ruleta
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!spins.length" class="text-center py-12">
      <div class="mx-auto h-24 w-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No hay premios aún
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-6">
        ¡Ve a la ruleta y gira para ganar tu primer premio!
      </p>
      <NuxtLink 
        to="/wheel" 
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        🎯 Ir a la Ruleta
      </NuxtLink>
    </div>

    <!-- Spins List -->
    <div v-else class="space-y-6">
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total de Giros
                  </dt>
                  <dd class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ pagination.totalSpins }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Premios Reclamados
                  </dt>
                  <dd class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ claimedCount }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Pendientes
                  </dt>
                  <dd class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ pendingCount }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Spins Cards -->
      <div class="grid gap-6">
        <div
          v-for="spin in spins"
          :key="spin.id"
          class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4"
          :class="spin.claimed ? 'border-green-400' : 'border-yellow-400'"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div 
                  class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  :class="spin.claimed ? 'bg-green-500' : 'bg-yellow-500'"
                >
                  {{ spin.claimed ? '✓' : '⏳' }}
                </div>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ spin.prize.name }}
                </h3>
                <p v-if="spin.prize.description" class="text-sm text-gray-500 dark:text-gray-400">
                  {{ spin.prize.description }}
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {{ formatDate(spin.date) }}
                </p>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="spin.claimed 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'"
              >
                {{ spin.claimed ? 'Reclamado' : 'Pendiente' }}
              </span>
              
              <button
                v-if="!spin.claimed"
                @click="claimPrize(spin)"
                :disabled="isClaimingPrize === spin.id"
                class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
              >
                <span v-if="isClaimingPrize !== spin.id">Reclamar</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  ...
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 rounded-lg">
        <div class="flex flex-1 justify-between sm:hidden">
          <button
            @click="loadPage(pagination.currentPage - 1)"
            :disabled="!pagination.hasPrevPage"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            @click="loadPage(pagination.currentPage + 1)"
            :disabled="!pagination.hasNextPage"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Mostrando
              <span class="font-medium">{{ (pagination.currentPage - 1) * 10 + 1 }}</span>
              a
              <span class="font-medium">{{ Math.min(pagination.currentPage * 10, pagination.totalSpins) }}</span>
              de
              <span class="font-medium">{{ pagination.totalSpins }}</span>
              resultados
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="loadPage(pagination.currentPage - 1)"
                :disabled="!pagination.hasPrevPage"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ pagination.currentPage }} / {{ pagination.totalPages }}
              </span>
              <button
                @click="loadPage(pagination.currentPage + 1)"
                :disabled="!pagination.hasNextPage"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()
const { checkAuth } = useAuth()

// State
const spins = ref([])
const pagination = ref({})
const isLoading = ref(true)
const isClaimingPrize = ref(null)

// Computed
const claimedCount = computed(() => spins.value.filter(spin => spin.claimed).length)
const pendingCount = computed(() => spins.value.filter(spin => !spin.claimed).length)

// Methods
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadSpinHistory = async (page = 1) => {
  try {
    isLoading.value = true
    const response = await $api.get(`/spin/history?page=${page}&limit=10`, {
      withCredentials: true
    })
    
    spins.value = response.data.spins
    pagination.value = response.data.pagination
  } catch (error) {
    console.error('Error loading spin history:', error)
    if (error.response?.status === 401) {
      await navigateTo('/login')
    }
  } finally {
    isLoading.value = false
  }
}

const loadPage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    loadSpinHistory(page)
  }
}

const claimPrize = async (spin) => {
  try {
    isClaimingPrize.value = spin.id
    
    await $api.put(`/spin/${spin.id}/claim`, {}, {
      withCredentials: true
    })
    
    // Update local state
    const index = spins.value.findIndex(s => s.id === spin.id)
    if (index !== -1) {
      spins.value[index].claimed = true
    }
    
  } catch (error) {
    console.error('Error claiming prize:', error)
    alert(error.response?.data?.message || 'Error al reclamar el premio')
  } finally {
    isClaimingPrize.value = null
  }
}

// Lifecycle
onMounted(async () => {
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) {
    await navigateTo('/login')
    return
  }
  
  await loadSpinHistory()
})

// Page meta
definePageMeta({
  middleware: 'auth'
})
</script>
