<template>
  <div class="flex flex-col items-center space-y-8 p-4">
    <!-- Prize Wheel Container -->
    <div class="relative">
      <!-- Glow Effect Background -->
      <div 
        class="absolute inset-0 rounded-full opacity-60 blur-2xl animate-pulse"
        :style="{ 
          background: `conic-gradient(${glowColors})`,
          transform: 'scale(1.2)'
        }"
      ></div>
      
      <!-- Main Wheel Container -->
      <div class="relative z-10">
        <!-- Wheel SVG -->
        <svg 
          ref="wheelSvg"
          :width="wheelSize" 
          :height="wheelSize" 
          class="drop-shadow-2xl"
          :style="{ transform: `rotate(${currentRotation}deg)` }"
        >
          <!-- Wheel Segments -->
          <g v-for="(segment, index) in wheelSegments" :key="index">
            <!-- Segment Path -->
            <path
              :d="segment.path"
              :fill="segment.color"
              :stroke="strokeColor"
              :stroke-width="strokeWidth"
              class="transition-all duration-300 hover:brightness-110"
            />
            
            <!-- Prize Text -->
            <!-- Prize name with automatic text wrapping and sizing -->
            <foreignObject
              :x="segment.textX - (segment.maxTextWidth / 2)"
              :y="segment.textY - (segment.maxTextHeight / 2)"
              :width="segment.maxTextWidth"
              :height="segment.maxTextHeight"
              :transform="segment.textTransform"
              class="pointer-events-none select-none"
            >
              <div 
                class="flex items-center justify-center h-full text-center px-1"
                :style="{
                  fontSize: segment.fontSize + 'px',
                  fontWeight: '600',
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  lineHeight: segment.needsMultiLine ? '1.0' : '1.1',
                  wordBreak: 'break-word',
                  hyphens: 'auto',
                  overflowWrap: 'break-word',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }"
              >
                <span 
                  v-if="!segment.needsMultiLine"
                  class="block"
                >
                  {{ segment.name }}
                </span>
                <template v-else>
                  <span 
                    v-for="(line, lineIndex) in getTextLines(segment.name, segment.maxTextWidth, segment.fontSize)"
                    :key="lineIndex"
                    class="block leading-tight"
                    :style="{ fontSize: segment.fontSize + 'px' }"
                  >
                    {{ line }}
                  </span>
                </template>
              </div>
            </foreignObject>
          </g>
          
          <!-- Center Circle -->
          <circle
            :cx="wheelSize / 2"
            :cy="wheelSize / 2"
            :r="centerCircleRadius"
            :fill="centerCircleColor"
            :stroke="strokeColor"
            :stroke-width="strokeWidth * 2"
            class="drop-shadow-lg"
          />
          
          <!-- Center Logo/Icon -->
          <text
            :x="wheelSize / 2"
            :y="wheelSize / 2"
            :font-size="centerCircleRadius * 0.6"
            fill="white"
            text-anchor="middle"
            dominant-baseline="middle"
            class="font-bold select-none"
          >
            🎯
          </text>
        </svg>
        
        <!-- Fixed Pointer/Arrow - TOP at 270° -->
        <div 
          class="absolute top-0 left-1/2 transform -translate-x-1/2 z-20"
          :style="{ marginTop: `${pointerOffset}px` }"
        >
          <img 
            src="https://res.cloudinary.com/dphpfdsk3/image/upload/v1757148080/pointer_nghbpx.svg"
            alt="Wheel Pointer"
            class="pointer-events-none select-none"
            :style="{
              width: `${props.wheelSize * 0.12}px`,
              height: `${props.wheelSize * 0.12}px`,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }"
          />
        </div>
      </div>
    </div>

    <!-- Spin Button -->
    <button
      @click="spinWheel"
      :disabled="isSpinning || prizes.length === 0"
      class="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold text-lg rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px] overflow-hidden"
      :class="{ 'animate-pulse': isSpinning }"
    >
      <!-- Button Background Animation -->
      <div class="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      <!-- Button Content -->
      <div class="relative flex items-center justify-center space-x-2">
        <svg 
          v-if="!isSpinning"
          class="w-6 h-6" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
        </svg>
        <div 
          v-else
          class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
        ></div>
        <span>{{ isSpinning ? 'Girando...' : '¡Girar Ruleta!' }}</span>
      </div>
    </button>

  </div>
