import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Course } from 'shared-lib';
import { CourseSearchParams } from 'shared-lib';
import { Category } from 'shared-lib';
import { Tag } from 'shared-lib';
import { CourseService } from 'shared-lib';
import { CategoryService } from 'shared-lib';
import { TagService } from 'shared-lib';
import { AuthService } from 'shared-lib';

@Component({
  selector: 'app-course-catalog',
  templateUrl: './course-catalog.component.html',
  styleUrls: ['./course-catalog.component.scss'],
  standalone: false
})
export class CourseCatalogComponent implements OnInit {
  courses: Course[] = [];
  categories: Category[] = [];
  tags: Tag[] = [];
  languages: string[] = [];
  uniqueLanguages = new Set<string>();
  
  searchForm: FormGroup;
  isLoading = true;
  
  // Pagination
  totalCourses = 0;
  pageSize = 6;
  currentPage = 0;
  pageSizeOptions: number[] = [6, 12, 24, 48];
  
  // User info
  companyId: number;
  userRole: string;

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCurrentUser();
    this.loadFilterData();
  }

  private initForm(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
      categoryId: [null],
      language: [''],
      tagIds: [[]],
      minPrice: [null],
      maxPrice: [null]
    });
  }

  private loadCurrentUser(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userRole = user.role || '';
      
      // Verificar se o usuário tem permissão para acessar esta página
      if (this.userRole !== 'Company') {
        this.snackBar.open('Você não tem permissão para acessar esta página.', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/Dashboard']);
      } else {
        this.searchCourses();
      }
    } else {
      this.snackBar.open('Você precisa estar logado para acessar esta página.', 'Fechar', {
        duration: 3000
      });
      this.router.navigate(['/Login']);
    }
  }

  private loadFilterData(): void {
    forkJoin({
      categories: this.categoryService.getAll(),
      tags: this.tagService.getAll()
    }).subscribe({
      next: (results) => {
        this.categories = results.categories;
        this.tags = results.tags;
      },
      error: (error) => {
        console.error('Erro ao carregar dados de filtro:', error);
      }
    });
  }

  searchCourses(): void {
    this.isLoading = true;
    
    const searchParams: CourseSearchParams = {
      ...this.searchForm.value,
      onlyPublished: true,
      page: this.currentPage + 1, // API usa página 1-indexada
      pageSize: this.pageSize
    };
    
    this.courseService.searchCourses(searchParams).subscribe({
      next: (result) => {
        this.courses = result.courses;
        this.totalCourses = result.totalCount;
        
        // Extrair idiomas únicos dos cursos
        this.courses.forEach(course => {
          if (course.language) {
            this.uniqueLanguages.add(course.language);
          }
        });
        
        this.languages = Array.from(this.uniqueLanguages).sort();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar cursos:', error);
        this.snackBar.open('Erro ao buscar cursos. Tente novamente.', 'Fechar', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.searchCourses();
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.searchCourses();
  }

  resetFilters(): void {
    this.searchForm.reset({
      searchTerm: '',
      categoryId: null,
      language: '',
      tagIds: [],
      minPrice: null,
      maxPrice: null
    });
    this.currentPage = 0;
    this.searchCourses();
  }

  viewCourse(courseId: number): void {
    this.router.navigate(['/course-details', courseId]);
  }
}

