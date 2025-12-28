import { ScrollText } from 'lucide-react';

interface TermsAndConditionsProps {
  terms: string;
  onChange: (terms: string) => void;
}

const TermsAndConditions = ({ terms, onChange }: TermsAndConditionsProps) => {
  return (
    <div className="invoice-card animate-fade-in">
      <h2 className="invoice-section-title">
        <ScrollText className="w-5 h-5 text-accent" />
        Terms & Conditions
      </h2>
      <textarea
        value={terms}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        className="invoice-input resize-none text-sm leading-relaxed"
        placeholder="Enter your terms and conditions..."
      />
    </div>
  );
};

export default TermsAndConditions;
