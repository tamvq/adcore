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
    description: Optional[str] = None
    startDate: Optional[date] = None
    endDate: Optional[date] = None
    price: Optional[float] = None
    currency: Optional[str] = None