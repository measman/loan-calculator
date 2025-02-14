// lib/calculations.js
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
