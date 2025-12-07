import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, of, tap } from 'rxjs';

export interface InventoryQuery {
  search?: string;
  status?: string;
  category?: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  unit: string;
  status: string;
  reorderPoint?: number;
  lastUpdated?: string;
}

interface InventoryApiResponse {
  data?: InventoryItem[];
  result?: InventoryItem[];
}

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private apiUrl = 'https://newerp.runasp.net/api/inventory';

  private itemsSubject = new BehaviorSubject<InventoryItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();

  private fallbackInventory: InventoryItem[] = [
    {
      id: 1,
      name: 'حاسوب محمول - ألترا بوك',
      sku: 'SKU-1452',
      category: 'إلكترونيات',
      stock: 42,
      unit: 'قطعة',
      status: 'متوفر',
      reorderPoint: 15,
      lastUpdated: '2024-12-12'
    },
    {
      id: 2,
      name: 'كرسي مكتب شبكي',
      sku: 'SKU-8841',
      category: 'أثاث مكتبي',
      stock: 8,
      unit: 'قطعة',
      status: 'منخفض',
      reorderPoint: 10,
      lastUpdated: '2024-12-10'
    },
    {
      id: 3,
      name: 'طابعة ليزر متعددة الوظائف',
      sku: 'SKU-3329',
      category: 'إلكترونيات',
      stock: 0,
      unit: 'جهاز',
      status: 'نفد المخزون',
      reorderPoint: 5,
      lastUpdated: '2024-12-08'
    },
    {
      id: 4,
      name: 'حبر طابعة أسود - XL',
      sku: 'SKU-9917',
      category: 'مستلزمات مكتبية',
      stock: 65,
      unit: 'عبوة',
      status: 'قيد التوريد',
      reorderPoint: 20,
      lastUpdated: '2024-12-06'
    },
    {
      id: 5,
      name: 'ورق طباعة A4 - 80 جم',
      sku: 'SKU-7723',
      category: 'مستلزمات مكتبية',
      stock: 120,
      unit: 'كرتون',
      status: 'متوفر',
      reorderPoint: 30,
      lastUpdated: '2024-12-02'
    }
  ];

  constructor(private http: HttpClient) {}

  loadInventory(query?: InventoryQuery): Observable<InventoryItem[]> {
    this.setLoading(true);
    this.errorSubject.next(null);

    const params = this.buildParams(query);

    return this.http.get<InventoryApiResponse>(`${this.apiUrl}/list`, { params }).pipe(
      map((response) => response?.data ?? response?.result ?? []),
      map((items) => items.length ? items : this.applyFallback(query)),
      tap((items) => this.itemsSubject.next(items)),
      catchError((error) => {
        console.error('Failed to load inventory', error);
        this.errorSubject.next('تعذر تحميل بيانات المخزون حالياً');
        const fallback = this.applyFallback(query);
        this.itemsSubject.next(fallback);
        return of(fallback);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  searchInventory(query: InventoryQuery): Observable<InventoryItem[]> {
    return this.loadInventory(query);
  }

  private buildParams(query?: InventoryQuery): HttpParams {
    let params = new HttpParams();
    if (!query) {
      return params;
    }

    if (query.search) {
      params = params.set('search', query.search);
    }
    if (query.status) {
      params = params.set('status', query.status);
    }
    if (query.category) {
      params = params.set('category', query.category);
    }
    return params;
  }

  private applyFallback(query?: InventoryQuery): InventoryItem[] {
    if (!query) {
      return this.fallbackInventory;
    }

    return this.fallbackInventory.filter((item) => {
      const matchesSearch = query.search
        ? (item.name + item.sku + item.category).toLowerCase().includes(query.search.toLowerCase())
        : true;
      const matchesStatus = query.status ? item.status === query.status : true;
      const matchesCategory = query.category ? item.category === query.category : true;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }

  private setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }
}
