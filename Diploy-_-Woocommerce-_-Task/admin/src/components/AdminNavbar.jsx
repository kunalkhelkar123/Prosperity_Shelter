import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="w-full  p-4 bg-blue-700">
      <Link to="/" className=" text-white text-xl font-bold hover:text-white hover:scale-110 transform transition-transform duration-200  " >
        WooCommerce App
      </Link>
      <div className="max-w-7xl mt-[-25px] mx-auto flex justify-end items-center">
        <div className="flex space-x-6">
        <Link to="/admin/dashboard" className="text-white hover:text-gray-300  hover:scale-110 transform transition-transform duration-200 ">
            DashBoard
          </Link>
          <Link to="/create-product" className="text-white hover:text-gray-300  hover:scale-110 transform transition-transform duration-200 ">
            Add Product
          </Link>
          <button
            onClick={Logout}
            className="text-white bg-transparent hover:text-gray-300  hover:scale-110 transform transition-transform duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
