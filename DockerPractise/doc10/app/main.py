from fastapi import FastAPI
from celery import Celery
import os
import psycopg2

app = FastAPI()

# Celery configuration - Note: 'redis' will be the name of your docker service
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
celery_app = Celery("tasks", broker=CELERY_BROKER_URL)

@app.get("/")
def read_root():
    return {"status": "API is running"}

@app.get("/trigger-task")
def trigger_task(name: str):
    # This sends a task to the 'worker' via Redis
    celery_app.send_task("tasks.process_data", args=[name])
    return {"message": f"Task for {name} has been queued!"}

@app.get("/db-check")
def db_check():
    # Simple check to see if we can connect to Postgres
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("POSTGRES_DB"),
            user=os.getenv("POSTGRES_USER"),
            password=os.getenv("POSTGRES_PASSWORD"),
            host="db" # Name of the postgres service in docker-compose
        )
        return {"status": "Connected to Postgres successfully!"}
    except Exception as e:
        return {"error": str(e)}