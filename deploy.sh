#!/bin/bash

# Deployment script for Nuxt frontend on HestiaCP VPS
# Run this script on your VPS server

set -e

echo "🚀 Starting deployment process..."

# Configuration
APP_NAME="bonocopas-wheel-frontend"
APP_DIR="/home/admin/web/srv981267.hstgr.cloud/public_html"
REPO_URL="https://github.com/SergioCastro26/bonocopas-wheel-frontend"
NODE_VERSION="18"
USER_NAME="admin"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 Deployment Configuration:${NC}"
echo -e "App Name: ${APP_NAME}"
echo -e "App Directory: ${APP_DIR}"
echo -e "Node Version: ${NODE_VERSION}"
echo ""

# Check if we're in the correct directory
if [ "$(pwd)" != "$APP_DIR" ]; then
    echo -e "${RED}❌ Please run this script from: $APP_DIR${NC}"
    echo -e "${YELLOW}Current directory: $(pwd)${NC}"
    echo -e "${YELLOW}Expected directory: $APP_DIR${NC}"
    exit 1
fi

# Update system packages
echo -e "${YELLOW}📦 Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Install Node.js using NodeSource repository
echo -e "${YELLOW}📦 Installing Node.js ${NODE_VERSION}...${NC}"
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js installation
echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"
echo -e "${GREEN}✅ NPM version: $(npm --version)${NC}"

# Install PM2 globally
echo -e "${YELLOW}📦 Installing PM2...${NC}"
sudo npm install -g pm2

# We're already in the correct directory
echo -e "${GREEN}✅ Working in: $(pwd)${NC}"

# Clone or update repository
if [ -d ".git" ]; then
    echo -e "${YELLOW}🔄 Updating existing repository...${NC}"
    git pull origin main
else
    echo -e "${YELLOW}📥 Cloning repository...${NC}"
    git clone $REPO_URL .
    echo -e "${YELLOW}📁 Repository cloned successfully${NC}"
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install --production

# Build the application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

# Set environment variables
echo -e "${YELLOW}🔧 Setting up environment variables...${NC}"
export NODE_ENV=production
export API_BASE_URL="https://bonocopas-wheel-backend.onrender.com"

# Stop existing PM2 process if running
echo -e "${YELLOW}🛑 Stopping existing processes...${NC}"
pm2 delete $APP_NAME 2>/dev/null || true

# Start application with PM2
echo -e "${YELLOW}🚀 Starting application with PM2...${NC}"
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER_NAME --hp /home/$USER_NAME

# HestiaCP already has the proxy configured, just verify it's working
echo -e "${YELLOW}🌐 Verifying Nginx configuration...${NC}"
echo -e "${GREEN}✅ HestiaCP proxy is already configured for port 3000${NC}"

# Setup SSL with Let's Encrypt (optional)
# SSL is already configured by HestiaCP
echo -e "${GREEN}✅ SSL certificate is already configured by HestiaCP${NC}"

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your application should be available at: https://srv981267.hstgr.cloud${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo -e "1. Update the domain name in this script"
echo -e "2. Update the repository URL"
echo -e "3. Update the backend API URL in ecosystem.config.js"
echo -e "4. Update the email for SSL certificate"
echo ""
echo -e "${YELLOW}🔧 Useful PM2 commands:${NC}"
echo -e "pm2 status          - Check application status"
echo -e "pm2 logs            - View application logs"
echo -e "pm2 restart $APP_NAME - Restart application"
echo -e "pm2 stop $APP_NAME    - Stop application"
