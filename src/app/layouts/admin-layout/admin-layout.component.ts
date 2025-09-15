import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Core/services/notification.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
    notificationVisible = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.visible$.subscribe(val => {
      this.notificationVisible = val;
    });
  }


  handleSearch(query: string) {
  console.log('Search query:', query);
  // هنا تقدر تعمل فلترة أو تبعت API call
}
}
