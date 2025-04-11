#!/bin/sh
set -e

if [ "$NODE_ENV" = "development" ]; then
    echo "🧹 clear dist..."
    rm -rf /app/dist
fi

if [ "$NEST_DEBUG" = "true" ]; then
    echo "🐛 Debug mode enabled on port $NEST_DEBUG_PORT"
    export NODE_OPTIONS="${NODE_OPTIONS} --inspect=0.0.0.0:${NEST_DEBUG_PORT}"
fi

exec "$@"
