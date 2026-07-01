import { RawSkuRow } from './types';

export const DEFAULT_RAW_DATA: RawSkuRow[] = [
  // --- Week 26, Store 101, Haircare ---
  { id: "1", week: "W26", storeId: "Store 101", groupId: "Haircare", skuId: "H-SHAMP-001", price: 12.50, sellQty: 120, stockQty: 80 },
  { id: "2", week: "W26", storeId: "Store 101", groupId: "Haircare", skuId: "H-COND-002", price: 14.00, sellQty: 95, stockQty: 110 },
  { id: "3", week: "W26", storeId: "Store 101", groupId: "Haircare", skuId: "H-MASK-003", price: 28.00, sellQty: 45, stockQty: 60 },
  { id: "4", week: "W26", storeId: "Store 101", groupId: "Haircare", skuId: "H-OIL-004", price: 42.00, sellQty: 22, stockQty: 35 },
  { id: "5", week: "W26", storeId: "Store 101", groupId: "Haircare", skuId: "H-SERUM-005", price: 58.00, sellQty: 18, stockQty: 25 },
  { id: "6", week: "W26", storeId: "Store 101", groupId: "Haircare", skuId: "H-SPRAY-006", price: 9.99, sellQty: 15, stockQty: 220 }, // High stock, low sales
  { id: "7", week: "W26", storeId: "Store 101", groupId: "Haircare", skuId: "H-GEL-007", price: 11.50, sellQty: 8, stockQty: 150 },   // Low sales, high stock
  { id: "8", week: "W26", storeId: "Store 101", groupId: "Haircare", skuId: "H-TONIC-008", price: 85.00, sellQty: 3, stockQty: 12 },   // Premium, low sales
  { id: "9", week: "W26", storeId: "Store 101", groupId: "Haircare", skuId: "H-WAX-009", price: 15.00, sellQty: 0, stockQty: 90 },    // Zero sales, high stock (Dead Stock)
  { id: "10", week: "W26", storeId: "Store 101", groupId: "Haircare", skuId: "H-CLAY-010", price: 18.50, sellQty: 0, stockQty: 45 },  // Zero sales (Dead Stock)

  // --- Week 26, Store 101, Skincare ---
  { id: "11", week: "W26", storeId: "Store 101", groupId: "Skincare", skuId: "S-CLEAN-101", price: 18.00, sellQty: 85, stockQty: 120 },
  { id: "12", week: "W26", storeId: "Store 101", groupId: "Skincare", skuId: "S-MOIST-102", price: 32.00, sellQty: 75, stockQty: 90 },
  { id: "13", week: "W26", storeId: "Store 101", groupId: "Skincare", skuId: "S-SUNSC-103", price: 24.50, sellQty: 140, stockQty: 200 }, // Hero product!
  { id: "14", week: "W26", storeId: "Store 101", groupId: "Skincare", skuId: "S-SERUM-104", price: 65.00, sellQty: 35, stockQty: 50 },
  { id: "15", week: "W26", storeId: "Store 101", groupId: "Skincare", skuId: "S-EYECR-105", price: 48.00, sellQty: 15, stockQty: 40 },
  { id: "16", week: "W26", storeId: "Store 101", groupId: "Skincare", skuId: "S-TONER-106", price: 19.99, sellQty: 50, stockQty: 80 },
  { id: "17", week: "W26", storeId: "Store 101", groupId: "Skincare", skuId: "S-MASK-107", price: 5.50, sellQty: 220, stockQty: 350 }, // Volume seller
  { id: "18", week: "W26", storeId: "Store 101", groupId: "Skincare", skuId: "S-EXFOL-108", price: 29.00, sellQty: 0, stockQty: 75 },  // Dead stock
  { id: "19", week: "W26", storeId: "Store 101", groupId: "Skincare", skuId: "S-BALM-109", price: 125.00, sellQty: 2, stockQty: 15 },  // High price, slow moving
  { id: "20", week: "W26", storeId: "Store 101", groupId: "Skincare", skuId: "S-MIST-110", price: 16.00, sellQty: 0, stockQty: 110 }, // Dead stock

  // --- Week 26, Store 101, Makeup ---
  { id: "21", week: "W26", storeId: "Store 101", groupId: "Makeup", skuId: "M-FOUND-201", price: 38.00, sellQty: 90, stockQty: 110 },
  { id: "22", week: "W26", storeId: "Store 101", groupId: "Makeup", skuId: "M-LIPST-202", price: 22.00, sellQty: 130, stockQty: 140 },
  { id: "23", week: "W26", storeId: "Store 101", groupId: "Makeup", skuId: "M-MASCA-203", price: 19.50, sellQty: 110, stockQty: 95 },
  { id: "24", week: "W26", storeId: "Store 101", groupId: "Makeup", skuId: "M-PALET-204", price: 55.00, sellQty: 40, stockQty: 65 },
  { id: "25", week: "W26", storeId: "Store 101", groupId: "Makeup", skuId: "M-LINER-205", price: 14.50, sellQty: 85, stockQty: 180 },
  { id: "26", week: "W26", storeId: "Store 101", groupId: "Makeup", skuId: "M-BLUSH-206", price: 25.00, sellQty: 25, stockQty: 120 }, // Slow moving
  { id: "27", week: "W26", storeId: "Store 101", groupId: "Makeup", skuId: "M-BROWS-207", price: 18.00, sellQty: 55, stockQty: 150 },
  { id: "28", week: "W26", storeId: "Store 101", groupId: "Makeup", skuId: "M-CONCE-208", price: 21.00, sellQty: 0, stockQty: 85 },  // Dead stock
  { id: "29", week: "W26", storeId: "Store 101", groupId: "Makeup", skuId: "M-GLOSS-209", price: 16.50, sellQty: 0, stockQty: 130 }, // Dead stock
  { id: "30", week: "W26", storeId: "Store 101", groupId: "Makeup", skuId: "M-HIGHLIGHT-210", price: 45.00, sellQty: 5, stockQty: 40 },

  // --- Week 26, Store 102, Haircare ---
  { id: "31", week: "W26", storeId: "Store 102", groupId: "Haircare", skuId: "H-SHAMP-001", price: 12.50, sellQty: 75, stockQty: 100 },
  { id: "32", week: "W26", storeId: "Store 102", groupId: "Haircare", skuId: "H-COND-002", price: 14.00, sellQty: 60, stockQty: 120 },
  { id: "33", week: "W26", storeId: "Store 102", groupId: "Haircare", skuId: "H-OIL-004", price: 42.00, sellQty: 5, stockQty: 50 },     // Concentration warning trigger!
  { id: "34", week: "W26", storeId: "Store 102", groupId: "Haircare", skuId: "H-SERUM-005", price: 58.00, sellQty: 1, stockQty: 30 },

  // --- Week 26, Store 102, Skincare ---
  { id: "35", week: "W26", storeId: "Store 102", groupId: "Skincare", skuId: "S-SUNSC-103", price: 24.50, sellQty: 195, stockQty: 250 }, // Extremely high concentration
  { id: "36", week: "W26", storeId: "Store 102", groupId: "Skincare", skuId: "S-CLEAN-101", price: 18.00, sellQty: 12, stockQty: 110 },
  { id: "37", week: "W26", storeId: "Store 102", groupId: "Skincare", skuId: "S-MOIST-102", price: 32.00, sellQty: 8, stockQty: 95 },
  { id: "38", week: "W26", storeId: "Store 102", groupId: "Skincare", skuId: "S-EXFOL-108", price: 29.00, sellQty: 0, stockQty: 60 },

  // --- Week 26, Store 103, Makeup ---
  { id: "39", week: "W26", storeId: "Store 103", groupId: "Makeup", skuId: "M-FOUND-201", price: 38.00, sellQty: 12, stockQty: 80 },
  { id: "40", week: "W26", storeId: "Store 103", groupId: "Makeup", skuId: "M-LIPST-202", price: 22.00, sellQty: 14, stockQty: 120 }
];
