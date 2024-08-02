from fastapi import APIRouter, HTTPException
from typing import Optional
from bson import ObjectId
from datetime import datetime, date
from .database import db
from .models import Course, CourseUpdate

router = APIRouter()

@router.get("/courses")
def get_courses(search: Optional[str] = None, page: int = 1, limit: int = 10):
    query = {}
    if search:
        query = {"$text": {"$search": search}}
    total = db.courses.count_documents(query)
    courses = list(db.courses.find(query).sort("createdAt", -1).skip((page-1)*limit).limit(limit))
    for course in courses:
        course['id'] = str(course.pop('_id'))
    return {
        "data": courses,
        "pagination": {
            "total": total,
            "page": page,
            "limit": limit
        }
    }

@router.post("/courses")
def create_course(course: Course):
    course_dict = course.dict()
    if 'startDate' in course_dict and isinstance(course_dict['startDate'], date):
        course_dict['startDate'] = datetime.combine(course_dict['startDate'], datetime.min.time())
    if 'endDate' in course_dict and isinstance(course_dict['endDate'], date):
        course_dict['endDate'] = datetime.combine(course_dict['endDate'], datetime.min.time())
    course_dict['createdAt'] = datetime.utcnow()
    result = db.courses.insert_one(course_dict)
    return {"id": str(result.inserted_id)}

@router.put("/courses/{course_id}")
def update_course(course_id: str, course: CourseUpdate):
    if not ObjectId.is_valid(course_id):
        raise HTTPException(status_code=400, detail="Invalid course ID")
    update_data = {k: v for k, v in course.dict().items() if v is not None}
    if 'startDate' in update_data and isinstance(update_data['startDate'], date):
        update_data['startDate'] = datetime.combine(update_data['startDate'], datetime.min.time())
    if 'endDate' in update_data and isinstance(update_data['endDate'], date):
        update_data['endDate'] = datetime.combine(update_data['endDate'], datetime.min.time())
    result = db.courses.update_one({"_id": ObjectId(course_id)}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"success": True}

@router.delete("/courses/{course_id}")
def delete_course(course_id: str):
    if not ObjectId.is_valid(course_id):
        raise HTTPException(status_code=400, detail="Invalid course ID")
    result = db.courses.delete_one({"_id": ObjectId(course_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"success": True}

@router.get("/courses/{course_id}")
def get_course(course_id: str):
    if not ObjectId.is_valid(course_id):
        raise HTTPException(status_code=400, detail="Invalid course ID")
    course = db.courses.find_one({"_id": ObjectId(course_id)})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    course['id'] = str(course.pop('_id'))
    return course

@router.get("/universities")
def get_universities():
    universities = db.courses.distinct("university")
    return {"universities": universities}

@router.get("/countries")
def get_countries():
    countries = db.courses.distinct("country")
    return {"countries": countries}

@router.get("/cities")
def get_cities():
    cities = db.courses.distinct("city")
    return {"cities": cities}

@router.delete("/courses")
def delete_all_courses():
    result = db.courses.delete_many({})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="No courses found to delete")
    return {"deleted_count": result.deleted_count}
