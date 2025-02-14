// components/layout/Navbar.jsx
export default function Navbar() {
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">LoanCalc</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Calculators</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>
    );
  }