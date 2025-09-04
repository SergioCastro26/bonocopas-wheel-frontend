<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-gradient-to-r from-cyan-500 via-orange-400 to-pink-500 shadow-lg border-b border-orange-300/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div class="h-8 w-32 flex items-center justify-center p-1">
                <img 
                  src="https://res.cloudinary.com/dphpfdsk3/image/upload/v1756323180/ZonaBarcelo_LogoNaranja_diwkgq.png" 
                  alt="Zona Barceló" 
                  class="h-full w-full object-contain"
                />
              </div>
            </NuxtLink>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-white/90 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Inicio
            </NuxtLink>
            <NuxtLink to="/wheel" class="text-white/90 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Ruleta
            </NuxtLink>
            <NuxtLink to="/prizes" class="text-white/90 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Premios
            </NuxtLink>
          </nav>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white/90 hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div v-show="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NuxtLink to="/" class="text-white/90 hover:text-white block px-3 py-2 text-base font-medium">
              Inicio
            </NuxtLink>
            <NuxtLink to="/wheel" class="text-white/90 hover:text-white block px-3 py-2 text-base font-medium">
              Ruleta
            </NuxtLink>
            <NuxtLink to="/prizes" class="text-white/90 hover:text-white block px-3 py-2 text-base font-medium">
              Premios
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 border-t border-orange-300/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">Zona Barceló</h3>
            <p class="text-white/90 text-sm">
              Gira y gana increíbles premios.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">Enlaces</h3>
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/" class="text-white/90 hover:text-white">Inicio</NuxtLink></li>
              <li><NuxtLink to="/wheel" class="text-white/90 hover:text-white">Ruleta</NuxtLink></li>
              <li><NuxtLink to="/prizes" class="text-white/90 hover:text-white">Premios</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">Contacto</h3>
            <p class="text-white/90 text-sm">
              ¿Tienes preguntas? Contáctanos en info@zonabarcelo.com
            </p>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-white/30">
          <p class="text-center text-white/90 text-sm">
            © {{ new Date().getFullYear() }} Zona Barceló. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false)
</script>
