// components/loan/ImportantNotes.jsx
'use client';

export default function ImportantNotes() {
  
  return (
    <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Notes</h3>
      <ul className="list-disc list-inside space-y-2 text-yellow-800">
        <li>The monthly payment includes both principal and interest.</li>
        <li>Extra payments towards principal can significantly reduce total interest paid.</li>
        <li>Consider setting up automatic payments to avoid late fees.</li>
        <li>Review your loan terms for any prepayment penalties.</li>
      </ul>
    </div>
  );
}