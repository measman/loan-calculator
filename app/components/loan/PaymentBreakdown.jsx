// components/loan/PaymentBreakdown.jsx
'use client';

export default function PaymentBreakdown({loanSummary}) {
  
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Payment Breakdown</h3>
        <ul className="space-y-3">
          <li className="flex justify-between">
            <span className="text-gray-600">Principal Amount:</span>
            <span className="font-semibold">Rs{loanSummary.loanAmount}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Interest Rate:</span>
            <span className="font-semibold">{loanSummary.interestRate}% per annum</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Monthly Payment:</span>
            <span className="font-semibold">Rs{loanSummary.monthlyPayment}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Annual Payment:</span>
            <span className="font-semibold">Rs{loanSummary.annualPayment}</span>
          </li>
        </ul>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Loan Statistics</h3>
        <ul className="space-y-3">
          <li className="flex justify-between">
            <span className="text-gray-600">Total Number of Payments:</span>
            <span className="font-semibold">{loanSummary.numberOfPayments}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Total Interest Paid:</span>
            <span className="font-semibold">Rs{loanSummary.totalInterest}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Interest to Principal Ratio:</span>
            <span className="font-semibold">{loanSummary.interestRatio}%</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Loan Term:</span>
            <span className="font-semibold">{loanSummary.loanTerm} years</span>
          </li>
        </ul>
      </div>
    </div>
  );
}