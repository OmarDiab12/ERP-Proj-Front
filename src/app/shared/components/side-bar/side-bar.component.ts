import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarService } from 'src/app/Core/services/sidebar.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  private sub?: Subscription;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sub = this.sidebarService.collapsed$.subscribe(v => {
      this.isCollapsed = v;
      // console.log('sidebar collapsed ->', v);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