</template>

<script setup>
import confetti from 'canvas-confetti'

// Props
const props = defineProps({
  prizes: {
    type: Array,
    default: () => [
      { id: 1, name: 'Premio 1', probability: 0.2, color: '#FF6B6B', description: 'Descripción del premio 1' },
      { id: 2, name: 'Premio 2', probability: 0.15, color: '#4ECDC4', description: 'Descripción del premio 2' },
      { id: 3, name: 'Premio 3', probability: 0.25, color: '#45B7D1', description: 'Descripción del premio 3' },
      { id: 4, name: 'Premio 4', probability: 0.1, color: '#96CEB4', description: 'Descripción del premio 4' },
      { id: 5, name: 'Premio 5', probability: 0.15, color: '#FFEAA7', description: 'Descripción del premio 5' },
      { id: 6, name: 'Premio 6', probability: 0.15, color: '#DDA0DD', description: 'Descripción del premio 6' }
    ]
  },
  // Customization props for easy styling adjustments
  wheelSize: {
    type: Number,
    default: 400
  },
  strokeColor: {
    type: String,
    default: '#ffffff'
  },
  strokeWidth: {
    type: Number,
    default: 3
  },
  centerCircleColor: {
    type: String,
    default: '#1f2937'
  },
  animationDuration: {
    type: Number,
    default: 4000 // milliseconds
  },
  minSpins: {
    type: Number,
    default: 3 // minimum number of full rotations
  },
  maxSpins: {
    type: Number,
    default: 6 // maximum number of full rotations
  },
  wheelType: {
    type: String,
    default: 'normal' // 'normal' or 'hot'
  }
})

// Emits
const emit = defineEmits(['winner-selected', 'spin-start', 'spin-end'])

// Reactive state
const wheelSvg = ref(null)
const currentRotation = ref(0)
const isSpinning = ref(false)
const winner = ref(null)
const showWinner = ref(false)
const showAlignmentGuide = ref(false) // Set to true for debugging alignment

// Computed properties for responsive design
const centerCircleRadius = computed(() => props.wheelSize * 0.08)
const textSize = computed(() => Math.max(12, props.wheelSize * 0.03))
const pointerOffset = computed(() => -props.wheelSize * 0.02)

// Generate colors for glow effect
const glowColors = computed(() => {
  if (props.prizes.length === 0) return '#6366f1, #8b5cf6, #ec4899'
  return props.prizes.map(prize => prize.color).join(', ')
})

