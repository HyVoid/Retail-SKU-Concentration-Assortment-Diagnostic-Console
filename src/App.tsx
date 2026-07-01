import React, { useState, useEffect } from 'react';
import { PriceBand, ConcentrationThresholds, RawSkuRow } from './types';
import { DEFAULT_RAW_DATA } from './data';
import { ReadmeConfig } from './components/ReadmeConfig';
import { RawDataPaste } from './components/RawDataPaste';
import { CalculationEngine } from './components/CalculationEngine';
import { Dashboard } from './components/Dashboard';
import { 
  FileSpreadsheet, 
  Settings, 
  Database, 
  LayoutDashboard, 
  Download, 
  Upload, 
  RefreshCcw, 
  Clock, 
  ChevronDown 
} from 'lucide-react';

const LOCAL_STORAGE_KEY_DATA = 'retail_sku_pareto_raw_data';
const LOCAL_STORAGE_KEY_BANDS = 'retail_sku_pareto_price_bands';
const LOCAL_STORAGE_KEY_THRESHOLDS = 'retail_sku_pareto_thresholds';
const LOCAL_STORAGE_KEY_SAVED = 'retail_sku_pareto_last_saved';

const INITIAL_PRICE_BANDS: PriceBand[] = [
  { id: '1', name: 'Range A (Low-tier)', min: 0.00, max: 15.00 },
  { id: '2', name: 'Range B (Mainstream)', min: 15.01, max: 35.00 },
  { id: '3', name: 'Range C (Premium)', min: 35.01, max: 75.00 },
  { id: '4', name: 'Range D (Luxury)', min: 75.01, max: 99999.00 },
];

const INITIAL_THRESHOLDS: ConcentrationThresholds = {
  core: 60,
  mainstream: 80,
  longtail: 90,
  all: 100,
};

