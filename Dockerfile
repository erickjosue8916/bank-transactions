FROM node:12-alpine as base

WORKDIR /app

FROM base as builder
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production

FROM base as release
COPY --from=builder /app/lib/ ./
COPY --from=builder /app/node_modules/ ./node_modules/

CMD ["node", "."]