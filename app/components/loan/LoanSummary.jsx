// components/loan/summary.jsx
'use client';

import ImportantNotes from "./ImportantNotes";
import PaymentBreakdown from "./PaymentBreakdown";

export default function summary({summary}) {
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">
      Loan Summary
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Key Financial Metrics */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Monthly Payment</h3>
        <p className="text-2xl font-bold text-blue-600">Rs {summary.monthlyPayment.toLocaleString()}</p>
        <p className="text-sm text-blue-700 mt-1">Due every month</p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-900 mb-2">Total Payment</h3>
        <p className="text-2xl font-bold text-green-600">Rs {summary.totalPayment.toLocaleString()}</p>
        <p className="text-sm text-green-700 mt-1">Principal + Interest</p>
      </div>

      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Total Interest</h3>
        <p className="text-2xl font-bold text-red-600">Rs {summary.totalInterest.toLocaleString()}</p>
        <p className="text-sm text-red-700 mt-1">{summary.interestRatio}% of principal</p>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">Loan Term</h3>
        <p className="text-2xl font-bold text-purple-600">{summary.loanTerm} years</p>
        <p className="text-sm text-purple-700 mt-1">{summary.numberOfPayments} payments</p>
      </div>
    </div>

    {/* Detailed Breakdown */}
    <PaymentBreakdown loanSummary={summary} /> 

    {/* Tips and Notes */}
    <ImportantNotes />
  </div>
  );
}