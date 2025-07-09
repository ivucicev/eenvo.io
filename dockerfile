FROM node:22.13 AS angular-builder

WORKDIR /app
COPY . .

ARG DEVEXTREME_KEY
ENV DEVEXTREME_KEY=$DEVEXTREME_KEY

RUN npm install --silent --force
RUN npm install -g @angular/cli
RUN ng build --configuration production

FROM alpine:latest AS pocketbase-builder

ARG PB_VERSION=0.28.4

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    curl

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

RUN unzip /tmp/pb.zip -d /pb-demo/

COPY ./pb_migrations /pb/pb_migrations
COPY ./pb_hooks /pb/pb_hooks

COPY ./pb_migrations /pb-demo/pb_migrations
COPY ./pb_hooks /pb-demo/pb_hooks

FROM nginx:alpine

RUN apk add --no-cache supervisor

COPY --from=angular-builder /app/dist/eenvo/browser /usr/share/nginx/html

COPY --from=angular-builder /app/.well-known /usr/share/nginx/html/.well-known

COPY --from=pocketbase-builder /pb /pb

COPY --from=pocketbase-builder /pb-demo /pb-demo

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY replace-env.sh /replace-env.sh
RUN chmod +x /replace-env.sh

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80 8080 8090

CMD ["/bin/sh", "-c", "/entrypoint.sh"]