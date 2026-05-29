FROM nginx:1.27-alpine

RUN apk add --no-cache apache2-utils

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.d/ /docker-entrypoint.d/
COPY . /usr/share/nginx/html
RUN chmod +x /docker-entrypoint.d/*.sh

EXPOSE 80
