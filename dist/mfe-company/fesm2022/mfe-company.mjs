import * as i0 from '@angular/core';
import { Inject, Component, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1$1 from '@angular/forms';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as i6 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i5$1 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i8 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i9 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i4 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i11 from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import * as i1 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i5 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i12 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import * as i13 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i14 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i15 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import * as i8$1 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i1$2 from 'shared-lib';
import * as i3 from '@angular/material/snack-bar';

class AddUserDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.availableUsers = [];
        this.selectedUserId = null;
    }
    ngOnInit() {
        this.filterAvailableUsers();
    }
    filterAvailableUsers() {
        // Filtrar usuários que já pertencem a este grupo
        const existingUserIds = this.data.groupUsers.map(user => user.id);
        this.availableUsers = this.data.existingUsers.filter(user => !existingUserIds.includes(user.id));
    }
    onCancel() {
        this.dialogRef.close();
    }
    onSubmit() {
        if (this.selectedUserId) {
            this.dialogRef.close({ userId: this.selectedUserId });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AddUserDialogComponent, deps: [{ token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: AddUserDialogComponent, isStandalone: false, selector: "app-add-user-dialog", ngImport: i0, template: "<h2 mat-dialog-title>Adicionar Usu\u00E1rio ao Grupo</h2>\r\n\r\n<mat-dialog-content>\r\n  <div *ngIf=\"availableUsers.length > 0\">\r\n    <p>Selecione um usu\u00E1rio para adicionar ao grupo:</p>\r\n    \r\n    <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n      <mat-label>Selecionar Usu\u00E1rio</mat-label>\r\n      <mat-select [(value)]=\"selectedUserId\">\r\n        <mat-option *ngFor=\"let user of availableUsers\" [value]=\"user.id\">\r\n          {{user.fullName}} ({{user.email}})\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  \r\n  <div *ngIf=\"availableUsers.length === 0\">\r\n    <p>N\u00E3o h\u00E1 usu\u00E1rios dispon\u00EDveis para adicionar a este grupo.</p>\r\n  </div>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button (click)=\"onCancel()\">Cancelar</button>\r\n  <button mat-raised-button color=\"primary\" [disabled]=\"!selectedUserId\" (click)=\"onSubmit()\">\r\n    Adicionar\r\n  </button>\r\n</mat-dialog-actions>", styles: [".full-width{width:100%;margin-bottom:15px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "component", type: i8.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "directive", type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "component", type: i5.MatSelect, selector: "mat-select", inputs: ["aria-describedby", "panelClass", "disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator", "placeholder", "required", "multiple", "disableOptionCentering", "compareWith", "value", "aria-label", "aria-labelledby", "errorStateMatcher", "typeaheadDebounceInterval", "sortComparator", "id", "panelWidth", "canSelectNullableOptions"], outputs: ["openedChange", "opened", "closed", "selectionChange", "valueChange"], exportAs: ["matSelect"] }, { kind: "component", type: i5.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AddUserDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-add-user-dialog', standalone: false, template: "<h2 mat-dialog-title>Adicionar Usu\u00E1rio ao Grupo</h2>\r\n\r\n<mat-dialog-content>\r\n  <div *ngIf=\"availableUsers.length > 0\">\r\n    <p>Selecione um usu\u00E1rio para adicionar ao grupo:</p>\r\n    \r\n    <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n      <mat-label>Selecionar Usu\u00E1rio</mat-label>\r\n      <mat-select [(value)]=\"selectedUserId\">\r\n        <mat-option *ngFor=\"let user of availableUsers\" [value]=\"user.id\">\r\n          {{user.fullName}} ({{user.email}})\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  \r\n  <div *ngIf=\"availableUsers.length === 0\">\r\n    <p>N\u00E3o h\u00E1 usu\u00E1rios dispon\u00EDveis para adicionar a este grupo.</p>\r\n  </div>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button (click)=\"onCancel()\">Cancelar</button>\r\n  <button mat-raised-button color=\"primary\" [disabled]=\"!selectedUserId\" (click)=\"onSubmit()\">\r\n    Adicionar\r\n  </button>\r\n</mat-dialog-actions>", styles: [".full-width{width:100%;margin-bottom:15px}\n"] }]
        }], ctorParameters: () => [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }] });

