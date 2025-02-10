echo "Injecting environment variables into runtime-env.js..."
cat <<EOF > /usr/share/nginx/html/assets/environment/env.js
window.env = {
  pocketbase: "${API_URL}",
  production: true,
};
EOF

exec "$@"