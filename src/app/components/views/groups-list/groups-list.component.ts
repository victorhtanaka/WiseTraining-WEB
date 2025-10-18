import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';
import { GroupFormDialogComponent } from './group-form-dialog/group-form-dialog.component';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
  standalone: false
})
export class GroupsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'company', 'actions'];
  dataSource = new MatTableDataSource<Group>();
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private groupService: GroupService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadGroups(): void {
    this.isLoading = true;
    this.groupService.getAll().subscribe({
      next: (groups) => {
        this.dataSource.data = groups;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading groups: ' + error.message, 'Close', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(group?: Group): void {
    const dialogRef = this.dialog.open(GroupFormDialogComponent, {
      width: '600px',
      data: group ? { ...group } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadGroups();
      }
    });
  }

  deleteGroup(id: number): void {
    if (confirm('Are you sure you want to delete this group?')) {
      this.groupService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Group deleted successfully!', 'Close', {
            duration: 3000
          });
          this.loadGroups();
        },
        error: (error) => {
          this.snackBar.open('Error deleting group: ' + error.message, 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
