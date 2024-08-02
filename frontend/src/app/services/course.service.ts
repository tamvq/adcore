import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '../interface/course';
import { ISuccessListResponse } from '../interface/response';


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'https://api.adcore.tsohlacol.xyz';

  constructor(private http: HttpClient) {}

  getCourses(searchText: string = '', page: number = 1, pageSize: number = 10): Observable<ISuccessListResponse<Course>> {
    let params = new HttpParams()
      .set('search', searchText)
      .set('page', page.toString())
      .set('limit', pageSize.toString());
    return this.http.get<ISuccessListResponse<Course>>(`${this.apiUrl}/courses`, { params });
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses`, course);
  }

  updateCourse(id: string, course: Course): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/courses/${id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }
}
