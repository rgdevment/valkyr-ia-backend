FROM arm64v8/node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production

FROM arm64v8/node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production \
    PORT=3000

HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -qO- http://localhost:${PORT}/api/health || exit 1

EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]
