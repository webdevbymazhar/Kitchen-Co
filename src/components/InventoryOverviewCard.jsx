// src/components/InventoryOverviewCard.jsx
import React from "react";

const InventoryOverviewCard = () => {
  const inventoryItems = [
    { item: "Tomatoes", quantity: 25 },
    { item: "Cheese", quantity: 10 },
    { item: "Buns", quantity: 30 },
    { item: "Lettuce", quantity: 15 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Inventory Overview</h2>
      <ul className="space-y-2">
        {inventoryItems.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.item}</span>
            <span className={`font-semibold ${item.quantity < 10 ? "text-red-600" : "text-green-600"}`}>
              {item.quantity} Left
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryOverviewCard;
