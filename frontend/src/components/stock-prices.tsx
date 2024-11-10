"use client";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export function StockPrices() {
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 150.23, change: 2.5 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2750.01, change: -1.2 },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 305.94,
      change: 0.8,
    },
    { symbol: "AMZN", name: "Amazon.com, Inc.", price: 3380.05, change: -0.5 },
    { symbol: "TSLA", name: "Tesla, Inc.", price: 689.3, change: 3.2 },
  ];

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg w-full h-full">
      <h2 className="text-2xl font-bold mb-4">Stock Prices</h2>
      <div className="space-y-4">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="flex justify-between items-center">
            <div>
              <span className="font-semibold">{stock.symbol}</span>
              <span className="text-gray-400 text-sm ml-2">{stock.name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold mr-2">${stock.price.toFixed(2)}</span>
              <span
                className={`flex items-center ${
                  stock.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {stock.change >= 0 ? (
                  <ArrowUpIcon className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 mr-1" />
                )}
                {stock.change >= 0
                  ? `${stock.change.toFixed(2)}%`
                  : `${(-stock.change).toFixed(2)}%`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
