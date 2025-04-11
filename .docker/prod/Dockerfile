# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=22.14.0
FROM arm64v8/node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./
RUN npm ci --production --prefer-offline --no-audit --no-fund

COPY . .
RUN npm run build

FROM arm64v8/node:${NODE_VERSION}-alpine

RUN apk add --no-cache dumb-init && \
    addgroup -S appuser && \
    adduser -S appuser -G appuser

WORKDIR /app

COPY --chown=appuser:appuser --from=builder /app/node_modules ./node_modules
COPY --chown=appuser:appuser --from=builder /app/dist ./dist
COPY --chown=appuser:appuser package.json .

COPY --chown=appuser:appuser .docker/scripts/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

USER appuser

ENV NODE_ENV=production \
    NODE_OPTIONS="--enable-source-maps" \
    PORT=${APP_PORT}

EXPOSE ${APP_PORT}
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
    CMD curl -f http://localhost:${APP_PORT}/api/health || exit 1

ENTRYPOINT ["dumb-init", "--", "/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "start:prod"]
