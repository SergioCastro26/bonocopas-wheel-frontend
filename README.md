# BonoCopas Wheel Frontend

Frontend de la aplicación BonoCopas Wheel construido con Nuxt 4, Vue 3 y Tailwind CSS.

## Características

- 🎯 Sistema de ruleta de premios
- 🔐 Autenticación con JWT y cookies HTTPOnly
- 👨‍💼 Panel de administración completo
- 📱 Diseño responsive con modo oscuro
- 🎨 UI moderna con Tailwind CSS
- 📊 Generación de códigos QR
- 🔄 Historial de giros y premios

## Tecnologías

- **Nuxt 4** - Framework Vue.js
- **Vue 3** - Framework JavaScript reactivo
- **Tailwind CSS** - Framework CSS utilitario
- **vue3-roulette** - Componente de ruleta
- **qrcode-vue3** - Generador de códigos QR
- **@vueuse/nuxt** - Utilidades de composición

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Despliegue

Este proyecto está configurado para desplegarse en Vercel con el preset de Nitro correspondiente.

## Variables de Entorno

- `API_BASE_URL` - URL del backend API

## Estructura del Proyecto

- `/components` - Componentes Vue reutilizables
- `/pages` - Páginas de la aplicación
- `/composables` - Funciones de composición
- `/assets` - Recursos estáticos
- `/public` - Archivos públicos