// Calculate wheel segments with EQUAL sizes (visual independent of probability)
const wheelSegments = computed(() => {
  if (props.prizes.length === 0) return []
  
  const segments = []
  const segmentAngle = 360 / props.prizes.length // Equal segments for all prizes
  let currentAngle = 0
  
  props.prizes.forEach((prize, index) => {
    const startAngle = currentAngle
    const endAngle = currentAngle + segmentAngle
    
    // Calculate segment path (SVG arc)
    const centerX = props.wheelSize / 2
    const centerY = props.wheelSize / 2
    const radius = (props.wheelSize / 2) - (props.strokeWidth * 2) - centerCircleRadius.value
    
    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180
    
    const x1 = centerX + Math.cos(startAngleRad) * centerCircleRadius.value
    const y1 = centerY + Math.sin(startAngleRad) * centerCircleRadius.value
    const x2 = centerX + Math.cos(startAngleRad) * radius
    const y2 = centerY + Math.sin(startAngleRad) * radius
    const x3 = centerX + Math.cos(endAngleRad) * radius
    const y3 = centerY + Math.sin(endAngleRad) * radius
    const x4 = centerX + Math.cos(endAngleRad) * centerCircleRadius.value
    const y4 = centerY + Math.sin(endAngleRad) * centerCircleRadius.value
    
    const largeArcFlag = segmentAngle > 180 ? 1 : 0
    
    const path = [
      `M ${x1} ${y1}`,
      `L ${x2} ${y2}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x3} ${y3}`,
      `L ${x4} ${y4}`,
      `A ${centerCircleRadius.value} ${centerCircleRadius.value} 0 ${largeArcFlag} 0 ${x1} ${y1}`,
      'Z'
    ].join(' ')
    
    // Calculate text position (middle of segment) - constrained to segment boundaries
    const midAngle = (startAngle + endAngle) / 2
    const midAngleRad = (midAngle * Math.PI) / 180
    const textRadius = centerCircleRadius.value + (radius - centerCircleRadius.value) * 0.5
    const textX = centerX + Math.cos(midAngleRad) * textRadius
    const textY = centerY + Math.sin(midAngleRad) * textRadius
    const textTransform = `rotate(${midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle}, ${textX}, ${textY})`
    
    // Calculate precise segment boundaries for text containment
    const segmentRadialWidth = radius - centerCircleRadius.value
    const segmentArcWidth = 2 * Math.sin((segmentAngle * Math.PI) / 360) * textRadius
    
    // Conservative text area that stays within segment color boundaries
    const availableWidth = Math.min(
      segmentRadialWidth * 0.7, // Conservative radial space to stay within boundaries
      segmentArcWidth * 0.8 // Conservative arc space to prevent overflow
    )
    const availableHeight = segmentRadialWidth * 0.6 // Conservative height for multi-line support
    
    // Smart font sizing for multi-line text support
    const textLength = prize.name.length
    const wordsCount = prize.name.split(' ').length
    
    // Base font size calculation considering multi-line layout
    let fontSize = Math.max(8, Math.min(16, availableWidth / Math.sqrt(textLength) * 1.8))
    
    // Adjust based on text characteristics
    if (textLength > 20 || wordsCount > 3) {
      fontSize = Math.max(8, fontSize * 0.8) // Smaller for very long text
    } else if (textLength > 12 || wordsCount > 2) {
      fontSize = Math.max(9, fontSize * 0.9) // Medium reduction for moderate text
    }
    
    // Determine if text needs multiple lines
    const estimatedTextWidth = textLength * fontSize * 0.6 // Rough estimation
    const needsMultiLine = estimatedTextWidth > availableWidth
    
    segments.push({
      ...prize,
      path,
      startAngle,
      endAngle,
      segmentAngle,
      textX,
      textY,
      textTransform,
      maxTextWidth: availableWidth,
      maxTextHeight: availableHeight,
      fontSize: fontSize,
      needsMultiLine: needsMultiLine,
      segmentRadialWidth: segmentRadialWidth,
      segmentArcWidth: segmentArcWidth,
      color: prize.color || `hsl(${(index * 360) / props.prizes.length}, 70%, 60%)`
    })
    
    currentAngle += segmentAngle
  })
  
  return segments
})

// Helper function to break text into lines that fit within available width
const getTextLines = (text, maxWidth, fontSize) => {
  const words = text.split(' ')
  const lines = []
  let currentLine = ''
  
  // Approximate character width based on font size
  const charWidth = fontSize * 0.6
  const maxCharsPerLine = Math.floor(maxWidth / charWidth)
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine
    } else {
      if (currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        // Word is too long, break it
        lines.push(word.substring(0, maxCharsPerLine))
        currentLine = word.substring(maxCharsPerLine)
      }
    }
  }
  
  if (currentLine) {
    lines.push(currentLine)
  }
  
  return lines
}

// Probability-based prize selection (using decimal probabilities)
const selectWinnerByProbability = () => {
  // Normalize probabilities to ensure they sum to 1
  const totalProbability = props.prizes.reduce((sum, prize) => sum + prize.probability, 0)
  const random = Math.random() // 0 to 1
  let currentSum = 0
  
  for (const prize of props.prizes) {
    currentSum += prize.probability / totalProbability
    if (random <= currentSum) {
      return prize
    }
  }
  
  // Fallback to last prize
  return props.prizes[props.prizes.length - 1]
}

