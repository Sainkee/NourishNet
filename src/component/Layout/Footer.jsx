import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white">
              Contact
            </Link>
          </div>
          <div>
            <p className="text-gray-300 text-center">© 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
