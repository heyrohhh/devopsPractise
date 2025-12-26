import os
import time
from celery import Celery

# Connect to the same Redis instance as the API
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
app = Celery("tasks", broker=CELERY_BROKER_URL)

@app.task(name="tasks.process_data")
def process_data(name):
    print(f"[*] Starting heavy processing for: {name}")
    # Simulate a long task (e.g., image processing or report generation)
    time.sleep(10) 
    print(f"[!] Finished processing for: {name}")
    return f"Result: {name} processed"