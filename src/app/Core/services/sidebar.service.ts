import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private collapsedBS = new BehaviorSubject<boolean>(false);
  collapsed$ = this.collapsedBS.asObservable();

  toggle() {
    this.collapsedBS.next(!this.collapsedBS.getValue());
  }

  setCollapsed(val: boolean) {
    this.collapsedBS.next(val);
  }

  getValue(): boolean {
    return this.collapsedBS.getValue();
  }
}
