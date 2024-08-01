from datetime import datetime
from pymongo import MongoClient
from .database import db

def normalize_course_data(df):
    # Rename the DataFrame columns to use underscores instead of spaces
    df.columns = [
        'university', 'city', 'country', 'name', 'description',
        'startDate', 'endDate', 'price', 'currency'
    ]
    
    # Convert DataFrame to a list of dictionaries
    courses = df.to_dict(orient='records')
    
    # Add a timestamp to each course record
    for course in courses:
        course['createdAt'] = datetime.utcnow()
    
    # Insert the list of courses into the MongoDB collection
    db.courses.insert_many(courses)
