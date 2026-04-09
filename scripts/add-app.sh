#!/usr/bin/env bash
#
# add-app.sh — deploy a single Node.js app on this server.
#
# Prereqs:
#   - server-setup.sh has been run on this host
#   - gh CLI is authenticated (`gh auth login`) if cloning a private GitHub repo
#
# Run as root:  sudo bash scripts/add-app.sh
#
# Asks 5 questions, then:
#   - clones repo to /var/www/<app>
#   - creates a dedicated PostgreSQL DB + user
#   - writes .env.local with DATABASE_URL, PORT, secrets
#   - npm ci, prisma migrate (if used), npm run build
#   - registers PM2 entry binding to PORT
#   - writes Nginx server block routing <domain> → 127.0.0.1:<port>
#   - issues a Let's Encrypt cert via certbot
#   - persists app metadata at /etc/cpro/apps/<app>.env

set -euo pipefail

# ─── colours ────────────────────────────────────────────────────────────────
if [[ -t 1 ]]; then
  RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
else
  RED=''; GREEN=''; YELLOW=''; BLUE=''; NC=''
fi
say()  { printf "${BLUE}==>${NC} %s\n" "$*"; }
ok()   { printf "${GREEN} ✓${NC} %s\n" "$*"; }
warn() { printf "${YELLOW} ⚠${NC} %s\n" "$*" >&2; }
die()  { printf "${RED} ✗${NC} %s\n" "$*" >&2; exit 1; }

# ─── must run as root ───────────────────────────────────────────────────────
if [[ $EUID -ne 0 ]]; then
  die "This script must be run as root (use sudo)."
fi

# ─── shared config ──────────────────────────────────────────────────────────
SETUP_ENV=/etc/cpro/setup.env
if [[ ! -f "$SETUP_ENV" ]]; then
  die "Shared config not found ($SETUP_ENV). Run scripts/server-setup.sh first."
fi
# shellcheck disable=SC1090
source "$SETUP_ENV"
ADMIN_EMAIL="${ADMIN_EMAIL:-}"
[[ -n "$ADMIN_EMAIL" ]] || die "ADMIN_EMAIL missing from $SETUP_ENV — re-run server-setup.sh."

mkdir -p /etc/cpro/apps
APPS_META_DIR=/etc/cpro/apps

# ─── prompts (5) ────────────────────────────────────────────────────────────
echo
say "Add a new app to this host"
echo

read -rp "  1. App name (lowercase, dashes allowed, e.g. cpro-platform): " APP_NAME
[[ -n "$APP_NAME" ]] || die "App name is required."
[[ "$APP_NAME" =~ ^[a-z][a-z0-9-]*$ ]] || die "App name must match ^[a-z][a-z0-9-]*$"

read -rp "  2. Domain (e.g. stagingdev.conversionprollp.com): " DOMAIN
[[ "$DOMAIN" =~ ^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$ ]] \
  || die "Domain looks invalid: $DOMAIN"

read -rp "  3. Port (e.g. 3000, 3001, 3002 — must be unused): " PORT
[[ "$PORT" =~ ^[0-9]+$ ]] || die "Port must be a number."
(( PORT >= 1024 && PORT <= 65535 )) || die "Port must be between 1024 and 65535."

read -rp "  4. Git repo URL (https://github.com/owner/repo or git URL): " REPO_URL
[[ -n "$REPO_URL" ]] || die "Repo URL is required."

read -rp "  5. PostgreSQL database name (e.g. cpro_main): " DB_NAME
[[ "$DB_NAME" =~ ^[a-z][a-z0-9_]*$ ]] || die "DB name must match ^[a-z][a-z0-9_]*$"

# Derived values
APP_DIR=/var/www/$APP_NAME
DB_USER="${APP_NAME//-/_}_user"
DB_PASS=$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 24)
NEXTAUTH_SECRET=$(openssl rand -base64 32)
REVALIDATION_SECRET=$(openssl rand -hex 20)
META_FILE=$APPS_META_DIR/$APP_NAME.env

# ─── collision checks ──────────────────────────────────────────────────────
echo
say "Checking for collisions..."

[[ -d "$APP_DIR" ]] && die "App directory already exists: $APP_DIR"
[[ -f "$META_FILE" ]] && die "App metadata already exists: $META_FILE"
[[ -f "/etc/nginx/sites-available/$APP_NAME" ]] && die "Nginx config already exists for $APP_NAME"

if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  die "PM2 already has an app named '$APP_NAME'. Use a different name or remove it first."
fi

if ss -ltn "sport = :$PORT" | grep -q ":$PORT"; then
  die "Port $PORT is already in use on this host."
fi

if sudo -u postgres psql -lqt | cut -d '|' -f1 | grep -qw "$DB_NAME"; then
  die "PostgreSQL database '$DB_NAME' already exists."
fi

if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1; then
  die "PostgreSQL role '$DB_USER' already exists."
fi

ok "No collisions"

