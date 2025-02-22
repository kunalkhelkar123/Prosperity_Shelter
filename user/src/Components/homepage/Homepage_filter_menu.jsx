/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useCallback, useLayoutEffect, useState, useEffect } from "react";
import City from "../homepage/city1.jpg";
import Homepage_google_reviews from "./Homepage_google_reviews";
import Homepage_latest_blog from "./Homepage_latest_blog";
import Homepage_investmentProperty from "./Homepage_investmentProperty";
import Homepage_staticGrid_Info from "./Homepage_staticGrid_Info";
import DummyTest from "./DummyTest";
import Homepage_Brands from "./Homepage_Brands";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Corespace_footer from "../Corespace_footer/Corespace_footer";
import Corespace_navbar from "../Corespace_Navigation/Corespace_navbar";
import PopupForm from "../PopupForm";
import OffersPopup from "../OffersPopup";
import axios from "axios";

import Homepage_Banks from "./Homepage_Banks";
import Moreaboutus_Home from "./Moreaboutus_Home";
import Homepage_torana from "./Homepage_torana";
// import PopupForm from "./Components/PopupForm";
// import ScratchCardPopup from '../ScratchCardPopup/ScratchCardPopup';

function Homepage_filter_menu() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [selectedoption, setSelectedoption] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedConfiguration, setSelectedConfiguration] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [filterData, setFilterData] = useState("");

  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupFill, setIsPopupFill] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [isShowPopupForm, setShowPopupForm] = useState(false);
  const [isShowOffersPopup, setShowOffersPopup] = useState(false);


  useEffect(() => {
 
    const storedTime = sessionStorage.getItem("isShowPopupFormTimestamp");
    const currentTime = Date.now(); // Current time in milliseconds

    // If the timestamp is found and more than 1 hour has passed, clear the session storage
    if (storedTime && currentTime - parseInt(storedTime) > 1800000) {
      sessionStorage.removeItem("isShowPopupForm");
      sessionStorage.removeItem("isShowOffersPopup");
      sessionStorage.removeItem("isShowPopupFormTimestamp"); // Remove the timestamp too
    }
    const value1 = sessionStorage.getItem("isShowPopupForm")
    const value2 = sessionStorage.getItem("isShowOffersPopup")


    if ((!value1) && (!value2)) {

      setIsPopupOpen(true);
      setIsPopupOpen2(true);

      sessionStorage.setItem("isShowPopupForm", "true")
      sessionStorage.setItem("isShowOffersPopup", "true")
    }


  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
  };



  const closePopup2 = () => {
    setIsPopupOpen2(false);
  };


  const puneAreas = [
    "Select Location",
    "Ambegaon Budruk",
    "Ambegaon Khurd",
    "Aundh",
    "Baner",
    "Balewadi",
    "Bibwewadi",
    "Bhosari",
    "Camp",
    "Chinchwad",
    "Deccan Gymkhana",
    "Dhankawadi",
    "Dhanori",
    "Erandwane",
    // "Fergusson College Road",
    "Hadapsar",
    "Hinjewadi",
    "Kamshet",
    "Katraj",
    "Kondhwa",
    "Kothrud",
    "Koregaon Park",
    "Kharadi",
    // "Lake Town Housing Society",
    "Lohegaon",
    "Magarpatta",
    "Marketyard",
    "Manjri",
    "Mundhwa",
    "Narhe",
    "Parvati",
    "Pashan",
    "Pimpri",
    "Pimple Saudagar",
    "Rajmachi Fort",
    "Shivaji Nagar",
    "Shriram Nagar",
    "Shubhada Society",
    "Sinhagad Road",
    "Swargate",
    "Undri",
    "Vadgaon Sheri",
    "Varkhade Nagar",
    "Viman Nagar",
    "Wakad",
    "Wanowrie",
    "Warje",
    "Yerwada",
    "Yewlewadi",
    "Lonavala",
    "Karjat",
    "Khandala",
    "Pawna Lake",
    "Tungarli Lake",
    "Mulshi",
    "Bhivpuri",
    "Wai",
    "Khopoli",
    // "Yewlewadi Nearby Areas"
  ];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    // Enable search button if all fields are filled
    if (selectedArea || selectedConfiguration || selectedBudget) {
      setIsSearchEnabled(true);
    } else {
      setIsSearchEnabled(false);
    }
  }, [selectedArea, selectedConfiguration, selectedBudget]);

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleConfigurationChange = (e) => {
    setSelectedConfiguration(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setSelectedBudget(e.target.value);
  };
  const handleSelectoptions = (optionSel) => {
    setSelectedoption(optionSel);
    selArr = properties.filter(function (selopt) {
      if (selopt.categories == optionSel) return selopt;
    });
  };

  const handleToggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  // const chooseAreaOption=()=>{
  //   let uniqueArea=[...new set(selArr.location)];
  //   console.log(uniqueArea);
  // }
  const handleSearching = () => {
    const data = {
      area: selectedArea,
      configuration: selectedConfiguration,
      budget2: selectedBudget,
    };

    console.log("data ", data)
    fetch("/api/property/filter_properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from the backend
        // setFilterData(data);

        navigate("/Searchapp", { state: { data } });

        // console.log("data ", data);
        // console.log("filter data console", filterData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  return (
    <>
      <Corespace_navbar />
      <PopupForm isOpen={isPopupOpen} onClose={closePopup} />

      <OffersPopup isOpen={isPopupOpen2} onClose={closePopup2} />
      <div
        style={{ "--image-url": `url(${City})` }}
        className="sm:h-[540px] h-[700px]  w-[100%] bg-cover bg-repeat-round relative bg-[image:var(--image-url)]"
      ></div>

      {/* <img className='relative w-full h-[550px] bg-cover bg-center bg-no-repeat mb-8 md:h-[550px]' src={City} alt="City"></img> */}

      <div className="flex flex-col absolute w-full  justify-center  items-center top-0 md:mt-40   mt-28 sm:mt-36">
        <div className="mb-5 text-center">
          <h1 className=" text-4xl sm:text-6xl font-semibold text-[#fff848] hover:text-white  tracking-wider">
            WELCOME TO <br />    PROSPERITY SHELTERS {" "}
          </h1>
          <h1 className=" text-2xl mb-[-40px]  mt-[20px] sm:mb-[-30px] sm:text-4xl font-semibold text-gray-200 hover:text-white  tracking-wider">
            {/* let’s find the perfect home */}
            LETS'S FIND THE PERFECT HOME FOR YOU
          </h1>
        </div>

        <div className="bg-gray-800  mt-[40px] w-[75%] sm:w-[50%] grid grid-cols-0 sm:grid-cols-3 grid-row-4  bg-opacity-90 grid-flow-row p-3  gap-1 rounded-md  items-center sm:grid-col-2 ">
          <Link to="/AllProperties">
            <button
              onClick={() => handleSelectoptions("Investment")}
              className="focus:outline-none text-black bg-[#fff848] hover:bg-[#390255] hover:text-white font-medium rounded-lg text-sm w-full px-5 py-2.5  mb-2"
            >
              Investment
            </button>
          </Link>
          <Link to="/Commertial-Properties">
            <button
              onClick={() => handleSelectoptions("Commercial")}
              className="focus:outline-none text-black bg-[#fff848] hover:bg-[#390255] hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 w-full mb-2"
            >
              Commercial
            </button>
          </Link>
          {/* <Link to="/Residentails-Properties">
            <button
              onClick={() => handleSelectoptions('Residential')}
              className="focus:outline-none text-black bg-[#fff848] hover:bg-[#390255] hover:text-white font-medium rounded-lg text-sm w-full px-5 py-2.5  mb-2"
            >
              Residential
            </button>
          </Link> */}
          {/* <Link to="/">
            <button className="focus:outline-none text-black bg-[#fff848] hover:bg-[#390255] hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 w-full mb-2">Managed Offices</button>
          </Link> */}
          <button
            onClick={handleToggleLoginForm}
            className="focus:outline-none text-black bg-[#fff848] hover:bg-[#390255] hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 w-full mb-2"
          >
            Post Your Property
          </button>
          {showLoginForm && (
            <div className="fixed top-0 left-0 z-50 w-[455px] sm:w-full left-[-26px] h-full bg-black bg-opacity-70 flex justify-center items-center">
              <LoginForm onClose={handleToggleLoginForm} />
            </div>
          )}

          <div className="flex flex-row sm:col-span-3 flex-wrap justify-start gap-1 bg-slate-300 p-2 rounded-md  w-full ">
            <select
              id="area"
              value={selectedArea}
              onChange={handleAreaChange}
              className="bg-gray-50 border w-full sm:w-fit border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2"
            >
              <option value="" disabled hidden>
                Choose an Area
              </option>
              {puneAreas.map((area) => (
                <option value={area}>{area}</option>
              ))}
            </select>

            <select
              id="configuration"
              value={selectedConfiguration}
              onChange={handleConfigurationChange}
              className="bg-gray-50 border w-full sm:w-fit border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2"
            >
              <option value="" disabled hidden>
                Choose a Configuration
              </option>
              <option value="RK">RK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
              <option value="5 BHK">5 BHK</option>
              <option value="OFFICE">OFFICE</option>
              <option value="PENTHOUSE">PENTHOUSE</option>
              <option value="OPENCSPACE">OPEN SPACE</option>
              <option value="GARAGE">GARAGE</option>
            </select>

            <select
              id="budget"
              value={selectedBudget}
              onChange={handleBudgetChange}
              className="bg-gray-50 border w-full sm:w-fit border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2"
            >
              <option value="" disabled hidden>
                Choose a Budget
              </option>
              <option value="20">below 20L</option>
              <option value="2050  ">20L - 50L </option>
              <option value="501">50 - 1Cr</option>
              <option value="115 ">1Cr - 1.5Cr</option>
              <option value="152">1.5Cr - 2Cr</option>
              <option value="225">2Cr - 2.5Cr</option>
              <option value="253">2.5Cr - 3Cr</option>
              <option value="335">3Cr - 3.5Cr</option>
              <option value="354">3.5Cr - 4Cr</option>
              <option value="45" >4Cr - 5Cr</option>
              <option value="5">Above 5Cr</option>
            </select>
            {/* <Link to={{ pathname: "/Searchapp", filterData }}> */}
            <button
              className="focus:outline-none ml-[40px] sm:ml-2 items-center justify-center sm:w-20 w-[180px] text-black bg-[#fff848] hover:bg-[#390255] hover:text-white font-medium rounded-lg text-sm px-5 py-2.5  mb-2"
              onClick={handleSearching}
              disabled={!isSearchEnabled}
            >
              Search
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <DummyTest />
      {/* <Homepage_staticGrid_Info /> */}
      {/* <Homepage_investmentProperty /> */}
      <div>
        <Moreaboutus_Home />
      </div>
      <div>
        <Homepage_torana />
      </div>
      <div className="bg-gray-100 pb-[40px]  min-h-screen">
        <div className="w-full  ">
          <div className=" w-full ">
            <div className="   w-full rounded-lg bg-gray-100 flex flex-col items-center justify-center gap-[130px]">
              <h2 className="text-4xl font-bold text-center mt-[80px] mb-[-70px] text-gray-800 ">
                Our Partners (Builder)
              </h2>
              <Homepage_Brands />
              <h2 className="text-4xl font-bold mt-[-80px]  text-center mb-[-70px] text-gray-800 mb-8">
                Partnered Banks
              </h2>
              <Homepage_Banks />
            </div>
          </div>
        </div>
      </div>

      <Corespace_footer />
    </>
  );
}

export default Homepage_filter_menu;
