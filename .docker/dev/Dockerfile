# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=22.14.0
FROM arm64v8/node:${NODE_VERSION}-alpine

RUN apk add --no-cache \
    dumb-init \
    curl

RUN addgroup -S appuser && \
    adduser -S appuser -G appuser && \
    mkdir -p /app && \
    chown -R appuser:appuser /app

WORKDIR /app

COPY --chown=appuser:appuser .docker/scripts/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

COPY --chown=appuser:appuser package.json package-lock.json* ./
RUN npm ci --include=dev --prefer-offline --no-audit --no-fund

COPY --chown=appuser:appuser . .

USER appuser

ENV NODE_OPTIONS="--enable-source-maps" \
    PORT=${APP_PORT} \
    HOST=0.0.0.0

EXPOSE ${APP_PORT}
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD curl -f http://localhost:${APP_PORT}/api/health || exit 1

ENTRYPOINT ["dumb-init", "--", "/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "start:dev"]
