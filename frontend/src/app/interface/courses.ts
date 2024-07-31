export interface Courses {
  name: string;
  university: string;
  country: string;
  city: string;
  start: Date | string;
  end: Date | string;
  description?: string;
  price: number;
  currency: string;
}

export interface CoursesTable extends Courses {
  location: string;
  length: number;
  total: string;
}