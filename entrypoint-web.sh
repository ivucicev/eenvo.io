#!/bin/sh

set -e

mkdir -p /usr/share/nginx/html/assets/environment

API_URL="${API_URL:-http://localhost:8080}"

ENV_FILE="/usr/share/nginx/html/assets/environment/env.js"

printf "window.env = {\n" > "$ENV_FILE"
printf "  pocketbase: \"%s\",\n" "$API_URL" >> "$ENV_FILE"
printf "  production: true,\n" >> "$ENV_FILE"
printf "};\n" >> "$ENV_FILE"

echo "Environment variables injected successfully!"

exec nginx -g "daemon off;"