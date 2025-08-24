<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Generar Código QR</h3>
      <button
        @click="generateQR"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        🔗 Generar QR
      </button>
    </div>

    <div v-if="showQR" class="space-y-4">
      <!-- QR Code Display -->
      <div class="flex justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div ref="qrContainer" class="bg-white p-4 rounded-lg shadow-sm">
          <QRCodeVue3
            :width="200"
            :height="200"
            :value="qrUrl"
            :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
            :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
            :dotsOptions="{
              type: 'rounded',
              color: '#1f2937'
            }"
            :backgroundOptions="{ color: '#ffffff' }"
            :cornersSquareOptions="{ type: 'extra-rounded', color: '#1f2937' }"
            :cornersDotOptions="{ type: 'dot', color: '#1f2937' }"
          />
        </div>
      </div>

      <!-- QR Info -->
      <div class="text-center space-y-2">
        <p class="text-sm text-gray-600 dark:text-gray-300">
          URL del QR: <span class="font-mono text-blue-600 dark:text-blue-400">{{ qrUrl }}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Escanea este código para acceder directamente a la ruleta
        </p>
      </div>

      <!-- Download Button -->
      <div class="flex justify-center space-x-3">
        <button
          @click="downloadQR"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Descargar QR</span>
        </button>
        <button
          @click="copyUrl"
          class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copiar URL</span>
        </button>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="notification.show" class="fixed top-4 right-4 z-50 max-w-sm">
      <div class="p-4 rounded-lg shadow-lg border-l-4 bg-green-50 border-green-500 text-green-800 transform transition-all duration-300">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <span class="text-green-500 text-xl">✅</span>
          </div>
          <div class="ml-3 flex-1">
            <p class="font-medium">{{ notification.message }}</p>
          </div>
          <button 
            @click="hideNotification"
            class="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import QRCodeVue3 from 'qrcode-vue3'

// State
const showQR = ref(false)
const qrContainer = ref(null)
const notification = ref({
  show: false,
  message: ''
})

// Get current domain for QR URL
const { $config } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()

const qrUrl = computed(() => {
  if (process.client) {
    return `${window.location.origin}/play`
  }
  return 'https://bonocopas.com/play' // Fallback URL
})

// Methods
const generateQR = () => {
  showQR.value = true
  showNotification('Código QR generado correctamente')
}

const downloadQR = async () => {
  try {
    // Get the QR code canvas element
    const canvas = qrContainer.value?.querySelector('canvas')
    if (!canvas) {
      throw new Error('No se pudo encontrar el código QR')
    }

    // Create download link
    const link = document.createElement('a')
    link.download = `bonocopas-qr-${new Date().getTime()}.png`
    link.href = canvas.toDataURL('image/png')
    
    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    showNotification('Código QR descargado correctamente')
  } catch (error) {
    console.error('Error downloading QR:', error)
    showNotification('Error al descargar el código QR')
  }
}

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(qrUrl.value)
    showNotification('URL copiada al portapapeles')
  } catch (error) {
    console.error('Error copying URL:', error)
    showNotification('Error al copiar la URL')
  }
}

const showNotification = (message) => {
  notification.value = {
    show: true,
    message
  }
  
  setTimeout(() => {
    hideNotification()
  }, 3000)
}

const hideNotification = () => {
  notification.value.show = false
}
</script>
