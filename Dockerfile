FROM node:14-alpine

LABEL name "simple-url-shortener"
LABEL version "1.0.0"
LABEL maintainer "majesnix <majesnix@majesnix.com>"

WORKDIR /usr/src/majesurl

COPY package.json pnpm-lock.yaml ./

RUN apk add --update \
	&& apk add --no-cache ca-certificates \
	&& apk add --no-cache --virtual .build-deps curl \
	&& curl -L https://unpkg.com/@pnpm/self-installer | node \
	&& pnpm i \
	&& apk del .build-deps

COPY . .

EXPOSE 3000

RUN pnpm run build

CMD ["node", "dist/main.js"]
