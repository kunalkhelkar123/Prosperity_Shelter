/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import building from '../homepage/building.jpg';
import Lpin from '../homepage/photo/pin.png';
import buildlogo from '../homepage/photo/building.png';
import gares from '../homepage/photo/settingsgears.png';
import {Link, Navigate} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function DummyTestCarousel(props) {
  const navigate = useNavigate();
  const handleSearching = () => {
    fetch(`/api/property/builder_name/${props.ele.builderName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data in builder api ', data);
        navigate('/ViewAllapp', {state: {data}});
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex flex-col justify-evenly gap-3 sm:mr-3  leading-7 items-start max-w-[290px] p-3 bg-white border border-gray-200 rounded-lg shadow md:ml">
      <div className="relative">
        <img className="w-[100%] relative" src={building} alt="" srcSet="" />
        {/* <img className="w-[100%] relative" src={`http://localhost:4000/api/uploads/${props.ele.featureImage}`} alt="" srcSet="" /> */}
        {/* <img className="relative" src={`http://localhost:4000/api/uploads/${props.ele.featureImage}`} alt="" width="275" height="183" /> */}
        <span className="absolute top-[12px] bg-red-500 right-[1px] p-[6px] text-white">{props.ele.status}</span>
      </div>

      <h5 className="text-xl font-medium">{props.ele.siteName}</h5>
      <div className="flex gap-6 ">
        <span>
          <img className="w-5" src={buildlogo} alt="phone-img" />
        </span>
        <p>{props.ele.builderName}</p>
      </div>
      <div className="flex gap-6 ">
        <span>
          <img className="w-5" src={Lpin} alt="phone-img" />
        </span>
        <p>{props.ele.location}</p>
      </div>
      <div className="flex gap-6 ">
        <span>
          <img className="w-5 " src={gares} alt="phone-img" />
        </span>
        <p>{props.ele.bhk}</p>
      </div>

      <div className="flex w-[100%]  justify-between items-center">
        <h6> Budget : {props.ele.price}</h6>

        {/* <Link to="/ViewAllapp"> */}
        <button className="border-[#FFF848] bg-[#FFF848] hover:bg-[#390255]  hover:border-[#390255] hover:text-white p-1 rounded-lg" onClick={handleSearching}>
          view all
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default DummyTestCarousel;
