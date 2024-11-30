import React from "react";

interface Bill {
  date: string;
  amount: number;
  consumedValue: number;
  type: string;
}

interface BillsListProps {
  bills: Bill[];
}

const BillsList: React.FC<BillsListProps> = ({ bills }) => {
  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long" } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 h-full w-full bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-800  ">
        Bills History
      </h2>
      <div className="overflow-x-auto bg-white rounded-lg py-2">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="h-full ">
            {bills.map((bill, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-sm text-black">
                  {formatDate(bill.date)}
                </td>
                <td className="px-4 py-2 text-sm text-black">{bill.type}</td>
                <td className="px-4 py-2 text-sm text-black">
                  ${bill.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillsList;
