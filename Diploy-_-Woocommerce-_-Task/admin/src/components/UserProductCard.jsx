/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */


const ProductCard2 = ({ product }) => {

  return (
    <div className="border p-4 rounded shadow">
      <img
        src={`http://localhost:5000${product.image_url}`}
        alt={product.name}
        className="h-40 w-full object-cover mb-4"
      />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p className="text-green-600 font-bold mt-2">${product.price}</p>
      <p className="text-sm text-gray-500">Status: {product.status}</p>
     
    </div>
  );
};

export default ProductCard2;
