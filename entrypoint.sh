#!/bin/sh
set -e  # Exit immediately if a command fails

# Run environment setup
/replace-env.sh

# Start supervisord in the background
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf