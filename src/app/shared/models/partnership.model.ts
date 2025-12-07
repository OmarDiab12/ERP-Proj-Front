export interface Partnership {
  id: number;
  partnerName: string;
  startDate: string;
  endDate?: string;
  contribution?: number;
  revenueShare?: number;
  status: 'active' | 'pending' | 'suspended' | 'closed';
  notes?: string;
}
