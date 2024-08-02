import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { getCurrencySymbol } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DateTime } from 'luxon';

import { Course, CoursesTable } from '../interface/course';
import { CourseService } from '../services/course.service';
import { needConfirmation } from '../components/dialog/dialog.decorator';
import { formatDate } from '../shared/utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'course_name',
    'location',
    'start',
    'length',
    'price',
  ];
  dataSource = new MatTableDataSource<CoursesTable>([]);
  searchQuery: string = '';
  totalPage: number = 0;
  private query$ = new Subject<string>();
  constructor(private router: Router, private courseService: CourseService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.onFetch();
    this.query$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((queryInput: string) => {
        this.searchQuery = queryInput;
        this.paginator.pageIndex = 0;
        this.onFetch();
      });
  }

  onClickCreateCourse(): void {
    this.router.navigate(['/create']);
  }

  onClickEditCourse(id: string): void {
    this.router.navigate([`/edit/${id}`]);
  }

  onFetch() {
    const pageIndex = this.paginator?.pageIndex
      ? this.paginator?.pageIndex + 1
      : 1;
    this.courseService
      .getCourses(this.searchQuery, pageIndex, this.paginator?.pageSize)
      .subscribe((res) => {
        this.dataSource.data = res.data.map((row: Course): CoursesTable => {
          return {
            ...row,
            location: `${row.country}, ${row.city}, ${row.university}`,
            length:
              DateTime.fromISO(row.endDate as string)
                .diff(DateTime.fromISO(row.startDate as string), 'days')
                .toObject().days ?? 1,
            total: `${getCurrencySymbol(row.currency, 'narrow')}${row.price}`,
          };
        });
        this.totalPage = res.pagination.total;
      });
  }

  onFetchCoursesWithQuery(_$event?: PageEvent) {
    this.onFetch();
  }

  onSearchChange($event: Event) {
    this.query$.next(($event.target as HTMLInputElement).value);
  }

  @needConfirmation()
  onDeleteCourse(id: string) {
    if (id) {
      this.courseService.deleteCourse(id).subscribe((res) => {
        this.onFetch();
      });
    }
  }

  formatDateColumn(date: string) {
    return formatDate(date);
  }
}
