import React, { useState, useMemo, useRef, useEffect } from 'react';
import { RawSkuRow, PriceBand, ConcentrationThresholds, CalculatedSkuRow, DashboardFilters } from '../types';
import { TrendingUp, ShoppingBag, Percent, AlertCircle, Sparkles, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

interface DashboardProps {
  rawData: RawSkuRow[];
  priceBands: PriceBand[];
  thresholds: ConcentrationThresholds;
}

export const Dashboard: React.FC<DashboardProps> = ({
  rawData,
  priceBands,
  thresholds,
}) => {
  // Slicers / Filters State
  const [filters, setFilters] = useState<DashboardFilters>({
    storeId: 'ALL',
    groupId: 'ALL',
    priceRange: 'ALL',
  });

  // Hovered node state for chart tooltips
  const [hoveredSku, setHoveredSku] = useState<CalculatedSkuRow | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // 1. Extract unique dimensions for filters
  const uniqueStores = useMemo(() => Array.from(new Set(rawData.map(r => r.storeId))).sort(), [rawData]);
  const uniqueGroups = useMemo(() => Array.from(new Set(rawData.map(r => r.groupId))).sort(), [rawData]);

  // Helper to resolve price band name
  const getPriceRangeLabel = (price: number): string => {
    const matched = priceBands.find(band => price >= band.min && price <= band.max);
    return matched ? matched.name : 'Unassigned';
  };

  // 2. Perform Pareto dynamic calculations on current filtered set
  const calculatedData = useMemo(() => {
    // Filter active items
    let items = rawData.map(row => {
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
    }).filter(row => row.isAvailable);

    // Apply Slicers
    if (filters.storeId !== 'ALL') {
      items = items.filter(row => row.storeId === filters.storeId);
    }
    if (filters.groupId !== 'ALL') {
      items = items.filter(row => row.groupId === filters.groupId);
    }
    if (filters.priceRange !== 'ALL') {
      items = items.filter(row => row.priceRange === filters.priceRange);
    }

    // Sort descending by revenue
    items.sort((a, b) => b.salesRevenue - a.salesRevenue);

    // Running totals & percentages
    const totalRev = items.reduce((sum, r) => sum + r.salesRevenue, 0);
    let runningSum = 0;

    return items.map((row, index) => {
      runningSum += row.salesRevenue;
      const cumulativePct = totalRev > 0 ? (runningSum / totalRev) * 100 : 0;

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
  }, [rawData, filters, priceBands, thresholds]);

  // 3. Aggregate Dashboard KPI values
  const kpis = useMemo(() => {
    const totalActiveSkus = calculatedData.length;
    const totalSalesRevenue = calculatedData.reduce((sum, r) => sum + r.salesRevenue, 0);
    const totalInventoryValue = calculatedData.reduce((sum, r) => sum + (r.stockQty * r.price), 0);

    // Find the number of SKUs required to hit 80% sales
    // "使销售额达到80%的SKU数量 / 可用SKU总数"
    const skusRequiredFor80 = calculatedData.filter(r => r.cumulativePct <= 80).length + 1;
    const activeSkusCount = Math.max(1, totalActiveSkus);
    const assortmentEfficiencyRatio = totalActiveSkus > 0 
      ? Math.min(100, (skusRequiredFor80 / activeSkusCount) * 100) 
      : 0;

    return {
      activeSkus: totalActiveSkus,
      salesRevenue: totalSalesRevenue,
      inventoryValue: totalInventoryValue,
      efficiencyRatio: assortmentEfficiencyRatio,
      efficiencyCount: Math.min(totalActiveSkus, skusRequiredFor80),
    };
  }, [calculatedData]);

  // 4. Group Star SKUs (Core profit drivers) vs Clearance candidates (Zero sales or in Clearance group)
  const starSkus = useMemo(() => {
    return calculatedData.filter(r => r.category === 'Core').slice(0, 5);
  }, [calculatedData]);

  const clearanceSkus = useMemo(() => {
    // Items with high inventory but zero sales (Dead Stock), or labeled Clearance
    const deadStock = calculatedData.filter(r => r.sellQty === 0 && r.stockQty > 0);
    const lowPerformers = calculatedData.filter(r => r.category === 'Clearance' && r.sellQty > 0);
    
    // Sort dead stock by stock value DESC
    const sortedDead = [...deadStock].sort((a, b) => (b.stockQty * b.price) - (a.stockQty * a.price));
    const sortedLow = [...lowPerformers].sort((a, b) => b.stockQty - a.stockQty);

    return [...sortedDead, ...sortedLow].slice(0, 5);
  }, [calculatedData]);

  // Custom SVG Pareto Chart Layout configuration
  const chartHeight = 300;
  const chartPadding = { top: 30, right: 50, bottom: 40, left: 50 };

  const maxRevenueInChart = useMemo(() => {
    if (calculatedData.length === 0) return 100;
    return Math.max(...calculatedData.map(r => r.salesRevenue), 10);
  }, [calculatedData]);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Dynamic Alert Banner for Concentration Risk (CEO Rule) */}
      {kpis.efficiencyRatio < 15 && kpis.activeSkus > 2 && (
        <div className="p-4 rounded-lg bg-[rgba(211,47,47,0.04)] border-l-3 border-[#D32F2F] text-xs space-y-1 animate-pulse">
          <div className="flex items-center gap-1.5 font-semibold text-[#D32F2F]">
            <AlertTriangle className="w-4 h-4 text-[#D32F2F]" />
            <span>CRITICAL CONCENTRATION WARNING (CEO ALERT)</span>
          </div>
          <p className="text-body-text leading-relaxed">
            Your current <strong>Assortment Efficiency Ratio is {kpis.efficiencyRatio.toFixed(1)}%</strong>, which is critically below the 15% safety red-line. This means a tiny minority of products (just {kpis.efficiencyCount} SKU) represents more than 80% of your entire catalog value. <strong>The remaining {kpis.activeSkus - kpis.efficiencyCount} SKUs are clogging shelves and locking up ${kpis.inventoryValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} in stagnant working capital.</strong> We recommend immediate clearance operations on the long-tail list below.
          </p>
        </div>
      )}

      {/* Interactive Slicers / Filters Panel */}
      <div className="bg-surface p-5 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
          <span className="font-serif text-lg tracking-tight text-primary font-medium">Diagnostic Slicers (Interactive Filters)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Store Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-primary uppercase tracking-wider mb-1.5">Store Slicer</label>
            <select
              className="w-full bg-input-bg text-xs border border-border rounded px-2.5 py-1.5 focus:outline-none focus:border-accent font-medium text-primary"
              value={filters.storeId}
              onChange={(e) => setFilters({ ...filters, storeId: e.target.value })}
            >
              <option value="ALL">All Stores (Consolidated)</option>
              {uniqueStores.map(store => (
                <option key={store} value={store}>{store}</option>
              ))}
            </select>
          </div>

          {/* Group Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-primary uppercase tracking-wider mb-1.5">Product Category</label>
            <select
              className="w-full bg-input-bg text-xs border border-border rounded px-2.5 py-1.5 focus:outline-none focus:border-accent font-medium text-primary"
              value={filters.groupId}
              onChange={(e) => setFilters({ ...filters, groupId: e.target.value })}
            >
              <option value="ALL">All Product Categories</option>
              {uniqueGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-primary uppercase tracking-wider mb-1.5">Price Bracket</label>
            <select
              className="w-full bg-input-bg text-xs border border-border rounded px-2.5 py-1.5 focus:outline-none focus:border-accent font-medium text-primary"
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            >
              <option value="ALL">All Price Brackets</option>
              {priceBands.map(band => (
                <option key={band.id} value={band.name}>{band.name} (${band.min} - ${band.max})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Display Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active SKU Catalog */}
        <div className="bg-surface p-5 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">Active Catalog</span>
            <span className="font-serif text-3xl font-medium tracking-tight text-primary block leading-none">
              {kpis.activeSkus}
            </span>
            <span className="text-[11px] text-muted block">Available SKUs (Sales/Stock)</span>
          </div>
          <div className="p-3 bg-[rgba(5,28,44,0.03)] rounded-full">
            <ShoppingBag className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* KPI 2: Total Revenue */}
        <div className="bg-surface p-5 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">Sales Revenue</span>
            <span className="font-serif text-3xl font-medium tracking-tight text-primary block leading-none">
              ${kpis.salesRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
            <span className="text-[11px] text-muted block">Aggregated product turnover</span>
          </div>
          <div className="p-3 bg-[rgba(34,81,255,0.03)] rounded-full">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
        </div>

        {/* KPI 3: Assortment Efficiency (CEO Metric) */}
        <div className={`bg-surface p-5 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-between ${
          kpis.efficiencyRatio < 15 && kpis.activeSkus > 2 ? 'border-r-3 border-[#D32F2F]' : ''
        }`}>
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">Assortment Efficiency</span>
            <span className={`font-serif text-3xl font-medium tracking-tight block leading-none ${
              kpis.efficiencyRatio < 15 && kpis.activeSkus > 2 ? 'text-[#D32F2F]' : 'text-primary'
            }`}>
              {kpis.efficiencyRatio.toFixed(1)}%
            </span>
            <span className="text-[11px] text-muted block">
              {kpis.efficiencyCount} SKU{kpis.efficiencyCount !== 1 ? 's' : ''} represents 80% revenue
            </span>
          </div>
          <div className="p-3 bg-[rgba(5,28,44,0.03)] rounded-full">
            <Percent className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* KPI 4: Capital Tied in Stock */}
        <div className="bg-surface p-5 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">Tied-Up Capital</span>
            <span className="font-serif text-3xl font-medium tracking-tight text-accent block leading-none">
              ${kpis.inventoryValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
            <span className="text-[11px] text-muted block">Current warehouse stock value</span>
          </div>
          <div className="p-3 bg-[rgba(34,81,255,0.03)] rounded-full">
            <AlertCircle className="w-5 h-5 text-accent" />
          </div>
        </div>
      </div>

      {/* Custom Dynamic Pareto Curve Visualization */}
      <div className="bg-surface p-6 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <h2 className="font-serif text-lg tracking-tight text-primary font-medium">
              Dynamic Dual-Axis Pareto Curve (80/20 Assortment Spread)
            </h2>
          </div>
          <span className="text-[11px] text-muted hidden sm:inline">
            Bars: Revenue ($) • Line: Cumulative Percentage (%) • Hover points for audit tooltips
          </span>
        </div>

        {/* Custom SVG Dual-Axis Chart container */}
        {calculatedData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-xs text-muted border border-dashed border-border rounded">
            No active SKU records match your active slicer selection. Choose other filters.
          </div>
        ) : (
          <div className="relative w-full overflow-hidden" style={{ minHeight: `${chartHeight}px` }}>
            <svg
              className="w-full h-full select-none"
              viewBox={`0 0 1000 ${chartHeight}`}
              preserveAspectRatio="none"
            >
              {/* Draw horizontal guide lines for targets */}
              {[60, 80, 90].map((thresholdPct) => {
                const yPos = chartPadding.top + ((chartHeight - chartPadding.top - chartPadding.bottom) * (1 - thresholdPct / 100));
                return (
                  <g key={thresholdPct}>
                    <line
                      x1={chartPadding.left}
                      y1={yPos}
                      x2={1000 - chartPadding.right}
                      y2={yPos}
                      stroke={thresholdPct === 80 ? '#D32F2F' : '#E8E8E6'}
                      strokeWidth={thresholdPct === 80 ? '1.5' : '1'}
                      strokeDasharray="4 4"
                    />
                    <text
                      x={1000 - chartPadding.right + 6}
                      y={yPos + 4}
                      fill={thresholdPct === 80 ? '#D32F2F' : '#888888'}
                      fontSize="9px"
                      fontWeight={thresholdPct === 80 ? 'bold' : 'normal'}
                      className="font-mono text-[9px]"
                    >
                      {thresholdPct}% {thresholdPct === 80 ? '(80% Core Line)' : ''}
                    </text>
                  </g>
                );
              })}

              {/* Render Bars (Y1: Revenue) & Curve Nodes (Y2: Cumulative %) */}
              {(() => {
                const innerWidth = 1000 - chartPadding.left - chartPadding.right;
                const innerHeight = chartHeight - chartPadding.top - chartPadding.bottom;
                const columnWidth = innerWidth / calculatedData.length;

                // Path description for cumulative line
                let linePath = '';
                const curvePoints: Array<{ x: number, y: number, row: CalculatedSkuRow }> = [];

                calculatedData.forEach((row, idx) => {
                  const x = chartPadding.left + (idx * columnWidth) + (columnWidth / 2);
                  const yCurve = chartPadding.top + innerHeight * (1 - row.cumulativePct / 100);
                  curvePoints.push({ x, y: yCurve, row });

                  if (idx === 0) {
                    linePath += `M ${x} ${yCurve}`;
                  } else {
                    linePath += ` L ${x} ${yCurve}`;
                  }
                });

                return (
                  <g>
                    {/* Render Bars */}
                    {calculatedData.map((row, idx) => {
                      const barWidth = Math.max(2, columnWidth * 0.7);
                      const x = chartPadding.left + (idx * columnWidth) + (columnWidth - barWidth) / 2;
                      const barHeight = (row.salesRevenue / maxRevenueInChart) * innerHeight;
                      const y = chartHeight - chartPadding.bottom - barHeight;

                      const isHovered = hoveredSku?.id === row.id;

                      return (
                        <rect
                          key={row.id}
                          x={x}
                          y={y}
                          width={barWidth}
                          height={Math.max(1, barHeight)}
                          fill={isHovered ? '#051C2C' : '#2251FF'}
                          fillOpacity={isHovered ? '1.0' : '0.12'}
                          stroke={isHovered ? '#051C2C' : '#2251FF'}
                          strokeWidth="1.5"
                          className="transition-all duration-150 cursor-pointer"
                          onMouseEnter={(e) => {
                            setHoveredSku(row);
                            const rect = e.currentTarget.getBoundingClientRect();
                            const container = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
                            if (container) {
                              setTooltipPos({
                                x: rect.left - container.left + barWidth / 2,
                                y: rect.top - container.top - 10,
                              });
                            }
                          }}
                          onMouseLeave={() => setHoveredSku(null)}
                        />
                      );
                    })}

                    {/* Draw Cumulative Percentage Line */}
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#2251FF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Draw Curve Point anchors */}
                    {curvePoints.map((point, idx) => {
                      const isHovered = hoveredSku?.id === point.row.id;
                      return (
                        <circle
                          key={point.row.id}
                          cx={point.x}
                          cy={point.y}
                          r={isHovered ? 6 : 3.5}
                          fill="#FFFFFF"
                          stroke={isHovered ? '#051C2C' : '#2251FF'}
                          strokeWidth={isHovered ? '3.5' : '2'}
                          className="transition-all duration-150 cursor-pointer"
                          onMouseEnter={(e) => {
                            setHoveredSku(point.row);
                            const rect = e.currentTarget.getBoundingClientRect();
                            const container = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
                            if (container) {
                              setTooltipPos({
                                x: rect.left - container.left,
                                y: rect.top - container.top - 15,
                              });
                            }
                          }}
                          onMouseLeave={() => setHoveredSku(null)}
                        />
                      );
                    })}

                    {/* X axis lines & limited labels */}
                    <line
                      x1={chartPadding.left}
                      y1={chartHeight - chartPadding.bottom}
                      x2={1000 - chartPadding.right}
                      y2={chartHeight - chartPadding.bottom}
                      stroke="#051C2C"
                      strokeWidth="1.5"
                    />

                    {calculatedData.map((row, idx) => {
                      // Show labels selectively to avoid overlapping on narrow screens
                      const showLabel = calculatedData.length <= 15 || idx % Math.ceil(calculatedData.length / 12) === 0;
                      if (!showLabel) return null;

                      const x = chartPadding.left + (idx * columnWidth) + (columnWidth / 2);
                      return (
                        <text
                          key={row.id}
                          x={x}
                          y={chartHeight - chartPadding.bottom + 16}
                          textAnchor="middle"
                          fill="#888888"
                          fontSize="8px"
                          fontWeight="500"
                          className="font-mono text-[8px]"
                        >
                          {row.skuId}
                        </text>
                      );
                    })}
                  </g>
                );
              })()}
            </svg>

            {/* Float Tooltip Portal on Hover */}
            {hoveredSku && (
              <div
                className="absolute bg-surface p-3.5 rounded shadow-lg border border-border pointer-events-none z-10 animate-fade-up max-w-xs space-y-2"
                style={{
                  left: `${Math.max(10, Math.min(tooltipPos.x - 110, 800))}px`,
                  top: `${Math.max(10, tooltipPos.y - 120)}px`,
                }}
              >
                <div className="flex items-center justify-between gap-2 border-b border-border pb-1.5">
                  <span className="font-mono text-[11px] font-bold text-primary">{hoveredSku.skuId}</span>
                  <span className={`text-[9px] tracking-wide uppercase px-1.5 rounded-full ${
                    hoveredSku.category === 'Core' ? 'bg-accent/10 text-accent font-bold' : 
                    hoveredSku.category === 'Mainstream' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-muted'
                  }`}>
                    {hoveredSku.category}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-1 gap-x-3 text-[11px] text-body-text">
                  <span className="text-muted">Rank in Segment:</span>
                  <span className="text-right font-mono font-medium">{hoveredSku.sortedIndex}</span>

                  <span className="text-muted">Sales Revenue:</span>
                  <span className="text-right font-mono font-bold text-primary">${hoveredSku.salesRevenue.toFixed(2)}</span>

                  <span className="text-muted">Cumulative Share:</span>
                  <span className="text-right font-mono font-medium text-accent">{hoveredSku.cumulativePct.toFixed(1)}%</span>

                  <span className="text-muted">In-Stock Value:</span>
                  <span className="text-right font-mono text-muted">${(hoveredSku.stockQty * hoveredSku.price).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Star SKU Drivers vs Clearance Recommendations Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Star SKUs Box (Accent Color, Top performers) */}
        <div className="bg-surface p-6 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Sparkles className="w-4 h-4 text-accent" />
            <h2 className="font-serif text-lg tracking-tight text-primary font-medium">
              Star Revenue Drivers (Core Assortment)
            </h2>
          </div>

          <p className="text-xs text-muted">
            These top-performing core items represent the top {thresholds.core}% of cumulative sales. Ensure high-availability shelf priority and zero out-of-stock events.
          </p>

          <div className="space-y-3">
            {starSkus.length === 0 ? (
              <p className="text-xs text-muted py-4 text-center">No active core SKUs detected.</p>
            ) : (
              starSkus.map((sku) => (
                <div key={sku.id} className="p-3 bg-[rgba(34,81,255,0.03)] border-l-3 border-accent rounded flex items-center justify-between hover:scale-[1.01] transition-transform">
                  <div>
                    <span className="font-mono text-xs font-bold text-primary block">{sku.skuId}</span>
                    <span className="text-[11px] text-muted block">
                      Category: {sku.groupId} • Price: ${sku.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-base font-semibold text-primary block">
                      ${sku.salesRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                    <span className="text-[10px] text-accent font-mono block">
                      Cumulative Share: {sku.cumulativePct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Clearance/Dead Stock candidates (Semantic warnings, low performers) */}
        <div className="bg-surface p-6 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <AlertCircle className="w-4 h-4 text-[#D32F2F]" />
            <h2 className="font-serif text-lg tracking-tight text-primary font-medium">
              Warehouse Clearance Recommendations (Idle Stocks)
            </h2>
          </div>

          <p className="text-xs text-muted">
            Inactive long-tail SKUs (with zero sales but high stock value) or items tagged inside the lower bounds of the curve. Action required to free up retail shelf footprint.
          </p>

          <div className="space-y-3">
            {clearanceSkus.length === 0 ? (
              <p className="text-xs text-muted py-4 text-center">No clearance candidates identified in selection.</p>
            ) : (
              clearanceSkus.map((sku) => {
                const stockVal = sku.stockQty * sku.price;
                const isDead = sku.sellQty === 0;

                return (
                  <div key={sku.id} className={`p-3 border-l-3 rounded flex items-center justify-between hover:scale-[1.01] transition-transform ${
                    isDead ? 'bg-[rgba(211,47,47,0.03)] border-[#D32F2F]' : 'bg-[rgba(5,28,44,0.02)] border-primary'
                  }`}>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-primary">{sku.skuId}</span>
                        {isDead && (
                          <span className="bg-[#D32F2F]/10 text-[#D32F2F] text-[9px] px-1.5 rounded-full font-bold uppercase tracking-wider">
                            Dead Stock
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-muted block">
                        Category: {sku.groupId} • In-Warehouse: {sku.stockQty.toLocaleString()} units
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-base font-semibold text-primary block">
                        ${stockVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </span>
                      <span className="text-[10px] text-muted block">
                        Locked-up Capital Value
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
