#!/bin/sh
set -eu

AUTH_CONF="/etc/nginx/conf.d/auth.conf"
HTPASSWD_FILE="/etc/nginx/.htpasswd"

if [ -n "${ABO_BASIC_AUTH_USER:-}" ] && [ -n "${ABO_BASIC_AUTH_PASSWORD:-}" ]; then
  htpasswd -bcB "$HTPASSWD_FILE" "$ABO_BASIC_AUTH_USER" "$ABO_BASIC_AUTH_PASSWORD" >/dev/null
  cat > "$AUTH_CONF" <<EOF
auth_basic "Abo Pilot";
auth_basic_user_file $HTPASSWD_FILE;
EOF
else
  cat > "$AUTH_CONF" <<EOF
auth_basic off;
EOF
fi
