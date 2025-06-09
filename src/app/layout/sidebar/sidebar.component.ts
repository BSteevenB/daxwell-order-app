import { Component, EventEmitter, Output, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isMobileOpen: boolean = false;
  collapsed = false;
  orderMenuOpen = true;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  toggleSidebar(): void {
    if (window.innerWidth <= 768) {
      this.isMobileOpen = !this.isMobileOpen;
    } else {
      this.collapsed = !this.collapsed;
      this.sidebarToggled.emit(this.collapsed);
    }
  }

  closeMobileSidebar(): void {
    if (window.innerWidth <= 768) {
      this.isMobileOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > 768) {
      this.isMobileOpen = false;
    }
  }
}
