# stage 1 - build backend
FROM node:alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN apk add --update \
  && apk add --no-cache ca-certificates \
  && apk add --no-cache --virtual .build-deps curl make gcc g++ python3 \
  && yarn --frozen-lockfile \
  && yarn global add nx \
  && apk del .build-deps

COPY . .

RUN nx build backend --prod

# stage 2 - build final image
FROM node:alpine

ARG VERSION

LABEL name="sus-backend"
LABEL version=${VERSION}
LABEL maintainer="majesnix <majesnix@majesnix.org>"

WORKDIR /backend

COPY --from=builder /app/dist/apps/backend /backend/dist
COPY --from=builder /app/package.json /backend
COPY --from=builder /app/yarn.lock /backend

RUN apk add --update \
  && apk add --no-cache ca-certificates \
  && apk add --no-cache --virtual .build-deps curl \
  && yarn --frozen-lockfile \
  && apk del .build-deps

EXPOSE 4200

CMD ["node", "dist/main.js"]
