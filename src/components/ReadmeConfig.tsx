import React from 'react';
import { PriceBand, ConcentrationThresholds } from '../types';
import { Sliders, HelpCircle, AlertCircle, DollarSign, Target } from 'lucide-react';

interface ReadmeConfigProps {
  priceBands: PriceBand[];
  setPriceBands: (bands: PriceBand[]) => void;
  thresholds: ConcentrationThresholds;
  setThresholds: (thresholds: ConcentrationThresholds) => void;
}

export const ReadmeConfig: React.FC<ReadmeConfigProps> = ({
  priceBands,
  setPriceBands,
  thresholds,
  setThresholds,
}) => {
  const handlePriceBandChange = (index: number, field: 'min' | 'max', value: string) => {
    const numVal = parseFloat(value) || 0;
    const updated = [...priceBands];
    updated[index] = {
      ...updated[index],
      [field]: numVal,
    };
    setPriceBands(updated);
  };

  const handleThresholdChange = (field: keyof ConcentrationThresholds, value: string) => {
    const numVal = Math.max(0, Math.min(100, parseFloat(value) || 0));
    setThresholds({
      ...thresholds,
      [field]: numVal,
    });
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl tracking-tight text-primary font-medium">
          Control Console & Sandbox Guidelines
        </h1>
        <p className="text-muted text-sm max-w-3xl">
          Configure operational thresholds, define custom price bands, and understand how the Pareto core-assortment diagnosis operates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Editable Parameters (SaaS Dashboard Configuration) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section: Price Bands Card */}
          <div className="bg-surface p-6 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
              <DollarSign className="w-4 h-4 text-accent" />
              <h2 className="font-serif text-lg tracking-tight text-primary font-medium">
                Price Bands Classification
              </h2>
            </div>
            
            <p className="text-xs text-muted mb-4">
              Items will be dynamically categorized into these bands based on their unit price. Editable fields are highlighted in soft yellow.
            </p>

            <div className="space-y-4">
              {priceBands.map((band, idx) => (
                <div key={band.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4 text-xs font-semibold text-primary uppercase tracking-wider">
                    {band.name}
                  </div>
                  <div className="col-span-4 relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted text-xs">$</span>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full bg-input-bg text-xs rounded border border-border py-1.5 pl-5 pr-2 focus:outline-none focus:border-accent text-right transition-colors"
                      value={band.min}
                      onChange={(e) => handlePriceBandChange(idx, 'min', e.target.value)}
                    />
                  </div>
                  <div className="col-span-4 relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted text-xs">$</span>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full bg-input-bg text-xs rounded border border-border py-1.5 pl-5 pr-2 focus:outline-none focus:border-accent text-right transition-colors"
                      value={band.max}
                      onChange={(e) => handlePriceBandChange(idx, 'max', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Cumulative Sales Thresholds Card */}
          <div className="bg-surface p-6 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
              <Target className="w-4 h-4 text-accent" />
              <h2 className="font-serif text-lg tracking-tight text-primary font-medium">
                Pareto Classification Targets
              </h2>
            </div>

            <p className="text-xs text-muted mb-4">
              Cumulative sales revenue share targets. Defines which top performing SKUs belong to which category.
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-xs font-semibold text-primary uppercase tracking-wider">Core SKU Line (A)</span>
                  <span className="text-[11px] text-muted">SKUs driving top 0% to N% of sales</span>
                </div>
                <div className="relative w-24">
                  <input
                    type="number"
                    max="100"
                    min="0"
                    className="w-full bg-input-bg text-xs rounded border border-border py-1.5 pl-3 pr-6 focus:outline-none focus:border-accent text-right transition-colors"
                    value={thresholds.core}
                    onChange={(e) => handleThresholdChange('core', e.target.value)}
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted text-xs">%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-xs font-semibold text-primary uppercase tracking-wider">Mainstream Line (B)</span>
                  <span className="text-[11px] text-muted">SKUs driving up to next N% share</span>
                </div>
                <div className="relative w-24">
                  <input
                    type="number"
                    max="100"
                    min="0"
                    className="w-full bg-input-bg text-xs rounded border border-border py-1.5 pl-3 pr-6 focus:outline-none focus:border-accent text-right transition-colors"
                    value={thresholds.mainstream}
                    onChange={(e) => handleThresholdChange('mainstream', e.target.value)}
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted text-xs">%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-xs font-semibold text-primary uppercase tracking-wider">Long-tail Line (C)</span>
                  <span className="text-[11px] text-muted">SKUs driving up to next N% share</span>
                </div>
                <div className="relative w-24">
                  <input
                    type="number"
                    max="100"
                    min="0"
                    className="w-full bg-input-bg text-xs rounded border border-border py-1.5 pl-3 pr-6 focus:outline-none focus:border-accent text-right transition-colors"
                    value={thresholds.longtail}
                    onChange={(e) => handleThresholdChange('longtail', e.target.value)}
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted text-xs">%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-xs font-semibold text-primary uppercase tracking-wider">Full Assortment Limit (D)</span>
                  <span className="text-[11px] text-muted">Hard ceiling for active SKU lists</span>
                </div>
                <div className="relative w-24">
                  <input
                    type="number"
                    disabled
                    className="w-full bg-gray-100 text-xs rounded border border-border py-1.5 pl-3 pr-6 focus:outline-none text-right cursor-not-allowed text-muted"
                    value={thresholds.all}
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted text-xs">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Explanations and Playbook (Aesthetic Insights and Instructions) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick Manual Block (Institutional Minimalist Look) */}
          <div className="bg-surface p-6 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg space-y-4">
            <div className="flex items-center gap-2 mb-2 border-b border-border pb-3">
              <HelpCircle className="w-4 h-4 text-accent" />
              <h2 className="font-serif text-lg tracking-tight text-primary font-medium">
                Assortment Diagnostic Playbook
              </h2>
            </div>

            <div className="space-y-4 text-xs text-body-text">
              <p>
                In standard retail management, <strong>80% of sales are typically driven by 20% of catalog items</strong>. Managing this concentration curve is critical for maintaining healthy cash flows and avoiding retail death.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-[rgba(5,28,44,0.02)] rounded border-l-2 border-primary space-y-1">
                  <span className="font-semibold text-primary block">Step 1: Paste Raw Stream</span>
                  <span className="text-muted block text-[11px]">
                    Go to <strong>Raw Data Paste</strong> tab and paste your flat sales & stock records or add individual rows manually.
                  </span>
                </div>
                <div className="p-3 bg-[rgba(5,28,44,0.02)] rounded border-l-2 border-primary space-y-1">
                  <span className="font-semibold text-primary block">Step 2: Adjust Sandpit Targets</span>
                  <span className="text-muted block text-[11px]">
                    Configure custom price bands and target lines right here on this screen to match your sector standard.
                  </span>
                </div>
                <div className="p-3 bg-[rgba(5,28,44,0.02)] rounded border-l-2 border-primary space-y-1">
                  <span className="font-semibold text-primary block">Step 3: Analyze the Curve</span>
                  <span className="text-muted block text-[11px]">
                    The <strong>Dashboard</strong> instantly generates an interactive Pareto dual-axis chart showing cumulative distribution.
                  </span>
                </div>
                <div className="p-3 bg-[rgba(5,28,44,0.02)] rounded border-l-2 border-primary space-y-1">
                  <span className="font-semibold text-primary block">Step 4: Execute Rationalization</span>
                  <span className="text-muted block text-[11px]">
                    Extract the <strong>Action Lists</strong>. Immediately flag "Clearance/Dead Stocks" (items with high inventory but zero sales).
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Insight Block */}
          <div className="p-5 rounded-lg bg-[rgba(34,81,255,0.04)] border-l-3 border-accent space-y-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-accent mt-0.5" />
              <span className="font-serif text-base tracking-tight text-primary font-medium">
                CEO Assortment Optimization Mandate
              </span>
            </div>
            <p className="text-xs text-body-text leading-relaxed">
              <strong>"Do not treat all inventory equally."</strong> Every extra SKU introduced on your shelves incurs storage, handling, and administrative costs. By monitoring the <strong>Assortment Efficiency Ratio</strong>, Category Directors can weed out "parasitic" long-tail SKUs that bloat operational costs without contributing meaningful bottom-line revenue. Use this tool to simulate SKU rationalization before taking physical shelving action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
