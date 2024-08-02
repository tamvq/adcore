export interface Course {
  id?: string;
  name: string;
  university: string;
  country: string;
  city: string;
  startDate: Date | string;
  endDate: Date | string;
  description?: string;
  price: number;
  currency: string;
}

export interface CoursesTable extends Course {
  location: string;
  length: number;
  total: string;
}