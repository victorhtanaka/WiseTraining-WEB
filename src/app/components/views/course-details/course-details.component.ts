import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  standalone: false
})
export class CourseDetailsComponent implements OnInit {
  course: Course;
  isLoading = true;
  courseOwned = false;
  errorMessage: string;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadCourse(courseId);
    } else {
      this.errorMessage = 'ID do curso não especificado';
      this.isLoading = false;
    }
  }

  loadCourse(courseId: string): void {
    this.isLoading = true;
    this.courseService.getCourse(parseInt(courseId)).subscribe({
      next: (course) => {
        this.course = course;
        this.checkCourseOwnership(courseId);
      },
      error: (error) => {
        console.error('Erro ao carregar o curso:', error);
        this.errorMessage = 'Não foi possível carregar o curso. Por favor, tente novamente mais tarde.';
        this.isLoading = false;
      }
    });
  }

  checkCourseOwnership(courseId: string): void {
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser && currentUser.companyId) {
      this.courseService.isCourseOwnedByCompany(parseInt(courseId), currentUser.companyId).subscribe({
        next: (owned) => {
          this.courseOwned = owned;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao verificar propriedade do curso:', error);
          this.courseOwned = false;
          this.isLoading = false;
        }
      });
    } else {
      this.courseOwned = false;
      this.isLoading = false;
    }
  }

  purchaseCourse(): void {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser || currentUser.role !== 'Company') {
      this.snackBar.open('Você precisa estar logado como empresa para comprar este curso.', 'Fechar', {
        duration: 5000
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Compra',
        message: `Deseja realmente adquirir o curso "${this.course.title}" por R$ ${this.course.price.toFixed(2)}?`,
        confirmText: 'Comprar',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        
        const courseId = this.course.id || 0;
        const companyId = currentUser.companyId || 0;
        this.courseService.purchaseCourse(courseId, companyId).subscribe({
          next: (response) => {
            this.snackBar.open('Curso adquirido com sucesso!', 'Fechar', {
              duration: 5000
            });
            this.courseOwned = true;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Erro ao comprar o curso:', error);
            this.snackBar.open('Ocorreu um erro ao adquirir o curso. Por favor, tente novamente.', 'Fechar', {
              duration: 5000
            });
            this.isLoading = false;
          }
        });
      }
    });
  }

  goBackToCatalog(): void {
    this.router.navigate(['/course-catalog']);
  }
}
