// components/ui/Card.jsx
"use client";

export default function Card() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='text-blue-600 text-2xl mb-3'>📊</div>
        <h3 className='text-lg font-semibold mb-2'>Accurate Calculations</h3>
        <p className='text-gray-600'>
          Get precise EMI calculations based on your loan amount and interest
          rate.
        </p>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='text-blue-600 text-2xl mb-3'>📈</div>
        <h3 className='text-lg font-semibold mb-2'>Detailed Schedule</h3>
        <p className='text-gray-600'>
          View complete breakdown of principal and interest for each payment.
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
  );
}
