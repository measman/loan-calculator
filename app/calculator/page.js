"use client";
import React from "react";
import { useState } from "react";
import DepositForm from "../components/loan/DepositForm";

import DepositSchedule from "../components/loan/DepositSchedule";

import { generateDepositSchedule } from "../lib/calculations";

const Calculator = () => {
  const [depositSchedule, setDepositSchedule] = useState(null);

  const handleCalculate = (formData) => {
    const amount = parseFloat(formData.depositAmount);
    const rate = parseFloat(formData.interestRate);
    const installments = parseInt(formData.numberOfInstallments);
    const duration = parseInt(formData.duration);

    const schedule = generateDepositSchedule(
      amount,
      rate,
      installments,
      duration
    );
    setDepositSchedule(schedule);
    console.log(schedule);
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Deposit Plan Calculator
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Plan your Deposit with our easy-to-use calculator.
        </p>
      </div>
      <DepositForm onCalculate={handleCalculate} />
      {depositSchedule && <DepositSchedule depositSchedule={depositSchedule} />}
    </div>
  );
};

export default Calculator;
