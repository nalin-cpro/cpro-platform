#!/usr/bin/env bash
#
# list-apps.sh — show what's running on this host:
#   • PM2 process list
#   • Nginx server blocks in sites-enabled
#   • PostgreSQL databases
#   • Per-app metadata recorded by add-app.sh
#
# Run as root:  sudo bash scripts/list-apps.sh

set -euo pipefail

if [[ -t 1 ]]; then
  GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; CYAN='\033[0;36m'; NC='\033[0m'
else
  GREEN=''; YELLOW=''; BLUE=''; CYAN=''; NC=''
fi
heading() { printf "\n${BLUE}━━━ %s ━━━${NC}\n" "$*"; }

if [[ $EUID -ne 0 ]]; then
  printf "${YELLOW}⚠ Not running as root — some sections may be incomplete.${NC}\n" >&2
fi

# ─── 1. PM2 process list ────────────────────────────────────────────────────
heading "PM2 processes"
if command -v pm2 >/dev/null 2>&1; then
  pm2 list || true
else
  echo "(pm2 not installed)"
fi

# ─── 2. Nginx server blocks ────────────────────────────────────────────────
heading "Nginx sites-enabled"
if [[ -d /etc/nginx/sites-enabled ]]; then
  shopt -s nullglob
  enabled=(/etc/nginx/sites-enabled/*)
  shopt -u nullglob
  if (( ${#enabled[@]} == 0 )); then
    echo "(no sites enabled)"
  else
    printf "${CYAN}%-25s %-50s %s${NC}\n" "FILE" "SERVER_NAME" "PROXY_PASS"
    for f in "${enabled[@]}"; do
      name=$(basename "$f")
      # follow the symlink to read the underlying file
      real=$(readlink -f "$f" 2>/dev/null || echo "$f")
      server_names=$(grep -hE '^\s*server_name\s' "$real" 2>/dev/null \
        | sed -E 's/^\s*server_name\s+//; s/;.*$//' | tr '\n' ' ' | sed 's/ $//' || true)
      proxies=$(grep -hE '^\s*proxy_pass\s' "$real" 2>/dev/null \
        | sed -E 's/^\s*proxy_pass\s+//; s/;.*$//' | sort -u | tr '\n' ' ' | sed 's/ $//' || true)
      printf "%-25s %-50s %s\n" "$name" "${server_names:-—}" "${proxies:-—}"
    done
  fi
else
  echo "(/etc/nginx/sites-enabled does not exist)"
fi

# ─── 3. PostgreSQL databases ───────────────────────────────────────────────
heading "PostgreSQL databases"
if command -v psql >/dev/null 2>&1; then
  if id postgres >/dev/null 2>&1; then
    sudo -u postgres psql -c "\l" 2>/dev/null \
      | grep -vE '^\s*(template[01]|postgres)\s' \
      | grep -vE '^\(' \
      || echo "(none)"
  else
    echo "(postgres user not present)"
  fi
else
  echo "(psql not installed)"
fi

# ─── 4. Per-app metadata ────────────────────────────────────────────────────
heading "Apps registered with add-app.sh"
APPS_META_DIR=/etc/cpro/apps
if [[ -d "$APPS_META_DIR" ]]; then
  shopt -s nullglob
  metas=("$APPS_META_DIR"/*.env)
  shopt -u nullglob
  if (( ${#metas[@]} == 0 )); then
    echo "(no apps registered yet — run scripts/add-app.sh)"
  else
    printf "${CYAN}%-20s %-40s %-6s %s${NC}\n" "NAME" "DOMAIN" "PORT" "INSTALLED"
    for m in "${metas[@]}"; do
      # shellcheck disable=SC1090
      ( source "$m"; printf "%-20s %-40s %-6s %s\n" \
          "${APP_NAME:-?}" "${DOMAIN:-?}" "${PORT:-?}" "${INSTALL_DATE:-?}" )
    done
    echo
    echo "Tip: app metadata files (incl. DB password) are at $APPS_META_DIR/"
  fi
else
  echo "(no metadata dir — server-setup.sh has not been run)"
fi

# ─── 5. SSL certificates ───────────────────────────────────────────────────
heading "Let's Encrypt certificates"
if command -v certbot >/dev/null 2>&1; then
  certbot certificates 2>/dev/null \
    | grep -E '(Certificate Name|Domains|Expiry Date)' \
    || echo "(no certificates issued)"
else
  echo "(certbot not installed)"
fi

# ─── footer ────────────────────────────────────────────────────────────────
echo
printf "${GREEN}Done.${NC}\n"
