# ====== Build Angular App ======
FROM node:22.13 AS angular-builder

WORKDIR /app
COPY . .

RUN npm install --silent
RUN npm install -g @angular/cli
RUN ng build --configuration production

# ====== Download & Setup PocketBase ======
FROM alpine:latest AS pocketbase-builder

ARG PB_VERSION=0.25.1

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    curl

# Download and extract PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# Extract PocketBase for demo purposes
RUN unzip /tmp/pb.zip -d /pb-demo/

# Copy migrations and hooks if available
COPY ./pb_migrations /pb/pb_migrations
COPY ./pb_hooks /pb/pb_hooks

# Copy demo migrations and hooks if available
COPY ./pb_migrations /pb-demo/pb_migrations
COPY ./pb_hooks /pb-demo/pb_hooks

# ====== Final Image with Nginx & PocketBase ======
FROM nginx:alpine

# Install Supervisor for process management
RUN apk add --no-cache supervisor

# Copy Angular build
COPY --from=angular-builder /app/dist/eenvo/browser /usr/share/nginx/html

# Copy MS Domain Validation
COPY --from=angular-builder /app/.well-known /usr/share/nginx/html/.well-known

# Copy PocketBase binary
COPY --from=pocketbase-builder /pb /pb

# Copy Demo PocketBase binary
COPY --from=pocketbase-builder /pb-demo /pb-demo

# Copy Nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy Supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy the replace-env script and ensure it's executable
COPY replace-env.sh /replace-env.sh
RUN chmod +x /replace-env.sh

# Set entrypoint to run the script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose necessary ports , 8080 - prod, 8090 - demo
EXPOSE 80 8080 8090

# Start both Nginx and PocketBase using Supervisor
CMD ["/bin/sh", "-c", "/entrypoint.sh"]

# docker build . -t ivucicev/eenvo.io:latest
# docker run --env-file .env -p 80:80 ivucicev/eenvo.io:latest
# docker run -d --env-file .env -p 443:80 -p 80:80 -v /pb_data:/pb/pb_data --restart always ivucicev/eenvo.io:latest