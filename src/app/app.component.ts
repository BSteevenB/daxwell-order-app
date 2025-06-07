import { Component, HostListener  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'daxwell-order-app';
  isSidebarCollapsed = false;

    handleSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  // Optional: auto-collapse for small screens
  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth < 768) {
      this.isSidebarCollapsed = true;
    }
  }

  ngOnInit() {
    this.onResize();
  }
}
