FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY . .

RUN npm run build

FROM node:20-alpine

USER node
WORKDIR /app

COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]