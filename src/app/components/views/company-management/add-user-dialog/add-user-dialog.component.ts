import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

interface DialogData {
  companyId: number;
  groupId: number;
  existingUsers: User[];
  groupUsers: User[];
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
  standalone: false
})
export class AddUserDialogComponent implements OnInit {
  availableUsers: User[] = [];
  selectedUserId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.filterAvailableUsers();
  }

  filterAvailableUsers(): void {
    // Filtrar usuários que já pertencem a este grupo
    const existingUserIds = this.data.groupUsers.map(user => user.id);
    this.availableUsers = this.data.existingUsers.filter(user => 
      !existingUserIds.includes(user.id)
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.selectedUserId) {
      this.dialogRef.close({ userId: this.selectedUserId });
    }
  }
}