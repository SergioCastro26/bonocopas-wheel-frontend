<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        🎛️ Panel de Administración
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Gestiona la configuración, premios y usuarios de Zona Barceló
      </p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Total Usuarios
                </dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ stats.totalUsers || 0 }}
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Premios Activos
                </dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ stats.activePrizes || 0 }}
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Total Giros
                </dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ stats.totalSpins || 0 }}
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
              <div 
                class="h-6 w-6 rounded-full"
                :class="config?.isActive ? 'bg-green-400' : 'bg-red-400'"
              ></div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Estado Ruleta
                </dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ config?.isActive ? 'Activa' : 'Inactiva' }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <NuxtLink 
        to="/admin/config" 
        class="group relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
      >
        <div>
          <span class="rounded-lg inline-flex p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ring-4 ring-white dark:ring-gray-800">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
        </div>
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
            <span class="absolute inset-0" aria-hidden="true"></span>
            Configuración
          </h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Ajustar configuración de la ruleta
          </p>
        </div>
      </NuxtLink>
      <NuxtLink 
        to="/admin/prizes" 
        class="group relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
      >
        <div>
          <span class="rounded-lg inline-flex p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 ring-4 ring-white dark:ring-gray-800">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </span>
        </div>
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
            <span class="absolute inset-0" aria-hidden="true"></span>
            Gestionar Premios
          </h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Crear, editar y eliminar premios de la ruleta
          </p>
        </div>
        <span class="pointer-events-none absolute top-6 right-6 text-gray-300 dark:text-gray-600 group-hover:text-purple-400" aria-hidden="true">
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </NuxtLink>

      <NuxtLink 
        to="/admin/users" 
        class="group relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
      >
        <div>
          <span class="rounded-lg inline-flex p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 ring-4 ring-white dark:ring-gray-800">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </span>
        </div>
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
            <span class="absolute inset-0" aria-hidden="true"></span>
            Gestionar Usuarios
          </h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Ver usuarios y sus actividades
          </p>
        </div>
      </NuxtLink>

      <!-- QR Generator Card -->
      <div class="group relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <div>
          <span class="rounded-lg inline-flex p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 ring-4 ring-white dark:ring-gray-800">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </span>
        </div>
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
            Código QR
          </h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Generar QR para acceso directo
          </p>
        </div>
      </div>
    </div>

    <!-- QR Generator Component -->
    <div class="mt-8">
      <QRGenerator />
    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()

// State
const stats = ref({})
const config = ref(null)

// Load dashboard data
const loadDashboardData = async () => {
  try {
    // Initialize stats with default values
    stats.value = {
      totalUsers: 0,
      activePrizes: 0,
      totalSpins: 0
    }

    // Load config
    try {
      const configResponse = await $api.get('/admin/config', {
        withCredentials: true
      })
      config.value = configResponse.data?.config || null
    } catch (configError) {
      console.error('Error loading config:', configError)
      config.value = null
    }

    // Load users stats
    try {
      const usersResponse = await $api.get('/admin/users?limit=1', {
        withCredentials: true
      })
      stats.value.totalUsers = usersResponse.data?.total || 0
    } catch (usersError) {
      console.error('Error loading users stats:', usersError)
      stats.value.totalUsers = 0
    }

    // Load prizes stats
    try {
      const prizesResponse = await $api.get('/admin/prizes', {
        withCredentials: true
      })
      const prizes = prizesResponse.data?.prizes || []
      stats.value.activePrizes = prizes.filter(p => p?.isActive).length
    } catch (prizesError) {
      console.error('Error loading prizes stats:', prizesError)
      stats.value.activePrizes = 0
    }

    // You could add more stats here
    stats.value.totalSpins = 0 // This would need a separate endpoint
    
  } catch (error) {
    console.error('Error loading dashboard data:', error)
    // Ensure stats has default values even on error
    stats.value = {
      totalUsers: 0,
      activePrizes: 0,
      totalSpins: 0
    }
  }
}

onMounted(() => {
  loadDashboardData()
})

// Page meta
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
</script>
