import { FileText, FileCheck } from 'lucide-react';
import { DocumentType } from '@/types/invoice';

interface DocumentTypeToggleProps {
  documentType: DocumentType;
  onChange: (type: DocumentType) => void;
}

const DocumentTypeToggle = ({ documentType, onChange }: DocumentTypeToggleProps) => {
  return (
    <div className="invoice-card animate-fade-in">
      <h2 className="invoice-section-title">
        <FileText className="w-5 h-5 text-accent" />
        Document Type
      </h2>
      <div className="flex gap-2">
        <button
          onClick={() => onChange('invoice')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            documentType === 'invoice'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          <FileText className="w-4 h-4" />
          Invoice
        </button>
        <button
          onClick={() => onChange('quotation')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            documentType === 'quotation'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          Quotation
        </button>
      </div>
    </div>
  );
};

export default DocumentTypeToggle;
