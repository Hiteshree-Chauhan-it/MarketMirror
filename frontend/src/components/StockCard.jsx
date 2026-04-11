//StockCard component to display stock information in a card format
function StockCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  onWatchlist,
  onToggleWatchlist,
}) {
  //Determine if stock went up or down
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition duration-200 cursor-pointer">
      {/*Header : Symbol + watchlist button*/}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          {symbol}
        </span>
        <button
          onClick={() => onToggleWatchlist(symbol)}
          className={`text-xl transition ${
            onWatchlist ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </button>
      </div>
      {/* Company Name */}
      <h3
        className="font-semibold text-gray-800 text-lg mb-1 
truncate"
      >
        {name}
      </h3>

      {/* Price */}
      <p className="text-3xl font-bold text-gray-900 mb-2">
        ${Number(price).toFixed(2)}
      </p>

      {/* Change: green if positive, red if negative */}
      <p
        className={`text-sm font-semibold ${
          isPositive ? "text-green-600" : "text-red-500"
        }`}
      >
        {isPositive ? "▲" : "▼"} {Math.abs(change).toFixed(2)}(
        {Math.abs(changePercent).toFixed(2)}%)
      </p>
    </div>
  );
}
export default StockCard;
