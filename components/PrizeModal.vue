<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Background overlay -->
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        class="fixed inset-0 bg-gradient-to-br from-cyan-900/80 via-orange-900/80 to-pink-900/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        @click="closeModal"
      ></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-gradient-to-br from-white via-orange-50 to-cyan-50 rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 animate-bounce-in border-2 border-orange-200/50">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-cyan-100 to-orange-100 border-2 border-orange-300 sm:mx-0 sm:h-10 sm:w-10">
            <svg class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-orange-800" id="modal-title">
              🎉 ¡Felicitaciones!
            </h3>
            <div class="mt-2">
              <p class="text-sm text-orange-600">
                Has ganado:
              </p>
              <div class="mt-4 p-4 bg-gradient-to-r from-cyan-100 to-orange-100 rounded-lg border border-orange-300">
                <h4 class="text-xl font-bold text-orange-800 mb-2">
                  {{ prize?.name }}
                </h4>
                <p v-if="prize?.description" class="text-orange-700">
                  {{ prize.description }}
                </p>
              </div>
              
              <!-- Prize claim instructions -->
              <div class="mt-4 p-4 bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg border border-orange-300">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="w-5 h-5 text-orange-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h5 class="text-sm font-semibold text-orange-800">
                      ⏰ Instrucciones importantes
                    </h5>
                    <p class="text-sm text-orange-700 mt-1">
                      Para reclamar tu premio debes ir a la opción <strong>'Ver Mis Premios'</strong>. 
                      Tienes <strong>1 hora</strong> para reclamarlo ante el encargado de barra.
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 text-xs text-orange-600">
                <p>Fecha: {{ formatDate(spin?.date) }}</p>
                <p>Expira: {{ formatDate(spin?.expiresAt) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-cyan-500 to-orange-500 text-base font-medium text-white hover:from-cyan-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
            @click="goToPrizes"
          >
            🏆 Ver Mis Premios
          </button>
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-orange-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-orange-700 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"
            @click="closeModal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  spin: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'prize-claimed'])

const isClaimingPrize = ref(false)

const prize = computed(() => props.spin?.prize)

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const closeModal = () => {
  emit('close')
}

const goToPrizes = () => {
  closeModal()
  navigateTo('/history')
}

// Close modal on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>
