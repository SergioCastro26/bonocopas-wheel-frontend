<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Accede a la Ruleta de la Fiesta de Zona Barceló
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Ingresa tu correo electrónico y número de celular para comenzar a girar la ruleta
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email" class="sr-only">Correo electrónico</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Correo electrónico"
              :disabled="isLoading"
            />
          </div>
          
          <div>
            <label for="phone" class="sr-only">Número de celular</label>
            <input
              id="phone"
              v-model="phone"
              name="phone"
              type="tel"
              autocomplete="tel"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Número de celular (ej: 611 57 78 98)"
              :disabled="isLoading"
              @input="validatePhone"
            />
            <p v-if="phoneError" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ phoneError }}</p>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700 dark:text-red-400">{{ error }}</p>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading || !email || !phone || !!phoneError"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span v-if="!isLoading">Ingresar</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Ingresando...
            </span>
          </button>
        </div>
      </form>

      <div class="text-center">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Al ingresar, aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { login, isLoading } = useAuth()
const email = ref('')
const phone = ref('')
const error = ref('')
const phoneError = ref('')

// Redirect if already logged in
const { user } = useAuth()
onMounted(async () => {
  if (user.value) {
    // Redirect based on user role
    if (user.value.role === 'admin') {
      await navigateTo('/admin', { replace: true })
    } else {
      await navigateTo('/wheel', { replace: true })
    }
  }
})

// Phone validation function
const validatePhone = () => {
  phoneError.value = ''
  
  if (!phone.value) {
    phoneError.value = ''
    return
  }
  
  // Remove all non-digits
  const cleanPhone = phone.value.replace(/\D/g, '')
  
  if (cleanPhone.length < 9) {
    phoneError.value = 'El número debe tener al menos 9 dígitos'
  } else if (cleanPhone.length > 15) {
    phoneError.value = 'El número no puede tener más de 15 dígitos'
  } else {
    phoneError.value = ''
  }
}

const handleLogin = async () => {
  error.value = ''
  phoneError.value = ''
  
  if (!email.value) {
    error.value = 'Por favor ingresa tu correo electrónico'
    return
  }
  
  if (!phone.value) {
    error.value = 'Por favor ingresa tu número de celular'
    return
  }
  
  // Validate phone before sending
  const cleanPhone = phone.value.replace(/\D/g, '')
  if (cleanPhone.length < 9) {
    phoneError.value = 'El número debe tener al menos 9 dígitos'
    return
  }

  try {
    const result = await login(email.value, phone.value)
    
    if (result.success) {
      console.log('Login successful, user role:', result.user.role)
      // Use nextTick to ensure state is updated before navigation
      await nextTick()
      
      if (result.user.role === 'admin') {
        await navigateTo('/admin', { replace: true, external: false })
      } else {
        await navigateTo('/wheel', { replace: true, external: false })
      }
    } else {
      error.value = result.error
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'Error durante el login'
  }
}

// Set page meta
definePageMeta({
  layout: false
})
</script>
