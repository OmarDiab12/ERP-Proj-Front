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

  @Input() LightButton1?: PHButton; // secondary action (outline)
  @Input() LightButton2?: PHButton;   // main action (solid)
  @Input() LightButton3?: PHButton;   // main action (solid)
  @Input() showLightButton1 = false;
  @Input() showLightButton2 = false;
  @Input() showLightButton3 = false;
  @Input() showAddButton1 = false;
  @Input() showDarkButton = false;
  @Input() addButton1?: PHButton;
  @Input() DarkButton?: PHButton;


  @Output() Light1Click = new EventEmitter<void>();
  @Output() Light2Click = new EventEmitter<void>();
  @Output() Light3Click = new EventEmitter<void>();
  @Output() DarkButtonClick = new EventEmitter<void>();
  @Output() add1Click = new EventEmitter<void>();

  onLight1() { this.Light1Click.emit(); }
  onLight2() { this.Light2Click.emit(); }
  onLight3() { this.Light3Click.emit(); }
  onAdd1() { this.add1Click.emit(); }
  onDark() { this.DarkButtonClick.emit(); }
}
