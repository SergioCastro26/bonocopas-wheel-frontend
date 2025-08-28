# Despliegue Frontend en VPS con HestiaCP

## Requisitos Previos
- VPS con Ubuntu 24.04 y HestiaCP instalado
- Acceso SSH como usuario admin
- Dominio configurado en HestiaCP

## Pasos de Despliegue

### 1. Preparación Local
Antes de subir el código, asegúrate de que tienes estos archivos configurados:

- `ecosystem.config.js` - Configuración de PM2
- `deploy.sh` - Script de despliegue automatizado
- `nuxt.config.ts` - Configurado con preset 'node-server'

### 2. Subir Código al Repositorio
```bash
git add .
git commit -m "Configure for VPS deployment"
git push origin main
```

### 3. Conectar por SSH a tu VPS
```bash
ssh admin@tu-servidor-ip
```

### 4. Ejecutar Script de Despliegue
```bash
# Descargar y ejecutar el script
wget https://raw.githubusercontent.com/tu-usuario/bonocopas-wheel/main/frontend/deploy.sh
chmod +x deploy.sh

# Editar configuraciones antes de ejecutar
nano deploy.sh
# Actualizar:
# - REPO_URL con tu repositorio
# - yourdomain.com con tu dominio
# - your-email@example.com con tu email

# Ejecutar despliegue
./deploy.sh
```

### 5. Configuraciones Manuales Necesarias

#### A. Variables de Entorno
Edita `ecosystem.config.js` con tu URL del backend:
```bash
cd /home/admin/web/tudominio.com/public_html/frontend
nano ecosystem.config.js
# Cambiar: API_BASE_URL: 'https://tu-backend.onrender.com'
```

#### B. Dominio en HestiaCP
1. Ve al panel de HestiaCP
2. Agrega tu dominio en "Web Domains"
3. Configura DNS si es necesario

#### C. SSL Certificate
El script configurará SSL automáticamente, pero si falla:
```bash
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

### 6. Verificar Despliegue
```bash
# Verificar estado de PM2
pm2 status

# Ver logs de la aplicación
pm2 logs bonocopas-wheel-frontend

# Verificar Nginx
sudo nginx -t
sudo systemctl status nginx
```

### 7. Comandos Útiles Post-Despliegue

#### Actualizar Aplicación
```bash
cd /home/admin/web/tudominio.com/public_html
git pull origin main
cd frontend
npm ci --only=production
npm run build
pm2 restart bonocopas-wheel-frontend
```

#### Monitoreo
```bash
# Ver logs en tiempo real
pm2 logs --lines 50

# Monitorear recursos
pm2 monit

# Reiniciar si hay problemas
pm2 restart bonocopas-wheel-frontend
```

#### Backup
```bash
# Crear backup de la aplicación
tar -czf backup-$(date +%Y%m%d).tar.gz /home/admin/web/tudominio.com/public_html
```

## Solución de Problemas Comunes

### Error de Puerto en Uso
```bash
sudo lsof -i :3000
sudo kill -9 PID_DEL_PROCESO
pm2 restart bonocopas-wheel-frontend
```

### Error de Permisos
```bash
sudo chown -R admin:admin /home/admin/web/tudominio.com/public_html
```

### Error de Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Logs de Error
```bash
# Logs de PM2
pm2 logs bonocopas-wheel-frontend --err

# Logs de Nginx
sudo tail -f /var/log/nginx/error.log

# Logs del sistema
sudo journalctl -u nginx -f
```

## URLs Importantes
- Frontend: https://tudominio.com
- Backend: https://tu-backend.onrender.com
- HestiaCP Panel: https://tu-servidor-ip:8083

## Contacto y Soporte
Si encuentras problemas durante el despliegue, verifica:
1. Configuración de DNS
2. Puertos abiertos (80, 443, 3000)
3. Variables de entorno correctas
4. Logs de PM2 y Nginx
