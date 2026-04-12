import { useState } from "react";
import StockCard from "../components/StockCard";

//Sample Data - later will fetchfrom real API

const sampleStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.63,
    change: 1.24,
    changePercent: 0.68,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 141.8,
    change: -0.95,
    changePercent: -0.67,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 378.91,
    change: 3.42,
    changePercent: 0.91,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 202.45,
    change: -4.1,
    changePercent: -1.99,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 185.07,
    change: 2.18,
    changePercent: 1.19,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 875.39,
    change: 22.15,
    changePercent: 2.6,
  },
];

function Dashboard() {
  // State: array of stock symbols the user has starred
  const [watchList, setWatchList] = useState([]);

  // State: current search query
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle a stock in/out of the watchlist
  const handleToggleWatchList = (symbol) => {
    setWatchList((prev) => {
      // If already in watchlist, remove it
      if (prev.includes(symbol)) {
        return prev.filter((s) => s !== symbol);
      }
      //otherwise add it
      return [...prev, symbol];
    });
  };

  // Filter stocks based on search query
  const filteredStocks = sampleStocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/*Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search stocks (e.g. AAPL, Tesla)...'"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-3 border border-gray-300 
                     rounded-xl shadow-sm focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
      </div>

      {/*WatchList count badge */}
      {watchList.length > 0 && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-500">Watching:</span>
          {watchList.map((s) => (
            <span
              key={s}
              className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Stock Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            {...stock}
            onWatchlist={watchList.includes(stock.symbol)}
            onToggleWatchlist={handleToggleWatchList}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredStocks.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-xl">No stocks found for '{searchQuery}'</p>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
