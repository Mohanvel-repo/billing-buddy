import { useState, useEffect } from 'react';
import { InvoiceData, DEFAULT_TERMS, generateId } from '@/types/invoice';

const STORAGE_KEY = 'invoice-app-data';

const getInitialData = (): InvoiceData => {
  const today = new Date().toISOString().split('T')[0];
  const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return {
    documentType: 'invoice',
    company: {
      logo: null,
      name: '',
      address: '',
      email: '',
      phone: '',
    },
    customer: {
      name: '',
      address: '',
      email: '',
      phone: '',
    },
    documentInfo: {
      documentNumber: 'INV-001',
      date: today,
      dueDate: dueDate,
      discount: 0,
      notes: '',
    },
    items: [
      {
        id: generateId(),
        name: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ],
    termsAndConditions: DEFAULT_TERMS,
  };
};

export const useInvoiceData = () => {
  const [data, setData] = useState<InvoiceData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
    return getInitialData();
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [data]);

  // Update document number prefix when type changes
  const setDocumentType = (type: 'invoice' | 'quotation') => {
    setData((prev) => {
      const currentNumber = prev.documentInfo.documentNumber.split('-')[1] || '001';
      const prefix = type === 'invoice' ? 'INV' : 'QTN';
      return {
        ...prev,
        documentType: type,
        documentInfo: {
          ...prev.documentInfo,
          documentNumber: `${prefix}-${currentNumber}`,
        },
      };
    });
  };

  const updateCompany = (company: Partial<InvoiceData['company']>) => {
    setData((prev) => ({
      ...prev,
      company: { ...prev.company, ...company },
    }));
  };

  const updateCustomer = (customer: Partial<InvoiceData['customer']>) => {
    setData((prev) => ({
      ...prev,
      customer: { ...prev.customer, ...customer },
    }));
  };

  const updateDocumentInfo = (info: Partial<InvoiceData['documentInfo']>) => {
    setData((prev) => ({
      ...prev,
      documentInfo: { ...prev.documentInfo, ...info },
    }));
  };

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: generateId(),
          name: '',
          description: '',
          quantity: 1,
          unitPrice: 0,
          total: 0,
        },
      ],
    }));
  };

  const updateItem = (id: string, updates: Partial<InvoiceData['items'][0]>) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updates };
          updated.total = updated.quantity * updated.unitPrice;
          return updated;
        }
        return item;
      }),
    }));
  };

  const removeItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const updateTerms = (terms: string) => {
    setData((prev) => ({
      ...prev,
      termsAndConditions: terms,
    }));
  };

  const resetData = () => {
    setData(getInitialData());
  };

  // Calculate totals
  const subtotal = data.items.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (subtotal * data.documentInfo.discount) / 100;
  const grandTotal = subtotal - discountAmount;

  return {
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
  };
};
