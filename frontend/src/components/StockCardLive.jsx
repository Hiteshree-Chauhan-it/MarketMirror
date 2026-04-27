// src/components/StockCardLive.jsx

import { useState, useEffect } from 'react';
import { fetchStockQuote } from '../utils/stockApi';

function StockCardLive({ symbol, name, onWatchlist, onToggleWatchlist }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const quote = await fetchStockQuote(symbol);
        setData(quote);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [symbol]);

  // --- Loading State ---
  if (loading) {
    return (
      <div className='bg-white rounded-xl shadow-md p-6 border border-gray-100 animate-pulse'>
        <div className='h-4 bg-gray-200 rounded mb-3 w-16'></div>
        <div className='h-6 bg-gray-200 rounded mb-2 w-3/4'></div>
        <div className='h-8 bg-gray-200 rounded mb-2 w-1/2'></div>
        <div className='h-4 bg-gray-200 rounded w-1/3'></div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className='bg-red-50 rounded-xl shadow-md p-6 border border-red-200'>
        <p className='text-red-600 font-semibold'>{symbol}</p>
        <p className='text-red-400 text-sm mt-1'>{error}</p>
        <p className='text-gray-400 text-xs mt-2'>Try refreshing the page</p>
      </div>
    );
  }

  // --- Success State ---
  const isPositive = data.change >= 0;

  return (
    <div className='bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition duration-200'>
      <div className='flex items-center justify-between mb-3'>
        <span className='text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full'>
          {data.symbol}
        </span>

        <button
          onClick={() => onToggleWatchlist(symbol)}
          className={`text-xl ${onWatchlist ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </button>
      </div>

      <h3 className='font-semibold text-gray-800 text-lg mb-1'>{name}</h3>

      <p className='text-3xl font-bold text-gray-900 mb-2'>
        ${data.price.toFixed(2)}
      </p>

      <p
        className={`text-sm font-semibold ${
          isPositive ? 'text-green-600' : 'text-red-500'
        }`}
      >
        {isPositive ? '▲' : '▼'} {Math.abs(data.change).toFixed(2)} (
        {Math.abs(data.changePercent).toFixed(2)}%)
      </p>
    </div>
  );
}

export default StockCardLive;