// Calculate target rotation for winner - RANDOM ANGLE WITHIN SEGMENT
const calculateTargetRotation = (winnerPrize) => {
  // 1. Find the index of the winning prize in the array
  const winnerIndex = props.prizes.findIndex(p => p.id === winnerPrize.id)
  if (winnerIndex === -1) return 0
  
  // 2. Calculate segment boundaries for equal-sized segments
  const segmentAngle = 360 / props.prizes.length
  const startAngle = winnerIndex * segmentAngle
  const endAngle = startAngle + segmentAngle
  
  // 3. Generate random angle within the winning segment
  const randomAngleInSegment = startAngle + (Math.random() * segmentAngle)
  
  // 4. Calculate target rotation to align random angle with pointer at 270°
  const pointerAngle = 270 // Fixed pointer position
  const currentNormalized = ((currentRotation.value % 360) + 360) % 360
  
  // 5. Add multiple full rotations for visual effect
  const randomSpins = props.minSpins + Math.random() * (props.maxSpins - props.minSpins)
  const fullRotations = Math.floor(randomSpins) * 360
  
  // Calculate rotation needed to align randomAngleInSegment with pointer
  let targetRotation = pointerAngle - randomAngleInSegment - currentNormalized + fullRotations
  
  // Ensure we rotate in the positive direction with minimum spins
  while (targetRotation < fullRotations) {
    targetRotation += 360
  }
  
  // 6. Final rotation calculation
  const finalRotation = currentRotation.value + targetRotation
  
  return finalRotation
}

// Confetti celebration
const celebrateWin = () => {
  // Multiple confetti bursts for better effect
  const duration = 3000
  const animationEnd = Date.now() + duration
  
  const randomInRange = (min, max) => Math.random() * (max - min) + min
  
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()
    
    if (timeLeft <= 0) {
      clearInterval(interval)
      return
    }
    
    const particleCount = 50 * (timeLeft / duration)
    
    // Left side burst
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.8 },
      colors: props.prizes.map(p => p.color)
    })
    
    // Right side burst
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.8 },
      colors: props.prizes.map(p => p.color)
    })
  }, 250)
  
  // Center burst
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: props.prizes.map(p => p.color)
    })
  }, 500)
}

// Main spin function
const spinWheel = async () => {
  if (isSpinning.value || props.prizes.length === 0) return
  
  // Reset previous winner
  winner.value = null
  showWinner.value = false
  
  // Set spinning state
  isSpinning.value = true
  emit('spin-start')
  
  try {
    // Call backend to play the spin
    const { $api } = useNuxtApp()
    const response = await $api.post('/spin/play', {
      wheelType: props.wheelType || 'normal'
    })
    
    const spinResult = response.data
    const selectedWinner = spinResult.spin.prize
    
    // Find the winner in our prizes array and calculate rotation
    const winnerInArray = props.prizes.find(p => p.id === selectedWinner.id)
    if (!winnerInArray) {
      throw new Error('Winner not found in prizes array')
    }
    
    const targetRotation = calculateTargetRotation(winnerInArray)
    
    // 🎯 DEBUG: Log the selection and rotation calculation
    const winnerIndex = props.prizes.findIndex(p => p.id === selectedWinner.id)
    const segmentAngle = 360 / props.prizes.length
    const startAngle = winnerIndex * segmentAngle
    const endAngle = startAngle + segmentAngle
    
    console.log('=== BACKEND SPIN RESULT ===')
    console.log('Spin ID:', spinResult.spin.id)
    console.log('Selected winner:', selectedWinner.name)
    console.log('Winner index:', winnerIndex)
    console.log('Segment angle (equal):', segmentAngle.toFixed(2) + '°')
    console.log('Segment range:', startAngle.toFixed(2) + '° - ' + endAngle.toFixed(2) + '°')
    console.log('Target rotation:', targetRotation.toFixed(2) + '°')
    console.log('Current rotation:', currentRotation.value.toFixed(2) + '°')
    console.log('========================')
    
    // Apply CSS animation for smooth spinning
    if (wheelSvg.value) {
      wheelSvg.value.style.transition = `transform ${props.animationDuration}ms cubic-bezier(0.23, 1, 0.32, 1)`
      currentRotation.value = targetRotation
    }
    
    // Wait for animation to complete
    setTimeout(() => {
      isSpinning.value = false
      winner.value = winnerInArray // Use the winner from our prizes array with colors
      
      // 🎯 VERIFICATION: Check final alignment with equal segments
      const finalRotation = currentRotation.value % 360
      const normalizedRotation = ((finalRotation % 360) + 360) % 360
      
      // Calculate which segment is at the pointer (0°) after rotation
      const segmentAngle = 360 / props.prizes.length
      const pointerPos = 0
      
      // Find which segment the pointer is in after rotation
      let segmentAtPointerIndex = -1
      for (let i = 0; i < props.prizes.length; i++) {
        const segmentStart = (i * segmentAngle + normalizedRotation) % 360
        const segmentEnd = ((i + 1) * segmentAngle + normalizedRotation) % 360
        
        if (segmentStart <= segmentEnd) {
          if (pointerPos >= segmentStart && pointerPos <= segmentEnd) {
            segmentAtPointerIndex = i
            break
          }
        } else {
          // Handle wrap around case (e.g., segment goes from 350° to 10°)
          if (pointerPos >= segmentStart || pointerPos <= segmentEnd) {
            segmentAtPointerIndex = i
            break
          }
        }
      }
      
      const segmentAtPointer = segmentAtPointerIndex >= 0 ? props.prizes[segmentAtPointerIndex] : null
      const expectedIndex = props.prizes.findIndex(p => p.id === selectedWinner.id)
      
      console.log('=== FINAL VERIFICATION ===')
      console.log('Final rotation (normalized):', normalizedRotation.toFixed(2) + '°')
      console.log('Pointer position: 0° (top)')
      console.log('Expected winner:', selectedWinner.name, '(index:', expectedIndex + ')')
      console.log('Actual segment at pointer:', segmentAtPointer?.name || 'Unknown', '(index:', segmentAtPointerIndex + ')')
      console.log('✅ Alignment correct:', segmentAtPointer?.id === selectedWinner.id)
      
      // Show all segment positions after rotation for debugging
      for (let i = 0; i < props.prizes.length; i++) {
        const segmentStart = (i * segmentAngle + normalizedRotation) % 360
        const segmentEnd = ((i + 1) * segmentAngle + normalizedRotation) % 360
        console.log(`${props.prizes[i].name} [${i}]: ${segmentStart.toFixed(1)}° - ${segmentEnd.toFixed(1)}°`)
      }
      console.log('============================')
      
      // Show winner after a brief delay
      setTimeout(() => {
        showWinner.value = true
        celebrateWin()
        emit('winner-selected', winnerInArray)
        emit('spin-end', winnerInArray)
      }, 300)
      
      // Reset transition for next spin
      if (wheelSvg.value) {
        wheelSvg.value.style.transition = 'none'
      }
    }, props.animationDuration)
  } catch (error) {
    console.error('❌ Error during spin:', error)
    isSpinning.value = false
    
    // Show error to user (you can customize this)
    alert(error.response?.data?.message || 'Error al girar la ruleta. Inténtalo de nuevo.')
  }
}

