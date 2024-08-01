from fastapi import APIRouter, HTTPException
from typing import Optional
from bson import ObjectId
from .database import db
from .models import Course, CourseUpdate

router = APIRouter()

@router.get("/courses")
def get_courses(search: Optional[str] = None, page: int = 1, limit: int = 10):
    query = {}
    if search:
        query = {"$text": {"$search": search}}
    courses = db.courses.find(query).skip((page-1)*limit).limit(limit)
    total = db.courses.count_documents(query)
    return {"total": total, "courses": list(courses)}

@router.post("/course")
def create_course(course: Course):
    course_dict = course.dict()
    course_dict['createdAt'] = datetime.utcnow()
    result = db.courses.insert_one(course_dict)
    return {"id": str(result.inserted_id)}

@router.put("/course/{course_id}")
def update_course(course_id: str, course: CourseUpdate):
    if not ObjectId.is_valid(course_id):
        raise HTTPException(status_code=400, detail="Invalid course ID")
    update_data = {k: v for k, v in course.dict().items() if v is not None}
    result = db.courses.update_one({"_id": ObjectId(course_id)}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"success": True}

@router.delete("/course/{course_id}")
def delete_course(course_id: str):
    if not ObjectId.is_valid(course_id):
        raise HTTPException(status_code=400, detail="Invalid course ID")
    result = db.courses.delete_one({"_id": ObjectId(course_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"success": True}

@router.get("/autocomplete/universities")
def get_universities():
    universities = db.courses.distinct("university")
    return {"universities": universities}

@router.get("/autocomplete/countries")
def get_countries():
    countries = db.courses.distinct("country")
    return {"countries": countries}

@router.get("/autocomplete/cities")
def get_cities():
    cities = db.courses.distinct("city")
    return {"cities": cities}