class GroupDialogComponent {
    constructor(fb, dialogRef, data) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
        this.dialogTitle = this.data.isEditMode ? 'Editar Grupo' : 'Novo Grupo';
        this.initForm();
    }
    initForm() {
        this.groupForm = this.fb.group({
            id: [this.data.group?.id || 0],
            name: [this.data.group?.name || '', [Validators.required, Validators.maxLength(100)]],
            description: [this.data.group?.description || '', [Validators.maxLength(200)]],
            companyId: [this.data.companyId]
        });
    }
    onCancel() {
        this.dialogRef.close();
    }
    onSubmit() {
        if (this.groupForm.valid) {
            const groupData = this.groupForm.value;
            const groupName = groupData.name.toLowerCase();
            // Verificar se é o grupo Admin sendo editado
            if (this.data.isEditMode && this.data.group?.name.toLowerCase() === 'admin') {
                alert('Não é permitido editar o grupo Admin.');
                return;
            }
            // Verificar se está tentando criar um novo grupo com o nome "Admin"
            if (!this.data.isEditMode && groupName === 'admin') {
                alert('O nome "Admin" é reservado para o grupo padrão do sistema.');
                return;
            }
            // Verificar se está tentando renomear um grupo para "Admin"
            if (this.data.isEditMode && this.data.group?.name.toLowerCase() !== 'admin' && groupName === 'admin') {
                alert('O nome "Admin" é reservado para o grupo padrão do sistema.');
                return;
            }
            // Verificar se já existe um grupo com esse nome
            const nameExists = this.data.existingGroups.some(g => g.name.toLowerCase() === groupName && g.id !== groupData.id);
            if (nameExists) {
                alert('Já existe um grupo com este nome na empresa.');
                return;
            }
            this.dialogRef.close(groupData);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: GroupDialogComponent, deps: [{ token: i1$1.FormBuilder }, { token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: GroupDialogComponent, isStandalone: false, selector: "app-group-dialog", ngImport: i0, template: "<h2 mat-dialog-title>{{ dialogTitle }}</h2>\r\n<form [formGroup]=\"groupForm\" (ngSubmit)=\"onSubmit()\">\r\n  <mat-dialog-content>\r\n    <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n      <mat-label>Nome do Grupo</mat-label>\r\n      <input matInput formControlName=\"name\" placeholder=\"Nome do grupo\">\r\n      <mat-error *ngIf=\"groupForm.get('name')?.hasError('required')\">\r\n        Nome do grupo \u00E9 obrigat\u00F3rio\r\n      </mat-error>\r\n      <mat-error *ngIf=\"groupForm.get('name')?.hasError('maxlength')\">\r\n        Nome do grupo deve ter no m\u00E1ximo 100 caracteres\r\n      </mat-error>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n      <mat-label>Descri\u00E7\u00E3o</mat-label>\r\n      <textarea matInput formControlName=\"description\" placeholder=\"Descri\u00E7\u00E3o do grupo\" rows=\"3\"></textarea>\r\n      <mat-error *ngIf=\"groupForm.get('description')?.hasError('maxlength')\">\r\n        Descri\u00E7\u00E3o deve ter no m\u00E1ximo 200 caracteres\r\n      </mat-error>\r\n    </mat-form-field>\r\n  </mat-dialog-content>\r\n\r\n  <mat-dialog-actions align=\"end\">\r\n    <button mat-button type=\"button\" (click)=\"onCancel()\">Cancelar</button>\r\n    <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"groupForm.invalid\">Salvar</button>\r\n  </mat-dialog-actions>\r\n</form>", styles: [".full-width{width:100%;margin-bottom:15px}mat-dialog-content{padding-top:10px;min-width:350px}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i5$1.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i8.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "directive", type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: GroupDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-group-dialog', standalone: false, template: "<h2 mat-dialog-title>{{ dialogTitle }}</h2>\r\n<form [formGroup]=\"groupForm\" (ngSubmit)=\"onSubmit()\">\r\n  <mat-dialog-content>\r\n    <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n      <mat-label>Nome do Grupo</mat-label>\r\n      <input matInput formControlName=\"name\" placeholder=\"Nome do grupo\">\r\n      <mat-error *ngIf=\"groupForm.get('name')?.hasError('required')\">\r\n        Nome do grupo \u00E9 obrigat\u00F3rio\r\n      </mat-error>\r\n      <mat-error *ngIf=\"groupForm.get('name')?.hasError('maxlength')\">\r\n        Nome do grupo deve ter no m\u00E1ximo 100 caracteres\r\n      </mat-error>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n      <mat-label>Descri\u00E7\u00E3o</mat-label>\r\n      <textarea matInput formControlName=\"description\" placeholder=\"Descri\u00E7\u00E3o do grupo\" rows=\"3\"></textarea>\r\n      <mat-error *ngIf=\"groupForm.get('description')?.hasError('maxlength')\">\r\n        Descri\u00E7\u00E3o deve ter no m\u00E1ximo 200 caracteres\r\n      </mat-error>\r\n    </mat-form-field>\r\n  </mat-dialog-content>\r\n\r\n  <mat-dialog-actions align=\"end\">\r\n    <button mat-button type=\"button\" (click)=\"onCancel()\">Cancelar</button>\r\n    <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"groupForm.invalid\">Salvar</button>\r\n  </mat-dialog-actions>\r\n</form>", styles: [".full-width{width:100%;margin-bottom:15px}mat-dialog-content{padding-top:10px;min-width:350px}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.FormBuilder }, { type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }] });

class ConfirmDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    onCancel() {
        this.dialogRef.close(false);
    }
    onConfirm() {
        this.dialogRef.close(true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: ConfirmDialogComponent, deps: [{ token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: ConfirmDialogComponent, isStandalone: false, selector: "app-confirm-dialog", ngImport: i0, template: "<h2 mat-dialog-title>Confirmar Exclus\u00E3o</h2>\r\n<mat-dialog-content>\r\n  <p *ngIf=\"!data.message\">Tem certeza que deseja excluir o grupo <strong>{{ data.group.name }}</strong>?</p>\r\n  <p *ngIf=\"data.message\">{{ data.message }}</p>\r\n  \r\n  <div *ngIf=\"data.isAdminGroup\" class=\"warning-message\">\r\n    <mat-icon color=\"warn\">warning</mat-icon>\r\n    <span>N\u00E3o \u00E9 poss\u00EDvel excluir o grupo Admin pois ele \u00E9 essencial para o funcionamento da aplica\u00E7\u00E3o.</span>\r\n  </div>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button (click)=\"onCancel()\">Cancelar</button>\r\n  <button mat-raised-button color=\"warn\" (click)=\"onConfirm()\" [disabled]=\"data.isAdminGroup\">Excluir</button>\r\n</mat-dialog-actions>", styles: [".warning-message{display:flex;align-items:center;margin-top:20px;padding:10px;background-color:#fff3e0;border-radius:4px}.warning-message mat-icon{margin-right:10px}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i8.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: ConfirmDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-confirm-dialog', standalone: false, template: "<h2 mat-dialog-title>Confirmar Exclus\u00E3o</h2>\r\n<mat-dialog-content>\r\n  <p *ngIf=\"!data.message\">Tem certeza que deseja excluir o grupo <strong>{{ data.group.name }}</strong>?</p>\r\n  <p *ngIf=\"data.message\">{{ data.message }}</p>\r\n  \r\n  <div *ngIf=\"data.isAdminGroup\" class=\"warning-message\">\r\n    <mat-icon color=\"warn\">warning</mat-icon>\r\n    <span>N\u00E3o \u00E9 poss\u00EDvel excluir o grupo Admin pois ele \u00E9 essencial para o funcionamento da aplica\u00E7\u00E3o.</span>\r\n  </div>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button (click)=\"onCancel()\">Cancelar</button>\r\n  <button mat-raised-button color=\"warn\" (click)=\"onConfirm()\" [disabled]=\"data.isAdminGroup\">Excluir</button>\r\n</mat-dialog-actions>", styles: [".warning-message{display:flex;align-items:center;margin-top:20px;padding:10px;background-color:#fff3e0;border-radius:4px}.warning-message mat-icon{margin-right:10px}\n"] }]
        }], ctorParameters: () => [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }] });

class CompanyManagementComponent {
    constructor(companyManagementService, groupService, fb, snackBar, dialog) {
        this.companyManagementService = companyManagementService;
        this.groupService = groupService;
        this.fb = fb;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.users = [];
        this.groups = [];
        this.isLoading = true;
        this.activeTab = 0;
    }
    ngOnInit() {
        this.initForm();
        this.loadCompanyData();
    }
    initForm() {
        this.companyForm = this.fb.group({
            id: [0],
            name: ['', [Validators.required, Validators.maxLength(100)]],
            domain: ['', Validators.maxLength(50)]
        });
    }
    loadCompanyData() {
        this.isLoading = true;
        this.companyManagementService.getMyCompany().subscribe({
            next: (company) => {
                this.company = company;
                this.companyForm.patchValue(company);
                // Carregar usuários da empresa
                this.loadCompanyUsers();
                // Carregar grupos da empresa
                this.loadCompanyGroups();
            },
            error: (error) => {
                console.error('Erro ao carregar dados da empresa', error);
                this.snackBar.open('Erro ao carregar dados da empresa. Por favor, tente novamente.', 'Fechar', {
                    duration: 5000
                });
                this.isLoading = false;
            }
        });
    }
    loadCompanyUsers() {
        this.companyManagementService.getCompanyUsers(this.company.id).subscribe({
            next: (users) => {
                this.users = users;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Erro ao carregar usuários da empresa', error);
                this.snackBar.open('Erro ao carregar usuários. Por favor, tente novamente.', 'Fechar', {
                    duration: 5000
                });
                this.isLoading = false;
            }
        });
    }
    loadCompanyGroups() {
        // Usar o serviço de grupo para obter os grupos da empresa
        this.groupService.getByCompanyId(this.company.id).subscribe({
            next: (groups) => {
                this.groups = groups;
            },
            error: (error) => {
                console.error('Erro ao carregar grupos da empresa', error);
                this.snackBar.open('Erro ao carregar grupos. Por favor, tente novamente.', 'Fechar', {
                    duration: 5000
                });
            }
        });
    }
    saveCompany() {
        if (this.companyForm.invalid) {
            this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', {
                duration: 5000
            });
            return;
        }
        const companyData = this.companyForm.value;
        this.companyManagementService.update(companyData).subscribe({
            next: () => {
                this.snackBar.open('Empresa atualizada com sucesso!', 'Fechar', {
                    duration: 3000
                });
            },
            error: (error) => {
                console.error('Erro ao atualizar empresa', error);
                this.snackBar.open('Erro ao atualizar empresa. Por favor, tente novamente.', 'Fechar', {
                    duration: 5000
                });
            }
        });
    }
    openAddUserDialog(group) {
        const dialogRef = this.dialog.open(AddUserDialogComponent, {
            width: '500px',
            data: {
                companyId: this.company.id,
                groupId: group.id,
                existingUsers: this.users,
                groupUsers: group.users || []
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addUserToGroup(result.userId, group.id);
            }
        });
    }
    addUserToGroup(userId, groupId) {
        this.companyManagementService.addUserToGroup(userId, groupId).subscribe({
            next: () => {
                this.snackBar.open('Usuário adicionado ao grupo com sucesso!', 'Fechar', {
                    duration: 3000
                });
                this.loadCompanyUsers(); // Recarregar dados
                this.loadCompanyGroups();
            },
            error: (error) => {
                console.error('Erro ao adicionar usuário ao grupo', error);
                // Exibir a mensagem de erro específica do servidor, se disponível
                const errorMessage = error.error ? error.error : 'Erro ao adicionar usuário ao grupo. Por favor, tente novamente.';
                this.snackBar.open(errorMessage, 'Fechar', {
                    duration: 5000
                });
            }
        });
    }
    removeUserFromGroup(userId, groupId) {
        this.companyManagementService.removeUserFromGroup(userId, groupId).subscribe({
            next: () => {
                this.snackBar.open('Usuário removido do grupo com sucesso!', 'Fechar', {
                    duration: 3000
                });
                this.loadCompanyUsers(); // Recarregar dados
                this.loadCompanyGroups();
            },
            error: (error) => {
                console.error('Erro ao remover usuário do grupo', error);
                // Exibir a mensagem de erro específica do servidor, se disponível
                const errorMessage = error.error ? error.error : 'Erro ao remover usuário do grupo. Por favor, tente novamente.';
                this.snackBar.open(errorMessage, 'Fechar', {
                    duration: 5000
                });
            }
        });
    }
    getUserFullName(userId) {
        const user = this.users.find(u => u.id === userId);
        return user && user.fullName ? user.fullName : 'Usuário desconhecido';
    }
    changeTab(tabIndex) {
        this.activeTab = tabIndex;
    }
    // Métodos para gerenciamento de grupos
    openGroupDialog(group) {
        // Verificar se está tentando editar o grupo Admin
        if (group && group.name.toLowerCase() === 'Admin') {
            this.snackBar.open('Não é permitido editar o grupo Admin, pois ele é essencial para o funcionamento da aplicação.', 'Fechar', {
                duration: 5000
            });
            return;
        }
        const dialogRef = this.dialog.open(GroupDialogComponent, {
            width: '500px',
            data: {
                group: group,
                companyId: this.company.id,
                isEditMode: !!group,
                existingGroups: this.groups
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result.id === 0) {
                    // Criar novo grupo
                    this.createGroup(result);
                }
                else {
                    // Atualizar grupo existente
                    this.updateGroup(result);
                }
            }
        });
    }
    createGroup(group) {
        // Verificar se já existe um grupo com o mesmo nome
        const existingGroup = this.groups.find(g => g.name.toLowerCase() === group.name.toLowerCase());
        if (existingGroup) {
            this.snackBar.open('Já existe um grupo com este nome na empresa.', 'Fechar', {
                duration: 5000
            });
            return;
        }
        this.groupService.create(group).subscribe({
            next: (newGroup) => {
                this.snackBar.open('Grupo criado com sucesso!', 'Fechar', {
                    duration: 3000
                });
                this.loadCompanyGroups();
            },
            error: (error) => {
                console.error('Erro ao criar grupo', error);
                if (error.error && typeof error.error === 'string') {
                    this.snackBar.open(error.error, 'Fechar', {
                        duration: 5000
                    });
                }
                else {
                    this.snackBar.open('Erro ao criar grupo. Por favor, tente novamente.', 'Fechar', {
                        duration: 5000
                    });
                }
            }
        });
    }
    updateGroup(group) {
        // Verificar se está tentando editar o grupo Admin
        if (group.name.toLowerCase() === 'Admin') {
            this.snackBar.open('Não é permitido editar o grupo Admin.', 'Fechar', {
                duration: 5000
            });
            return;
        }
        // Verificar se já existe outro grupo com o mesmo nome
        const existingGroup = this.groups.find(g => g.name.toLowerCase() === group.name.toLowerCase() && g.id !== group.id);
        if (existingGroup) {
            this.snackBar.open('Já existe um grupo com este nome na empresa.', 'Fechar', {
                duration: 5000
            });
            return;
        }
        this.groupService.update(group).subscribe({
            next: (updatedGroup) => {
                this.snackBar.open('Grupo atualizado com sucesso!', 'Fechar', {
                    duration: 3000
                });
                this.loadCompanyGroups();
            },
            error: (error) => {
                console.error('Erro ao atualizar grupo', error);
                if (error.error && typeof error.error === 'string') {
                    this.snackBar.open(error.error, 'Fechar', {
                        duration: 5000
                    });
                }
                else {
                    this.snackBar.open('Erro ao atualizar grupo. Por favor, tente novamente.', 'Fechar', {
                        duration: 5000
                    });
                }
            }
        });
    }
    confirmDeleteGroup(group) {
        // Verificar se é o grupo Admin
        const isAdminGroup = group.name.toLowerCase() === 'Admin';
        // Não permitir exclusão do grupo Admin
        if (isAdminGroup) {
            this.snackBar.open('Não é permitido excluir o grupo Admin, pois ele é essencial para o funcionamento da aplicação.', 'Fechar', {
                duration: 5000
            });
            return;
        }
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                group: group,
                isAdminGroup: false // Já validamos que não é o grupo Admin
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteGroup(group.id);
            }
        });
    }
    deleteGroup(groupId) {
        this.groupService.deleteGroup(groupId).subscribe({
            next: () => {
                this.snackBar.open('Grupo excluído com sucesso!', 'Fechar', {
                    duration: 3000
                });
                this.loadCompanyGroups();
            },
            error: (error) => {
                console.error('Erro ao excluir grupo', error);
                this.snackBar.open('Erro ao excluir grupo. Por favor, tente novamente.', 'Fechar', {
                    duration: 5000
                });
            }
        });
    }
    // Validações para usuários e grupos
    isAdminUserInAdminGroup(userId, groupId) {
        const group = this.groups.find(g => g.id === groupId);
        const user = this.users.find(u => u.id === userId);
        const currentUserId = this.getCurrentUserId();
        return group?.name.toLowerCase() === 'Admin' &&
            currentUserId === userId;
    }
    getCurrentUserId() {
        // Obter ID do usuário atual do token JWT
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = token.split('.')[1];
                const decodedPayload = JSON.parse(window.atob(payload));
                return decodedPayload.nameid || 0;
            }
            catch (error) {
                console.error('Erro ao decodificar token', error);
                return 0;
            }
        }
        return 0;
    }
    confirmRemoveUserFromGroup(user, group) {
        // Verificar se é um admin tentando sair do grupo Admin
        const isAdminGroup = group.name.toLowerCase() === 'Admin';
        const isCurrentUser = this.getCurrentUserId() === user.id;
        if (isAdminGroup && isCurrentUser) {
            this.snackBar.open('Você não pode remover a si mesmo do grupo Admin.', 'Fechar', {
                duration: 5000
            });
            return;
        }
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                group: group,
                isAdminGroup: false,
                message: `Tem certeza que deseja remover ${user.fullName} do grupo ${group.name}?`
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.removeUserFromGroup(user.id, group.id);
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyManagementComponent, deps: [{ token: i1$2.CompanyManagementService }, { token: i1$2.GroupService }, { token: i1$1.FormBuilder }, { token: i3.MatSnackBar }, { token: i1.MatDialog }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: CompanyManagementComponent, isStandalone: false, selector: "app-company-management", ngImport: i0, template: "<div class=\"container\" *ngIf=\"!isLoading\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>Gerenciamento da Empresa</mat-card-title>\r\n      <mat-card-subtitle>Gerencie informa\u00E7\u00F5es da empresa, usu\u00E1rios e grupos</mat-card-subtitle>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content>\r\n      <mat-tab-group [(selectedIndex)]=\"activeTab\">\r\n        <!-- Aba de Informa\u00E7\u00F5es da Empresa -->\r\n        <mat-tab label=\"Informa\u00E7\u00F5es da Empresa\">\r\n          <div class=\"tab-content\">\r\n            <form [formGroup]=\"companyForm\" (ngSubmit)=\"saveCompany()\">\r\n              <div class=\"form-row\">\r\n                <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                  <mat-label>Nome da Empresa</mat-label>\r\n                  <input matInput formControlName=\"name\" placeholder=\"Nome da empresa\">\r\n                  <mat-error *ngIf=\"companyForm.get('name')?.hasError('required')\">\r\n                    Nome da empresa \u00E9 obrigat\u00F3rio\r\n                  </mat-error>\r\n                  <mat-error *ngIf=\"companyForm.get('name')?.hasError('maxlength')\">\r\n                    Nome da empresa deve ter no m\u00E1ximo 100 caracteres\r\n                  </mat-error>\r\n                </mat-form-field>\r\n              </div>\r\n\r\n              <div class=\"form-row\">\r\n                <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                  <mat-label>Dom\u00EDnio</mat-label>\r\n                  <input matInput formControlName=\"domain\" placeholder=\"Dom\u00EDnio (ex: empresa.com)\">\r\n                  <mat-hint>Utilizado para verifica\u00E7\u00E3o de email ao registrar usu\u00E1rios</mat-hint>\r\n                  <mat-error *ngIf=\"companyForm.get('domain')?.hasError('maxlength')\">\r\n                    Dom\u00EDnio deve ter no m\u00E1ximo 50 caracteres\r\n                  </mat-error>\r\n                </mat-form-field>\r\n              </div>\r\n\r\n              <div class=\"action-row\">\r\n                <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"companyForm.invalid\">\r\n                  Salvar Altera\u00E7\u00F5es\r\n                </button>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </mat-tab>\r\n\r\n        <!-- Aba de Gerenciamento de Grupos -->\r\n        <mat-tab label=\"Grupos\">\r\n          <div class=\"tab-content\">\r\n            <!-- Bot\u00E3o para adicionar novo grupo -->\r\n            <div class=\"action-bar\">\r\n              <button mat-raised-button color=\"primary\" (click)=\"openGroupDialog()\">\r\n                <mat-icon>add</mat-icon> Novo Grupo\r\n              </button>\r\n            </div>\r\n\r\n            <div class=\"group-cards\">\r\n              <mat-card class=\"group-card\" *ngFor=\"let group of groups\">\r\n                <mat-card-header>\r\n                  <mat-card-title>{{ group.name }}</mat-card-title>\r\n                  <mat-card-subtitle *ngIf=\"group.description\">{{ group.description }}</mat-card-subtitle>\r\n                  \r\n                  <!-- Bot\u00F5es de editar e excluir -->\r\n                  <div class=\"card-actions\">\r\n                    <button mat-icon-button color=\"primary\" \r\n                            (click)=\"openGroupDialog(group)\" \r\n                            [disabled]=\"group.name.toLowerCase() === 'admin'\"\r\n                            [matTooltip]=\"group.name.toLowerCase() === 'admin' ? 'N\u00E3o \u00E9 permitido editar o grupo Admin' : 'Editar grupo'\">\r\n                      <mat-icon>edit</mat-icon>\r\n                    </button>\r\n                    <button mat-icon-button color=\"warn\" \r\n                            (click)=\"confirmDeleteGroup(group)\" \r\n                            [disabled]=\"group.name.toLowerCase() === 'admin'\"\r\n                            [matTooltip]=\"group.name.toLowerCase() === 'admin' ? 'N\u00E3o \u00E9 permitido excluir o grupo Admin' : 'Excluir grupo'\">\r\n                      <mat-icon>delete</mat-icon>\r\n                    </button>\r\n                  </div>\r\n                </mat-card-header>\r\n                \r\n                <mat-card-content>\r\n                  <h3>Usu\u00E1rios no Grupo</h3>\r\n                  <mat-list>\r\n                    <mat-list-item *ngFor=\"let user of group.users\">\r\n                      <div class=\"user-list-item\">\r\n                        <span>{{ user.fullName }}</span>\r\n                        <button mat-icon-button color=\"warn\" (click)=\"confirmRemoveUserFromGroup(user, group)\" \r\n                                matTooltip=\"Remover do grupo\" \r\n                                [disabled]=\"isAdminUserInAdminGroup(user.id, group.id)\"\r\n                                [matTooltipDisabled]=\"!isAdminUserInAdminGroup(user.id, group.id)\"\r\n                                [matTooltip]=\"isAdminUserInAdminGroup(user.id, group.id) ? 'N\u00E3o \u00E9 poss\u00EDvel remover a si mesmo do grupo Admin' : 'Remover do grupo'\">\r\n                          <mat-icon>delete</mat-icon>\r\n                        </button>\r\n                      </div>\r\n                    </mat-list-item>\r\n                    \r\n                    <mat-list-item *ngIf=\"!group.users || group.users.length === 0\">\r\n                      <i>Nenhum usu\u00E1rio neste grupo</i>\r\n                    </mat-list-item>\r\n                  </mat-list>\r\n                </mat-card-content>\r\n                \r\n                <mat-card-actions>\r\n                  <button mat-button color=\"primary\" (click)=\"openAddUserDialog(group)\">\r\n                    <mat-icon>person_add</mat-icon> Adicionar Usu\u00E1rio\r\n                  </button>\r\n                </mat-card-actions>\r\n              </mat-card>\r\n            </div>\r\n          </div>\r\n        </mat-tab>\r\n\r\n        <!-- Aba de Gerenciamento de Usu\u00E1rios -->\r\n        <mat-tab label=\"Usu\u00E1rios\">\r\n          <div class=\"tab-content\">\r\n            <table mat-table [dataSource]=\"users\" class=\"mat-elevation-z8 full-width\">\r\n              <!-- ID Column -->\r\n              <ng-container matColumnDef=\"id\">\r\n                <th mat-header-cell *matHeaderCellDef>ID</th>\r\n                <td mat-cell *matCellDef=\"let user\">{{ user.id }}</td>\r\n              </ng-container>\r\n\r\n              <!-- Nome Column -->\r\n              <ng-container matColumnDef=\"fullName\">\r\n                <th mat-header-cell *matHeaderCellDef>Nome</th>\r\n                <td mat-cell *matCellDef=\"let user\">{{ user.fullName }}</td>\r\n              </ng-container>\r\n\r\n              <!-- Email Column -->\r\n              <ng-container matColumnDef=\"email\">\r\n                <th mat-header-cell *matHeaderCellDef>Email</th>\r\n                <td mat-cell *matCellDef=\"let user\">{{ user.email }}</td>\r\n              </ng-container>\r\n\r\n              <!-- Grupos Column -->\r\n              <ng-container matColumnDef=\"groups\">\r\n                <th mat-header-cell *matHeaderCellDef>Grupos</th>\r\n                <td mat-cell *matCellDef=\"let user\">\r\n                  <span *ngIf=\"user.groups && user.groups.length > 0\">\r\n                    <ng-container *ngFor=\"let g of user.groups; let last = last\">\r\n                      {{ g.name }}<span *ngIf=\"!last\">, </span>\r\n                    </ng-container>\r\n                  </span>\r\n                  <span *ngIf=\"!user.groups || user.groups.length === 0\">\r\n                    <i>Nenhum grupo</i>\r\n                  </span>\r\n                </td>\r\n              </ng-container>\r\n\r\n              <tr mat-header-row *matHeaderRowDef=\"['id', 'fullName', 'email', 'groups']\"></tr>\r\n              <tr mat-row *matRowDef=\"let row; columns: ['id', 'fullName', 'email', 'groups'];\"></tr>\r\n            </table>\r\n          </div>\r\n        </mat-tab>\r\n      </mat-tab-group>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n\r\n<div class=\"loading-container\" *ngIf=\"isLoading\">\r\n  <mat-spinner diameter=\"50\"></mat-spinner>\r\n  <p>Carregando...</p>\r\n</div>", styles: [".container{padding:20px;max-width:1200px;margin:0 auto}.tab-content{padding:20px 0}.form-row{margin-bottom:16px}.full-width{width:100%}.action-row{margin-top:20px;display:flex;justify-content:flex-end}.loading-container{display:flex;flex-direction:column;align-items:center;justify-content:center;height:400px}.action-bar{margin-bottom:20px;display:flex;justify-content:flex-end}.group-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}.group-card{height:100%}.group-card mat-card-header{display:flex;justify-content:space-between}.group-card mat-card-header .card-actions{margin-left:auto;display:flex;align-items:center}.user-list-item{display:flex;justify-content:space-between;align-items:center;width:100%}mat-tab-group{min-height:400px}table{width:100%}mat-card-header{margin-bottom:16px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i6.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i5$1.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i8.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i8.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "component", type: i9.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i9.MatCardActions, selector: "mat-card-actions", inputs: ["align"], exportAs: ["matCardActions"] }, { kind: "directive", type: i9.MatCardContent, selector: "mat-card-content" }, { kind: "component", type: i9.MatCardHeader, selector: "mat-card-header" }, { kind: "directive", type: i9.MatCardSubtitle, selector: "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]" }, { kind: "directive", type: i9.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { kind: "component", type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i11.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i11.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i11.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i11.MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: i11.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i11.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i11.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i11.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i11.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i11.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "component", type: i12.MatTab, selector: "mat-tab", inputs: ["disabled", "label", "aria-label", "aria-labelledby", "labelClass", "bodyClass", "id"], exportAs: ["matTab"] }, { kind: "component", type: i12.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "fitInkBarToContent", "mat-stretch-tabs", "mat-align-tabs", "dynamicHeight", "selectedIndex", "headerPosition", "animationDuration", "contentTabIndex", "disablePagination", "disableRipple", "preserveContent", "backgroundColor", "aria-label", "aria-labelledby"], outputs: ["selectedIndexChange", "focusChange", "animationDone", "selectedTabChange"], exportAs: ["matTabGroup"] }, { kind: "component", type: i13.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }, { kind: "directive", type: i14.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }, { kind: "component", type: i15.MatList, selector: "mat-list", exportAs: ["matList"] }, { kind: "component", type: i15.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["activated"], exportAs: ["matListItem"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyManagementComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-company-management', standalone: false, template: "<div class=\"container\" *ngIf=\"!isLoading\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>Gerenciamento da Empresa</mat-card-title>\r\n      <mat-card-subtitle>Gerencie informa\u00E7\u00F5es da empresa, usu\u00E1rios e grupos</mat-card-subtitle>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content>\r\n      <mat-tab-group [(selectedIndex)]=\"activeTab\">\r\n        <!-- Aba de Informa\u00E7\u00F5es da Empresa -->\r\n        <mat-tab label=\"Informa\u00E7\u00F5es da Empresa\">\r\n          <div class=\"tab-content\">\r\n            <form [formGroup]=\"companyForm\" (ngSubmit)=\"saveCompany()\">\r\n              <div class=\"form-row\">\r\n                <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                  <mat-label>Nome da Empresa</mat-label>\r\n                  <input matInput formControlName=\"name\" placeholder=\"Nome da empresa\">\r\n                  <mat-error *ngIf=\"companyForm.get('name')?.hasError('required')\">\r\n                    Nome da empresa \u00E9 obrigat\u00F3rio\r\n                  </mat-error>\r\n                  <mat-error *ngIf=\"companyForm.get('name')?.hasError('maxlength')\">\r\n                    Nome da empresa deve ter no m\u00E1ximo 100 caracteres\r\n                  </mat-error>\r\n                </mat-form-field>\r\n              </div>\r\n\r\n              <div class=\"form-row\">\r\n                <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                  <mat-label>Dom\u00EDnio</mat-label>\r\n                  <input matInput formControlName=\"domain\" placeholder=\"Dom\u00EDnio (ex: empresa.com)\">\r\n                  <mat-hint>Utilizado para verifica\u00E7\u00E3o de email ao registrar usu\u00E1rios</mat-hint>\r\n                  <mat-error *ngIf=\"companyForm.get('domain')?.hasError('maxlength')\">\r\n                    Dom\u00EDnio deve ter no m\u00E1ximo 50 caracteres\r\n                  </mat-error>\r\n                </mat-form-field>\r\n              </div>\r\n\r\n              <div class=\"action-row\">\r\n                <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"companyForm.invalid\">\r\n                  Salvar Altera\u00E7\u00F5es\r\n                </button>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </mat-tab>\r\n\r\n        <!-- Aba de Gerenciamento de Grupos -->\r\n        <mat-tab label=\"Grupos\">\r\n          <div class=\"tab-content\">\r\n            <!-- Bot\u00E3o para adicionar novo grupo -->\r\n            <div class=\"action-bar\">\r\n              <button mat-raised-button color=\"primary\" (click)=\"openGroupDialog()\">\r\n                <mat-icon>add</mat-icon> Novo Grupo\r\n              </button>\r\n            </div>\r\n\r\n            <div class=\"group-cards\">\r\n              <mat-card class=\"group-card\" *ngFor=\"let group of groups\">\r\n                <mat-card-header>\r\n                  <mat-card-title>{{ group.name }}</mat-card-title>\r\n                  <mat-card-subtitle *ngIf=\"group.description\">{{ group.description }}</mat-card-subtitle>\r\n                  \r\n                  <!-- Bot\u00F5es de editar e excluir -->\r\n                  <div class=\"card-actions\">\r\n                    <button mat-icon-button color=\"primary\" \r\n                            (click)=\"openGroupDialog(group)\" \r\n                            [disabled]=\"group.name.toLowerCase() === 'admin'\"\r\n                            [matTooltip]=\"group.name.toLowerCase() === 'admin' ? 'N\u00E3o \u00E9 permitido editar o grupo Admin' : 'Editar grupo'\">\r\n                      <mat-icon>edit</mat-icon>\r\n                    </button>\r\n                    <button mat-icon-button color=\"warn\" \r\n                            (click)=\"confirmDeleteGroup(group)\" \r\n                            [disabled]=\"group.name.toLowerCase() === 'admin'\"\r\n                            [matTooltip]=\"group.name.toLowerCase() === 'admin' ? 'N\u00E3o \u00E9 permitido excluir o grupo Admin' : 'Excluir grupo'\">\r\n                      <mat-icon>delete</mat-icon>\r\n                    </button>\r\n                  </div>\r\n                </mat-card-header>\r\n                \r\n                <mat-card-content>\r\n                  <h3>Usu\u00E1rios no Grupo</h3>\r\n                  <mat-list>\r\n                    <mat-list-item *ngFor=\"let user of group.users\">\r\n                      <div class=\"user-list-item\">\r\n                        <span>{{ user.fullName }}</span>\r\n                        <button mat-icon-button color=\"warn\" (click)=\"confirmRemoveUserFromGroup(user, group)\" \r\n                                matTooltip=\"Remover do grupo\" \r\n                                [disabled]=\"isAdminUserInAdminGroup(user.id, group.id)\"\r\n                                [matTooltipDisabled]=\"!isAdminUserInAdminGroup(user.id, group.id)\"\r\n                                [matTooltip]=\"isAdminUserInAdminGroup(user.id, group.id) ? 'N\u00E3o \u00E9 poss\u00EDvel remover a si mesmo do grupo Admin' : 'Remover do grupo'\">\r\n                          <mat-icon>delete</mat-icon>\r\n                        </button>\r\n                      </div>\r\n                    </mat-list-item>\r\n                    \r\n                    <mat-list-item *ngIf=\"!group.users || group.users.length === 0\">\r\n                      <i>Nenhum usu\u00E1rio neste grupo</i>\r\n                    </mat-list-item>\r\n                  </mat-list>\r\n                </mat-card-content>\r\n                \r\n                <mat-card-actions>\r\n                  <button mat-button color=\"primary\" (click)=\"openAddUserDialog(group)\">\r\n                    <mat-icon>person_add</mat-icon> Adicionar Usu\u00E1rio\r\n                  </button>\r\n                </mat-card-actions>\r\n              </mat-card>\r\n            </div>\r\n          </div>\r\n        </mat-tab>\r\n\r\n        <!-- Aba de Gerenciamento de Usu\u00E1rios -->\r\n        <mat-tab label=\"Usu\u00E1rios\">\r\n          <div class=\"tab-content\">\r\n            <table mat-table [dataSource]=\"users\" class=\"mat-elevation-z8 full-width\">\r\n              <!-- ID Column -->\r\n              <ng-container matColumnDef=\"id\">\r\n                <th mat-header-cell *matHeaderCellDef>ID</th>\r\n                <td mat-cell *matCellDef=\"let user\">{{ user.id }}</td>\r\n              </ng-container>\r\n\r\n              <!-- Nome Column -->\r\n              <ng-container matColumnDef=\"fullName\">\r\n                <th mat-header-cell *matHeaderCellDef>Nome</th>\r\n                <td mat-cell *matCellDef=\"let user\">{{ user.fullName }}</td>\r\n              </ng-container>\r\n\r\n              <!-- Email Column -->\r\n              <ng-container matColumnDef=\"email\">\r\n                <th mat-header-cell *matHeaderCellDef>Email</th>\r\n                <td mat-cell *matCellDef=\"let user\">{{ user.email }}</td>\r\n              </ng-container>\r\n\r\n              <!-- Grupos Column -->\r\n              <ng-container matColumnDef=\"groups\">\r\n                <th mat-header-cell *matHeaderCellDef>Grupos</th>\r\n                <td mat-cell *matCellDef=\"let user\">\r\n                  <span *ngIf=\"user.groups && user.groups.length > 0\">\r\n                    <ng-container *ngFor=\"let g of user.groups; let last = last\">\r\n                      {{ g.name }}<span *ngIf=\"!last\">, </span>\r\n                    </ng-container>\r\n                  </span>\r\n                  <span *ngIf=\"!user.groups || user.groups.length === 0\">\r\n                    <i>Nenhum grupo</i>\r\n                  </span>\r\n                </td>\r\n              </ng-container>\r\n\r\n              <tr mat-header-row *matHeaderRowDef=\"['id', 'fullName', 'email', 'groups']\"></tr>\r\n              <tr mat-row *matRowDef=\"let row; columns: ['id', 'fullName', 'email', 'groups'];\"></tr>\r\n            </table>\r\n          </div>\r\n        </mat-tab>\r\n      </mat-tab-group>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n\r\n<div class=\"loading-container\" *ngIf=\"isLoading\">\r\n  <mat-spinner diameter=\"50\"></mat-spinner>\r\n  <p>Carregando...</p>\r\n</div>", styles: [".container{padding:20px;max-width:1200px;margin:0 auto}.tab-content{padding:20px 0}.form-row{margin-bottom:16px}.full-width{width:100%}.action-row{margin-top:20px;display:flex;justify-content:flex-end}.loading-container{display:flex;flex-direction:column;align-items:center;justify-content:center;height:400px}.action-bar{margin-bottom:20px;display:flex;justify-content:flex-end}.group-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}.group-card{height:100%}.group-card mat-card-header{display:flex;justify-content:space-between}.group-card mat-card-header .card-actions{margin-left:auto;display:flex;align-items:center}.user-list-item{display:flex;justify-content:space-between;align-items:center;width:100%}mat-tab-group{min-height:400px}table{width:100%}mat-card-header{margin-bottom:16px}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.CompanyManagementService }, { type: i1$2.GroupService }, { type: i1$1.FormBuilder }, { type: i3.MatSnackBar }, { type: i1.MatDialog }] });

class CompanyRegisterComponent {
    constructor(fb, userService, router, authService) {
        this.fb = fb;
        this.userService = userService;
        this.router = router;
        this.authService = authService;
        this.registerForm = this.fb.group({
            fullName: this.fb.control('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15),
                /* Validators.pattern(/^\w+$/) */
            ]),
            passwordHash: this.fb.control('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30),
                /* Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) */
            ]),
            email: this.fb.control('', [
                Validators.required,
                Validators.maxLength(30)
            ])
        });
    }
    onSubmit() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }
        this.userService.register(this.registerForm.value, true).subscribe((res) => {
            this.authService.authenticate(res.token);
            this.router.navigate(['/Dashboard']);
        });
    }
    getUsernameError() {
        const control = this.registerForm.get('fullName');
        if (control?.hasError('required'))
            return 'Nome de usuário é obrigatório';
        if (control?.hasError('minlength'))
            return 'Mínimo 3 caracteres';
        if (control?.hasError('maxlength'))
            return 'Máximo de 15 caracteres';
        return null;
    }
    getPasswordError() {
        const control = this.registerForm.get('passwordHash');
        if (control?.hasError('required'))
            return 'Senha é obrigatória';
        if (control?.hasError('minlength'))
            return 'Mínimo 8 caracteres';
        if (control?.hasError('maxlength'))
            return 'Máximo de 30 caracteres';
        return null;
    }
    onGoogleLogin() {
        this.authService.getFirebaseToken().then(token => {
            if (token) {
                this.userService.loginGoogle(token).subscribe((res) => {
                    this.authService.authenticate(res.token);
                    this.router.navigate(['/']);
                });
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyRegisterComponent, deps: [{ token: i1$1.FormBuilder }, { token: i1$2.UserService }, { token: i3$1.Router }, { token: i1$2.AuthService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: CompanyRegisterComponent, isStandalone: false, selector: "app-company-register", ngImport: i0, template: "<div class=\"register\">\r\n    <div class=\"register-container\">\r\n        <div class=\"register-left\">\r\n            <div class=\"register-header\">\r\n                <span class=\"fs-2 fw-medium\">Cadastrar Empresa</span>\r\n                <h3 class=\"fs-6\" style=\"color: rgb(140, 140, 140);\">Preencha suas informa\u00E7\u00F5es para criar uma conta</h3>\r\n            </div>\r\n            <form class=\"register-form\" (ngSubmit)=\"onSubmit()\" [formGroup]=\"registerForm\">\r\n                <mat-form-field>\r\n                    <mat-label>Nome de usu\u00E1rio</mat-label>\r\n                    <input type=\"text\" matInput formControlName=\"fullName\">\r\n                    <mat-error *ngIf=\"getUsernameError()\">{{ getUsernameError() }}</mat-error>\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                    <mat-label>Email</mat-label>\r\n                    <input type=\"email\" matInput formControlName=\"email\">\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                    <mat-label>Senha</mat-label>\r\n                    <input type=\"password\" matInput formControlName=\"passwordHash\" placeholder=\"Ex. pat@example.com\">\r\n                    <mat-error *ngIf=\"getPasswordError()\">{{ getPasswordError() }}</mat-error>\r\n                </mat-form-field>\r\n                <mat-checkbox>Li e concordo com os termos e condi\u00E7\u00F5es</mat-checkbox>\r\n                <button type=\"submit\" mat-stroked-button style=\"background-color: var(--primary-color); color: white;\">Criar conta</button>\r\n            </form>\r\n        </div>\r\n        <div class=\"register-image\">\r\n            <img src=\"assets/images/studying.jpg\" alt=\"Register Image\">\r\n\r\n        </div>\r\n    </div>\r\n</div>", styles: ["@charset \"UTF-8\";.register{background-color:var(--background-color);display:flex;justify-content:center;align-items:center;width:100%;min-height:100vh;padding:1rem;box-sizing:border-box}.register-container{display:flex;align-items:center;justify-content:center;width:80%;max-width:1000px;min-height:70vh;background-color:#fff;box-shadow:0 2px 10px #0000001a;border-radius:8px;overflow:hidden}.register-left{display:flex;flex-direction:column;justify-content:center;width:55%;padding:2rem}.register-header{margin-bottom:1.5rem}.register-form{display:flex;flex-direction:column;gap:16px;width:100%;max-width:320px}.register-image{flex:1;display:flex;justify-content:center;align-items:center;background-color:var(--primary-color)}.register-image img{width:100%;height:100%;object-fit:cover}@media (max-width: 992px){.register-container{width:90%}.register-left{width:60%;padding:1.5rem}.register-form{max-width:100%}}@media (max-width: 768px){.register-container{flex-direction:column;width:95%;min-height:auto}.register-left{width:100%;padding:2rem 1.5rem;border-radius:0}.register-image{width:100%;height:200px;border-top:1px solid #eee;border-radius:0}.register-image img{border-radius:0}}@media (max-width: 480px){.register-header span{font-size:1.4rem}.register-header h3{font-size:.9rem}.register-form{gap:12px}button[mat-stroked-button]{font-size:.9rem}}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i5$1.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i8.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i8$1.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyRegisterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-company-register', standalone: false, template: "<div class=\"register\">\r\n    <div class=\"register-container\">\r\n        <div class=\"register-left\">\r\n            <div class=\"register-header\">\r\n                <span class=\"fs-2 fw-medium\">Cadastrar Empresa</span>\r\n                <h3 class=\"fs-6\" style=\"color: rgb(140, 140, 140);\">Preencha suas informa\u00E7\u00F5es para criar uma conta</h3>\r\n            </div>\r\n            <form class=\"register-form\" (ngSubmit)=\"onSubmit()\" [formGroup]=\"registerForm\">\r\n                <mat-form-field>\r\n                    <mat-label>Nome de usu\u00E1rio</mat-label>\r\n                    <input type=\"text\" matInput formControlName=\"fullName\">\r\n                    <mat-error *ngIf=\"getUsernameError()\">{{ getUsernameError() }}</mat-error>\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                    <mat-label>Email</mat-label>\r\n                    <input type=\"email\" matInput formControlName=\"email\">\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                    <mat-label>Senha</mat-label>\r\n                    <input type=\"password\" matInput formControlName=\"passwordHash\" placeholder=\"Ex. pat@example.com\">\r\n                    <mat-error *ngIf=\"getPasswordError()\">{{ getPasswordError() }}</mat-error>\r\n                </mat-form-field>\r\n                <mat-checkbox>Li e concordo com os termos e condi\u00E7\u00F5es</mat-checkbox>\r\n                <button type=\"submit\" mat-stroked-button style=\"background-color: var(--primary-color); color: white;\">Criar conta</button>\r\n            </form>\r\n        </div>\r\n        <div class=\"register-image\">\r\n            <img src=\"assets/images/studying.jpg\" alt=\"Register Image\">\r\n\r\n        </div>\r\n    </div>\r\n</div>", styles: ["@charset \"UTF-8\";.register{background-color:var(--background-color);display:flex;justify-content:center;align-items:center;width:100%;min-height:100vh;padding:1rem;box-sizing:border-box}.register-container{display:flex;align-items:center;justify-content:center;width:80%;max-width:1000px;min-height:70vh;background-color:#fff;box-shadow:0 2px 10px #0000001a;border-radius:8px;overflow:hidden}.register-left{display:flex;flex-direction:column;justify-content:center;width:55%;padding:2rem}.register-header{margin-bottom:1.5rem}.register-form{display:flex;flex-direction:column;gap:16px;width:100%;max-width:320px}.register-image{flex:1;display:flex;justify-content:center;align-items:center;background-color:var(--primary-color)}.register-image img{width:100%;height:100%;object-fit:cover}@media (max-width: 992px){.register-container{width:90%}.register-left{width:60%;padding:1.5rem}.register-form{max-width:100%}}@media (max-width: 768px){.register-container{flex-direction:column;width:95%;min-height:auto}.register-left{width:100%;padding:2rem 1.5rem;border-radius:0}.register-image{width:100%;height:200px;border-top:1px solid #eee;border-radius:0}.register-image img{border-radius:0}}@media (max-width: 480px){.register-header span{font-size:1.4rem}.register-header h3{font-size:.9rem}.register-form{gap:12px}button[mat-stroked-button]{font-size:.9rem}}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.FormBuilder }, { type: i1$2.UserService }, { type: i3$1.Router }, { type: i1$2.AuthService }] });

const routes = [
    { path: 'management', component: CompanyManagementComponent },
    { path: 'register', component: CompanyRegisterComponent }
];
class CompanyModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: CompanyModule, declarations: [CompanyManagementComponent,
            AddUserDialogComponent,
            GroupDialogComponent,
            ConfirmDialogComponent,
            CompanyRegisterComponent], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule, i3$1.RouterModule, MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatCardModule,
            MatIconModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatDialogModule,
            MatSelectModule,
            MatTabsModule,
            MatChipsModule,
            MatProgressSpinnerModule,
            MatTooltipModule,
            MatListModule,
            MatCheckboxModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyModule, imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            RouterModule.forChild(routes),
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatCardModule,
            MatIconModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatDialogModule,
            MatSelectModule,
            MatTabsModule,
            MatChipsModule,
            MatProgressSpinnerModule,
            MatTooltipModule,
            MatListModule,
            MatCheckboxModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        CompanyManagementComponent,
                        AddUserDialogComponent,
                        GroupDialogComponent,
                        ConfirmDialogComponent,
                        CompanyRegisterComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        HttpClientModule,
                        RouterModule.forChild(routes),
                        MatFormFieldModule,
                        MatInputModule,
                        MatButtonModule,
                        MatCardModule,
                        MatIconModule,
                        MatTableModule,
                        MatPaginatorModule,
                        MatSortModule,
                        MatDialogModule,
                        MatSelectModule,
                        MatTabsModule,
                        MatChipsModule,
                        MatProgressSpinnerModule,
                        MatTooltipModule,
                        MatListModule,
                        MatCheckboxModule
                    ]
                }]
        }] });

/*
 * Public API Surface of mfe-company
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CompanyModule };
//# sourceMappingURL=mfe-company.mjs.map
