// src/components/TopSellingItemsCard.jsx
import React from "react";

const TopSellingItemsCard = () => {
  const topItems = [
    { name: "Burger", sales: 120 },
    { name: "Pasta", sales: 100 },
    { name: "Pizza", sales: 90 },
    { name: "Salad", sales: 80 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Top-Selling Items</h2>
      <ul className="space-y-2">
        {topItems.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span className="font-semibold text-blue-600">{item.sales} Sold</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingItemsCard;
