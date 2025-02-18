// components/layout/Navbar.jsx
export default function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold mb-4'>Settlement LoanCalc</h3>
            <p className='text-gray-300'>
              Making loan calculations simple and accessible for everyone. Your
              trusted partner in financial planning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Calculators
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Calculators */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Calculators</h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  EMI Calculator
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Personal Loan
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Home Loan
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Car Loan
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Business Loan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Contact Us</h4>
            <div className='space-y-2 text-gray-300'>
              <p>Email: info@tsuman.com.np</p>
              {/* <p>Phone: (555) 123-4567</p> */}
              <p>Address: Lalitpur, Nepal</p>
              <p>Nepal</p>
            </div>
            <div className='mt-4 flex space-x-4'>
              <a href='#' className='text-gray-300 hover:text-white'>
                <span>📱</span>
              </a>
              <a href='#' className='text-gray-300 hover:text-white'>
                <span>💬</span>
              </a>
              <a href='#' className='text-gray-300 hover:text-white'>
                <span>📧</span>
              </a>
            </div>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-gray-700'>
          <div className='text-center text-gray-400'>
            <p>&copy; 2025 Settlement LoanCalc. All rights reserved.</p>
            <div className='mt-2'>
              <a href='#' className='text-gray-400 hover:text-white mx-2'>
                Privacy Policy
              </a>
              <span>|</span>
              <a href='#' className='text-gray-400 hover:text-white mx-2'>
                Terms of Service
              </a>
              <span>|</span>
              <a href='#' className='text-gray-400 hover:text-white mx-2'>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
