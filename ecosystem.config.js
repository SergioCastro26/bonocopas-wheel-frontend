module.exports = {
  apps: [
    {
      name: 'bonocopas-wheel-frontend',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        API_BASE_URL: 'https://your-backend-url.onrender.com'
      }
    }
  ]
}
