#!/bin/sh

set -e

mkdir -p /usr/share/nginx/html/assets/environment

cat <<EOF > /usr/share/nginx/html/assets/environment/env.js
window.env = {
  pocketbase: "${API_URL:-http://localhost:8080}",
  production: true
};
EOF

echo "Environment variables injected successfully!"

exec nginx -g "daemon off;"