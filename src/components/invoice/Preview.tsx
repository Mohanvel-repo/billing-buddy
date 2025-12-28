import { InvoiceData, formatCurrency, formatDate } from '@/types/invoice';

interface PreviewProps {
  data: InvoiceData;
  subtotal: number;
  discountAmount: number;
  grandTotal: number;
}

const Preview = ({ data, subtotal, discountAmount, grandTotal }: PreviewProps) => {
  const isInvoice = data.documentType === 'invoice';

  return (
    <div
      id="invoice-preview"
      className="bg-card rounded-xl border border-border shadow-invoice-lg overflow-hidden"
      style={{ minHeight: '842px' }}
    >
      {/* A4-style document */}
      <div className="p-8 sm:p-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            {data.company.logo ? (
              <img
                src={data.company.logo}
                alt="Company Logo"
                className="w-16 h-16 object-contain"
              />
            ) : (
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {data.company.name.charAt(0) || 'C'}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {data.company.name || 'Your Company Name'}
              </h1>
              {data.company.address && (
                <p className="text-sm text-muted-foreground whitespace-pre-line mt-1">
                  {data.company.address}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-primary uppercase tracking-wide">
              {isInvoice ? 'Invoice' : 'Quotation'}
            </h2>
            <p className="text-lg font-semibold text-foreground mt-1">
              {data.documentInfo.documentNumber}
            </p>
          </div>
        </div>

        {/* Company & Customer Info */}
        <div className="grid grid-cols-2 gap-8 mb-8 pb-6 border-b border-border">
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              From
            </h3>
            <div className="text-sm text-foreground space-y-0.5">
              {data.company.email && <p>{data.company.email}</p>}
              {data.company.phone && <p>{data.company.phone}</p>}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Bill To
            </h3>
            <div className="text-sm text-foreground space-y-0.5">
              <p className="font-medium">{data.customer.name || 'Customer Name'}</p>
              {data.customer.address && (
                <p className="whitespace-pre-line text-muted-foreground">
                  {data.customer.address}
                </p>
              )}
              {data.customer.email && <p>{data.customer.email}</p>}
              {data.customer.phone && <p>{data.customer.phone}</p>}
            </div>
          </div>
        </div>

        {/* Document Details */}
        <div className="flex gap-8 mb-6 text-sm">
          <div>
            <span className="text-muted-foreground">Date: </span>
            <span className="font-medium text-foreground">
              {formatDate(data.documentInfo.date)}
            </span>
          </div>
          {isInvoice && data.documentInfo.dueDate && (
            <div>
              <span className="text-muted-foreground">Due Date: </span>
              <span className="font-medium text-foreground">
                {formatDate(data.documentInfo.dueDate)}
              </span>
            </div>
          )}
        </div>

        {/* Items Table */}
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-primary">
                <th className="text-left py-3 font-semibold text-foreground">Item / Service</th>
                <th className="text-left py-3 font-semibold text-foreground">Description</th>
                <th className="text-center py-3 font-semibold text-foreground w-16">Qty</th>
                <th className="text-right py-3 font-semibold text-foreground w-24">Price</th>
                <th className="text-right py-3 font-semibold text-foreground w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={item.id} className="border-b border-border/50">
                  <td className="py-3 text-foreground">{item.name || '-'}</td>
                  <td className="py-3 text-muted-foreground">{item.description || '-'}</td>
                  <td className="py-3 text-center text-foreground">{item.quantity}</td>
                  <td className="py-3 text-right text-foreground">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="py-3 text-right font-medium text-foreground">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2 text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">{formatCurrency(subtotal)}</span>
            </div>
            {data.documentInfo.discount > 0 && (
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">
                  Discount ({data.documentInfo.discount}%)
                </span>
                <span className="font-medium text-destructive">
                  -{formatCurrency(discountAmount)}
                </span>
              </div>
            )}
            <div className="flex justify-between py-3 border-t-2 border-primary mt-2">
              <span className="font-bold text-foreground">Grand Total</span>
              <span className="font-bold text-lg invoice-grand-total">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {data.documentInfo.notes && (
          <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Notes
            </h4>
            <p className="text-sm text-foreground whitespace-pre-line">
              {data.documentInfo.notes}
            </p>
          </div>
        )}

        {/* Terms & Conditions (Quotation only) */}
        {!isInvoice && data.termsAndConditions && (
          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Terms & Conditions
            </h4>
            <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
              {data.termsAndConditions}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
