# stage 1 - build react app
FROM node:alpine

WORKDIR /app

COPY ./package.json ./pnpm-lock.json

RUN apk add --update \
  && apk add --no-cache ca-certificates \
  && curl -L https://unpkg.com/@pnpm/self-installer | node \
  && pnpm i

COPY . .

RUN pnpm run build

# stage 2 - build final image
FROM nginx:alpine

LABEL name "simple-url-shortener-frontend"
LABEL version "0.0.0"
LABEL maintainer "majesnix <majesnix@majesnix.com>"

COPY --from=build /app/dist /user/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
