import { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/invoice/Header';
import DocumentTypeToggle from '@/components/invoice/DocumentTypeToggle';
import CompanyDetails from '@/components/invoice/CompanyDetails';
import CustomerDetails from '@/components/invoice/CustomerDetails';
import DocumentInfo from '@/components/invoice/DocumentInfo';
import ItemsTable from '@/components/invoice/ItemsTable';
import TermsAndConditions from '@/components/invoice/TermsAndConditions';
import Preview from '@/components/invoice/Preview';
import { useInvoiceData } from '@/hooks/useInvoiceData';
import { generatePDF } from '@/utils/pdfGenerator';

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const {
    data,
    setDocumentType,
    updateCompany,
    updateCustomer,
    updateDocumentInfo,
    addItem,
    updateItem,
    removeItem,
    updateTerms,
    resetData,
    subtotal,
    discountAmount,
    grandTotal,
  } = useInvoiceData();

  // Handle PDF download
  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const fileName = `${data.documentType === 'invoice' ? 'Invoice' : 'Quotation'}-${data.documentInfo.documentNumber}`;
      await generatePDF('invoice-preview', fileName);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle reset with confirmation
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      resetData();
      toast.success('All data has been reset.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        documentType={data.documentType}
        onDownloadPDF={handleDownloadPDF}
        onReset={handleReset}
        isGenerating={isGenerating}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Document Type Toggle */}
            <DocumentTypeToggle
              documentType={data.documentType}
              onChange={setDocumentType}
            />

            {/* Company Details */}
            <CompanyDetails
              company={data.company}
              onChange={updateCompany}
            />

            {/* Customer Details */}
            <CustomerDetails
              customer={data.customer}
              onChange={updateCustomer}
            />

            {/* Document Info */}
            <DocumentInfo
              documentType={data.documentType}
              info={data.documentInfo}
              onChange={updateDocumentInfo}
            />

            {/* Items Table */}
            <ItemsTable
              items={data.items}
              onAddItem={addItem}
              onUpdateItem={updateItem}
              onRemoveItem={removeItem}
              subtotal={subtotal}
              discountAmount={discountAmount}
              discountPercent={data.documentInfo.discount}
              grandTotal={grandTotal}
            />

            {/* Terms & Conditions (Quotation only) */}
            {data.documentType === 'quotation' && (
              <TermsAndConditions
                terms={data.termsAndConditions}
                onChange={updateTerms}
              />
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Live Preview
              </h2>
              <p className="text-sm text-muted-foreground">
                This preview matches your final PDF document
              </p>
            </div>
            <Preview
              data={data}
              subtotal={subtotal}
              discountAmount={discountAmount}
              grandTotal={grandTotal}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Invoice & Quotation Manager — Professional billing made simple
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
