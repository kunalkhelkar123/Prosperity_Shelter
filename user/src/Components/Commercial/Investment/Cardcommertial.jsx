/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const Cardcommertial = ({data}) => {
  let [viewobj, setViewobj] = useState({});
  const navigate = useNavigate();

  const {
    propertyTitle,
    propertyType,
    propertyDescription,
    propertyID,
    parentProperty,
    status,
    label,
    material,
    rooms,
    bedsroom,
    kitchen,
    bhk,
    yearBuilt,
    totalhomeArea,
    builtDimentions,
    openArea,
    price,
    featureImage,
    location,
    area,
    pinCode,
    amenities,
  } = data;

  const submithandle = () => {
    setViewobj(data);
    navigate('/Commertialapp/ViewDetail', {state: {viewobj: data}});
  };

  return (
    <div className="bg-white rounded-xl  shadow-2xl w-[320px] h-[550px] p-2 flex flex-col gap-1  justify-center items-center border-gray-500">
      {/* Top Section */}
      <div className="flex relative justify-between w-[100%] px-6">
        <div className="flex flex-col ">
          <div className="text-xl font-bold text-black">{propertyTitle.split(' ').slice(0, 3).join(' ')}</div>
          <div className="text-md font-semibold text-gray-600">{location}</div>
        </div>

        <div className="w-[70px]  ml-auto h-[40px]  border-[#FFF848] bg-[#FFF848] text-[#390255]  hover:border-[#390255] hover:text-red-400 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal   flex justify-center items-center ">
          {status}
        </div>
      </div>

      {/* Image Section */}
      <div className="flex flex-col mt-2">
        <img src={`http://localhost:4000/api/uploads/${featureImage}`} alt="Image 2" className="h-[230px] w-[308px] mt-1" />
      </div>

      {/* Details Section */}
      <div className="bg-white w-full  mt-3 rounded-md shadow-md flex-col justify-between p-3">
        <div className=" flex flex-row justify-between w-full">
          <div className="font-bold w-[40%]">Type:</div>
          <div className="font-bold w-[60%] text-end">{propertyType}</div>
          {/* <div className="font-bold w-[60%] ">{beds}% ROI</div> */}
        </div>
        <div className=" flex flex-row justify-between w-full">
          <span className="font-bold w-[40%]">Quoted Price:</span>
          <span className="font-bold w-[60%] text-end">₹ {price}</span>
        </div>
        {/* <div className=" flex flex-row justify-between w-full">
          <span className="font-bold w-[40%]">Status</span>
          <span className="font-bold w-[60%] text-end">{status} </span>
        </div> */}
        <div className=" flex flex-row justify-between w-full">
          <span className="font-bold w-[40%]">Year Of Build:</span>
          <span className="font-bold w-[60%] text-end">{yearBuilt} </span>
        </div>

        <div className=" flex flex-row justify-between w-full">
          <span className="font-bold w-[40%] ">Carpet Area:</span>
          <span className="font-bold w-[60%] text-end">{totalhomeArea}Sqft</span>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex mt-2 flex-row justify-between w-[100%] px-3">
      <Link to="/Investmentapp/Enquire" state={{ propertyID, propertyTitle }}>
  <button className="border-[#FFF848] bg-[#FFF848] hover:bg-[#390255] hover:border-[#390255] hover:text-white px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-[#390255] h-[45px] w-[135px] rounded-md mb-2">
    Enquire Now
  </button>
</Link>

        <button
          onClick={submithandle}
          className="border-[#FFF848] bg-[#FFF848] hover:bg-[#390255] hover:border-[#390255] hover:text-white px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-[#390255] h-[45px] w-[135px] rounded-md ml-auto"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Cardcommertial;
