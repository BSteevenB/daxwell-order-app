import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
collapsed = false;
orderMenuOpen = true;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
    this.sidebarToggled.emit(this.collapsed);
  }
}
