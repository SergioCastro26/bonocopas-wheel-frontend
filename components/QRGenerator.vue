<template>
  <div class="bg-gradient-to-br from-gray-900 via-purple-900 to-black rounded-lg shadow-2xl p-6 border border-purple-500/30">
    <!-- Glow effect -->
    <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-600/20 blur-xl -z-10"></div>
    
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-white flex items-center">
        <svg class="w-6 h-6 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4z"/>
          <path d="M15 15h2v2h-2zM17 17h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z"/>
        </svg>
        Generar Código QR
      </h3>
      <button
        @click="generateQR"
        class="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg border border-purple-400/30"
        style="box-shadow: 0 0 20px rgba(157, 78, 221, 0.4);"
      >
        <span class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4z"/>
          </svg>
          Generar QR
        </span>
      </button>
    </div>

    <div v-if="showQR" class="space-y-6">
      <!-- QR Code Display -->
      <div class="flex justify-center p-8 bg-gradient-to-br from-black via-purple-950 to-gray-900 rounded-xl border border-purple-500/30 relative overflow-hidden">
        <!-- Background glow effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-700/10 animate-pulse"></div>
        
        <div ref="qrContainer" class="relative z-10 bg-white p-6 rounded-xl shadow-2xl border-2 border-orange-400/50" style="box-shadow: 0 0 30px rgba(255, 140, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.1);">
          <div 
            ref="qrCanvas"
            class="rounded-lg flex items-center justify-center"
            style="width: 250px; height: 250px;"
          ></div>
        </div>
      </div>

      <!-- QR Info -->
      <div class="text-center space-y-3 bg-gray-900/50 rounded-lg p-4 border border-purple-500/20">
        <p class="text-sm text-gray-300">
          URL del QR: <span class="font-mono text-purple-400 bg-black/30 px-2 py-1 rounded">{{ qrUrl }}</span>
        </p>
        <p class="text-xs text-gray-400">
          Escanea este código para acceder directamente a la ruleta
        </p>
      </div>

      <!-- Download Button -->
      <div class="flex justify-center space-x-4">
        <button
          @click="downloadQR"
          class="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg border border-green-400/30"
          style="box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Descargar QR</span>
        </button>
        <button
          @click="copyUrl"
          class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg border border-purple-400/30"
          style="box-shadow: 0 0 15px rgba(157, 78, 221, 0.4);"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copiar URL</span>
        </button>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="notification.show" class="fixed top-4 right-4 z-50 max-w-sm">
      <div class="p-4 rounded-lg shadow-lg border-l-4 bg-purple-900/90 border-purple-400 text-white transform transition-all duration-300 backdrop-blur-sm">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <span class="text-purple-300 text-xl">✅</span>
          </div>
          <div class="ml-3 flex-1">
            <p class="font-medium text-white">{{ notification.message }}</p>
          </div>
          <button 
            @click="hideNotification"
            class="ml-4 text-gray-300 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

// State
const showQR = ref(false)
const qrContainer = ref(null)
const qrCanvas = ref(null)
const notification = ref({
  show: false,
  message: ''
})

// QR generation library - using qr-code-styling
let QRCodeStyling = null

// Get current domain for QR URL
const { $config } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()

const qrUrl = computed(() => {
  if (process.client) {
    return `${window.location.origin}/login`
  }
  return 'https://bonocopas.com/play' // Fallback URL
})

// Load QR-Code-Styling library dynamically
const loadQRCodeLibrary = async () => {
  if (!QRCodeStyling && process.client) {
    const { default: QRCodeStylingLib } = await import('qr-code-styling')
    QRCodeStyling = QRCodeStylingLib
  }
}

// Methods
const generateQR = async () => {
  try {
    await loadQRCodeLibrary()
    showQR.value = true
    
    // Wait for DOM to update
    await nextTick()
    
    if (qrCanvas.value && QRCodeStyling) {
      // Clear previous QR code
      qrCanvas.value.innerHTML = ''
      
      // Create QR code with warm orange Barceló colors
      const qrCode = new QRCodeStyling({
        width: 250,
        height: 250,
        type: "svg", // Changed to SVG for better visibility
        data: qrUrl.value,
        image: "https://res.cloudinary.com/dphpfdsk3/image/upload/v1756323180/ZonaBarcelo_LogoNaranja_diwkgq.png",
        dotsOptions: {
          color: "#FF8C00", // Dark orange
          type: "extra-rounded",
          gradient: {
            type: "radial",
            rotation: 0,
            colorStops: [
              { offset: 0, color: "#FF8C00" }, // Dark orange
              { offset: 1, color: "#FF6347" }  // Tomato orange
            ]
          }
        },
        backgroundOptions: {
          color: "#FFFFFF", // White background for better contrast
        },
        cornersSquareOptions: {
          color: "#D2691E", // Chocolate orange
          type: "extra-rounded",
          gradient: {
            type: "linear",
            rotation: 45,
            colorStops: [
              { offset: 0, color: "#D2691E" }, // Chocolate
              { offset: 1, color: "#FF8C00" }  // Dark orange
            ]
          }
        },
        cornersDotOptions: {
          color: "#8B4513", // Saddle brown
          type: "dot"
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 8,
          imageSize: 0.3,
          hideBackgroundDots: true
        },
        qrOptions: {
          typeNumber: 0,
          mode: "Byte",
          errorCorrectionLevel: "H"
        }
      })
      
      // Append to container
      qrCode.append(qrCanvas.value)
      
      // Store reference for download
      qrCanvas.value._qrCode = qrCode
    }
    
    showNotification('Código QR generado correctamente')
  } catch (error) {
    console.error('Error generating QR:', error)
    showNotification('Error al generar el código QR')
  }
}


const downloadQR = async () => {
  try {
    const canvas = qrCanvas.value
    
    if (!canvas || !canvas._qrCode) {
      throw new Error('QR Code no encontrado')
    }

    // Use the QR-Code-Styling download method
    canvas._qrCode.download({
      name: `bonocopas-qr-${new Date().getTime()}`,
      extension: "png"
    })
    
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
