import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyFormDialogComponent } from './company-form-dialog/company-form-dialog.component';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
  standalone: false
})
export class CompaniesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'domain', 'actions'];
  dataSource = new MatTableDataSource<Company>();
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCompanies(): void {
    this.isLoading = true;
    this.companyService.getAll().subscribe({
      next: (companies) => {
        this.dataSource.data = companies;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading companies: ' + error.message, 'Close', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(company?: Company): void {
    const dialogRef = this.dialog.open(CompanyFormDialogComponent, {
      width: '600px',
      data: company ? { ...company } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCompanies();
      }
    });
  }

  deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Company deleted successfully!', 'Close', {
            duration: 3000
          });
          this.loadCompanies();
        },
        error: (error) => {
          this.snackBar.open('Error deleting company: ' + error.message, 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
