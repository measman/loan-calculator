// lib/calculations.js

// calculateEMI: This function calculates the EMI amount based on the loan amount, interest rate, and number of installments.
export function calculateEMI(amount, rate, installments) {
  const monthlyRate = rate / 12 / 100;
  const emi =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, installments)) /
    (Math.pow(1 + monthlyRate, installments) - 1);
  return emi;
}

// calculateLoanSummary: This function calculates the total payment, total interest, annual payment, interest ratio, and other loan details.

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

// generateSchedule: This function generates the EMI schedule based on the loan amount, interest rate, and number of installments.
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

// calculate a amount to deposited monthly in bank to get a desired amount after a certain period of time with a certain interest.
export function calculateMonthlyDeposit(desiredamount, rate, installments) {
  const monthlyRate = rate / 12 / 100;
  const monthlyDeposit =
    (desiredamount * monthlyRate) / (Math.pow(1 + monthlyRate, installments) - 1);
  return monthlyDeposit;
}

export function generateDepositSchedule(desiredamount, rate, installments) {
  const monthlyDeposit = calculateMonthlyDeposit(desiredamount, rate, installments);
  let balance = 0;
  const schedule = [];

  for (let i = 1; i <= installments; i++) {
    const interest = (balance * rate) / (12 * 100);
    balance = balance + monthlyDeposit + interest;

    schedule.push({
      installmentNo: i,
      deposit: monthlyDeposit.toFixed(2),
      interest: interest.toFixed(2),
      balance: balance.toFixed(2),
    });
  }

  return schedule;
}