import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/static/header/header.component';
import { BodyComponent } from './components/static/body/body.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { SnackbarInterceptor } from './interceptor/snackbar.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/views/login/login.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { RegisterComponent } from './components/views/register/register.component';
import { UnloggedComponent } from './components/views/unlogged/unlogged.component';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { CoursesListComponent } from './components/views/courses-list/courses-list.component';
import { CourseDetailComponent } from './components/views/course-detail/course-detail.component';
import { CourseCreateComponent } from './components/views/course-create/course-create.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserProfileComponent } from './components/views/user-profile/user-profile.component';
import { UsersListComponent } from './components/views/users-list/users-list.component';
import { UserFormDialogComponent } from './components/views/users-list/user-form-dialog/user-form-dialog.component';
import { CategoriesListComponent } from './components/views/categories-list/categories-list.component';
import { CategoryFormDialogComponent } from './components/views/categories-list/category-form-dialog/category-form-dialog.component';
import { CompaniesListComponent } from './components/views/companies-list/companies-list.component';
import { CompanyFormDialogComponent } from './components/views/companies-list/company-form-dialog/company-form-dialog.component';
import { CompanyManagementComponent } from './components/views/company-management/company-management.component';
import { AddUserDialogComponent } from './components/views/company-management/add-user-dialog/add-user-dialog.component';
import { GroupDialogComponent } from './components/views/company-management/group-dialog/group-dialog.component';
import { ConfirmDialogComponent } from './components/views/company-management/confirm-dialog/confirm-dialog.component';
import { CourseCatalogComponent } from './components/views/course-catalog/course-catalog.component';
import { CourseDetailsComponent } from './components/views/course-details/course-details.component';
import { ConfirmDialogComponent as SharedConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { CompanyRegisterComponent } from './components/views/company-register/company-register.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        BodyComponent,
        LoginComponent,
        RegisterComponent,
        UnloggedComponent,
        DashboardComponent,
        CoursesListComponent,
        CourseCreateComponent,
        CourseDetailComponent,
        CompanyRegisterComponent,
        UserProfileComponent,
        UsersListComponent,
        UserFormDialogComponent,
        CategoriesListComponent,
        CategoryFormDialogComponent,
        CompaniesListComponent,
        CompanyFormDialogComponent,
        CompanyManagementComponent,
        AddUserDialogComponent,
        GroupDialogComponent,
        ConfirmDialogComponent,
        CourseCatalogComponent,
        CourseDetailsComponent
    ],
    bootstrap: [
        AppComponent
    ], imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        MatStepperModule,
        DragDropModule,
        MatChipsModule
    ],
    providers: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SpinnerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SnackbarInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
