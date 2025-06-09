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
  isMobileView = window.innerWidth <= 768;
  @Output() sidebarToggled = new EventEmitter<boolean>();

  ngOnInit() {
    this.onResize(); 
  }

  toggleSidebar(): void {
    if (window.innerWidth <= 768) {
      this.isMobileOpen = !this.isMobileOpen;
    } else {
      this.collapsed = !this.collapsed;
      this.sidebarToggled.emit(this.collapsed);
    }
  }

  handleMenuClick(): void {
  if (this.isMobileView) {
    this.closeMobileSidebar();
  }
}

    getToggleIcon(): string {
    if (this.isMobileView) {
      return this.isMobileOpen ? 'close' : 'menu';
    }
    return this.collapsed ? 'menu' : 'chevron_left';
  }

  closeMobileSidebar(): void {
    if (window.innerWidth <= 768) {
      this.isMobileOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileView = window.innerWidth <= 768;

    if (this.isMobileView) {
      this.collapsed = false; 
    } else {
      this.isMobileOpen = false; 
    }
  }
}
