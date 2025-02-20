'use client';
import React from "react";
import { useState } from "react";

export default function DepositForm({ onCalculate }) {
    const [formData, setFormData] = useState({
        depositAmount: '',
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
                        <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700">
                            Target Deposit Amount
                        </label>
                        <input
                            type="number"
                            id="depositAmount"
                            name="depositAmount"
                            value={formData.depositAmount}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
                            Interest Rate (%)
                        </label>
                        <input
                            type="number"
                            id="interestRate"
                            name="interestRate"
                            value={formData.interestRate}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="numberOfInstallments" className="block text-sm font-medium text-gray-700">
                            Number of Installments
                        </label>
                        <input
                            type="number"
                            id="numberOfInstallments"
                            name="numberOfInstallments"
                            value={formData.numberOfInstallments}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                            Duration (in months)
                        </label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                    Calculate EMI
                </button>
            </form>
        </div>
    );
}