import logo from '../assets/logo.png';
function Navbar() {
  return (
    <nav className="bg-[#312E81] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LEFT → Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="MarketMirror Logo" className="h-8 w-auto" />
            <span className="text-white font-bold text-xl tracking-wide">
              MarketMirror
            </span>
          </div>

          {/* RIGHT → Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-300 hover:text-white hover:font-semibold transition duration-200">
              Dashboard
            </a>
            <a href="#" className="text-gray-300 hover:text-white hover:font-semibold transition duration-200">
              Portfolio
            </a>
            <a href="#" className="text-gray-300 hover:text-white hover:font-semibold transition duration-200">
              WatchList
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;