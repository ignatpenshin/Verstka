FROM python:3.11-slim

WORKDIR /app

# Install system dependencies including Pandoc and TeXLive
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    pandoc \
    texlive-latex-base \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    texlive-xetex \
    chromium \
    fonts-liberation && \
    rm -rf /var/lib/apt/lists/*

# Install poetry
RUN pip install poetry

# Copy project files
COPY apps/render-service/pyproject.toml ./
COPY apps/render-service/poetry.lock* ./

# Install dependencies
RUN poetry config virtualenvs.create false && \
    poetry install --no-dev --no-root

# Copy source
COPY apps/render-service/src ./src

EXPOSE 8001

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8001"]
