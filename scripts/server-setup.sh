#!/bin/bash
# One-command setup for any fresh Ubuntu 22.04 VPS
# Usage: bash scripts/server-setup.sh
set -e

read -p "Domain (e.g. stagingdev.conversionprollp.com): " DOMAIN
read -p "DB password: " DB_PASSWORD
read -p "Admin email: " ADMIN_EMAIL
read -sp "Admin password: " ADMIN_PASSWORD && echo ""

apt update && apt upgrade -y
apt install -y curl wget git nginx certbot python3-certbot-nginx postgresql postgresql-contrib ufw

curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2 tsx typescript

ufw allow ssh && ufw allow 'Nginx Full' && ufw --force enable

sudo -u postgres psql -c "CREATE DATABASE cpro_main;"
sudo -u postgres psql -c "CREATE USER cpro_user WITH ENCRYPTED PASSWORD '${DB_PASSWORD}';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE cpro_main TO cpro_user;"
sudo -u postgres psql -c "ALTER DATABASE cpro_main OWNER TO cpro_user;"
sudo -u postgres psql -c "ALTER USER cpro_user CREATEDB;"

mkdir -p /var/www/cpro-platform
cd /var/www/cpro-platform
git clone https://github.com/nalin-cpro/cpro-platform.git .
npm ci

NEXTAUTH_SECRET=$(openssl rand -base64 32)
REVALIDATION_SECRET=$(openssl rand -hex 20)

cat > .env.local << EOF
DATABASE_URL="postgresql://cpro_user:${DB_PASSWORD}@localhost:5432/cpro_main"
ANTHROPIC_API_KEY="REPLACE_WITH_YOUR_KEY"
NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"
NEXTAUTH_URL="https://${DOMAIN}"
NEXT_PUBLIC_SITE_URL="https://${DOMAIN}"
NEXT_PUBLIC_SITE_NAME="ConversionPro LLP"
SITE_ID="conversionpro"
ADMIN_EMAIL="${ADMIN_EMAIL}"
ADMIN_PASSWORD="${ADMIN_PASSWORD}"
REVALIDATION_SECRET="${REVALIDATION_SECRET}"
EOF

echo "Add your ANTHROPIC_API_KEY to .env.local then press Enter"
read -p ""

npx prisma migrate deploy
npx prisma db seed
npm run build
pm2 start npm --name "cpro-platform" -- start
pm2 save && pm2 startup

cat > /etc/nginx/sites-available/${DOMAIN} << NGINX
server {
    listen 80;
    server_name ${DOMAIN};
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
    }
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }
}
NGINX

ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d ${DOMAIN} --non-interactive --agree-tos --email ${ADMIN_EMAIL} --redirect

echo "=== Done! Site: https://${DOMAIN} | Admin: https://${DOMAIN}/admin ==="
