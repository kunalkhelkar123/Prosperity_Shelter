// App.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState({
    address: '',
    price: '',
    // Add other properties as needed
  });

  useEffect(() => {
    fetchPropertyDetails();
  }, []);

  const fetchPropertyDetails = async () => {
    try {
      const response = await fetch(`/propertyDetails/${id}`);
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/propertyDetails/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });
      const data = await response.json();
      console.log(data);
      // Optionally redirect to another page after successful update
    } catch (error) {
      console.error('Error updating property details:', error);
    }
  };

  return (
    <div>
      <h2>Update Property</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={property.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={property.price}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Add other input fields for other properties */}
        <button type="submit">Update Property</button>
      </form>
    </div>
  );
}

export default UpdateProperty;
