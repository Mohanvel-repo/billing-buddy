import { FileDown, RefreshCw } from 'lucide-react';
import { DocumentType } from '@/types/invoice';

interface HeaderProps {
  documentType: DocumentType;
  onDownloadPDF: () => void;
  onReset: () => void;
  isGenerating: boolean;
}

const Header = ({ documentType, onDownloadPDF, onReset, isGenerating }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">IQ</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {documentType === 'invoice' ? 'Invoice' : 'Quotation'} Manager
              </h1>
              <p className="text-xs text-muted-foreground">Professional billing made simple</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              className="invoice-btn-secondary"
              title="Reset all data"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={onDownloadPDF}
              disabled={isGenerating}
              className="invoice-btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileDown className="w-4 h-4" />
              <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
