import { useState } from 'react';
import ProductService from '../services/ProductService';
import { useNavigate } from 'react-router-dom';

const CreateProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    try {
      await ProductService.createProduct(formData);
      navigate('/admin/dashboard');
    } catch (error) {
      alert(error.response?.data.message || 'Product Creation Failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <input
        className="border w-full p-2 mb-4"
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="border w-full p-2 mb-4"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-4"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-4"
        type="file"
        onChange={handleImageChange} 
      />
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white w-full p-2"
      >
        Create Product
      </button>
    </div>
  );
};

export default CreateProductPage;
