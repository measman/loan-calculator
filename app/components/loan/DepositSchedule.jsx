'use client';

export default function DepositSchedule({ depositSchedule }) {

    const exportToCSV = () => {
        // Previous implementation remains the same
        if (!depositSchedule) return;
    
        const headers = [
          "Installment No.",
          "Deposit",
          "Interest",
          "Balance",
        ];
        const csvData = [
          headers.join(","),
          ...depositSchedule.map((row) =>
            [
              row.installmentNo,
              row.deposit,
              row.interest,
              row.balance,
            ].join(",")
          ),
        ].join("\n");
    
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "deposit-schedule.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      };
    
    return (
        <div className='bg-white rounded-lg shadow-lg p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold text-gray-900'>EMI Schedule</h2>
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
                  Interest
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {depositSchedule?.map((row) => (
                <tr key={row.installmentNo} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {row.installmentNo}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  Rs. {row.deposit}
                  </td>                  
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  Rs. {row.interest}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  Rs. {row.balance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }