import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'shared-lib';
import { UserService } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class UsersListComponent implements OnInit {
    private userService;
    private dialog;
    private snackBar;
    displayedColumns: string[];
    dataSource: MatTableDataSource<User, MatPaginator>;
    isLoading: boolean;
    paginator: MatPaginator;
    sort: MatSort;
    constructor(userService: UserService, dialog: MatDialog, snackBar: MatSnackBar);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    loadUsers(): void;
    applyFilter(event: Event): void;
    openDialog(user?: User): void;
    deleteUser(id: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UsersListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UsersListComponent, "app-users-list", never, {}, {}, never, never, false, never>;
}
