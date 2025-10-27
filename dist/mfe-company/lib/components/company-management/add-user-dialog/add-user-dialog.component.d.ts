import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'shared-lib';
import * as i0 from "@angular/core";
interface DialogData {
    companyId: number;
    groupId: number;
    existingUsers: User[];
    groupUsers: User[];
}
export declare class AddUserDialogComponent implements OnInit {
    dialogRef: MatDialogRef<AddUserDialogComponent>;
    data: DialogData;
    availableUsers: User[];
    selectedUserId: number | null;
    constructor(dialogRef: MatDialogRef<AddUserDialogComponent>, data: DialogData);
    ngOnInit(): void;
    filterAvailableUsers(): void;
    onCancel(): void;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddUserDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddUserDialogComponent, "app-add-user-dialog", never, {}, {}, never, never, false, never>;
}
export {};
