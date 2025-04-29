import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import ProductCard from "../components/ProductCard";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    ProductService.getProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data); 
    });
  }, []);

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
  };
  const handleAddProduct = () => {
    navigate('/create-product'); // <-- navigate to login page
  };

  useEffect(() => {
    let filtered = [...products];

    if (statusFilter !== "All") {
      filtered = filtered.filter((product) => product.status === statusFilter);
    }

    setFilteredProducts(filtered);
  }, [statusFilter, products]);

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto mt-6">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <label htmlFor="status" className="mr-2">Filter by Status:</label>
            <select
              id="status"
              className="border p-2"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <option value="All">All</option>
              <option value="Created Locally">Created Locally</option>
              <option value="Synced">Synced to WooCommerce</option>
              <option value="Sync Failed">Sync Failed</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
         <div className="text-center mt-10">
         <h2 className="text-2xl font-semibold mb-4">No products available</h2>
         <p className="mb-6">Please add products to your store.</p>
         <button
           onClick={handleAddProduct}
           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
         >
           Add Product
         </button>
       </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductListPage;
