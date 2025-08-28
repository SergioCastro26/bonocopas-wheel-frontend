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
              <span class="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</span>
            </NuxtLink>
          </div>

          <!-- Admin Navigation -->
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
            <NuxtLink to="/admin/users" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Usuarios
            </NuxtLink>
          </nav>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
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

// Ensure user is loaded on mount
onMounted(async () => {
  if (!user.value) {
    const { checkAuth } = useAuth()
    await checkAuth()
  }
})

const handleLogout = async () => {
  await logout()
}
</script>
