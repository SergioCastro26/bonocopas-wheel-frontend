#!/bin/bash

# Quick deployment script for Nuxt frontend
# Run this from: /home/admin/web/srv981267.hstgr.cloud/public_html

set -e

# Configuration
APP_NAME="bonocopas-wheel-frontend"
REPO_URL="https://github.com/SergioCastro26/bonocopas-wheel-frontend"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🚀 Quick Deployment Process..."

# Verify we're in the right directory
EXPECTED_DIR="/home/admin/web/srv981267.hstgr.cloud/public_html"
if [ "$(pwd)" != "$EXPECTED_DIR" ]; then
    echo -e "${RED}❌ Run this script from: $EXPECTED_DIR${NC}"
    echo -e "${YELLOW}Current: $(pwd)${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Node.js 18...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}📦 Installing PM2...${NC}"
    sudo npm install -g pm2
fi

echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"
echo -e "${GREEN}✅ NPM: $(npm --version)${NC}"

# Clone or update repository
if [ -d ".git" ]; then
    echo -e "${YELLOW}🔄 Updating repository...${NC}"
    git pull origin main
else
    echo -e "${YELLOW}📥 Cloning repository...${NC}"
    git clone $REPO_URL .
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Build application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

# Stop existing PM2 process
echo -e "${YELLOW}🛑 Stopping existing process...${NC}"
pm2 delete $APP_NAME 2>/dev/null || true

# Start with PM2
echo -e "${YELLOW}🚀 Starting with PM2...${NC}"
pm2 start ecosystem.config.js

# Save PM2 config
pm2 save

# Check if application is running
echo -e "${YELLOW}🔍 Checking application status...${NC}"
sleep 3

if pm2 list | grep -q $APP_NAME; then
    echo -e "${GREEN}✅ Application is running!${NC}"
    pm2 status
else
    echo -e "${RED}❌ Application failed to start${NC}"
    pm2 logs $APP_NAME --lines 20
    exit 1
fi

# Test if port 3000 is responding
echo -e "${YELLOW}🔍 Testing port 3000...${NC}"
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✅ Port 3000 is responding${NC}"
else
    echo -e "${RED}❌ Port 3000 is not responding${NC}"
    echo -e "${YELLOW}📋 Checking logs:${NC}"
    pm2 logs $APP_NAME --lines 10
fi

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo -e "${GREEN}🌐 Check: http://srv981267.hstgr.cloud${NC}"
echo ""
echo -e "${YELLOW}📋 Useful commands:${NC}"
echo -e "pm2 status                    - Check status"
echo -e "pm2 logs $APP_NAME           - View logs"
echo -e "pm2 restart $APP_NAME        - Restart app"
echo -e "curl http://localhost:3000   - Test local port"
