#!/bin/sh

./pocketbase superuser create "$POCKETBASE_ADMIN_EMAIL" "$POCKETBASE_ADMIN_PASS" || true

exec ./pocketbase serve --http=0.0.0.0:8090