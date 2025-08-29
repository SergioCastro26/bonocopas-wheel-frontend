module.exports = {
  apps: [
    {
      name: 'bonocopas-wheel-frontend',
      script: './.output/server/index.mjs',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        API_BASE_URL: 'https://bonocopas-wheel-backend.onrender.com'
      }
    }
  ]
}
