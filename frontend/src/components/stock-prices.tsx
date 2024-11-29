"use client";

import { useState, useEffect } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export function StockPrices() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];
  const apiKey = "9GN2P4AVG5GB2ETT";

  useEffect(() => {
    async function fetchStockPrices() {
      const stockDataPromises = symbols.map(async (symbol) => {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
        );
        const data = await response.json();
        const timeSeries = data["Time Series (Daily)"];
        const latestDate = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestDate];
        return {
          symbol: symbol,
          name: symbol, // Placeholder for name, as API does not provide it
          price: parseFloat(latestData["4. close"]),
          change:
            parseFloat(latestData["4. close"]) -
            parseFloat(latestData["1. open"]),
        };
      });

      const stockData = await Promise.all(stockDataPromises);
      setStocks(stockData);
    }

    fetchStockPrices();
  }, []);

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
