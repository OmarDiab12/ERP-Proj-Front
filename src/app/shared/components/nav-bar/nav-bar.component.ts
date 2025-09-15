import { Component, EventEmitter, Output } from '@angular/core';
import { NotificationService } from 'src/app/Core/services/notification.service';
import { SidebarService } from 'src/app/Core/services/sidebar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isCollapsed = false;
    searchText: string = '';
  selectedCurrency: string = 'SAR'; // مثلاً آخر عملة اختارها المستخدم

  @Output() searchChanged = new EventEmitter<string>();

  onSearchChange() {
    this.searchChanged.emit(this.searchText);
  }

  constructor(private sidebarService: SidebarService,private notificationService: NotificationService) {
    this.sidebarService.collapsed$.subscribe(state => {
      this.isCollapsed = state;
    });
  }
  toggleSidebar() {
    this.sidebarService.toggle();
  }

  toggleNotification() {
    this.notificationService.toggle();
  }
}
