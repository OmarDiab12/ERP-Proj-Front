export interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  category?: string;
  quantityOnHand: number;
  reorderLevel?: number;
  location?: string;
  unitCost?: number;
  lastUpdated?: string;
}
