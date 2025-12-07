import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface PartnershipStats {
  totalPartnerships: number;
  activeProjects: number;
  totalInvestment: number;
  expectedProfit: number;
}

export interface PartnershipProject {
  id: number | string;
  name: string;
  owner?: string;
  status?: string;
  location?: string;
  budget?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PartnershipsService {
  private readonly baseUrl = 'https://newerp.runasp.net/api/Partnerships';

  constructor(private http: HttpClient) { }

  /**
   * Fetch KPI figures for the partnerships workspace. Empty or malformed responses
   * are normalised into a zeroed object so the UI can render without errors.
   */
  getStats(): Observable<PartnershipStats> {
    return this.http.post(`${this.baseUrl}/stats`, {}).pipe(
      map((res: any) => res?.data ?? res ?? {}),
      map((payload: any) => ({
        totalPartnerships: Number(payload.totalPartnerships ?? payload.TotalPartnerships ?? 0) || 0,
        activeProjects: Number(payload.activeProjects ?? payload.ActiveProjects ?? payload.active ?? 0) || 0,
        totalInvestment: Number(payload.totalInvestment ?? payload.TotalInvestment ?? payload.investment ?? 0) || 0,
        expectedProfit: Number(payload.expectedProfit ?? payload.ExpectedProfit ?? payload.profit ?? 0) || 0,
      })),
      catchError(() => of({
        totalPartnerships: 0,
        activeProjects: 0,
        totalInvestment: 0,
        expectedProfit: 0,
      }))
    );
  }

  /**
   * Fetch the project list associated with partnerships. Always returns an array,
   * even when the backend returns null/empty responses.
   */
  getProjects(searchTerm?: string): Observable<PartnershipProject[]> {
    const payload = searchTerm ? { search: searchTerm } : {};

    return this.http.post(`${this.baseUrl}/projects`, payload).pipe(
      map((res: any) => res?.data ?? res ?? []),
      map((list: any) => Array.isArray(list) ? list : []),
      catchError(() => of([]))
    );
  }
}
