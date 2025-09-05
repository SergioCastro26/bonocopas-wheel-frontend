<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          🔥 Gestión de Códigos Hot
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Administra los códigos de acceso a la Ruleta Hot
        </p>
      </div>
      <div class="flex space-x-3">
        <button
          @click="openGenerateModal"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Generar Códigos
        </button>
        <button
          @click="openCreateModal"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Código
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Codes List -->
    <div v-else class="space-y-6">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Códigos
                    </dt>
                    <dd class="text-lg font-medium text-gray-900 dark:text-white">
                      {{ codes.length }}
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
                  <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414-1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Códigos Activos
                    </dt>
                    <dd class="text-lg font-medium text-gray-900 dark:text-white">
                      {{ getActiveCodesCount }}
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
                  <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Códigos Usados
                    </dt>
                    <dd class="text-lg font-medium text-gray-900 dark:text-white">
                      {{ getUsedCodesCount }}
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
                  <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-md flex items-center justify-center">
                    <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414-1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Códigos Expirados
                    </dt>
                    <dd class="text-lg font-medium text-gray-900 dark:text-white">
                      {{ getExpiredCodesCount }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

      <!-- Codes Table -->
      <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:p-6">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Código
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Usos
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Usuarios
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Expiración
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
                <tr v-for="code in codes" :key="code._id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="text-sm font-mono font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {{ code.code }}
                      </div>
                      <button
                        @click="copyCode(code.code)"
                        class="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        title="Copiar código"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">
                      {{ code.description || 'Sin descripción' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">
                      {{ code.usedBy.length }} / {{ code.maxUses || '∞' }}
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        :style="{ width: `${Math.min((code.usedBy.length / (code.maxUses || 1)) * 100, 100)}%` }"
                      ></div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div v-if="code.usedBy.length === 0" class="text-gray-500 dark:text-gray-400">
                      Sin uso
                    </div>
                    <div v-else class="space-y-1">
                      <div 
                        v-for="(usage, index) in code.usedBy.slice(0, 2)" 
                        :key="index"
                        class="flex items-center space-x-2"
                      >
                        <div class="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400">
                          {{ getUserEmail(usage.userId).charAt(0).toUpperCase() }}
                        </div>
                        <span class="text-sm text-gray-700 dark:text-gray-300 truncate max-w-32">
                          {{ getUserEmail(usage.userId) }}
                        </span>
                      </div>
                      <div v-if="code.usedBy.length > 2" class="flex items-center space-x-2">
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                          +{{ code.usedBy.length - 2 }} más
                        </span>
                      </div>
                      <button
                        @click="showUsageModal(code)"
                        class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs font-medium mt-1 block"
                      >
                        Ver detalles
                      </button>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ code.expiresAt ? formatDate(code.expiresAt) : 'Nunca' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(code)"
                    >
                      {{ getStatusText(code) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="editCode(code)"
                      class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      @click="deleteCode(code)"
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

    <!-- Create/Edit Code Modal -->
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
            <div class="flex items-center justify-center w-12 h-12 mx-auto bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </div>
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4 text-center">
              {{ isEditing ? 'Editar Código Hot' : 'Crear Nuevo Código Hot' }}
            </h3>
            
            <form @submit.prevent="saveCode" class="space-y-4">
              <div>
                <label for="code" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Código
                </label>
                <input
                  id="code"
                  v-model="currentCode.code"
                  type="text"
                  required
                  :disabled="isEditing"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white sm:text-sm disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  placeholder="Ej: HOT2025"
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {{ isEditing ? 'El código no se puede modificar una vez creado' : 'Código único para acceder a la Ruleta Hot' }}
                </p>
              </div>

              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción (opcional)
                </label>
                <textarea
                  id="description"
                  v-model="currentCode.description"
                  rows="3"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Descripción del código o evento..."
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="maxUses" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Límite de Usos
                  </label>
                  <input
                    id="maxUses"
                    v-model.number="currentCode.maxUses"
                    type="number"
                    min="1"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <label for="expiresAt" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Fecha de Expiración
                  </label>
                  <input
                    id="expiresAt"
                    v-model="currentCode.expiresAt"
                    type="datetime-local"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div class="flex items-center">
                <input
                  id="isActive"
                  v-model="currentCode.isActive"
                  type="checkbox"
                  class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label for="isActive" class="ml-2 block text-sm text-gray-900 dark:text-white">
                  Código activo
                </label>
              </div>

              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  :disabled="isSaving"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-base font-medium text-white hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
                >
                  <span v-if="!isSaving">{{ isEditing ? 'Actualizar' : 'Crear Código' }}</span>
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
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Generate Codes Modal -->
    <div
      v-if="showGenerateModal"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>
        
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div class="flex items-center justify-center w-12 h-12 mx-auto bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4 text-center">
              Generar Códigos Automáticamente
            </h3>
            
            <form @submit.prevent="generateCodes" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="count" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cantidad de Códigos
                  </label>
                  <input
                    id="count"
                    v-model.number="generateForm.count"
                    type="number"
                    min="1"
                    max="100"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <label for="prefix" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Prefijo (opcional)
                  </label>
                  <input
                    id="prefix"
                    v-model="generateForm.prefix"
                    type="text"
                    maxlength="10"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="HOT"
                  />
                </div>
              </div>

              <div>
                <label for="genDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción Base
                </label>
                <input
                  id="genDescription"
                  v-model="generateForm.description"
                  type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Códigos generados automáticamente"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="genMaxUses" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Límite de Usos
                  </label>
                  <input
                    id="genMaxUses"
                    v-model.number="generateForm.maxUses"
                    type="number"
                    min="1"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <label for="genExpiresAt" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Fecha de Expiración
                  </label>
                  <input
                    id="genExpiresAt"
                    v-model="generateForm.expiresAt"
                    type="datetime-local"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-md p-3">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-orange-800 dark:text-orange-200">
                      Se generarán {{ generateForm.count }} códigos únicos con el prefijo "{{ generateForm.prefix || 'Sin prefijo' }}" seguido de caracteres aleatorios.
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  :disabled="isSaving"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-base font-medium text-white hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
                >
                  <span v-if="!isSaving">Generar Códigos</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generando...
                  </span>
                </button>
                <button
                  type="button"
                  @click="closeModal"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage Details Modal -->
    <div
      v-if="showUsageModalState"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeUsageModal"></div>
        
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div>
            <div class="flex items-center justify-center w-12 h-12 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4 text-center">
              Usuarios que utilizaron: {{ selectedCodeUsage?.code }}
            </h3>
            
            <div v-if="selectedCodeUsage" class="max-h-96 overflow-y-auto">
              <div class="space-y-3">
                <div 
                  v-for="(usage, index) in selectedCodeUsage.usedBy" 
                  :key="index"
                  class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4 flex-1">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ getUserEmail(usage.userId) }}
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          {{ formatDate(usage.usedAt) }}
                        </p>
                        <p class="text-xs text-gray-400 dark:text-gray-500">
                          IP: {{ usage.ipAddress }}
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          Usado
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="selectedCodeUsage.usedBy.length === 0" class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4-4-4m0 0V3" />
                </svg>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Este código aún no ha sido utilizado por ningún usuario
                </p>
              </div>
            </div>

            <div class="mt-6 flex justify-center">
              <button
                type="button"
                @click="closeUsageModal"
                class="inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()

// State
const codes = ref([])
const isLoading = ref(true)
const showModal = ref(false)
const showGenerateModal = ref(false)
const isSaving = ref(false)
const isEditing = ref(false)

// Current code being edited
const currentCode = ref({
  code: '',
  description: '',
  maxUses: 1,
  expiresAt: '',
  isActive: true
})

// Generate form
const generateForm = ref({
  count: 10,
  prefix: 'HOT',
  description: 'Códigos generados automáticamente',
  maxUses: 1,
  expiresAt: ''
})

// Pagination
const currentPage = ref(1)
const totalPages = ref(1)
const totalCodes = ref(0)

// Load codes
const loadCodes = async () => {
  try {
    isLoading.value = true
    const response = await $api.get(`/admin/codes?page=${currentPage.value}&limit=10`)
    codes.value = response.data.codes
    totalPages.value = response.data.totalPages
    totalCodes.value = response.data.total
  } catch (error) {
    console.error('Error loading codes:', error)
  } finally {
    isLoading.value = false
  }
}

// Open create modal
const openCreateModal = () => {
  isEditing.value = false
  currentCode.value = {
    code: '',
    description: '',
    maxUses: 1,
    expiresAt: '',
    isActive: true
  }
  showModal.value = true
}

// Open edit modal
const openEditModal = (code) => {
  isEditing.value = true
  currentCode.value = {
    ...code,
    expiresAt: code.expiresAt ? new Date(code.expiresAt).toISOString().slice(0, 16) : ''
  }
  showModal.value = true
}

// Open generate modal
const openGenerateModal = () => {
  generateForm.value = {
    count: 10,
    prefix: 'HOT',
    description: 'Códigos generados automáticamente',
    maxUses: 1,
    expiresAt: ''
  }
  showGenerateModal.value = true
}

// Close modals
const closeModal = () => {
  showModal.value = false
  showGenerateModal.value = false
}

// Save code (create or update)
const saveCode = async () => {
  try {
    isSaving.value = true
    
    const codeData = {
      ...currentCode.value,
      expiresAt: currentCode.value.expiresAt ? new Date(currentCode.value.expiresAt).toISOString() : null
    }

    if (isEditing.value) {
      await $api.put(`/admin/codes/${currentCode.value._id}`, codeData)
    } else {
      await $api.post('/admin/codes', codeData)
    }

    closeModal()
    await loadCodes()
  } catch (error) {
    console.error('Error saving code:', error)
    alert('Error al guardar el código')
  } finally {
    isSaving.value = false
  }
}

// Generate codes
const generateCodes = async () => {
  try {
    isSaving.value = true
    
    const generateData = {
      ...generateForm.value,
      expiresAt: generateForm.value.expiresAt ? new Date(generateForm.value.expiresAt).toISOString() : null
    }

    await $api.post('/admin/codes/generate', generateData)
    
    closeModal()
    await loadCodes()
  } catch (error) {
    console.error('Error generating codes:', error)
    alert('Error al generar códigos')
  } finally {
    isSaving.value = false
  }
}

// Copy code to clipboard
const copyCode = async (codeText) => {
  try {
    await navigator.clipboard.writeText(codeText)
    // You could add a toast notification here instead of alert
    alert(`Código "${codeText}" copiado al portapapeles`)
  } catch (error) {
    console.error('Error copying to clipboard:', error)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = codeText
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert(`Código "${codeText}" copiado al portapapeles`)
  }
}

// Edit code
const editCode = (code) => {
  openEditModal(code)
}

// Delete code
const deleteCode = async (code) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este código?')) {
    return
  }

  try {
    await $api.delete(`/admin/codes/${code._id}`)
    await loadCodes()
  } catch (error) {
    console.error('Error deleting code:', error)
    alert('Error al eliminar el código')
  }
}

// Toggle code status
const toggleCodeStatus = async (code) => {
  try {
    await $api.put(`/admin/codes/${code._id}`, {
      ...code,
      isActive: !code.isActive
    })
    await loadCodes()
  } catch (error) {
    console.error('Error updating code status:', error)
    alert('Error al actualizar el estado del código')
  }
}

// Format date
const formatDate = (date) => {
  if (!date) return 'Sin fecha'
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Check if code is expired
const isExpired = (expiresAt) => {
  if (!expiresAt) return false
  return new Date(expiresAt) < new Date()
}

// Check if code has reached max uses
const isMaxUsed = (code) => {
  return code.usedBy.length >= code.maxUses
}

// Get status text
const getStatusText = (code) => {
  if (!code.isActive) return 'Inactivo'
  if (isExpired(code.expiresAt)) return 'Expirado'
  if (isMaxUsed(code)) return 'Agotado'
  if (code.usedBy.length > 0) return 'En uso'
  return 'Disponible'
}

// Get status CSS classes
const getStatusClass = (code) => {
  if (!code.isActive) {
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
  if (isExpired(code.expiresAt)) {
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  }
  if (isMaxUsed(code)) {
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
  }
  if (code.usedBy.length > 0) {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
  }
  return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
}

// Computed statistics
const getActiveCodesCount = computed(() => {
  return codes.value.filter(code => 
    code.isActive && 
    !isExpired(code.expiresAt) && 
    !isMaxUsed(code)
  ).length
})

const getUsedCodesCount = computed(() => {
  return codes.value.filter(code => code.usedBy.length > 0).length
})

const getExpiredCodesCount = computed(() => {
  return codes.value.filter(code => 
    isExpired(code.expiresAt) || !code.isActive || isMaxUsed(code)
  ).length
})

// User management
const users = ref([])
const showUsageModalState = ref(false)
const selectedCodeUsage = ref(null)

// Load users for email lookup
const loadUsers = async () => {
  try {
    const response = await $api.get('/admin/users')
    users.value = response.data.users
  } catch (error) {
    console.error('Error loading users:', error)
  }
}

// Get user email by ID
const getUserEmail = (userId) => {
  const user = users.value.find(u => u._id === userId)
  return user ? user.email : 'Usuario desconocido'
}

// Show usage modal
const showUsageModal = (code) => {
  selectedCodeUsage.value = code
  showUsageModalState.value = true
}

// Close usage modal
const closeUsageModal = () => {
  showUsageModalState.value = false
  selectedCodeUsage.value = null
}

onMounted(() => {
  loadCodes()
  loadUsers()
})

// Page meta
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
</script>