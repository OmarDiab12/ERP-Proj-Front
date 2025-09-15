import { Component } from '@angular/core';
import { NotificationService } from 'src/app/Core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  constructor(private notificationService: NotificationService) {
  }
    toggleNotification() {
    this.notificationService.toggle();
  }
}
