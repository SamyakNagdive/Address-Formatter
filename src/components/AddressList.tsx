import React from 'react';
import { Download } from 'lucide-react';
import { saveAs } from 'file-saver';
import { Address } from '../types';

interface AddressListProps {
  addresses: Address[];
}

export default function AddressList({ addresses }: AddressListProps) {
  const formatAddress = (address: Address) => {
    return `To,\n\n${address.doctorName},\n${
      address.hospitalClinic ? address.hospitalClinic + ',\n' : ''
    }${address.flatNo},\n${address.society},\n${address.area},\n${
      address.city
    } - ${address.pincode}\n${address.mobile}\n\n`;
  };

  const exportToWord = () => {
    const formattedAddresses = addresses
      .filter(addr => addr.doctorName)
      .map(formatAddress)
      .join('\n');
    const blob = new Blob([formattedAddresses], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'formatted_addresses.doc');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Preview</h3>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200 whitespace-pre-wrap font-mono text-sm">
            {addresses
              .filter(addr => addr.doctorName)
              .map(formatAddress)
              .join('')}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={exportToWord}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export All
          </button>
        </div>
      </div>
    </div>
  );
}