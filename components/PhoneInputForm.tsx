
import React, { useState } from 'react';
import { Spinner } from './Spinner';

interface PhoneInputFormProps {
  onSubmit: (phoneNumber: string) => void;
  isLoading: boolean;
}

export const PhoneInputForm: React.FC<PhoneInputFormProps> = ({ onSubmit, isLoading }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading) {
      onSubmit(phoneNumber);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitize the input to allow only numeric characters and spaces.
    const sanitizedValue = e.target.value.replace(/[^0-9\s]/g, '');
    setPhoneNumber(sanitizedValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="phone-number" className="sr-only">Phone Number</label>
      <input
        id="phone-number"
        type="tel"
        value={phoneNumber}
        onChange={handleInputChange}
        placeholder="e.g., 024 123 4567"
        className="w-full px-5 py-4 text-lg bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-ghana-yellow focus:border-ghana-yellow transition-colors duration-200 text-white placeholder-gray-500"
        required
        disabled={isLoading}
        maxLength={15}
        autoComplete="tel"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center w-full px-5 py-4 text-lg font-bold text-gray-900 bg-ghana-yellow rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-ghana-yellow disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? <Spinner /> : 'Track Number'}
      </button>
    </form>
  );
};
