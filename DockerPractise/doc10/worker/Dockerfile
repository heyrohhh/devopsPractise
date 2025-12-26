FROM python:alpine
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Baaki ka CMD commands...

# Start the Celery worker
# 'tasks' is the filename tasks.py
CMD ["celery", "-A", "tasks", "worker", "--loglevel=info"]