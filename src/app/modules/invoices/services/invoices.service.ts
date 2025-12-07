import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface InvoiceSummary {
  id: number;
  invoiceNumber: string;
  client: string;
  issueDate: string;
  dueDate: string;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  period?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private readonly baseUrl = 'https://newerp.runasp.net/api/Invoices';

  constructor(private http: HttpClient) { }

  getInvoices(params?: Record<string, any>): Observable<InvoiceSummary[]> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get<InvoiceSummary[]>(this.baseUrl, { params: httpParams });
  }

  getInvoiceById(id: number | string): Observable<InvoiceSummary> {
    return this.http.get<InvoiceSummary>(`${this.baseUrl}/${id}`);
  }

  createInvoice(payload: Partial<InvoiceSummary>): Observable<InvoiceSummary> {
    return this.http.post<InvoiceSummary>(this.baseUrl, payload);
  }
}
