"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calculator, Info } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();

  const isActiveLink = (path) => {
    return pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-gray-100 text-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Calculator className="h-8 w-8" />
              <span className="font-bold text-xl">Settlement Finance Calc</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors ${isActiveLink('/') ? 'bg-gray-200' : ''}`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            <Link
              href="/calculator"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors ${isActiveLink('/calculator') ? 'bg-gray-200' : ''}`}
            >
              <Calculator className="h-4 w-4" />
              <span>Calculator</span>
            </Link>

            <Link
              href="/about"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors ${isActiveLink('/about') ? 'bg-gray-200' : ''}`}
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;