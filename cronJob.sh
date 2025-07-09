#!/bin/bash

set -e 

CRON_JOB="0 */3 * * * rsync -av --delete /root/pb_demo_data_BACKUP/ /pb_demo_data/ >> /var/log/cron_rsync.log 2>&1"

(crontab -l 2>/dev/null | grep -F "$CRON_JOB") && echo "Cron job already exists" && exit 0

(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "Cron job added successfully!"

systemctl restart cron