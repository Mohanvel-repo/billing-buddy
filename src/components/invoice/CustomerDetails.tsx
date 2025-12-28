import { User } from 'lucide-react';
import { CustomerDetails as CustomerDetailsType } from '@/types/invoice';

interface CustomerDetailsProps {
  customer: CustomerDetailsType;
  onChange: (customer: Partial<CustomerDetailsType>) => void;
}

const CustomerDetails = ({ customer, onChange }: CustomerDetailsProps) => {
  return (
    <div className="invoice-card animate-fade-in">
      <h2 className="invoice-section-title">
        <User className="w-5 h-5 text-accent" />
        Customer Details
      </h2>

      <div className="grid gap-4">
        <div>
          <label className="invoice-label">Customer Name</label>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Customer or Company Name"
            className="invoice-input"
          />
        </div>
        <div>
          <label className="invoice-label">Address</label>
          <textarea
            value={customer.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Customer Address"
            rows={2}
            className="invoice-input resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="invoice-label">Email</label>
            <input
              type="email"
              value={customer.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="customer@email.com"
              className="invoice-input"
            />
          </div>
          <div>
            <label className="invoice-label">Phone</label>
            <input
              type="tel"
              value={customer.phone}
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

export default CustomerDetails;
