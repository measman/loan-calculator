// app/page.js
"use client";
import { useState } from "react";
import LoanForm from "./components/loan/LoanForm";
import LoanSummary from "./components/loan/LoanSummary";
import LoanSchedule from "./components/loan/LoanSchedule";
import {
  calculateEMI,
  calculateLoanSummary,
  generateSchedule,
} from "./lib/calculations";
import Card from "./components/ui/card";

export default function Home() {
  const [loanSummary, setLoanSummary] = useState(null);
  const [emiSchedule, setEmiSchedule] = useState([]);

  const handleCalculate = (formData) => {
    const amount = parseFloat(formData.loanAmount);
    const rate = parseFloat(formData.interestRate);
    const installments = parseInt(formData.numberOfInstallments);

    const emi = calculateEMI(amount, rate, installments);
    const schedule = generateSchedule(amount, rate, installments);
    const summary = calculateLoanSummary(amount, rate, installments, emi);
    // const monthlyDepositschedule = generateDepositSchedule(amount, rate, installments);
    // console.log(monthlyDepositschedule);

    setEmiSchedule(schedule);
    setLoanSummary(summary);
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Smart Loan EMI Calculator
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Plan your loan repayment with our easy-to-use EMI calculator.
        </p>
      </div>
      <Card />
      <LoanForm onCalculate={handleCalculate} />

      {loanSummary && (
        <>
          <LoanSummary summary={loanSummary} />
          <LoanSchedule emiSchedule={emiSchedule} />
        </>
      )}
    </div>
  );
}