export default function App() {
  // 1. Core Sandbox State
  const [rawData, setRawData] = useState<RawSkuRow[]>([]);
  const [priceBands, setPriceBands] = useState<PriceBand[]>([]);
  const [thresholds, setThresholds] = useState<ConcentrationThresholds>(INITIAL_THRESHOLDS);
  const [lastSaved, setLastSaved] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'control' | 'raw_data' | 'engine' | 'dashboard'>('dashboard');
  
  // UI Dropdown state
  const [showBackupMenu, setShowBackupMenu] = useState(false);

  // 2. Load initially from localStorage or fall back to Default seed
  useEffect(() => {
    try {
      const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY_DATA);
      const cachedBands = localStorage.getItem(LOCAL_STORAGE_KEY_BANDS);
      const cachedThresholds = localStorage.getItem(LOCAL_STORAGE_KEY_THRESHOLDS);
      const cachedSaved = localStorage.getItem(LOCAL_STORAGE_KEY_SAVED);

      if (cachedData) {
        setRawData(JSON.parse(cachedData));
      } else {
        setRawData(DEFAULT_RAW_DATA);
      }

      if (cachedBands) {
        setPriceBands(JSON.parse(cachedBands));
      } else {
        setPriceBands(INITIAL_PRICE_BANDS);
      }

      if (cachedThresholds) {
        setThresholds(JSON.parse(cachedThresholds));
      } else {
        setThresholds(INITIAL_THRESHOLDS);
      }

      if (cachedSaved) {
        setLastSaved(cachedSaved);
      } else {
        const now = new Date();
        setLastSaved(now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (e) {
      console.error('Failed loading storage', e);
      // Fallback
      setRawData(DEFAULT_RAW_DATA);
      setPriceBands(INITIAL_PRICE_BANDS);
      setThresholds(INITIAL_THRESHOLDS);
    }
  }, []);

  // 3. Auto-Save effect: triggered on state modifications
  useEffect(() => {
    if (rawData.length === 0 && priceBands.length === 0) return; // Wait until mounted

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(rawData));
      localStorage.setItem(LOCAL_STORAGE_KEY_BANDS, JSON.stringify(priceBands));
      localStorage.setItem(LOCAL_STORAGE_KEY_THRESHOLDS, JSON.stringify(thresholds));

      const now = new Date();
      const timeString = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem(LOCAL_STORAGE_KEY_SAVED, timeString);
      setLastSaved(timeString);
    } catch (e) {
      console.error('Auto-save failed', e);
    }
  }, [rawData, priceBands, thresholds]);

  // 4. Utility Backup Actions
  const handleExportBackup = () => {
    try {
      const payload = {
        rawData,
        priceBands,
        thresholds,
        exportedAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Retail_Pareto_Backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setShowBackupMenu(false);
    } catch (e) {
      alert('Failed to generate export backup file.');
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.rawData && parsed.priceBands && parsed.thresholds) {
          setRawData(parsed.rawData);
          setPriceBands(parsed.priceBands);
          setThresholds(parsed.thresholds);
          alert('Backup state loaded successfully into workspace memory!');
        } else {
          alert('Invalid backup structure. Required keys missing.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON. File might be corrupted.');
      }
    };
    reader.readAsText(file);
    setShowBackupMenu(false);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all values to original default seed data? All custom tweaks will be cleared.')) {
      setRawData(DEFAULT_RAW_DATA);
      setPriceBands(INITIAL_PRICE_BANDS);
      setThresholds(INITIAL_THRESHOLDS);
      const now = new Date();
      setLastSaved(now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }));
      setShowBackupMenu(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-body-text selection:bg-accent/15 selection:text-primary">
      
      {/* 56px Sticky Top Horizontal Navigation Header */}
      <header className="sticky top-0 z-50 h-14 bg-surface border-b border-border shadow-nav flex items-center justify-between px-10">
        {/* Left Side Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <span className="font-serif text-sm font-semibold tracking-wide text-primary block leading-tight">
              RETAIL CORE PARETO DIAGNOSTICS
            </span>
            <span className="text-[10px] text-muted block font-mono">
              Operational Decision Sandpit
            </span>
          </div>
        </div>

        {/* Middle/Right Nav Tabs View Selector */}
        <div className="flex items-center gap-8 h-full">
          <nav className="flex items-center gap-1.5 h-full text-xs font-semibold">
            {/* Tab: Dashboard */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 h-full border-b-3 transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-primary/50 hover:text-primary'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Diagnostic Dashboard</span>
            </button>

            {/* Tab: Raw Data Paste */}
            <button
              onClick={() => setActiveTab('raw_data')}
              className={`px-3 h-full border-b-3 transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'raw_data'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-primary/50 hover:text-primary'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Raw Data paste</span>
            </button>

            {/* Tab: Calculation Engine */}
            <button
              onClick={() => setActiveTab('engine')}
              className={`px-3 h-full border-b-3 transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'engine'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-primary/50 hover:text-primary'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Calculation Engine</span>
            </button>

            {/* Tab: Control Console */}
            <button
              onClick={() => setActiveTab('control')}
              className={`px-3 h-full border-b-3 transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'control'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-primary/50 hover:text-primary'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Control Console</span>
            </button>
          </nav>

          {/* Right most controls: Auto Save status and Backup panel dropdown */}
          <div className="flex items-center gap-4 text-xs">
            {/* Auto-Save status Indicator */}
            {lastSaved && (
              <div className="flex items-center gap-1.5 text-muted bg-[rgba(5,28,44,0.03)] px-2.5 py-1 rounded font-medium">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Last saved: {lastSaved}</span>
              </div>
            )}

            {/* Backup Operations Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowBackupMenu(!showBackupMenu)}
                className="flex items-center gap-1 bg-primary text-white hover:bg-opacity-90 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Backup Actions</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showBackupMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowBackupMenu(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-48 bg-surface rounded shadow-lg border border-border py-1.5 z-50 text-xs text-primary animate-fade-up">
                    <button
                      onClick={handleExportBackup}
                      className="w-full text-left px-4 py-2 hover:bg-bg flex items-center gap-2 transition-colors font-medium"
                    >
                      <Download className="w-3.5 h-3.5 text-accent" />
                      <span>Export Backup</span>
                    </button>
                    
                    <label className="w-full text-left px-4 py-2 hover:bg-bg flex items-center gap-2 transition-colors font-medium cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-accent" />
                      <span>Import Backup</span>
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={handleImportBackup}
                      />
                    </label>

                    <hr className="border-border my-1" />

                    <button
                      onClick={handleResetData}
                      className="w-full text-left px-4 py-2 hover:bg-bg text-[#D32F2F] flex items-center gap-2 transition-colors font-medium"
                    >
                      <RefreshCcw className="w-3.5 h-3.5 text-[#D32F2F]" />
                      <span>Reset Seed Data</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area (Max width 1400px centered with 40px left/right padding) */}
      <main className="max-w-[1400px] mx-auto px-10 py-8 min-h-[calc(100vh-3.5rem)]">
        
        {/* Render Active View Tab */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            rawData={rawData} 
            priceBands={priceBands} 
            thresholds={thresholds} 
          />
        )}

        {activeTab === 'raw_data' && (
          <RawDataPaste 
            rawData={rawData} 
            setRawData={setRawData} 
            onReset={() => setRawData(DEFAULT_RAW_DATA)} 
          />
        )}

        {activeTab === 'engine' && (
          <CalculationEngine 
            rawData={rawData} 
            priceBands={priceBands} 
            thresholds={thresholds} 
          />
        )}

        {activeTab === 'control' && (
          <ReadmeConfig 
            priceBands={priceBands} 
            setPriceBands={setPriceBands} 
            thresholds={thresholds} 
            setThresholds={setThresholds} 
          />
        )}

      </main>
    </div>
  );
}
