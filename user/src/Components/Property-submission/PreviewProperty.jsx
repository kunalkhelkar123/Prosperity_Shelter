import React from 'react';

function PreviewProperty({formData,handleSubmit}) {
  return (
    <div >

      <p className=''>propertyTitle:    {formData.propertyTitle}</p>
      <p>propertyType:{formData.propertyType}</p>
      <p>status :{formData.status}</p>
      <p>label :{formData.label}</p>
      <p>material :{formData.material}</p>
      <p> yearBuilt:{formData.yearBuilt}</p>
      <p>rooms :{formData.rooms}</p>
      <p>price :{formData.price}</p>
     


      {/* <button onClick={handleSubmit} className='p-4 bg-slate-900 text-white mt-10'>submit</button> */}
       




    </div>
  );
}

export default PreviewProperty;
