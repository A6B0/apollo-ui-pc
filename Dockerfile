# product
FROM abiosoft/caddy
COPY /dist /www
COPY Caddyfile /etc/Caddyfile
