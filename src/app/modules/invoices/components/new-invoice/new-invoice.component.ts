import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent {
  constructor(private router: Router) { }

  saveDraft(): void {
    // TODO: integrate with backend once payload is finalized
    this.router.navigate(['/invoices']);
  }
}
