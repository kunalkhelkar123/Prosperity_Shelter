import React, { useState } from "react";

const Aminities = ({ amenity, onAmenityChange }) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    onAmenityChange(value, checked);
  };

  return (
   
   
   
<div className="p-2 mx-2 ">
      <input
        type="checkbox"
        id={amenity.name}
        value={amenity.name}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={amenity.name} className="p-2 text-lg">{amenity.name}</label>
    </div>
   
  
   
   
  );
};

export default Aminities;
