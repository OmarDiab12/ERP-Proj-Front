import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface PHButton {
  label: string;
  icon?: string; // e.g. 'fa-plus'
  type?: 'primary'|'outline'|'ghost'; // for styles
}

export interface PHTab {
  key: string;
  label: string;
}

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() rtl = false;

  @Input() primaryButton?: PHButton;   // main action (solid)
  @Input() secondaryButton?: PHButton; // secondary action (outline)
  @Input() showsecondaryButton = false;
  @Input() showprimaryButton = false;
  @Input() showAddButton = false;
  @Input() addButton?: PHButton;


  @Output() primaryClick = new EventEmitter<void>();
  @Output() secondaryClick = new EventEmitter<void>();
  @Output() addClick = new EventEmitter<void>();

  onPrimary() { this.primaryClick.emit(); }
  onSecondary() { this.secondaryClick.emit(); }
  onAdd() { this.addClick.emit(); }
}
