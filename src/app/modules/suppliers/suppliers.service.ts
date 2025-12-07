import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, shareReplay, tap } from 'rxjs';

export interface Supplier {
  id: number;
  name: string;
  company: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  category: string;
  status: 'نشط' | 'قيد المتابعة' | 'موقوف';
  rating: number;
  outstandingOrders: number;
  lastOrderDate: string;
}

export interface SupplierQuery {
  search?: string;
  status?: string;
  category?: string;
  page: number;
  pageSize: number;
}

export interface SuppliersPage {
  items: Supplier[];
  total: number;
}

interface SupplierAssetResponse {
  suppliers: Supplier[];
}

@Injectable({ providedIn: 'root' })
export class SuppliersService {
  private suppliers$?: Observable<Supplier[]>;

  constructor(private http: HttpClient) {}

  private loadSuppliers(): Observable<Supplier[]> {
    if (!this.suppliers$) {
      this.suppliers$ = this.http
        .get<SupplierAssetResponse>('assets/data/suppliers.json')
        .pipe(
          map(res => res.suppliers || []),
          shareReplay(1)
        );
    }
    return this.suppliers$;
  }

  getSuppliers(query: SupplierQuery): Observable<SuppliersPage> {
    return this.loadSuppliers().pipe(
      map(suppliers => {
        const normalizedSearch = query.search?.trim().toLowerCase();
        let filtered = suppliers;

        if (normalizedSearch) {
          filtered = filtered.filter(supplier =>
            [supplier.name, supplier.company, supplier.contactPerson, supplier.email]
              .some(field => field.toLowerCase().includes(normalizedSearch))
          );
        }

        if (query.status) {
          filtered = filtered.filter(supplier => supplier.status === query.status);
        }

        if (query.category) {
          filtered = filtered.filter(supplier => supplier.category === query.category);
        }

        const total = filtered.length;
        const start = (query.page - 1) * query.pageSize;
        const items = filtered.slice(start, start + query.pageSize);

        return { items, total };
      })
    );
  }

  markFavorite(id: number): Observable<boolean> {
    return of(true).pipe(tap(() => console.log(`⭐ Marked supplier ${id} as favorite`)));
  }

  deleteSupplier(id: number): Observable<boolean> {
    return of(true).pipe(tap(() => console.log(`🗑️ Deleted supplier ${id}`)));
  }

  downloadProfile(id: number): Observable<boolean> {
    return of(true).pipe(tap(() => console.log(`⬇️ Downloaded supplier ${id} profile`)));
  }

  refreshCache(): void {
    this.suppliers$ = undefined;
  }
}
