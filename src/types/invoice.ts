// Type definitions for the Invoice/Quotation application

export type DocumentType = 'invoice' | 'quotation';

export interface CompanyDetails {
  logo: string | null;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface CustomerDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface LineItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface DocumentInfo {
  documentNumber: string;
  date: string;
  dueDate: string;
  discount: number;
  notes: string;
}

export interface InvoiceData {
  documentType: DocumentType;
  company: CompanyDetails;
  customer: CustomerDetails;
  documentInfo: DocumentInfo;
  items: LineItem[];
  termsAndConditions: string;
}

export const DEFAULT_TERMS = `1. Payment Terms: 50% advance payment required before project commencement. Remaining 50% due upon project completion.

2. Revision Policy: Up to 3 revisions are included in the quoted price. Additional revisions beyond this will incur extra charges.

3. Scope Changes: Any changes to the project scope or additional features requested after quotation approval will result in revised pricing and extended deadlines.

4. Last-Minute Changes: Changes requested during the final stages of the project may not be accommodated. If accepted, additional charges will apply.

5. Project Timeline: The delivery timeline is based on the current scope. Any modifications or additions will extend the project deadline accordingly.`;

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
