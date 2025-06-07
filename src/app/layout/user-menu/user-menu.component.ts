import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  constructor(private dialog: MatDialog) {

  }

    openUserModal(): void {
    this.dialog.open(UserModalComponent, {
      hasBackdrop: false,
      position: { top: '60px', right: '20px' },
      panelClass: 'user-modal-panel'
    });
  }
}
