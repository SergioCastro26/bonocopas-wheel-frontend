<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          🎯 BonoCopas Wheel
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          ¡Gira la ruleta y gana increíbles premios!
        </p>
      </div>

      <!-- Auth Check -->
      <div v-if="!user" class="max-w-md mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Iniciar Sesión
          </h2>
          <form @submit.prevent="login" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                v-model="email"
                type="email"
                id="email"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="tu@email.com"
              />
            </div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <span v-if="!isLoading">Entrar</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            </button>
          </form>
        </div>
      </div>

      <!-- Wheel Game -->
      <div v-else>
        <WheelSpinner @prize-won="onPrizeWon" />
        <PrizeModal 
          v-if="showPrizeModal" 
          :spin="wonSpin" 
          @close="showPrizeModal = false"
          @claim="onPrizeClaim"
        />
      </div>

      <!-- Quick Actions -->
      <div v-if="user" class="mt-8 text-center">
        <NuxtLink 
          to="/history" 
          class="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors mr-4"
        >
          📋 Ver Historial
        </NuxtLink>
        <button
          @click="logout"
          class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
        >
          🚪 Salir
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO
useHead({
  title: 'Jugar - BonoCopas Wheel',
  meta: [
    { name: 'description', content: 'Gira la ruleta de BonoCopas y gana increíbles premios. ¡Entra y juega ahora!' }
  ]
})

// Composables
const { user, login: authLogin, logout: authLogout } = useAuth()

// State
const email = ref('')
const isLoading = ref(false)
const showPrizeModal = ref(false)
const wonSpin = ref(null)

// Methods
const login = async () => {
  if (!email.value) return
  
  isLoading.value = true
  try {
    await authLogin(email.value)
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}

const logout = async () => {
  try {
    await authLogout()
    await navigateTo('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

const onPrizeWon = (spin) => {
  wonSpin.value = spin
  showPrizeModal.value = true
}

const onPrizeClaim = () => {
  showPrizeModal.value = false
  // Refresh user data or show success message
}

// Auto-focus email input on mount
onMounted(() => {
  if (!user.value) {
    nextTick(() => {
      const emailInput = document.getElementById('email')
      if (emailInput) {
        emailInput.focus()
      }
    })
  }
})
</script>
