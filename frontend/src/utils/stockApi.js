// src/utils/stockApi.js

// STEP 1: Get API key from .env file
// WHY: So we don't expose our secret key in code
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;

// STEP 2: Base URL of API
// WHY: So we don't repeat this URL again and again
const BASE_URL = 'https://www.alphavantage.co/query';


//FUNCTION 1: Get current stock price
export async function fetchStockQuote(symbol) {

  // STEP 3: Create API URL with symbol + API key
  // Example: ?symbol=AAPL
  const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  // STEP 4: Call API (send request to server)
  const response = await fetch(url);

  // STEP 5: Check if request worked or failed
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  // STEP 6: Convert response into JSON format
  const data = await response.json();

  // STEP 7: Extract useful part of response
  const quote = data['Global Quote'];

  // STEP 8: Check if data exists
  if (!quote || !quote['05. price']) {
    throw new Error(`No data found for ${symbol}`);
  }

  // STEP 9: Return clean and usable data
  // WHY: API gives messy data → we clean it for our UI
  return {
    symbol: quote['01. symbol'],              // Stock name (AAPL, TSLA)
    price: parseFloat(quote['05. price']),    // Current price
    change: parseFloat(quote['09. change']),  // Price change
    changePercent: parseFloat(
      quote['10. change percent'].replace('%', '')
    ),                                       // Remove % and convert to number
    volume: parseInt(quote['06. volume']),    // Trading volume
    previousClose: parseFloat(quote['08. previous close']), // Yesterday price
  };
}


//FUNCTION 2: Search stocks by name
export async function searchStocks(keywords) {

  // STEP 1: Create search API URL
  const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`;

  // STEP 2: Call API
  const response = await fetch(url);

  // STEP 3: Convert response to JSON
  const data = await response.json();

  // STEP 4: Return matching stocks
  return data.bestMatches || [];
}


//FUNCTION 3: Get stock price history (for charts)
export async function fetchPriceHistory(symbol) {

  // STEP 1: Create API URL for daily data
  const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;

  // STEP 2: Call API
  const response = await fetch(url);

  // STEP 3: Convert to JSON
  const data = await response.json();

  // STEP 4: Extract time series data
  const timeSeries = data['Time Series (Daily)'];

  // STEP 5: Convert object → array
  // WHY: Easier to loop and use in charts
  return Object.entries(timeSeries)

    .slice(0, 30)   // Take last 30 days
    .reverse()      // Old → New order

    .map(([date, values]) => ({
      date,                                  // Date of data
      close: parseFloat(values['4. close']), // Closing price
      open: parseFloat(values['1. open']),   // Opening price
      high: parseFloat(values['2. high']),   // Highest price
      low: parseFloat(values['3. low']),     // Lowest price
    }));
}