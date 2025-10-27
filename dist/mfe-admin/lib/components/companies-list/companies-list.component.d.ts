import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'shared-lib';
import { CompanyService } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class CompaniesListComponent implements OnInit {
    private companyService;
    private dialog;
    private snackBar;
    displayedColumns: string[];
    dataSource: MatTableDataSource<Company, MatPaginator>;
    isLoading: boolean;
    paginator: MatPaginator;
    sort: MatSort;
    constructor(companyService: CompanyService, dialog: MatDialog, snackBar: MatSnackBar);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    loadCompanies(): void;
    applyFilter(event: Event): void;
    openDialog(company?: Company): void;
    deleteCompany(id: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CompaniesListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CompaniesListComponent, "app-companies-list", never, {}, {}, never, never, false, never>;
}
