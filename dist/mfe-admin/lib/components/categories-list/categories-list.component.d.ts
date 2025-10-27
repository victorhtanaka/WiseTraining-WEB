import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'shared-lib';
import { CategoryService } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class CategoriesListComponent implements OnInit {
    private categoryService;
    private dialog;
    private snackBar;
    displayedColumns: string[];
    dataSource: MatTableDataSource<Category, MatPaginator>;
    isLoading: boolean;
    paginator: MatPaginator;
    sort: MatSort;
    constructor(categoryService: CategoryService, dialog: MatDialog, snackBar: MatSnackBar);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    loadCategories(): void;
    applyFilter(event: Event): void;
    openDialog(category?: Category): void;
    deleteCategory(id: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CategoriesListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CategoriesListComponent, "app-categories-list", never, {}, {}, never, never, false, never>;
}
