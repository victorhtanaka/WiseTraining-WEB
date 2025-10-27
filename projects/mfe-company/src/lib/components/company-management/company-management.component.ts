import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'shared-lib';
import { User } from 'shared-lib';
import { Group } from 'shared-lib';
import { CompanyManagementService } from 'shared-lib';
import { GroupService } from 'shared-lib';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.scss'],
  standalone: false
})
export class CompanyManagementComponent implements OnInit {
  company: Company;
  users: User[] = [];
  groups: Group[] = [];
  companyForm: FormGroup;
  isLoading = true;
  activeTab = 0;
  
  constructor(
    private companyManagementService: CompanyManagementService,
    private groupService: GroupService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCompanyData();
  }

  initForm(): void {
    this.companyForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      domain: ['', Validators.maxLength(50)]
    });
  }

  loadCompanyData(): void {
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

  loadCompanyUsers(): void {
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

  loadCompanyGroups(): void {
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

  saveCompany(): void {
    if (this.companyForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', {
        duration: 5000
      });
      return;
    }

    const companyData = this.companyForm.value as Company;
    
    this.companyManagementService.update(companyData).subscribe({
      next: () => {
        this.snackBar.open('Empresa atualizada com sucesso!', 'Fechar', {
          duration: 3000
        });
      },
      error: (error: any) => {
        console.error('Erro ao atualizar empresa', error);
        this.snackBar.open('Erro ao atualizar empresa. Por favor, tente novamente.', 'Fechar', {
          duration: 5000
        });
      }
    });
  }

  openAddUserDialog(group: Group): void {
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

  addUserToGroup(userId: number, groupId: number): void {
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

  removeUserFromGroup(userId: number, groupId: number): void {
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

  getUserFullName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user && user.fullName ? user.fullName : 'Usuário desconhecido';
  }

  changeTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }
  
  // Métodos para gerenciamento de grupos
  openGroupDialog(group?: Group): void {
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
        } else {
          // Atualizar grupo existente
          this.updateGroup(result);
        }
      }
    });
  }

  createGroup(group: Group): void {
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
        } else {
          this.snackBar.open('Erro ao criar grupo. Por favor, tente novamente.', 'Fechar', {
            duration: 5000
          });
        }
      }
    });
  }

  updateGroup(group: Group): void {
    // Verificar se está tentando editar o grupo Admin
    if (group.name.toLowerCase() === 'Admin') {
      this.snackBar.open('Não é permitido editar o grupo Admin.', 'Fechar', {
        duration: 5000
      });
      return;
    }
    
    // Verificar se já existe outro grupo com o mesmo nome
    const existingGroup = this.groups.find(g => 
      g.name.toLowerCase() === group.name.toLowerCase() && g.id !== group.id);
    
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
        } else {
          this.snackBar.open('Erro ao atualizar grupo. Por favor, tente novamente.', 'Fechar', {
            duration: 5000
          });
        }
      }
    });
  }

  confirmDeleteGroup(group: Group): void {
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

  deleteGroup(groupId: number): void {
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
  isAdminUserInAdminGroup(userId: number, groupId: number): boolean {
    const group = this.groups.find(g => g.id === groupId);
    const user = this.users.find(u => u.id === userId);
    const currentUserId = this.getCurrentUserId();
    
    return group?.name.toLowerCase() === 'Admin' && 
           currentUserId === userId;
  }

  getCurrentUserId(): number {
    // Obter ID do usuário atual do token JWT
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(window.atob(payload));
        return decodedPayload.nameid || 0;
      } catch (error) {
        console.error('Erro ao decodificar token', error);
        return 0;
      }
    }
    return 0;
  }
  
  confirmRemoveUserFromGroup(user: User, group: Group): void {
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
}

