import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

// Components (will be created)
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseCreateComponent } from './components/course-create/course-create.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseCatalogComponent } from './components/course-catalog/course-catalog.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';

const routes: Routes = [
  { path: '', component: CoursesListComponent },
  { path: 'create', component: CourseCreateComponent },
  { path: 'edit/:courseId', component: CourseCreateComponent },
  { path: 'detail/:courseId', component: CourseDetailComponent },
  { path: 'catalog', component: CourseCatalogComponent },
  { path: 'details/:id', component: CourseDetailsComponent }
];

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseCreateComponent,
    CourseDetailComponent,
    CourseCatalogComponent,
    CourseDetailsComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatTabsModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatListModule
  ]
})
export class CoursesModule { }
