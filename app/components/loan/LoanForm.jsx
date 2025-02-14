// components/loan/LoanForm.jsx
'use client';
import { useState } from 'react';

export default function LoanForm({ onCalculate }) {
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestRate: '',
    numberOfInstallments: '',
    duration: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Calculate Your EMI
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
              Loan Amount
            </label>
            <input
              id="loanAmount"
              name="loanAmount"
              type="number"
              value={formData.loanAmount}
              onChange={handleInputChange}
              placeholder="Enter loan amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Add other form fields similarly */}
          <div className="space-y-2">
              <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
                Interest Rate (%)
              </label>
              <input
                id="interestRate"
                name="interestRate"
                type="number"
                step="0.1"
                value={formData.interestRate}
                onChange={handleInputChange}
                placeholder="Enter interest rate"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="numberOfInstallments" className="block text-sm font-medium text-gray-700">
                Number of Installments
              </label>
              <input
                id="numberOfInstallments"
                name="numberOfInstallments"
                type="number"
                value={formData.numberOfInstallments}
                onChange={handleInputChange}
                placeholder="Enter number of installments"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration (in months)
              </label>
              <input
                id="duration"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="Enter loan duration"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
        </div>
        <div className="mt-6 text-center">
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-sm transition-colors duration-200 font-medium"
          >
            Calculate EMI
          </button>
        </div>
      </form>
    </div>
  );
}