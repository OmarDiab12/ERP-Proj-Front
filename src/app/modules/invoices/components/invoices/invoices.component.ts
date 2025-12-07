import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService, InvoiceSummary } from '../../services/invoices.service';

interface InvoiceFilter {
  status: string;
  search: string;
  client: string;
  period: string;
}

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  invoices: InvoiceSummary[] = [];
  filteredInvoices: InvoiceSummary[] = [];
  loading = false;

  statusTabs = [
    { key: 'all', label: 'الكل' },
    { key: 'paid', label: 'مدفوعة' },
    { key: 'pending', label: 'قيد الدفع' },
    { key: 'overdue', label: 'متأخرة' },
    { key: 'draft', label: 'مسودة' }
  ];

  filters: InvoiceFilter = {
    status: 'all',
    search: '',
    client: 'all',
    period: 'all'
  };

  constructor(private invoicesService: InvoicesService, private router: Router) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.loading = true;
    this.invoicesService.getInvoices().subscribe({
      next: (data) => {
        this.invoices = data && data.length ? data : this.getMockInvoices();
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.invoices = this.getMockInvoices();
        this.applyFilters();
        this.loading = false;
      }
    });
  }

  setStatus(status: string): void {
    this.filters.status = status;
    this.applyFilters();
  }

  applyFilters(): void {
    const term = this.filters.search.toLowerCase();
    this.filteredInvoices = this.invoices.filter((invoice) => {
      const matchesStatus = this.filters.status === 'all' || invoice.status === this.filters.status;
      const matchesClient = this.filters.client === 'all' || invoice.client === this.filters.client;
      const matchesSearch = !term || invoice.invoiceNumber.toLowerCase().includes(term) || invoice.client.toLowerCase().includes(term);
      const matchesPeriod = this.filters.period === 'all' || invoice.period === this.filters.period;
      return matchesStatus && matchesClient && matchesSearch && matchesPeriod;
    });
  }

  navigateToDetails(invoice: InvoiceSummary): void {
    this.router.navigate(['/invoices', invoice.id]);
  }

  navigateToNew(): void {
    this.router.navigate(['/invoices/new']);
  }

  trackByInvoiceId(_index: number, invoice: InvoiceSummary): number {
    return invoice.id;
  }

  private getMockInvoices(): InvoiceSummary[] {
    return [
      {
        id: 1,
        invoiceNumber: 'INV-00125',
        client: 'شركة النور',
        issueDate: '2024-05-01',
        dueDate: '2024-05-15',
        total: 14500,
        status: 'paid',
        period: 'this-month'
      },
      {
        id: 2,
        invoiceNumber: 'INV-00126',
        client: 'مؤسسة الأمل',
        issueDate: '2024-05-04',
        dueDate: '2024-05-20',
        total: 6800,
        status: 'pending',
        period: 'this-month'
      },
      {
        id: 3,
        invoiceNumber: 'INV-00118',
        client: 'حلول التقنية',
        issueDate: '2024-04-18',
        dueDate: '2024-05-02',
        total: 9200,
        status: 'overdue',
        period: 'last-month'
      },
      {
        id: 4,
        invoiceNumber: 'INV-00110',
        client: 'شركة البناء',
        issueDate: '2024-04-05',
        dueDate: '2024-04-25',
        total: 12400,
        status: 'paid',
        period: 'last-month'
      },
      {
        id: 5,
        invoiceNumber: 'INV-00130',
        client: 'مكتب المستقبل',
        issueDate: '2024-05-10',
        dueDate: '2024-05-28',
        total: 3100,
        status: 'draft',
        period: 'this-month'
      }
    ];
  }
}
