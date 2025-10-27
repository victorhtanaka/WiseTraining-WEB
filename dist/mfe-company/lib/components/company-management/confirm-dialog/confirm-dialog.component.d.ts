import { MatDialogRef } from '@angular/material/dialog';
import { Group } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class ConfirmDialogComponent {
    dialogRef: MatDialogRef<ConfirmDialogComponent>;
    data: {
        group: Group;
        isAdminGroup: boolean;
        message?: string;
    };
    constructor(dialogRef: MatDialogRef<ConfirmDialogComponent>, data: {
        group: Group;
        isAdminGroup: boolean;
        message?: string;
    });
    onCancel(): void;
    onConfirm(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmDialogComponent, "app-confirm-dialog", never, {}, {}, never, never, false, never>;
}
