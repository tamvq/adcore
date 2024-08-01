from fastapi import FastAPI
from dotenv import load_dotenv
import os
from .database import db
from .schemas import normalize_course_data
from .utils import download_and_normalize_csv
from .routes import router

load_dotenv()

app = FastAPI()

COURSE_DATA_URL = os.getenv("COURSE_DATA_URL")

@app.on_event("startup")
def startup_event():
    if db.courses.count_documents({}) == 0:
        df = download_and_normalize_csv(COURSE_DATA_URL)
        normalize_course_data(df)

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
