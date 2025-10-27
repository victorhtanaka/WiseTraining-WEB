import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
export interface ConfirmDialogData {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
}
export declare class ConfirmDialogComponent {
    dialogRef: MatDialogRef<ConfirmDialogComponent>;
    data: ConfirmDialogData;
    constructor(dialogRef: MatDialogRef<ConfirmDialogComponent>, data: ConfirmDialogData);
    onConfirm(): void;
    onCancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmDialogComponent, "app-confirm-dialog", never, {}, {}, never, never, false, never>;
}
