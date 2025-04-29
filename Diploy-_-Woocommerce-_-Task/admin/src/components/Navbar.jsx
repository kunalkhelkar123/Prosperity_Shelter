import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors duration-300">
          WooCommerce App
        </Link>
        <div className="flex gap-6">
          <Link to="/login" className="text-lg text-white hover:text-gray-200 transition-colors duration-300">
            Login
          </Link>
          <Link to="/register" className="text-lg text-white hover:text-gray-200 transition-colors duration-300">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
