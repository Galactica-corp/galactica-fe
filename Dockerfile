# for github actions https://pnpm.io/continuous-integration#github-actions

FROM node:18-alpine AS base
RUN apk add g++ make py3-pip
RUN npm i -g pnpm

FROM base AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
COPY . .
ENV VITE_SNAP_ID=npm:@galactica-net/snap
RUN pnpm run build


FROM nginx AS runner
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 80
