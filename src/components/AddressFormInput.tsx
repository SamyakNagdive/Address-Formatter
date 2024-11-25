import React from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import { Address } from '../types';

interface AddressFormInputProps {
  address: Address;
  onUpdate: (address: Address) => void;
  onRemove: () => void;
  showRemove: boolean;
}

export default function AddressFormInput({
  address,
  onUpdate,
  onRemove,
  showRemove,
}: AddressFormInputProps) {
  const [errors, setErrors] = React.useState<Partial<Address>>({});

  const validateField = (name: keyof Address, value: string) => {
    if (name === 'mobile' && value && !/^\d{10}$/.test(value)) {
      return 'Please enter a valid 10-digit mobile number';
    }
    return '';
  };

  const handleChange = (name: keyof Address, value: string) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
    onUpdate({ ...address, [name]: value });
  };

  const resetForm = () => {
    onUpdate({
      doctorName: '',
      hospitalClinic: '',
      flatNo: '',
      society: '',
      area: '',
      city: '',
      pincode: '',
      mobile: '',
    });
    setErrors({});
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-indigo-100 transition-colors duration-200">
      <div className="p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Doctor's Name</label>
            <input
              type="text"
              value={address.doctorName}
              onChange={(e) => handleChange('doctorName', e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-shadow duration-200"
              placeholder="Dr. John Doe"
            />
            {errors.doctorName && (
              <p className="text-xs text-red-600">{errors.doctorName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Hospital/Clinic
            </label>
            <input
              type="text"
              value={address.hospitalClinic}
              onChange={(e) => handleChange('hospitalClinic', e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-shadow duration-200"
              placeholder="City Hospital"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Flat No./Survey Number
            </label>
            <input
              type="text"
              value={address.flatNo}
              onChange={(e) => handleChange('flatNo', e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-shadow duration-200"
              placeholder="101"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Society/Colony</label>
            <input
              type="text"
              value={address.society}
              onChange={(e) => handleChange('society', e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-shadow duration-200"
              placeholder="Green Valley"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Lane/Area</label>
            <input
              type="text"
              value={address.area}
              onChange={(e) => handleChange('area', e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-shadow duration-200"
              placeholder="West Street"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-shadow duration-200"
              placeholder="Mumbai"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="text"
              value={address.pincode}
              onChange={(e) => handleChange('pincode', e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-shadow duration-200"
              placeholder="400001"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              value={address.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-shadow duration-200"
              placeholder="9876543210"
              maxLength={10}
            />
            {errors.mobile && <p className="text-xs text-red-600">{errors.mobile}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-5">
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center px-4 py-2 text-sm border border-gray-300 shadow-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear
          </button>
          {showRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center px-4 py-2 text-sm border border-transparent font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}