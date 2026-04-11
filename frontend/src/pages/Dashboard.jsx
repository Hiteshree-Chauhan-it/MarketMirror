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
  //we will add state later

  const watchList = [];
  const handleToggle = (symbol) => console.log("Toggle :", symbol);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Overview</h1>
      <p className="text-gray-500 mb-8">
        Real-time stock prices and performance
      </p>

      {/* Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleStocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            symbol={stock.symbol}
            name={stock.name}
            price={stock.price}
            change={stock.change}
            changePercent={stock.changePercent}
            onWatchlist={watchList.includes(stock.symbol)}
            onToggleWatchlist={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
export default Dashboard;
