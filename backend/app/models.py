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
    university: Optional[str]
    city: Optional[str]
    country: Optional[str]
    name: Optional[str]
    description: Optional[str]
    startDate: Optional[date]
    endDate: Optional[date]
    price: Optional[float]
    currency: Optional[str]
