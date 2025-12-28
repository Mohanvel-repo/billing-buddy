import { Building2, Upload, X } from 'lucide-react';
import { CompanyDetails as CompanyDetailsType } from '@/types/invoice';
import { useRef } from 'react';

interface CompanyDetailsProps {
  company: CompanyDetailsType;
  onChange: (company: Partial<CompanyDetailsType>) => void;
}

const CompanyDetails = ({ company, onChange }: CompanyDetailsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onChange({ logo: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="invoice-card animate-fade-in">
      <h2 className="invoice-section-title">
        <Building2 className="w-5 h-5 text-accent" />
        Company Details
      </h2>

      {/* Logo Upload */}
      <div className="mb-4">
        <label className="invoice-label">Company Logo</label>
        <div className="flex items-center gap-4">
          {company.logo ? (
            <div className="relative">
              <img
                src={company.logo}
                alt="Company Logo"
                className="w-20 h-20 object-contain rounded-lg border border-border bg-secondary/30"
              />
              <button
                onClick={removeLogo}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200"
            >
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Upload</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Company Info Fields */}
      <div className="grid gap-4">
        <div>
          <label className="invoice-label">Company Name</label>
          <input
            type="text"
            value={company.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Your Company Name"
            className="invoice-input"
          />
        </div>
        <div>
          <label className="invoice-label">Address</label>
          <textarea
            value={company.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="123 Business Street&#10;City, State 12345"
            rows={2}
            className="invoice-input resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="invoice-label">Email</label>
            <input
              type="email"
              value={company.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="email@company.com"
              className="invoice-input"
            />
          </div>
          <div>
            <label className="invoice-label">Phone</label>
            <input
              type="tel"
              value={company.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="invoice-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
