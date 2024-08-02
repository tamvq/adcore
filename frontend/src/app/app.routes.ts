import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateEditCourseComponent } from './create-edit-course/create-edit-course.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateEditCourseComponent },
  { path: 'edit/:id', component: CreateEditCourseComponent },
];
