from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI', 'mongodb://db:27017/')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'adcore')

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

db.courses.create_index([
    ("university", "text"),
    ("city", "text"),
    ("country", "text"),
    ("name", "text"),
    ("description", "text")
], name="course_text_index")