// Responsive wheel size based on screen size
const responsiveWheelSize = computed(() => {
  if (process.client) {
    const screenWidth = window.innerWidth
    if (screenWidth < 640) {
      return Math.min(props.wheelSize * 0.8, screenWidth * 0.9)
    } else if (screenWidth < 768) {
      return Math.min(props.wheelSize * 0.9, screenWidth * 0.8)
    }
  }
  return props.wheelSize
})

// Watch for wheel size changes
watch(() => responsiveWheelSize.value, (newSize) => {
  // Update wheel size reactively if needed
}, { immediate: true })

// Expose methods for parent component
defineExpose({
  spinWheel,
  resetWheel: () => {
    currentRotation.value = 0
    winner.value = null
    showWinner.value = false
    isSpinning.value = false
  }
})
</script>

<style scoped>
/* Additional custom styles for enhanced visual effects */
.wheel-glow {
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.5));
}

/* Smooth rotation animation */
.wheel-spinning {
  animation: spin-wheel var(--animation-duration, 4s) cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes spin-wheel {
  from {
    transform: rotate(var(--start-rotation, 0deg));
  }
  to {
    transform: rotate(var(--end-rotation, 1080deg));
  }
}

/* Responsive text sizing */
@media (max-width: 640px) {
  .wheel-text {
    font-size: clamp(8px, 2vw, 12px);
  }
}

/* Button hover effects */
.spin-button:hover {
  box-shadow: 
    0 0 30px rgba(147, 51, 234, 0.4),
    0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Winner display animation */
.winner-display {
  animation: winner-bounce 0.6s ease-out;
}

@keyframes winner-bounce {
  0% {
    transform: scale(0.3) translateY(50px);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) translateY(-10px);
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style>
