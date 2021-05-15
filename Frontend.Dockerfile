# stage 1 - build react app
FROM node:alpine as builder

ARG NX_BASE_URL
ARG NX_PORT
ARG NX_GQL_URL
ARG NX_APP_NAME
ARG SESSION_SECRET
ARG RATELIMIT_TIMESPAN_IN_MINUTES
ARG NX_AUTH0_DOMAIN
ARG NX_AUTH0_CLIENT_ID
ARG NX_AUTH0_CALLBACK_URL
ARG NX_AUTH0_SCOPES
ARG NX_AUTH0_AUDIENCE
ARG NX_APP_ENV

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

ARG VERSION

LABEL name="sus-frontend"
LABEL version={VERSION}
LABEL maintainer="majesnix <majesnix@majesnix.org>"

COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY apps/frontend/nginx/default.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
