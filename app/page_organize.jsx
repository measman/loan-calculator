// app/page.js
'use client';
import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import LoanForm from './components/loan/LoanForm';
import LoanSummary from './components/loan/LoanSummary';
import LoanSchedule from './components/loan/LoanSchedule';
import Footer from './components/layout/Footer';

export function calculateEMI(amount, rate, installments) {
    const monthlyRate = rate / 12 / 100;
    const emi =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, installments)) /
      (Math.pow(1 + monthlyRate, installments) - 1);
    return emi;
  }
  
  export function calculateLoanSummary(amount, rate, installments, emiAmount) {
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
  }
  
  export function generateSchedule(amount, rate, installments) {
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
  
    return schedule;
  }
  

export default function Home() {
  const [loanSummary, setLoanSummary] = useState(null);
  const [emiSchedule, setEmiSchedule] = useState(null);

  const handleCalculate = (formData) => {
    const amount = parseFloat(formData.loanAmount);
    const rate = parseFloat(formData.interestRate);
    const installments = parseInt(formData.numberOfInstallments);

    const emi = calculateEMI(amount, rate, installments);
    const schedule = generateSchedule(amount, rate, installments);
    const summary = calculateLoanSummary(amount, rate, installments, emi);

    setEmiSchedule(schedule);
    setLoanSummary(summary);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Smart Loan EMI Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Plan your loan repayment with our easy-to-use EMI calculator.
            </p>
          </div>

          <LoanForm onCalculate={handleCalculate} />
          
          {loanSummary && (
            <>
              <LoanSummary summary={loanSummary} />
              <LoanSchedule schedule={emiSchedule} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}