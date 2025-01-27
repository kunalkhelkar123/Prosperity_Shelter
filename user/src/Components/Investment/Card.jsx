import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosinstance from "../../../axiosConfig";

const Card = ({ data }) => {
  const [imageUrl, setImageUrl] = useState(""); // State for image URL
  const navigate = useNavigate();

  const {
    propertyTitle,
    propertyType,
    propertyDescription,
    propertyID,
    location,
    status,
    price,
    yearBuilt,
    totalhomeArea,
    featureImage, // The S3 key for the image
  } = data;

  // Fetch the signed URL for the image when the component mounts
  // useEffect(() => {
  //   const fetchImageUrl = async () => {
  //     try {
  //       const response = await axiosinstance.get(`/api/property/getImageUrl`, {
  //         params: { key: featureImage }, // Pass the S3 key to the backend
  //       });
  //       setImageUrl(response.data.signedUrl); // Update state with signed URL
  //     } catch (error) {
  //       console.error("Error fetching image URL:", error);
  //     }
  //   };

  //   if (featureImage) fetchImageUrl();
  // }, [featureImage]);

  const handleViewDetails = () => {
    navigate("/Investmentapp/ViewDetail", { state: { viewobj: data } });
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl w-[320px] h-[550px] p-2 flex flex-col gap-1 justify-center items-center border-gray-500">
      {/* Top Section */}
      <div className="flex relative justify-between w-full px-6">
        <div className="flex flex-col">
          <div className="text-xl font-bold text-black">{propertyTitle}</div>
          <div className="text-md font-semibold text-gray-600">{location}</div>
        </div>
        <div className="w-[70px] ml-auto h-[40px] bg-[#FFF848] text-[#390255] hover:bg-[#390255] hover:text-white px-2 py-1 text-center text-sm font-semibold flex items-center justify-center">
          {status}
        </div>
      </div>

      {/* Image Section */}
      <div className="flex flex-col mt-2">
        {featureImage ? (
          <> <img
            src={featureImage}

            alt="Property "
            className="h-[230px] w-[308px] mt-1 rounded-md"
          />
            {/* <p> {imageUrl}</p> */}

          </>


        ) : (
          <div>Loading image...</div>
        )}
      </div>

      {/* Details Section */}
      <div className="bg-white w-full mt-3 rounded-md shadow-md flex-col justify-between p-3">
        <div className="flex justify-between">
          <span className="font-bold">Type:</span>
          <span className="font-bold">{propertyType}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Price:</span>
          <span className="font-bold">₹ {price}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Year Built:</span>
          <span className="font-bold">{yearBuilt}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Carpet Area:</span>
          <span className="font-bold">{totalhomeArea} Sqft</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex mt-2 justify-between w-full px-3">
        <Link to="/Investmentapp/Enquire" state={{ propertyID, propertyTitle }}>
          <button className="bg-[#FFF848] hover:bg-[#390255] hover:text-white px-2 py-1 rounded-md text-sm font-semibold">
            Enquire Now
          </button>
        </Link>
        <button
          onClick={handleViewDetails}
          className="bg-[#FFF848] hover:bg-[#390255] hover:text-white px-2 py-1 rounded-md text-sm font-semibold"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
