import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PHButton } from '../page-header/page-header.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() icon?: string;        // أيقونة (class أو path)
  @Input() title?: string;       // العنوان
  @Input() value?: string | number; // القيمة
  @Input() currency?: string;    // العملة
  @Input() subtitle?: string;    // النص تحت
  @Input() percentage?: string;  // النسبة
  @Input() colorClass: string = ''; // اللون (كلاس CSS خارجي)
  @Input() iconColor: string = ''; // اللون (كلاس CSS خارجي)
  @Input() percentageColor: string = ''; // اللون (كلاس CSS خارجي)
  @Input() showCardButton = false;
  @Input() CardButton?: PHButton;

  @Output() cardButtonClick = new EventEmitter<void>();

  onCardButton() { this.cardButtonClick.emit(); }
}
