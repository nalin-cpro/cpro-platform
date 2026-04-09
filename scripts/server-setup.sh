#!/usr/bin/env bash
#
# server-setup.sh — one-time bootstrap for a fresh Ubuntu 22.04 host that
# will run multiple Node.js apps behind Nginx + PM2 + Certbot.
#
# This script installs SHARED system dependencies only. It does NOT deploy
# any specific app — use scripts/add-app.sh for that.
#
# Run as root (or via sudo) on a fresh Ubuntu 22.04 server:
#
#   wget https://raw.githubusercontent.com/nalin-cpro/cpro-platform/master/scripts/server-setup.sh
#   sudo bash server-setup.sh
#
# Idempotent: safe to re-run.

set -euo pipefail

# ─── colors ─────────────────────────────────────────────────────────────────
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

# ─── confirm we're on a supported distro ────────────────────────────────────
if ! command -v apt >/dev/null 2>&1; then
  die "This script targets Debian/Ubuntu. apt not found."
fi

say "Updating apt and upgrading existing packages..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"
ok "System packages up to date"

# ─── core utilities ─────────────────────────────────────────────────────────
say "Installing core utilities (curl, git, build-essential, ca-certs, ufw, jq)..."
apt-get install -y \
  curl wget git ca-certificates gnupg lsb-release \
  build-essential jq ufw openssl unzip \
  software-properties-common
ok "Core utilities installed"

# ─── Node.js 20 LTS via NodeSource ──────────────────────────────────────────
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v 2>/dev/null | cut -dv -f2 | cut -d. -f1)" -lt 20 ]]; then
  say "Installing Node.js 20 LTS from NodeSource..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
ok "Node.js: $(node -v)  npm: $(npm -v)"

# ─── global npm tools (PM2 + tsx + typescript) ──────────────────────────────
say "Installing PM2, tsx, typescript globally..."
npm install -g pm2 tsx typescript >/dev/null
ok "PM2: $(pm2 -v)"

# ─── PostgreSQL ─────────────────────────────────────────────────────────────
if ! command -v psql >/dev/null 2>&1; then
  say "Installing PostgreSQL..."
  apt-get install -y postgresql postgresql-contrib
  systemctl enable --now postgresql
fi
ok "PostgreSQL: $(psql --version)"

# ─── Nginx ──────────────────────────────────────────────────────────────────
if ! command -v nginx >/dev/null 2>&1; then
  say "Installing Nginx..."
  apt-get install -y nginx
  systemctl enable --now nginx
fi
ok "Nginx: $(nginx -v 2>&1)"

# ─── Certbot for Let's Encrypt ──────────────────────────────────────────────
if ! command -v certbot >/dev/null 2>&1; then
  say "Installing Certbot..."
  apt-get install -y certbot python3-certbot-nginx
fi
ok "Certbot: $(certbot --version 2>&1)"

# ─── GitHub CLI (for cloning private repos in add-app.sh) ───────────────────
if ! command -v gh >/dev/null 2>&1; then
  say "Installing GitHub CLI..."
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg 2>/dev/null
  chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
    > /etc/apt/sources.list.d/github-cli.list
  apt-get update -y
  apt-get install -y gh
fi
ok "gh: $(gh --version | head -1)"

# ─── UFW firewall ───────────────────────────────────────────────────────────
say "Configuring UFW firewall (allow SSH + Nginx)..."
ufw allow ssh >/dev/null
ufw allow 'Nginx Full' >/dev/null
if ! ufw status | grep -q "Status: active"; then
  ufw --force enable >/dev/null
fi
ok "UFW active"

# ─── PM2 startup on boot ────────────────────────────────────────────────────
if ! systemctl is-enabled pm2-root >/dev/null 2>&1; then
  say "Configuring PM2 to start on boot..."
  pm2 startup systemd -u root --hp /root >/dev/null
  pm2 save --force >/dev/null 2>&1 || true
fi
ok "PM2 startup configured"

# ─── shared metadata directory ──────────────────────────────────────────────
mkdir -p /etc/cpro/apps
mkdir -p /var/www
chmod 755 /etc/cpro
chmod 700 /etc/cpro/apps  # contains DB passwords

# ─── prompt for shared certbot admin email (one-time) ──────────────────────
SETUP_ENV=/etc/cpro/setup.env
if [[ ! -f "$SETUP_ENV" ]]; then
  echo
  say "One-time configuration"
  read -rp "  Admin email for Let's Encrypt registrations: " ADMIN_EMAIL
  while [[ -z "$ADMIN_EMAIL" || ! "$ADMIN_EMAIL" =~ ^[^@]+@[^@]+\.[^@]+$ ]]; do
    warn "  Invalid email format. Please try again."
    read -rp "  Admin email for Let's Encrypt registrations: " ADMIN_EMAIL
  done
  cat > "$SETUP_ENV" <<EOF
# Shared host config — written by server-setup.sh
ADMIN_EMAIL=$ADMIN_EMAIL
SETUP_DATE=$(date -Iseconds)
EOF
  chmod 600 "$SETUP_ENV"
  ok "Saved $SETUP_ENV"
fi

# ─── done ───────────────────────────────────────────────────────────────────
echo
ok "Server is ready. Shared dependencies installed."
echo
echo "Next steps:"
echo "  1. Authenticate the GitHub CLI (one-time, needed to clone private repos):"
echo "       gh auth login"
echo "  2. Deploy your first app:"
echo "       sudo bash scripts/add-app.sh"
echo "  3. List running apps anytime:"
echo "       sudo bash scripts/list-apps.sh"
echo
