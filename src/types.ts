export interface PriceBand {
  id: string;
  name: string;
  min: number;
  max: number;
}

export interface ConcentrationThresholds {
  core: number;       // e.g. 60
  mainstream: number; // e.g. 80
  longtail: number;   // e.g. 90
  all: number;        // e.g. 100
}

export interface RawSkuRow {
  id: string; // Internal React key
  week: string;
  storeId: string;
  groupId: string;
  skuId: string;
  price: number;
  sellQty: number;
  stockQty: number;
}

export interface CalculatedSkuRow extends RawSkuRow {
  isAvailable: boolean; // sellQty > 0 or stockQty > 0
  priceRange: string;   // Range A, B, C, D
  salesRevenue: number; // price * sellQty
  sortedIndex: number;  // descending sort by revenue
  runningTotal: number;
  cumulativePct: number;
  category: 'Core' | 'Mainstream' | 'Long-tail' | 'Clearance';
}

export interface DashboardFilters {
  storeId: string;   // "ALL" or specific
  groupId: string;   // "ALL" or specific
  priceRange: string; // "ALL" or specific
}
