import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InventoryItem, InventoryQuery, InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {
  filtersForm: FormGroup;
  products: InventoryItem[] = [];
  filteredProducts: InventoryItem[] = [];
  loading = false;
  errorMessage: string | null = null;

  kpis = [
    {
      icon: 'pi pi-box',
      title: 'إجمالي العناصر',
      subtitle: 'جميع المنتجات المسجلة',
      colorClass: 'purple',
      key: 'total'
    },
    {
      icon: 'pi pi-exclamation-circle',
      title: 'بنسبة أقل من حد الطلب',
      subtitle: 'عناصر تحتاج لإعادة طلب',
      colorClass: 'orange',
      key: 'low'
    },
    {
      icon: 'pi pi-truck',
      title: 'طلبات التوريد المفتوحة',
      subtitle: 'قيد الوصول إلى المستودع',
      colorClass: 'blue',
      key: 'incoming'
    },
    {
      icon: 'pi pi-check-circle',
      title: 'متوفر للتخصيص',
      subtitle: 'جاهز للتسليم',
      colorClass: 'green',
      key: 'available'
    }
  ];

  columns = [
    { field: 'name', header: 'اسم المنتج', type: 'text' as const },
    { field: 'sku', header: 'كود التخزين (SKU)', type: 'text' as const },
    { field: 'category', header: 'الفئة', type: 'text' as const },
    { field: 'stock', header: 'الكمية المتاحة', type: 'number' as const },
    { field: 'unit', header: 'الوحدة', type: 'text' as const },
    { field: 'status', header: 'حالة المخزون', type: 'status' as const },
    { field: 'reorderPoint', header: 'نقطة إعادة الطلب', type: 'number' as const },
    { field: 'lastUpdated', header: 'آخر تحديث', type: 'date' as const }
  ];

  private subscriptions = new Subscription();

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {
    this.filtersForm = this.fb.group({
      search: [''],
      status: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.inventoryService.loading$.subscribe((loading) => (this.loading = loading))
    );

    this.subscriptions.add(
      this.inventoryService.error$.subscribe((error) => (this.errorMessage = error))
    );

    this.subscriptions.add(
      this.inventoryService.items$.subscribe((items) => {
        this.products = items;
        this.applyLocalFilters();
      })
    );

    this.subscriptions.add(
      this.filtersForm.valueChanges.subscribe(() => this.applyLocalFilters())
    );

    this.inventoryService.loadInventory().subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onAddItem() {
    console.log('فتح نموذج إضافة منتج جديد');
  }

  onRefresh() {
    const query = this.filtersForm.value as InventoryQuery;
    this.inventoryService.loadInventory(query).subscribe();
  }

  applyLocalFilters() {
    const { search, status, category } = this.filtersForm.value as InventoryQuery;
    const normalizedSearch = search?.toLowerCase().trim();

    this.filteredProducts = this.products.filter((item) => {
      const matchesSearch = normalizedSearch
        ? (item.name + item.sku + item.category).toLowerCase().includes(normalizedSearch)
        : true;
      const matchesStatus = status ? item.status === status : true;
      const matchesCategory = category ? item.category === category : true;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }

  getKpiValue(key: string): number {
    switch (key) {
      case 'total':
        return this.filteredProducts.length;
      case 'low':
        return this.filteredProducts.filter((p) => p.status === 'منخفض').length;
      case 'incoming':
        return this.filteredProducts.filter((p) => p.status === 'قيد التوريد').length;
      case 'available':
        return this.filteredProducts.filter((p) => p.status === 'متوفر').length;
      default:
        return 0;
    }
  }

  get availableCategories(): string[] {
    const categories = new Set(this.products.map((p) => p.category));
    return Array.from(categories);
  }
}
