<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Admin Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Admin Logo -->
          <div class="flex items-center">
            <NuxtLink to="/admin" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">Admin Panel</span>
              <span class="text-lg font-bold text-gray-900 dark:text-white sm:hidden">Admin</span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-8">
            <NuxtLink to="/admin" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Dashboard
            </NuxtLink>
            <NuxtLink to="/admin/config" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Configuración
            </NuxtLink>
            <NuxtLink to="/admin/prizes" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Premios
            </NuxtLink>
            <NuxtLink to="/admin/codes" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              🔥 Códigos Hot
            </NuxtLink>
            <NuxtLink to="/admin/users" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Usuarios
            </NuxtLink>
          </nav>

          <!-- Desktop User Menu -->
          <div class="hidden md:flex items-center space-x-4">
            <NuxtLink to="/wheel" class="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Ver Ruleta
            </NuxtLink>
            <div v-if="user" class="flex items-center space-x-2">
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ user.email }}</span>
              <button @click="handleLogout" class="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200">
                Salir
              </button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span class="sr-only">Abrir menú principal</span>
              <!-- Hamburger icon -->
              <svg v-if="!mobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Close icon -->
              <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <!-- Mobile Navigation Links -->
          <NuxtLink 
            to="/admin" 
            @click="mobileMenuOpen = false"
            class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            📊 Dashboard
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/config" 
            @click="mobileMenuOpen = false"
            class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            ⚙️ Configuración
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/prizes" 
            @click="mobileMenuOpen = false"
            class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            🏆 Gestionar Premios
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/codes" 
            @click="mobileMenuOpen = false"
            class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            🔥 Códigos Hot
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/users" 
            @click="mobileMenuOpen = false"
            class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            👥 Usuarios
          </NuxtLink>

          <!-- Mobile User Menu -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
            <div v-if="user" class="flex items-center px-3">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800 dark:text-white">{{ user.email }}</div>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-400">Administrador</div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              <NuxtLink 
                to="/wheel" 
                @click="mobileMenuOpen = false"
                class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                🎯 Ver Ruleta
              </NuxtLink>
              <button 
                @click="handleLogout" 
                class="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Admin Content -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { user, logout } = useAuth()

// Mobile menu state
const mobileMenuOpen = ref(false)

// Ensure user is loaded on mount
onMounted(async () => {
  if (!user.value) {
    const { checkAuth } = useAuth()
    await checkAuth()
  }
})

const handleLogout = async () => {
  mobileMenuOpen.value = false
  await logout()
}

// Close mobile menu when route changes
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})
</script>
