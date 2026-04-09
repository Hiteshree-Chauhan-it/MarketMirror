// tailwind.config.js 
/** @type {import('tailwindcss').Config} */ 
export default { 
  content: [ 
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',  // Scan ALL files in src/ 
  ], 
  darkMode: 'class',  // Enable dark mode via class 
  theme: { 
    extend: { 
      colors: { 
        primary: '#1E3A5F',   // MarketMirror navy
        accent: '#2563EB',    // MarketMirror blue 
      } 
    }, 
  }, 
  plugins: [], 
} 