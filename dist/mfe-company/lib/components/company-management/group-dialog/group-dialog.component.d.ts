import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Group } from 'shared-lib';
import * as i0 from "@angular/core";
interface DialogData {
    group?: Group;
    companyId: number;
    isEditMode: boolean;
    existingGroups: Group[];
}
export declare class GroupDialogComponent implements OnInit {
    private fb;
    dialogRef: MatDialogRef<GroupDialogComponent>;
    data: DialogData;
    groupForm: FormGroup;
    dialogTitle: string;
    constructor(fb: FormBuilder, dialogRef: MatDialogRef<GroupDialogComponent>, data: DialogData);
    ngOnInit(): void;
    initForm(): void;
    onCancel(): void;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GroupDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GroupDialogComponent, "app-group-dialog", never, {}, {}, never, never, false, never>;
}
export {};
