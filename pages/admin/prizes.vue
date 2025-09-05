<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          🏆 Gestión de Premios
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Administra los premios de la ruleta
        </p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nuevo Premio
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Prizes List -->
    <div v-else class="space-y-6">
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Premios
                  </dt>
                  <dd class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ prizes.length }}
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
                    Premios Activos
                  </dt>
                  <dd class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ activePrizes }}
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Stock Total
                  </dt>
                  <dd class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ totalStock }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Prizes Table -->
      <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:p-6">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Premio
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Probabilidad
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Stock
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="prize in prizes" :key="prize._id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ prize.name }}
                      </div>
                      <div v-if="prize.description" class="text-sm text-gray-500 dark:text-gray-400">
                        {{ prize.description }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="(prize.type || 'normal') === 'hot' 
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'"
                    >
                      {{ (prize.type || 'normal') === 'hot' ? '🔥 Hot' : '🎯 Normal' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="text-sm text-gray-900 dark:text-white">{{ prize.probability }}%</div>
                      <div class="ml-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          class="bg-blue-600 h-2 rounded-full" 
                          :style="{ width: `${Math.min(prize.probability, 100)}%` }"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ prize.stock }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="prize.isActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
                    >
                      {{ prize.isActive ? 'Activo' : 'Inactivo' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="editPrize(prize)"
                      class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      @click="deletePrize(prize)"
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Prize Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>
        
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              {{ isEditing ? 'Editar Premio' : 'Crear Nuevo Premio' }}
            </h3>
            
            <form @submit.prevent="savePrize" class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre del Premio
                </label>
                <input
                  id="name"
                  v-model="currentPrize.name"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción (opcional)
                </label>
                <textarea
                  id="description"
                  v-model="currentPrize.description"
                  rows="3"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                ></textarea>
              </div>

              <div>
                <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tipo de Premio
                </label>
                <select
                  id="type"
                  v-model="currentPrize.type"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="normal">🎯 Ruleta Normal</option>
                  <option value="hot">🔥 Ruleta Hot</option>
                </select>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Los premios Hot solo aparecen en la Ruleta Hot exclusiva
                </p>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="probability" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Probabilidad (%)
                  </label>
                  <input
                    id="probability"
                    v-model.number="currentPrize.probability"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <label for="stock" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stock
                  </label>
                  <input
                    id="stock"
                    v-model.number="currentPrize.stock"
                    type="number"
                    min="0"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div class="flex items-center">
                <input
                  id="isActive"
                  v-model="currentPrize.isActive"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="isActive" class="ml-2 block text-sm text-gray-900 dark:text-white">
                  Premio activo
                </label>
              </div>

              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  :disabled="isSaving"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
                >
                  <span v-if="!isSaving">{{ isEditing ? 'Actualizar' : 'Crear' }}</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isEditing ? 'Actualizando...' : 'Creando...' }}
                  </span>
                </button>
                <button
                  type="button"
                  @click="closeModal"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()

// State
const prizes = ref([])
const isLoading = ref(true)
const showModal = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const currentPrize = ref({
  name: '',
  description: '',
  probability: 0,
  stock: 0,
  isActive: true,
  type: 'normal'
})

// Computed
const activePrizes = computed(() => prizes.value.filter(p => p.isActive).length)
const totalStock = computed(() => prizes.value.reduce((sum, p) => sum + p.stock, 0))

// Methods
const loadPrizes = async () => {
  try {
    isLoading.value = true
    const response = await $api.get('/admin/prizes', {
      withCredentials: true
    })
    prizes.value = response.data.prizes
  } catch (error) {
    console.error('Error loading prizes:', error)
  } finally {
    isLoading.value = false
  }
}

const openCreateModal = () => {
  isEditing.value = false
  currentPrize.value = {
    name: '',
    description: '',
    probability: 0,
    stock: 0,
    isActive: true,
    type: 'normal'
  }
  showModal.value = true
}

const editPrize = (prize) => {
  isEditing.value = true
  currentPrize.value = { ...prize }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  currentPrize.value = {
    name: '',
    description: '',
    probability: 0,
    stock: 0,
    isActive: true,
    type: 'normal'
  }
}

const savePrize = async () => {
  try {
    isSaving.value = true
    
    if (isEditing.value) {
      await $api.put(`/admin/prizes/${currentPrize.value._id}`, currentPrize.value, {
        withCredentials: true
      })
    } else {
      await $api.post('/admin/prizes', currentPrize.value, {
        withCredentials: true
      })
    }
    
    await loadPrizes()
    closeModal()
    
  } catch (error) {
    console.error('Error saving prize:', error)
    alert(error.response?.data?.message || 'Error al guardar el premio')
  } finally {
    isSaving.value = false
  }
}

const deletePrize = async (prize) => {
  if (!confirm(`¿Estás seguro de que quieres eliminar el premio "${prize.name}"?`)) {
    return
  }
  
  try {
    await $api.delete(`/admin/prizes/${prize._id}`, {
      withCredentials: true
    })
    await loadPrizes()
  } catch (error) {
    console.error('Error deleting prize:', error)
    alert(error.response?.data?.message || 'Error al eliminar el premio')
  }
}

onMounted(() => {
  loadPrizes()
})

// Page meta
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
</script>
