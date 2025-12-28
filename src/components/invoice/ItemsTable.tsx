import { Plus, Trash2, Package } from 'lucide-react';
import { LineItem } from '@/types/invoice';
import { formatCurrency } from '@/types/invoice';

interface ItemsTableProps {
  items: LineItem[];
  onAddItem: () => void;
  onUpdateItem: (id: string, updates: Partial<LineItem>) => void;
  onRemoveItem: (id: string) => void;
  subtotal: number;
  discountAmount: number;
  discountPercent: number;
  grandTotal: number;
}

const ItemsTable = ({
  items,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  subtotal,
  discountAmount,
  discountPercent,
  grandTotal,
}: ItemsTableProps) => {
  return (
    <div className="invoice-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="invoice-section-title mb-0">
          <Package className="w-5 h-5 text-accent" />
          Items / Services
        </h2>
        <button onClick={onAddItem} className="invoice-btn-secondary text-sm">
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-6">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="invoice-table-header">
              <th className="text-left py-3 px-4 first:pl-6">Item / Service</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-center py-3 px-4 w-20">Qty</th>
              <th className="text-right py-3 px-4 w-28">Unit Price</th>
              <th className="text-right py-3 px-4 w-28">Total</th>
              <th className="text-center py-3 px-4 last:pr-6 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
              >
                <td className="py-3 px-4 first:pl-6">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => onUpdateItem(item.id, { name: e.target.value })}
                    placeholder="Item name"
                    className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => onUpdateItem(item.id, { description: e.target.value })}
                    placeholder="Description"
                    className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateItem(item.id, { quantity: parseInt(e.target.value) || 1 })
                    }
                    className="w-full text-center bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) =>
                      onUpdateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full text-right bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground"
                  />
                </td>
                <td className="py-3 px-4 text-right font-medium text-foreground">
                  {formatCurrency(item.total)}
                </td>
                <td className="py-3 px-4 last:pr-6 text-center">
                  {items.length > 1 && (
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-col items-end gap-2">
          <div className="flex justify-between w-full max-w-xs text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium text-foreground">{formatCurrency(subtotal)}</span>
          </div>
          {discountPercent > 0 && (
            <div className="flex justify-between w-full max-w-xs text-sm">
              <span className="text-muted-foreground">Discount ({discountPercent}%):</span>
              <span className="font-medium text-destructive">-{formatCurrency(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between w-full max-w-xs text-lg pt-2 border-t border-border">
            <span className="font-semibold text-foreground">Grand Total:</span>
            <span className="invoice-grand-total">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;
