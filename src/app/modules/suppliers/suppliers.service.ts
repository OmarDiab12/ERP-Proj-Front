import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, map, tap } from 'rxjs';

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

export interface NewSupplierPayload {
  owner: string;
  manager: string;
  supplierName: string;
  phone: string;
  email: string;
  status: Supplier['status'];
}

@Injectable({ providedIn: 'root' })
export class SuppliersService {
  private suppliersSubject = new BehaviorSubject<Supplier[]>([]);

  constructor(private http: HttpClient) {
    this.reloadFromAsset();
  }

  private reloadFromAsset(): void {
    this.http
      .get<SupplierAssetResponse>('assets/data/suppliers.json')
      .pipe(map(res => res.suppliers || []))
      .subscribe(list => this.suppliersSubject.next(list));
  }

  private loadSuppliers(): Observable<Supplier[]> {
    return this.suppliersSubject.asObservable();
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

  addSupplier(payload: NewSupplierPayload): Observable<Supplier> {
    const nextId = this.suppliersSubject.value.length + 1;
    const newSupplier: Supplier = {
      id: nextId,
      name: payload.supplierName,
      company: payload.owner,
      contactPerson: payload.manager,
      phone: payload.phone,
      email: payload.email,
      location: '—',
      category: 'مواد بناء',
      status: payload.status,
      rating: 4.5,
      outstandingOrders: 0,
      lastOrderDate: new Date().toISOString()
    };

    this.suppliersSubject.next([newSupplier, ...this.suppliersSubject.value]);
    return of(newSupplier);
  }

  markFavorite(id: number): Observable<boolean> {
    return of(true).pipe(tap(() => console.log(`⭐ Marked supplier ${id} as favorite`)));
  }

  deleteSupplier(id: number): Observable<boolean> {
    this.suppliersSubject.next(this.suppliersSubject.value.filter(supplier => supplier.id !== id));
    return of(true).pipe(tap(() => console.log(`🗑️ Deleted supplier ${id}`)));
  }

  downloadProfile(id: number): Observable<boolean> {
    return of(true).pipe(tap(() => console.log(`⬇️ Downloaded supplier ${id} profile`)));
  }

  refreshCache(): void {
    this.reloadFromAsset();
  }
}
