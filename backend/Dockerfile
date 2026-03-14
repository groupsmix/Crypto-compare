FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create data directory for SQLite
RUN mkdir -p /app/data

EXPOSE 8000

# Seed database and start server
CMD python seed_data.py && uvicorn app.main:app --host 0.0.0.0 --port 8000
