import React, { useState } from 'react';
import { RawSkuRow, PriceBand, ConcentrationThresholds, CalculatedSkuRow } from '../types';
import { Calculator, HelpCircle, Eye, EyeOff } from 'lucide-react';

interface CalculationEngineProps {
  rawData: RawSkuRow[];
  priceBands: PriceBand[];
  thresholds: ConcentrationThresholds;
}

export const CalculationEngine: React.FC<CalculationEngineProps> = ({
  rawData,
  priceBands,
  thresholds,
}) => {
  const [selectedStore, setSelectedStore] = useState('ALL');
  const [selectedGroup, setSelectedGroup] = useState('ALL');
  const [showFormulas, setShowFormulas] = useState(false);

  // Derive unique store IDs & group IDs for filters
  const uniqueStores = Array.from(new Set(rawData.map(row => row.storeId))).sort();
  const uniqueGroups = Array.from(new Set(rawData.map(row => row.groupId))).sort();

  // Helper to find price band name
  const getPriceRangeLabel = (price: number): string => {
    const matched = priceBands.find(band => price >= band.min && price <= band.max);
    return matched ? matched.name : 'Unassigned';
  };

  // Run core calculation formulas
  const calculateEngineRows = (): CalculatedSkuRow[] => {
    // 1. Filter rows based on availability & selector filters
    let filtered = rawData.map(row => {
      const isAvailable = row.sellQty > 0 || row.stockQty > 0;
      const priceRange = getPriceRangeLabel(row.price);
      const salesRevenue = row.price * row.sellQty;

      return {
        ...row,
        isAvailable,
        priceRange,
        salesRevenue,
        sortedIndex: 0,
        runningTotal: 0,
        cumulativePct: 0,
        category: 'Clearance' as any,
      };
    }).filter(row => row.isAvailable); // Excel rule: Availability Constraint

    if (selectedStore !== 'ALL') {
      filtered = filtered.filter(row => row.storeId === selectedStore);
    }
    if (selectedGroup !== 'ALL') {
      filtered = filtered.filter(row => row.groupId === selectedGroup);
    }

    // 2. Sort DESC by sales revenue
    filtered.sort((a, b) => b.salesRevenue - a.salesRevenue);

    // 3. Compute running total and cumulative %
    const totalRevenue = filtered.reduce((sum, row) => sum + row.salesRevenue, 0);

    let runningSum = 0;
    const computed: CalculatedSkuRow[] = filtered.map((row, index) => {
      runningSum += row.salesRevenue;
      const cumulativePct = totalRevenue > 0 ? (runningSum / totalRevenue) * 100 : 0;

      // Assign categories based on thresholds
      let category: 'Core' | 'Mainstream' | 'Long-tail' | 'Clearance' = 'Clearance';
      
      if (row.salesRevenue === 0) {
        category = 'Clearance';
      } else if (cumulativePct <= thresholds.core) {
        category = 'Core';
      } else if (cumulativePct <= thresholds.mainstream) {
        category = 'Mainstream';
      } else if (cumulativePct <= thresholds.longtail) {
        category = 'Long-tail';
      } else {
        category = 'Clearance';
      }

      return {
        ...row,
        sortedIndex: index + 1,
        runningTotal: runningSum,
        cumulativePct,
        category,
      };
    });

    return computed;
  };

  const calculatedRows = calculateEngineRows();
  const totalCalculatedRevenue = calculatedRows.reduce((sum, r) => sum + r.salesRevenue, 0);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl tracking-tight text-primary font-medium">
          Behind-the-Scenes: Calculation Engine
        </h1>
        <p className="text-muted text-sm max-w-3xl">
          Audit the real-time running totals, dynamic sorting, and Pareto category tags compiled by our client-side JavaScript engine.
        </p>
      </div>

      {/* Slicers & Tooling Bar */}
      <div className="bg-surface p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          {/* Store Selector */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-muted tracking-wider mb-1">Store Slicer</label>
            <select
              className="bg-bg text-xs text-primary border border-border rounded px-2.5 py-1 focus:outline-none focus:border-accent"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option value="ALL">All Stores (Consolidated)</option>
              {uniqueStores.map(store => (
                <option key={store} value={store}>{store}</option>
              ))}
            </select>
          </div>

          {/* Group Selector */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-muted tracking-wider mb-1">Category Slicer</label>
            <select
              className="bg-bg text-xs text-primary border border-border rounded px-2.5 py-1 focus:outline-none focus:border-accent"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              {uniqueGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Formulas display toggle */}
        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="flex items-center gap-1.5 text-xs text-accent hover:text-opacity-80 border border-accent/20 rounded px-3 py-1.5 bg-accent/4 transition-all hover:bg-accent/8 font-medium cursor-pointer"
        >
          {showFormulas ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Hide Excel Formulas</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Show Excel Formulas</span>
            </>
          )}
        </button>
      </div>

      {/* Explanatory banner */}
      <div className="p-4 rounded-lg bg-[rgba(5,28,44,0.04)] border-l-3 border-primary text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-primary">
          <Calculator className="w-4 h-4 text-primary" />
          <span>Active Diagnostic Formula Sheet</span>
        </div>
        <p className="text-muted text-[11px]">
          Showing calculated rows where <code>(Sell_Qty &gt; 0 OR Stock_Qty &gt; 0)</code>. Sorted by <code>Sales Revenue DESC</code> to trace cumulative percentages.
        </p>
      </div>

      {/* Computed Rows Spreadsheet */}
      <div className="bg-surface rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] h-11">
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary text-center">Rank</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary font-mono">SKU ID</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary">Price Band</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary text-right">Price</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary text-right">Sales Qty</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary text-right">Sales Revenue</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary text-right">Running Total</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary text-right">Cumulative %</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary text-center">Pareto Class</th>
              </tr>
            </thead>
            <tbody>
              {calculatedRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-xs text-muted">
                    No active inventory found matching selected slicers.
                  </td>
                </tr>
              ) : (
                calculatedRows.map((row) => {
                  let badgeColor = 'bg-gray-100 text-muted';
                  if (row.category === 'Core') badgeColor = 'bg-accent/10 text-accent font-semibold';
                  if (row.category === 'Mainstream') badgeColor = 'bg-primary/10 text-primary font-semibold';
                  if (row.category === 'Long-tail') badgeColor = 'bg-gray-200 text-muted';
                  if (row.category === 'Clearance') badgeColor = 'bg-[#D32F2F]/10 text-[#D32F2F] font-semibold';

                  return (
                    <tr
                      key={row.id}
                      className="h-10 text-xs border-b border-border transition-colors hover:bg-[rgba(34,81,255,0.02)]"
                    >
                      {/* Rank */}
                      <td className="px-4 text-center font-mono text-muted">
                        {row.sortedIndex}
                      </td>

                      {/* SKU ID */}
                      <td className="px-4 font-mono font-medium text-primary">
                        {row.skuId}
                      </td>

                      {/* Price Band */}
                      <td className="px-4">
                        {showFormulas ? (
                          <code className="text-[10px] text-accent bg-accent/4 px-1 rounded font-mono">
                            =LOOKUP(Price, Config!PriceBands)
                          </code>
                        ) : (
                          row.priceRange
                        )}
                      </td>

                      {/* Unit Price */}
                      <td className="px-4 text-right font-mono text-muted">
                        ${row.price.toFixed(2)}
                      </td>

                      {/* Sales Qty */}
                      <td className="px-4 text-right font-mono text-muted">
                        {row.sellQty.toLocaleString()}
                      </td>

                      {/* Sales Revenue */}
                      <td className="px-4 text-right font-mono font-semibold text-primary">
                        {showFormulas ? (
                          <code className="text-[10px] text-accent bg-accent/4 px-1 rounded font-mono">
                            =Price * SalesQty
                          </code>
                        ) : (
                          `$${row.salesRevenue.toFixed(2)}`
                        )}
                      </td>

                      {/* Running Total */}
                      <td className="px-4 text-right font-mono text-muted">
                        {showFormulas ? (
                          <code className="text-[10px] text-accent bg-accent/4 px-1 rounded font-mono">
                            =SCAN(0, Revenue, SUM)
                          </code>
                        ) : (
                          `$${row.runningTotal.toFixed(2)}`
                        )}
                      </td>

                      {/* Cumulative % */}
                      <td className="px-4 text-right font-mono text-accent font-medium">
                        {showFormulas ? (
                          <code className="text-[10px] text-accent bg-accent/4 px-1 rounded font-mono">
                            =RunningTotal / TotalRevenue
                          </code>
                        ) : (
                          `${row.cumulativePct.toFixed(2)}%`
                        )}
                      </td>

                      {/* Category Badge */}
                      <td className="px-4 text-center">
                        {showFormulas ? (
                          <code className="text-[10px] text-accent bg-accent/4 px-1 rounded font-mono">
                            =IF(Cum% &lt;= {thresholds.core}%, "Core", ...)
                          </code>
                        ) : (
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase ${badgeColor}`}>
                            {row.category}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
