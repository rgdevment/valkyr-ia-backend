Work in progress

Iniciar desarrollo:

    cp .env.example .env
    docker compose up --build

Iniciar producción:

    docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up --build -d

Ejecutar migraciones manualmente:

    docker compose exec app npx prisma migrate deploy


