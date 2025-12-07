export interface SupplierContact {
  name: string;
  phone?: string;
  email?: string;
  role?: string;
}

export interface Supplier {
  id: number;
  name: string;
  taxId?: string;
  category?: string;
  rating?: number;
  primaryContact?: SupplierContact;
  contacts?: SupplierContact[];
  address?: string;
  city?: string;
  country?: string;
  status?: 'active' | 'inactive' | 'pending';
}
