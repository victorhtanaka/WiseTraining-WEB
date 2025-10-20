import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/models/group.model';

interface DialogData {
  group?: Group;
  companyId: number;
  isEditMode: boolean;
  existingGroups: Group[];
}

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
  standalone: false
})
export class GroupDialogComponent implements OnInit {
  groupForm: FormGroup;
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.dialogTitle = this.data.isEditMode ? 'Editar Grupo' : 'Novo Grupo';
    this.initForm();
  }

  initForm(): void {
    this.groupForm = this.fb.group({
      id: [this.data.group?.id || 0],
      name: [this.data.group?.name || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.data.group?.description || '', [Validators.maxLength(200)]],
      companyId: [this.data.companyId]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      const groupData: Group = this.groupForm.value;
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
      const nameExists = this.data.existingGroups.some(g => 
        g.name.toLowerCase() === groupName && g.id !== groupData.id);
        
      if (nameExists) {
        alert('Já existe um grupo com este nome na empresa.');
        return;
      }
      
      this.dialogRef.close(groupData);
    }
  }
}