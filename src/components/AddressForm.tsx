import React from 'react';
import { FileText, Plus, AlertCircle } from 'lucide-react';
import AddressFormInput from './AddressFormInput';
import AddressList from './AddressList';
import { Address } from '../types';

const initialAddress: Address = {
  doctorName: '',
  hospitalClinic: '',
  flatNo: '',
  society: '',
  area: '',
  city: '',
  pincode: '',
  mobile: '',
};

export default function AddressForm() {
  const [addresses, setAddresses] = React.useState<Address[]>([initialAddress]);
  const [duplicateWarnings, setDuplicateWarnings] = React.useState<string[]>([]);

  const checkDuplicates = (currentIndex: number, address: Address) => {
    const warnings: string[] = [];
    
    addresses.forEach((existingAddr, index) => {
      if (index !== currentIndex) {
        if (address.doctorName && address.doctorName === existingAddr.doctorName) {
          warnings.push(`Doctor's name "${address.doctorName}" already exists`);
        }
        if (address.mobile && address.mobile === existingAddr.mobile) {
          warnings.push(`Mobile number "${address.mobile}" already exists`);
        }
        if (address.hospitalClinic && address.hospitalClinic === existingAddr.hospitalClinic) {
          warnings.push(`Hospital/Clinic "${address.hospitalClinic}" already exists`);
        }
      }
    });
    
    return warnings;
  };

  const addNewAddress = () => {
    setAddresses([...addresses, { ...initialAddress }]);
    setDuplicateWarnings([]);
  };

  const removeAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
    setDuplicateWarnings([]);
  };

  const updateAddress = (index: number, updatedAddress: Address) => {
    const newAddresses = addresses.map((addr, i) => (i === index ? updatedAddress : addr));
    setAddresses(newAddresses);
    
    const warnings = checkDuplicates(index, updatedAddress);
    setDuplicateWarnings(warnings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="max-w-3xl mx-auto flex-grow">
        <div className="text-center mb-8">
          <img 
            src="/creafinity-logo.svg" 
            alt="Creafinity Logo" 
            className="h-16 mx-auto mb-6"
          />
          <FileText className="h-12 w-12 text-[#1e6f7c] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Address Formatter</h1>
          <p className="text-lg text-gray-600">Generate professionally formatted addresses in one click</p>
        </div>

        {duplicateWarnings.length > 0 && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Duplicate Entries Detected</h3>
                <div className="mt-1">
                  {duplicateWarnings.map((warning, index) => (
                    <p key={index} className="text-sm text-yellow-700">{warning}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {addresses.map((address, index) => (
            <AddressFormInput
              key={index}
              address={address}
              onUpdate={(updatedAddress) => updateAddress(index, updatedAddress)}
              onRemove={() => removeAddress(index)}
              showRemove={addresses.length > 1}
            />
          ))}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={addNewAddress}
              className="inline-flex items-center px-6 py-3 border border-[#1e6f7c] shadow-sm text-base font-medium rounded-md text-[#1e6f7c] bg-white hover:bg-[#1e6f7c] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e6f7c] transition-colors duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Another Address
            </button>
          </div>

          {addresses.some(addr => addr.doctorName || addr.mobile || addr.city) && (
            <AddressList addresses={addresses} />
          )}
        </div>
      </div>
      
      <footer className="mt-12 py-6 text-center text-gray-600">
        <p className="text-sm">
          Designed and developed with{' '}
          <span className="text-red-500" aria-label="love">
            ❤️
          </span>{' '}
          by Samyak
        </p>
      </footer>
    </div>
  );
}