# ─── confirm ───────────────────────────────────────────────────────────────
echo
echo "About to create:"
echo "  App name : $APP_NAME"
echo "  Directory: $APP_DIR"
echo "  Domain   : https://$DOMAIN"
echo "  Port     : $PORT"
echo "  Repo     : $REPO_URL"
echo "  DB name  : $DB_NAME"
echo "  DB user  : $DB_USER"
echo "  Cert via : $ADMIN_EMAIL"
echo
read -rp "Proceed? [y/N] " CONFIRM
[[ "$CONFIRM" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 0; }

# ─── 1. clone repo ─────────────────────────────────────────────────────────
say "Cloning repo to $APP_DIR..."
if [[ "$REPO_URL" =~ ^https://github\.com/([^/]+/[^/]+?)(\.git)?/?$ ]]; then
  GH_REPO="${BASH_REMATCH[1]}"
  if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
    gh repo clone "$GH_REPO" "$APP_DIR" >/dev/null 2>&1 \
      || die "gh repo clone failed for $GH_REPO. Is the gh CLI authenticated as a user with read access?"
  else
    git clone "$REPO_URL" "$APP_DIR" \
      || die "git clone failed. For private repos, run 'gh auth login' first or use SSH URL."
  fi
else
  git clone "$REPO_URL" "$APP_DIR" || die "git clone failed."
fi
ok "Repo cloned"

# ─── 2. create database + user ─────────────────────────────────────────────
say "Creating PostgreSQL database '$DB_NAME' and user '$DB_USER'..."
sudo -u postgres psql <<SQL
CREATE USER "$DB_USER" WITH ENCRYPTED PASSWORD '$DB_PASS';
CREATE DATABASE "$DB_NAME" OWNER "$DB_USER";
GRANT ALL PRIVILEGES ON DATABASE "$DB_NAME" TO "$DB_USER";
ALTER USER "$DB_USER" CREATEDB;
SQL
ok "Database created"

# ─── 3. write .env.local ───────────────────────────────────────────────────
say "Writing .env.local..."
cat > "$APP_DIR/.env.local" <<EOF
# Generated by add-app.sh on $(date -Iseconds)
DATABASE_URL="postgresql://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME"
PORT=$PORT
NODE_ENV=production

NEXTAUTH_SECRET="$NEXTAUTH_SECRET"
NEXTAUTH_URL="https://$DOMAIN"
NEXT_PUBLIC_SITE_URL="https://$DOMAIN"
REVALIDATION_SECRET="$REVALIDATION_SECRET"

# ── App-specific — fill in then 'pm2 reload $APP_NAME --update-env' ──
ANTHROPIC_API_KEY="REPLACE_ME"
ADMIN_EMAIL="admin@$DOMAIN"
ADMIN_PASSWORD="REPLACE_ME"
EOF
chmod 600 "$APP_DIR/.env.local"
ok "Wrote $APP_DIR/.env.local"

# ─── 4. install + build ────────────────────────────────────────────────────
say "Installing dependencies (npm ci)..."
cd "$APP_DIR"
npm ci

if [[ -f "$APP_DIR/prisma/schema.prisma" ]]; then
  say "Generating Prisma client + applying migrations..."
  npx prisma generate
  npx prisma migrate deploy
  ok "Prisma ready"
else
  warn "No prisma/schema.prisma — skipping Prisma steps"
fi

say "Building Next.js app (npm run build)..."
npm run build
ok "Build complete"

# ─── 5. PM2 entry ──────────────────────────────────────────────────────────
say "Starting under PM2 on port $PORT..."
PORT="$PORT" pm2 start npm --name "$APP_NAME" --cwd "$APP_DIR" -- start
pm2 save --force >/dev/null
ok "PM2 entry created"

# ─── 6. Nginx server block ─────────────────────────────────────────────────
say "Writing Nginx config for $DOMAIN..."
NGINX_CONF=/etc/nginx/sites-available/$APP_NAME
cat > "$NGINX_CONF" <<NGINX
server {
    listen 80;
    server_name $DOMAIN;
    client_max_body_size 25M;

    # Long-cache Next.js static assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_set_header Host \$host;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX
ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/$APP_NAME"
nginx -t || die "nginx -t failed — config rejected. Check $NGINX_CONF"
systemctl reload nginx
ok "Nginx routing $DOMAIN → 127.0.0.1:$PORT"

# ─── 7. certbot SSL ────────────────────────────────────────────────────────
say "Issuing Let's Encrypt certificate for $DOMAIN..."
if certbot --nginx \
    -d "$DOMAIN" \
    --non-interactive \
    --agree-tos \
    --email "$ADMIN_EMAIL" \
    --redirect; then
  ok "Certificate issued and HTTPS enforced"
else
  warn "Certbot failed. The site is reachable on HTTP only. Common causes:"
  warn "  • DNS for $DOMAIN does not point to this server yet"
  warn "  • Port 80 is blocked upstream"
  warn "Re-run manually after fixing: certbot --nginx -d $DOMAIN"
fi

# ─── 8. persist metadata ──────────────────────────────────────────────────
cat > "$META_FILE" <<EOF
# App metadata — written by add-app.sh
APP_NAME=$APP_NAME
DOMAIN=$DOMAIN
PORT=$PORT
REPO_URL=$REPO_URL
APP_DIR=$APP_DIR
DB_NAME=$DB_NAME
DB_USER=$DB_USER
DB_PASS=$DB_PASS
INSTALL_DATE=$(date -Iseconds)
EOF
chmod 600 "$META_FILE"
ok "Saved metadata to $META_FILE"

# ─── done ─────────────────────────────────────────────────────────────────
echo
ok "Deployment complete: https://$DOMAIN"
echo
echo "What you should do next:"
echo "  1. Edit $APP_DIR/.env.local to fill in REPLACE_ME values"
echo "     (ANTHROPIC_API_KEY, ADMIN_PASSWORD, anything else app-specific)"
echo "  2. Apply changes:    pm2 reload $APP_NAME --update-env"
echo "  3. View logs:        pm2 logs $APP_NAME"
echo "  4. List all apps:    sudo bash scripts/list-apps.sh"
echo
