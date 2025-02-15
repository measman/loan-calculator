// app/page.js
"use client";
import { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  // Previous state and functions remain the same
  const [formData, setFormData] = useState({
    loanAmount: "",
    interestRate: "",
    numberOfInstallments: "",
    duration: "",
  });
  interface EmiScheduleItem {
    installmentNo: number;
    emi: string;
    principal: string;
    interest: string;
    balance: string;
  }
  interface LoanSummary {
    totalPayment: string;
    totalInterest: string;
    monthlyPayment: string;
    annualPayment: string;
    interestRatio: string;
    loanAmount: string;
    interestRate: number;
    numberOfPayments: number;
    loanTerm: string;
  }
  const [emiSchedule, setEmiSchedule] = useState<EmiScheduleItem[] | null>(
    null
  );
  const [loanSummary, setLoanSummary] = useState<LoanSummary | null>(null);
  // Add this function after your existing state declarations
  const calculateLoanSummary = (
    amount: number,
    rate: number,
    installments: number,
    emiAmount: number
  ) => {
    const totalPayment = emiAmount * installments;
    const totalInterest = totalPayment - amount;
    const annualPayment = emiAmount * 12;
    const interestRatio = (totalInterest / amount) * 100;

    return {
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      monthlyPayment: emiAmount.toFixed(2),
      annualPayment: annualPayment.toFixed(2),
      interestRatio: interestRatio.toFixed(1),
      loanAmount: amount.toFixed(2),
      interestRate: rate,
      numberOfPayments: installments,
      loanTerm: (installments / 12).toFixed(1),
    };
  };

  // Previous calculation functions remain the same
  const calculateEMI = (
    amount: number,
    rate: number,
    installments: number
  ): number => {
    const monthlyRate = rate / 12 / 100;
    const emi =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, installments)) /
      (Math.pow(1 + monthlyRate, installments) - 1);
    return emi;
  };

  // Modify your generateSchedule function to include summary calculation
  const generateSchedule = () => {
    const amount = parseFloat(formData.loanAmount);
    const rate = parseFloat(formData.interestRate);
    const installments = parseInt(formData.numberOfInstallments);

    if (!amount || !rate || !installments) {
      alert("Please fill all fields with valid numbers");
      return;
    }

    const emi = calculateEMI(amount, rate, installments);
    let balance = amount;
    const schedule = [];

    for (let i = 1; i <= installments; i++) {
      const interest = (balance * rate) / (12 * 100);
      const principal = emi - interest;
      balance = balance - principal;

      schedule.push({
        installmentNo: i,
        emi: emi.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: Math.max(0, balance).toFixed(2),
      });
    }

    setEmiSchedule(schedule);
    setLoanSummary(calculateLoanSummary(amount, rate, installments, emi));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const exportToCSV = () => {
    // Previous implementation remains the same
    if (!emiSchedule) return;

    const headers = [
      "Installment No.",
      "EMI",
      "Principal",
      "Interest",
      "Balance",
    ];
    const csvData = [
      headers.join(","),
      ...emiSchedule.map((row) =>
        [
          row.installmentNo,
          row.emi,
          row.principal,
          row.interest,
          row.balance,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emi-schedule.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <SpeedInsights />
      {/* Navigation Bar */}
      <nav className='bg-white shadow-md'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <span className='text-xl font-bold text-blue-600'>LoanCalc</span>
            </div>
            <div className='hidden md:flex items-center space-x-8'>
              <a
                href='#'
                className='text-gray-700 hover:text-blue-600 transition-colors'
              >
                Home
              </a>
              <a
                href='#'
                className='text-gray-700 hover:text-blue-600 transition-colors'
              >
                Calculators
              </a>
              <a
                href='#'
                className='text-gray-700 hover:text-blue-600 transition-colors'
              >
                About Us
              </a>
              <a
                href='#'
                className='text-gray-700 hover:text-blue-600 transition-colors'
              >
                Blog
              </a>
              <a
                href='#'
                className='text-gray-700 hover:text-blue-600 transition-colors'
              >
                Contact
              </a>
            </div>
            <div className='md:hidden'>
              <button className='text-gray-700 hover:text-blue-600'>
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Previous implementation remains the same */}
      <main className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4'>
        {/* Hero Section */}
        <div className='max-w-7xl mx-auto text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Smart Loan EMI Calculator
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Plan your loan repayment with our easy-to-use EMI calculator. Get
            detailed installment schedules and export your plan in just a few
            clicks.
          </p>
        </div>

        <div className='max-w-7xl mx-auto'>
          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <div className='text-blue-600 text-2xl mb-3'>📊</div>
              <h3 className='text-lg font-semibold mb-2'>
                Accurate Calculations
              </h3>
              <p className='text-gray-600'>
                Get precise EMI calculations based on your loan amount and
                interest rate.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <div className='text-blue-600 text-2xl mb-3'>📈</div>
              <h3 className='text-lg font-semibold mb-2'>Detailed Schedule</h3>
              <p className='text-gray-600'>
                View complete breakdown of principal and interest for each
                payment.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <div className='text-blue-600 text-2xl mb-3'>📥</div>
              <h3 className='text-lg font-semibold mb-2'>Export Data</h3>
              <p className='text-gray-600'>
                Download your payment schedule in CSV format for your records.
              </p>
            </div>
          </div>

          {/* Calculator Form */}
          <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
              Calculate Your EMI
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <label
                  htmlFor='loanAmount'
                  className='block text-sm font-medium text-gray-700'
                >
                  Loan Amount
                </label>
                <input
                  id='loanAmount'
                  name='loanAmount'
                  type='number'
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  placeholder='Enter loan amount'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='interestRate'
                  className='block text-sm font-medium text-gray-700'
                >
                  Interest Rate (%)
                </label>
                <input
                  id='interestRate'
                  name='interestRate'
                  type='number'
                  step='0.1'
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  placeholder='Enter interest rate'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='numberOfInstallments'
                  className='block text-sm font-medium text-gray-700'
                >
                  Number of Installments
                </label>
                <input
                  id='numberOfInstallments'
                  name='numberOfInstallments'
                  type='number'
                  value={formData.numberOfInstallments}
                  onChange={handleInputChange}
                  placeholder='Enter number of installments'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='duration'
                  className='block text-sm font-medium text-gray-700'
                >
                  Duration (in months)
                </label>
                <input
                  id='duration'
                  name='duration'
                  type='number'
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder='Enter loan duration'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
            </div>

            <div className='mt-6 text-center'>
              <button
                onClick={generateSchedule}
                className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-sm transition-colors duration-200 font-medium'
              >
                Calculate EMI
              </button>
            </div>
          </div>

          {/* Loan Summary */}
          {emiSchedule && (
            <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Loan Summary
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {/* Key Financial Metrics */}
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <h3 className='text-lg font-semibold text-blue-900 mb-2'>
                    Monthly Payment
                  </h3>
                  <p className='text-2xl font-bold text-blue-600'>
                    Rs{loanSummary?.monthlyPayment || "0"}
                  </p>
                  <p className='text-sm text-blue-700 mt-1'>Due every month</p>
                </div>

                <div className='bg-green-50 p-4 rounded-lg'>
                  <h3 className='text-lg font-semibold text-green-900 mb-2'>
                    Total Payment
                  </h3>
                  <p className='text-2xl font-bold text-green-600'>
                    Rs{loanSummary?.totalPayment || "0"}
                  </p>
                  <p className='text-sm text-green-700 mt-1'>
                    Principal + Interest
                  </p>
                </div>

                <div className='bg-red-50 p-4 rounded-lg'>
                  <h3 className='text-lg font-semibold text-red-900 mb-2'>
                    Total Interest
                  </h3>
                  <p className='text-2xl font-bold text-red-600'>
                    Rs{loanSummary?.totalInterest || "0"}
                  </p>
                  <p className='text-sm text-red-700 mt-1'>
                    {loanSummary?.interestRatio || "0"}% of principal
                  </p>
                </div>

                <div className='bg-purple-50 p-4 rounded-lg'>
                  <h3 className='text-lg font-semibold text-purple-900 mb-2'>
                    Loan Term
                  </h3>
                  <p className='text-2xl font-bold text-purple-600'>
                    {loanSummary?.loanTerm || "0"} years
                  </p>
                  <p className='text-sm text-purple-700 mt-1'>
                    {loanSummary?.numberOfPayments || "0"} payments
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='border rounded-lg p-4'>
                  <h3 className='text-lg font-semibold mb-4'>
                    Payment Breakdown
                  </h3>
                  <ul className='space-y-3'>
                    <li className='flex justify-between'>
                      <span className='text-gray-600'>Principal Amount:</span>
                      <span className='font-semibold'>
                        Rs{loanSummary?.loanAmount || "0"}
                      </span>
                    </li>
                    <li className='flex justify-between'>
                      <span className='text-gray-600'>Interest Rate:</span>
                      <span className='font-semibold'>
                        {loanSummary?.interestRate}% per annum
                      </span>
                    </li>
                    <li className='flex justify-between'>
                      <span className='text-gray-600'>Monthly Payment:</span>
                      <span className='font-semibold'>
                        Rs{loanSummary?.monthlyPayment}
                      </span>
                    </li>
                    <li className='flex justify-between'>
                      <span className='text-gray-600'>Annual Payment:</span>
                      <span className='font-semibold'>
                        Rs{loanSummary?.annualPayment}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className='border rounded-lg p-4'>
                  <h3 className='text-lg font-semibold mb-4'>
                    Loan Statistics
                  </h3>
                  <ul className='space-y-3'>
                    <li className='flex justify-between'>
                      <span className='text-gray-600'>
                        Total Number of Payments:
                      </span>
                      <span className='font-semibold'>
                        {loanSummary?.numberOfPayments}
                      </span>
                    </li>
                    <li className='flex justify-between'>
                      <span className='text-gray-600'>
                        Total Interest Paid:
                      </span>
                      <span className='font-semibold'>
                        Rs{loanSummary?.totalInterest}
                      </span>
                    </li>
                    <li className='flex justify-between'>
                      <span className='text-gray-600'>
                        Interest to Principal Ratio:
                      </span>
                      <span className='font-semibold'>
                        {loanSummary?.interestRatio}%
                      </span>
                    </li>
                    <li className='flex justify-between'>
                      <span className='text-gray-600'>Loan Term:</span>
                      <span className='font-semibold'>
                        {loanSummary?.loanTerm} years
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tips and Notes */}
              <div className='mt-8 bg-yellow-50 p-4 rounded-lg'>
                <h3 className='text-lg font-semibold text-yellow-900 mb-2'>
                  Important Notes
                </h3>
                <ul className='list-disc list-inside space-y-2 text-yellow-800'>
                  <li>
                    The monthly payment includes both principal and interest.
                  </li>
                  <li>
                    Extra payments towards principal can significantly reduce
                    total interest paid.
                  </li>
                  <li>
                    Consider setting up automatic payments to avoid late fees.
                  </li>
                  <li>Review your loan terms for any prepayment penalties.</li>
                </ul>
              </div>
            </div>
          )}

          {/* EMI Schedule */}
          {emiSchedule && (
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-gray-900'>
                  EMI Schedule
                </h2>
                <button
                  onClick={exportToCSV}
                  className='flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-200'
                >
                  <span>Export to CSV</span>
                  <span>📥</span>
                </button>
              </div>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Installment No.
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        EMI
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Principal
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Interest
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {emiSchedule.map((row) => (
                      <tr key={row.installmentNo} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {row.installmentNo}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {row.emi}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {row.principal}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {row.interest}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {row.balance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer Section */}
          <div className='mt-12 text-center text-gray-600'>
            <p className='text-sm'>
              Note: This calculator provides approximate values. Please consult
              with your financial advisor for exact terms.
            </p>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className='bg-gray-800 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* Company Info */}
            <div className='space-y-4'>
              <h3 className='text-xl font-bold mb-4'>LoanCalc</h3>
              <p className='text-gray-300'>
                Making loan calculations simple and accessible for everyone.
                Your trusted partner in financial planning. :)
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Calculators
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Calculators */}
            <div>
              <h4 className='text-lg font-semibold mb-4'>Calculators</h4>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    EMI Calculator
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Personal Loan
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Home Loan
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Car Loan
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-300 hover:text-white transition-colors'
                  >
                    Business Loan
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className='text-lg font-semibold mb-4'>Contact Us</h4>
              <div className='space-y-2 text-gray-300'>
                <p>Email: info@tsuman.com.np</p>
                {/* <p>Phone: (555) 123-4567</p> */}
                <p>Address: Patan, Lalitpur</p>
                <p>Nepal</p>
              </div>
              <div className='mt-4 flex space-x-4'>
                <a href='#' className='text-gray-300 hover:text-white'>
                  <span>📱</span>
                </a>
                <a href='#' className='text-gray-300 hover:text-white'>
                  <span>💬</span>
                </a>
                <a href='#' className='text-gray-300 hover:text-white'>
                  <span>📧</span>
                </a>
              </div>
            </div>
          </div>

          <div className='mt-8 pt-8 border-t border-gray-700'>
            <div className='text-center text-gray-400'>
              <p>&copy; 2025 LoanCalc. All rights reserved.</p>
              <div className='mt-2'>
                <a href='#' className='text-gray-400 hover:text-white mx-2'>
                  Privacy Policy
                </a>
                <span>|</span>
                <a href='#' className='text-gray-400 hover:text-white mx-2'>
                  Terms of Service
                </a>
                <span>|</span>
                <a href='#' className='text-gray-400 hover:text-white mx-2'>
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
