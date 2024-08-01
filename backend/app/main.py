from fastapi import FastAPI
from .database import db
from .schemas import normalize_course_data
from .utils import download_and_normalize_csv
from .routes import router
import os
import schedule
import time
import threading

app = FastAPI()

def clear_and_load_data():
    db.courses.delete_many({})
    url = os.getenv('COURSE_DATA_URL')
    df = download_and_normalize_csv(url)
    normalize_course_data(df)

@app.on_event("startup")
def startup_event():
    schedule.every(10).minutes.do(clear_and_load_data)

    def run_scheduler():
        while True:
            schedule.run_pending()
            time.sleep(1)
    
    scheduler_thread = threading.Thread(target=run_scheduler)
    scheduler_thread.start()

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv('PORT', 8000)))
