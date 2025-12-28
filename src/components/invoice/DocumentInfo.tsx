import { Hash, Calendar, Percent, StickyNote } from 'lucide-react';
import { DocumentInfo as DocumentInfoType, DocumentType } from '@/types/invoice';

interface DocumentInfoProps {
  documentType: DocumentType;
  info: DocumentInfoType;
  onChange: (info: Partial<DocumentInfoType>) => void;
}

const DocumentInfo = ({ documentType, info, onChange }: DocumentInfoProps) => {
  return (
    <div className="invoice-card animate-fade-in">
      <h2 className="invoice-section-title">
        <Hash className="w-5 h-5 text-accent" />
        Document Information
      </h2>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="invoice-label">Document Number</label>
            <input
              type="text"
              value={info.documentNumber}
              onChange={(e) => onChange({ documentNumber: e.target.value })}
              placeholder={documentType === 'invoice' ? 'INV-001' : 'QTN-001'}
              className="invoice-input"
            />
          </div>
          <div>
            <label className="invoice-label flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Date
            </label>
            <input
              type="date"
              value={info.date}
              onChange={(e) => onChange({ date: e.target.value })}
              className="invoice-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {documentType === 'invoice' && (
            <div>
              <label className="invoice-label flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Due Date
              </label>
              <input
                type="date"
                value={info.dueDate}
                onChange={(e) => onChange({ dueDate: e.target.value })}
                className="invoice-input"
              />
            </div>
          )}
          <div className={documentType === 'quotation' ? 'col-span-2' : ''}>
            <label className="invoice-label flex items-center gap-1">
              <Percent className="w-3.5 h-3.5" />
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={info.discount}
              onChange={(e) => onChange({ discount: parseFloat(e.target.value) || 0 })}
              placeholder="0"
              className="invoice-input"
            />
          </div>
        </div>

        <div>
          <label className="invoice-label flex items-center gap-1">
            <StickyNote className="w-3.5 h-3.5" />
            Notes
          </label>
          <textarea
            value={info.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Additional notes or payment instructions..."
            rows={2}
            className="invoice-input resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentInfo;
