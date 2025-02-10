#!/bin/sh

set -e  # Exit immediately if a command exits with a non-zero status

echo "Injecting environment variables into runtime-env.js..."

# Ensure the directory exists
mkdir -p /usr/share/nginx/html/assets/environment

# Write the runtime environment variables
cat <<EOF > /usr/share/nginx/html/assets/environment/env.js
window.env = {
  pocketbase: "${API_URL:-http://localhost:8080}",
  production: true
};
EOF

echo "Environment variables injected successfully!"