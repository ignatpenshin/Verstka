# Verstka API Server

FastAPI backend for project management, authentication, and orchestration.

## Features

- RESTful API for project and file management
- Authentication and authorization
- Integration with storage (S3/MinIO)
- Database management (PostgreSQL)
- Render service orchestration

## Development

```bash
poetry install
poetry run python -m src.main
```

Or with uvicorn:

```bash
poetry run uvicorn src.main:app --reload
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `DATABASE_URL`: PostgreSQL connection URL
- `REDIS_URL`: Redis connection URL
- `SECRET_KEY`: JWT secret key
- `S3_ENDPOINT`: S3/MinIO endpoint
- `S3_ACCESS_KEY`: S3 access key
- `S3_SECRET_KEY`: S3 secret key
- `S3_BUCKET`: S3 bucket name
