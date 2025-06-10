import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'daxwell-order-app';
  isSidebarCollapsed = false;
  isMobileSidebarOpen = false;

  handleSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth > 768) {
      this.isMobileSidebarOpen = false;
    }
  }

  ngOnInit() {
    this.onResize();
  }
}
