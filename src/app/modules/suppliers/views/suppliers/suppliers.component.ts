import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, finalize, takeUntil } from 'rxjs';

import { Supplier, SuppliersService } from '../../suppliers.service';

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit, OnDestroy {
  suppliers: Supplier[] = [];
  loading = false;

  filters = this.fb.group({
    search: [''],
    status: [''],
    category: ['']
  });

  pagination: PaginationState = {
    page: 1,
    pageSize: 8,
    total: 0
  };

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private suppliersService: SuppliersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
    this.filters.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.pagination.page = 1;
      this.loadSuppliers();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSuppliers(): void {
    this.loading = true;
    const { search, status, category } = this.filters.value;

    this.suppliersService
      .getSuppliers({
        search: search || undefined,
        status: status || undefined,
        category: category || undefined,
        page: this.pagination.page,
        pageSize: this.pagination.pageSize
      })
      .pipe(
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: res => {
          this.suppliers = res.items;
          this.pagination.total = res.total;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'تعذر تحميل قائمة الموردين' });
        }
      });
  }

  resetFilters(): void {
    this.filters.reset({ search: '', status: '', category: '' });
  }

  goToPage(page: number): void {
    if (page < 1) return;
    const lastPage = Math.max(1, Math.ceil(this.pagination.total / this.pagination.pageSize));
    if (page > lastPage) return;
    this.pagination.page = page;
    this.loadSuppliers();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.pagination.total / this.pagination.pageSize));
  }

  statusClass(status: Supplier['status']): string {
    switch (status) {
      case 'نشط':
        return 'active';
      case 'قيد المتابعة':
        return 'pending';
      case 'موقوف':
        return 'blocked';
      default:
        return '';
    }
  }

  markFavorite(supplier: Supplier): void {
    this.suppliersService.markFavorite(supplier.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'تم', detail: `تم تمييز ${supplier.name}` });
    });
  }

  deleteSupplier(supplier: Supplier): void {
    this.suppliersService.deleteSupplier(supplier.id).subscribe(() => {
      this.messageService.add({ severity: 'warn', summary: 'حذف', detail: `${supplier.name} تم الحذف` });
      this.suppliersService.refreshCache();
      this.loadSuppliers();
    });
  }

  downloadProfile(supplier: Supplier): void {
    this.suppliersService.downloadProfile(supplier.id).subscribe(() => {
      this.messageService.add({ severity: 'info', summary: 'تحميل', detail: `تم تجهيز بيانات ${supplier.name}` });
    });
  }
}
