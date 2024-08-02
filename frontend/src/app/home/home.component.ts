import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

import { Courses, CoursesTable } from '../interface/courses';
import { TABLE_DATA } from '../shared/constants';
import { DateTime } from 'luxon';
import { getCurrencySymbol } from '@angular/common';
import { Router } from '@angular/router';

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
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'course_name',
    'location',
    'start',
    'length',
    'price',
  ];
  dataSource = new MatTableDataSource<CoursesTable>([]);
  constructor(private router: Router) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.data = TABLE_DATA.map((row: Courses): CoursesTable => {
      return {
        ...row,
        location: `${row.country}, ${row.city}, ${row.university}`,
        length:
          DateTime.fromISO(row.end as string)
            .diff(DateTime.fromISO(row.start as string), 'days')
            .toObject().days ?? 1,
        total: `${getCurrencySymbol(row.currency, 'narrow')}${row.price}`,
      };
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onClickCreateCourse(): void {
    this.router.navigate(['/create']);
  }

  onClickEditCourse(id: string): void {
    this.router.navigate([`/edit/${id}`]);
  }
}
