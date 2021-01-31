# stage 1 - build react app
FROM node:alpine as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN apk add --update \
  && apk add --no-cache ca-certificates \
  && apk add --no-cache --virtual .build-deps curl \
  && curl -L https://unpkg.com/@pnpm/self-installer | node \
  && pnpm i \
  && pnpm i -g nx \
  && apk del .build-deps

COPY . .

RUN nx build frontend --prod

# stage 2 - build final image
FROM nginx:alpine

LABEL name="sus-frontend"
LABEL version="0.0.1"
LABEL maintainer="majesnix <majesnix@majesnix.org>"

COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY apps/frontend/nginx/default.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
