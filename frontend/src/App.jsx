import StockCard from "./components/StockCard";
import StockCardLive from "./components/StockCardLive";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <div className='min-h-screen bg-gray-50'> 
      <Navbar /> 
      <main className='max-w-7xl mx-auto px-4 py-8'> 
        <h1 className='text-3xl font-bold text-gray-800'> 
          Stock Dashboard 
        </h1> 
        {/* <StockCard></StockCard> */}
        <Dashboard />
      </main> 
    </div> 
  );
}

export default App;