// src/components/FinancialSummaryCard.jsx
import React from "react";

const FinancialSummaryCard = () => {
  const financialData = {
    revenue: 5000,
    expenses: 2000,
    profit: 3000,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Financial Summary</h2>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span>Revenue</span>
          <span className="font-semibold text-green-600">${financialData.revenue}</span>
        </li>
        <li className="flex justify-between">
          <span>Expenses</span>
          <span className="font-semibold text-red-600">${financialData.expenses}</span>
        </li>
        <li className="flex justify-between">
          <span>Profit</span>
          <span className="font-semibold text-blue-600">${financialData.profit}</span>
        </li>
      </ul>
    </div>
  );
};

export default FinancialSummaryCard;
