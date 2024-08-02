from pydantic import BaseModel
from typing import Optional
from datetime import date

class Course(BaseModel):
    university: str
    city: str
    country: str
    name: str
    description: str
    startDate: date
    endDate: date
    price: float
    currency: str

class CourseUpdate(BaseModel):
    university: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    startDate: Optional[date] = None
    endDate: Optional[date] = None
    price: Optional[float] = None
    currency: Optional[str] = None