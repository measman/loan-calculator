// app/page.js
"use client";
import { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./components/layout/Navbar";
import LoanForm from "./components/loan/LoanForm";
import LoanSummary from "./components/loan/LoanSummary";
import LoanSchedule from "./components/loan/LoanSchedule";
import Footer from "./components/layout/Footer";
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

    setEmiSchedule(schedule);
    setLoanSummary(summary);
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <SpeedInsights />
      <Navbar />
      <main className='flex-grow bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4'>
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
      </main>
      <Footer />
    </div>
  );
}
