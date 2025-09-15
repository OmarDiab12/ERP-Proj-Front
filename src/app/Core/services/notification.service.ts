import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private visibleBS = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleBS.asObservable();

  toggle() {
    this.visibleBS.next(!this.visibleBS.getValue());
  }

  show() {
    this.visibleBS.next(true);
  }

  hide() {
    this.visibleBS.next(false);
  }

  getValue(): boolean {
    return this.visibleBS.getValue();
  }
}
