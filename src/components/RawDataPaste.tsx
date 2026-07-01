import React, { useState } from 'react';
import { RawSkuRow } from '../types';
import { Clipboard, Trash2, Plus, RefreshCw, CheckCircle, AlertTriangle, Edit3, Save, X } from 'lucide-react';

interface RawDataPasteProps {
  rawData: RawSkuRow[];
  setRawData: (data: RawSkuRow[]) => void;
  onReset: () => void;
}

export const RawDataPaste: React.FC<RawDataPasteProps> = ({
  rawData,
  setRawData,
  onReset,
}) => {
  const [pasteText, setPasteText] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New item form state
  const [newRow, setNewRow] = useState<Omit<RawSkuRow, 'id'>>({
    week: 'W26',
    storeId: 'Store 101',
    groupId: 'Skincare',
    skuId: 'S-NEW-SKU',
    price: 19.99,
    sellQty: 10,
    stockQty: 50,
  });

  // Inline edit state
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<RawSkuRow | null>(null);

  const handlePasteParse = () => {
    if (!pasteText.trim()) {
      setFeedback({ type: 'error', message: 'Input area is empty. Please paste CSV or TSV text.' });
      return;
    }

    const lines = pasteText.split(/\r?\n/);
    const parsedRows: RawSkuRow[] = [];
    let errorCount = 0;

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return; // skip empty lines

      // Detect separator: comma for CSV, tab for TSV
      const separator = trimmed.includes('\t') ? '\t' : ',';
      const parts = trimmed.split(separator).map(p => p.trim().replace(/^["']|["']$/g, ''));

      // If header-like line, skip it
      if (index === 0 && (
        parts[0].toLowerCase().includes('week') || 
        parts[3].toLowerCase().includes('sku') || 
        parts[4].toLowerCase().includes('price')
      )) {
        return;
      }

      if (parts.length < 7) {
        errorCount++;
        return;
      }

      const [week, storeId, groupId, skuId, priceStr, sellQtyStr, stockQtyStr] = parts;
      const price = parseFloat(priceStr);
      const sellQty = parseInt(sellQtyStr, 10);
      const stockQty = parseInt(stockQtyStr, 10);

      if (isNaN(price) || isNaN(sellQty) || isNaN(stockQty)) {
        errorCount++;
        return;
      }

      parsedRows.push({
        id: Math.random().toString(36).substring(2, 9),
        week,
        storeId,
        groupId,
        skuId,
        price,
        sellQty,
        stockQty,
      });
    });

    if (parsedRows.length > 0) {
      setRawData(parsedRows);
      setFeedback({
        type: 'success',
        message: `Successfully parsed & loaded ${parsedRows.length} SKUs into working memory! ${errorCount > 0 ? `(${errorCount} malformed rows skipped)` : ''}`,
      });
      setPasteText('');
    } else {
      setFeedback({
        type: 'error',
        message: `Failed to parse. Please ensure your columns are structured as: Week, Store_ID, Group_ID, SKU_ID, Price, Sell_Qty, Stock_Qty`,
      });
    }
  };

  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();
    const created: RawSkuRow = {
      ...newRow,
      id: Math.random().toString(36).substring(2, 9),
    };
    setRawData([created, ...rawData]);
    setFeedback({ type: 'success', message: `Added custom SKU ${created.skuId} successfully.` });
    
    // Reset fields partly
    setNewRow(prev => ({
      ...prev,
      skuId: 'S-NEW-' + Math.floor(Math.random() * 1000),
    }));
  };

  const handleDeleteRow = (id: string) => {
    const updated = rawData.filter(row => row.id !== id);
    setRawData(updated);
    setFeedback({ type: 'success', message: 'Record deleted from working memory.' });
  };

  const startEditing = (row: RawSkuRow) => {
    setEditingRowId(row.id);
    setEditingData({ ...row });
  };

  const cancelEditing = () => {
    setEditingRowId(null);
    setEditingData(null);
  };

  const saveEditing = () => {
    if (!editingData) return;
    const updated = rawData.map(row => (row.id === editingData.id ? editingData : row));
    setRawData(updated);
    setEditingRowId(null);
    setEditingData(null);
    setFeedback({ type: 'success', message: `SKU ${editingData.skuId} updated.` });
  };

  const loadPresetConcentrated = () => {
    const preset: RawSkuRow[] = [
      { id: "p1", week: "W26", storeId: "Store 99", groupId: "Beverage", skuId: "B-SUPER-HERO", price: 10.00, sellQty: 1000, stockQty: 200 },
      { id: "p2", week: "W26", storeId: "Store 99", groupId: "Beverage", skuId: "B-SLOW-01", price: 5.00, sellQty: 5, stockQty: 400 },
      { id: "p3", week: "W26", storeId: "Store 99", groupId: "Beverage", skuId: "B-SLOW-02", price: 8.50, sellQty: 2, stockQty: 180 },
      { id: "p4", week: "W26", storeId: "Store 99", groupId: "Beverage", skuId: "B-DEAD-03", price: 12.00, sellQty: 0, stockQty: 500 },
      { id: "p5", week: "W26", storeId: "Store 99", groupId: "Beverage", skuId: "B-DEAD-04", price: 15.00, sellQty: 0, stockQty: 320 }
    ];
    setRawData(preset);
    setFeedback({ type: 'success', message: 'Loaded extreme 80/20 concentration sample data!' });
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl tracking-tight text-primary font-medium">
          Raw Data Clipboard & Grid Input
        </h1>
        <p className="text-muted text-sm max-w-3xl">
          Paste your spreadsheet cells directly below, or curate individual stock and sales lines dynamically.
        </p>
      </div>

      {/* Copy Paste Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-surface p-6 rounded-lg shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Clipboard className="w-4 h-4 text-accent" />
              <h2 className="font-serif text-base tracking-tight text-primary font-medium">Excel Copier & Parser</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={loadPresetConcentrated}
                className="text-[11px] bg-[rgba(34,81,255,0.06)] hover:bg-[rgba(34,81,255,0.12)] text-accent border border-[rgba(34,81,255,0.2)] rounded px-2 py-1 transition-colors font-medium"
              >
                Trigger Warning Preset
              </button>
              <button
                onClick={onReset}
                className="text-[11px] bg-gray-50 hover:bg-gray-100 text-primary border border-border rounded px-2 py-1 transition-colors font-medium"
              >
                Reset Default Seed
              </button>
            </div>
          </div>

          <p className="text-xs text-muted">
            Copy-paste cells directly from Excel/CSV (including the header row, columns: <code>Week</code>, <code>Store_ID</code>, <code>Group_ID</code>, <code>SKU_ID</code>, <code>Price</code>, <code>Sell_Qty</code>, <code>Stock_Qty</code>). Columns can be separated by commas or tabs.
          </p>

          <textarea
            className="w-full h-32 p-3 text-xs font-mono bg-[rgba(5,28,44,0.02)] border border-border rounded focus:outline-none focus:border-accent text-primary placeholder-muted"
            placeholder="W26,Store 101,Haircare,H-SHAMP-001,12.50,120,80&#10;W26,Store 101,Haircare,H-COND-002,14.00,95,110"
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => { setRawData([]); setFeedback({ type: 'success', message: 'Cleared all current data rows.' }); }}
              className="text-xs border border-border hover:bg-gray-50 text-primary px-3 py-1.5 rounded transition-colors font-medium"
            >
              Clear Workspace
            </button>
            <button
              onClick={handlePasteParse}
              className="text-xs bg-accent hover:bg-opacity-90 text-white px-4 py-1.5 rounded transition-colors font-medium"
            >
              Parse & Update Sheets
            </button>
          </div>

          {/* Feedback messages */}
          {feedback && (
            <div className={`p-4 rounded text-xs flex items-start gap-2.5 ${
              feedback.type === 'success' 
                ? 'bg-[rgba(0,200,83,0.06)] text-primary border-l-3 border-[#00C853]' 
                : 'bg-[rgba(211,47,47,0.06)] text-primary border-l-3 border-[#D32F2F]'
            }`}>
              {feedback.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-[#00C853] shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-[#D32F2F] shrink-0 mt-0.5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}
        </div>

        {/* Add Row Manual Block */}
        <div className="lg:col-span-5 bg-surface p-6 rounded-lg shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Plus className="w-4 h-4 text-accent" />
            <h2 className="font-serif text-base tracking-tight text-primary font-medium">Add Single SKU Record</h2>
          </div>

          <form onSubmit={handleAddRow} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">Week</label>
                <input
                  type="text"
                  required
                  className="w-full bg-input-bg text-xs border border-border rounded px-2.5 py-1.5 focus:outline-none focus:border-accent text-primary"
                  value={newRow.week}
                  onChange={e => setNewRow({ ...newRow, week: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">Store ID</label>
                <input
                  type="text"
                  required
                  className="w-full bg-input-bg text-xs border border-border rounded px-2.5 py-1.5 focus:outline-none focus:border-accent text-primary"
                  value={newRow.storeId}
                  onChange={e => setNewRow({ ...newRow, storeId: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">Category (Group)</label>
                <input
                  type="text"
                  required
                  className="w-full bg-input-bg text-xs border border-border rounded px-2.5 py-1.5 focus:outline-none focus:border-accent text-primary"
                  value={newRow.groupId}
                  onChange={e => setNewRow({ ...newRow, groupId: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">SKU Code</label>
                <input
                  type="text"
                  required
                  className="w-full bg-input-bg text-xs border border-border rounded px-2.5 py-1.5 focus:outline-none focus:border-accent text-primary font-mono"
                  value={newRow.skuId}
                  onChange={e => setNewRow({ ...newRow, skuId: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">Unit Price</label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted text-xs">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    className="w-full bg-input-bg text-xs border border-border rounded pl-4 pr-1.5 py-1.5 focus:outline-none focus:border-accent text-right text-primary"
                    value={newRow.price}
                    onChange={e => setNewRow({ ...newRow, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">Sell Qty</label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full bg-input-bg text-xs border border-border rounded px-2 py-1.5 focus:outline-none focus:border-accent text-right text-primary"
                  value={newRow.sellQty}
                  onChange={e => setNewRow({ ...newRow, sellQty: parseInt(e.target.value, 10) || 0 })}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">Stock Qty</label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full bg-input-bg text-xs border border-border rounded px-2 py-1.5 focus:outline-none focus:border-accent text-right text-primary"
                  value={newRow.stockQty}
                  onChange={e => setNewRow({ ...newRow, stockQty: parseInt(e.target.value, 10) || 0 })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-opacity-95 text-white text-xs py-2 rounded transition-colors font-medium mt-2"
            >
              Insert New SKU Row
            </button>
          </form>
        </div>
      </div>

      {/* Grid Table Workspace */}
      <div className="bg-surface rounded-lg shadow-md overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Curated Active SKU Grid ({rawData.length} rows in sandbox memory)
          </span>
          <span className="text-muted text-[11px]">Click edit or delete to maintain rows</span>
        </div>

        <div className="overflow-x-auto max-h-[480px]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] h-11">
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary">Week</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary">Store ID</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary">Category</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary">SKU Code</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary text-right">Unit Price</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary text-right">Sell Qty</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary text-right">Stock Qty</th>
                <th className="px-4 text-xs font-semibold uppercase tracking-wider text-primary text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rawData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-xs text-muted">
                    No SKU records found in workspace memory. Paste data or reset database seed.
                  </td>
                </tr>
              ) : (
                rawData.map((row, index) => {
                  const isEditing = editingRowId === row.id;

                  return (
                    <tr
                      key={row.id}
                      className={`h-10 text-xs border-b border-border transition-colors ${
                        index % 2 === 0 ? 'bg-bg' : 'bg-surface'
                      } hover:bg-[rgba(34,81,255,0.02)]`}
                    >
                      {/* Week Column */}
                      <td className="px-4">
                        {isEditing ? (
                          <input
                            type="text"
                            className="bg-input-bg text-xs border border-border rounded px-1.5 py-0.5 w-14 focus:outline-none"
                            value={editingData?.week || ''}
                            onChange={e => setEditingData({ ...editingData!, week: e.target.value })}
                          />
                        ) : (
                          row.week
                        )}
                      </td>

                      {/* Store ID Column */}
                      <td className="px-4">
                        {isEditing ? (
                          <input
                            type="text"
                            className="bg-input-bg text-xs border border-border rounded px-1.5 py-0.5 w-24 focus:outline-none"
                            value={editingData?.storeId || ''}
                            onChange={e => setEditingData({ ...editingData!, storeId: e.target.value })}
                          />
                        ) : (
                          row.storeId
                        )}
                      </td>

                      {/* Group ID Column */}
                      <td className="px-4">
                        {isEditing ? (
                          <input
                            type="text"
                            className="bg-input-bg text-xs border border-border rounded px-1.5 py-0.5 w-24 focus:outline-none"
                            value={editingData?.groupId || ''}
                            onChange={e => setEditingData({ ...editingData!, groupId: e.target.value })}
                          />
                        ) : (
                          row.groupId
                        )}
                      </td>

                      {/* SKU ID Column */}
                      <td className="px-4 font-mono font-medium text-primary">
                        {isEditing ? (
                          <input
                            type="text"
                            className="bg-input-bg text-xs border border-border rounded px-1.5 py-0.5 w-32 focus:outline-none font-mono"
                            value={editingData?.skuId || ''}
                            onChange={e => setEditingData({ ...editingData!, skuId: e.target.value })}
                          />
                        ) : (
                          row.skuId
                        )}
                      </td>

                      {/* Unit Price Column */}
                      <td className="px-4 text-right font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            className="bg-input-bg text-xs border border-border rounded px-1.5 py-0.5 w-20 text-right focus:outline-none"
                            value={editingData?.price || 0}
                            onChange={e => setEditingData({ ...editingData!, price: parseFloat(e.target.value) || 0 })}
                          />
                        ) : (
                          `$${row.price.toFixed(2)}`
                        )}
                      </td>

                      {/* Sell Qty Column */}
                      <td className="px-4 text-right font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            className="bg-input-bg text-xs border border-border rounded px-1.5 py-0.5 w-16 text-right focus:outline-none"
                            value={editingData?.sellQty || 0}
                            onChange={e => setEditingData({ ...editingData!, sellQty: parseInt(e.target.value, 10) || 0 })}
                          />
                        ) : (
                          row.sellQty.toLocaleString()
                        )}
                      </td>

                      {/* Stock Qty Column */}
                      <td className="px-4 text-right font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            className="bg-input-bg text-xs border border-border rounded px-1.5 py-0.5 w-16 text-right focus:outline-none"
                            value={editingData?.stockQty || 0}
                            onChange={e => setEditingData({ ...editingData!, stockQty: parseInt(e.target.value, 10) || 0 })}
                          />
                        ) : (
                          row.stockQty.toLocaleString()
                        )}
                      </td>

                      {/* Action buttons */}
                      <td className="px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {isEditing ? (
                            <>
                              <button
                                onClick={saveEditing}
                                className="p-1 hover:bg-[rgba(0,200,83,0.1)] rounded text-[#00C853] transition-colors"
                                title="Save"
                              >
                                <Save className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="p-1 hover:bg-[rgba(211,47,47,0.1)] rounded text-[#D32F2F] transition-colors"
                                title="Cancel"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEditing(row)}
                                className="p-1 hover:bg-gray-100 rounded text-muted hover:text-primary transition-colors"
                                title="Edit Row"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteRow(row.id)}
                                className="p-1 hover:bg-[rgba(211,47,47,0.06)] rounded text-muted hover:text-[#D32F2F] transition-colors"
                                title="Delete Row"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
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
