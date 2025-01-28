/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useLayoutEffect } from 'react';
import Residential_vert_section from '../Verticle Residential_component/Residential_vert_section';
import ViewPropertyMain from '../ViewMidFolder/ViewPropertyMain';
import Residentialpropertiesheader from './Residentialpropertiesheader';
import Residential_location from './Residential_location';
import gps_resi from '../viewproperty/residentimages/gps_resi.png';
import Money_loan_calculator from '../Verticle Residential_component/Money_loan_calculator/Money_loan_calculator';
import Mortgage_property from '../Verticle Residential_component/Residential_mortgage/Mortgage_property';
import Property_DOCS from '../Verticle Residential_component/Property_Docs/Property_DOCS';
import Contact_property from '../Verticle Residential_component/Contact Property/Contact_property';
import dummyImage from '../ViewMidFolder/assets/Buildings.jpg';
import DescriptiveCardContainer from '../ViewMidFolder/DescriptiveCardContainer';
import ProjectConfigurationDown from '../ViewMidFolder/ProjectConfigurationDown';
import PopupForm from '../PopupForm';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Corespace_navbar from '../Corespace_Navigation/Corespace_navbar';
import ViewAccordion from '../ViewMidFolder/ViewAccordion';
import Corespace_footer from '../Corespace_footer/Corespace_footer';
import Banner from "./Banner.png";



// import Corespace_footer from '../../assets/banner.WEBP';


function MainviewProperty(props) {
  const location2 = useLocation();
  const { viewobj } = location2.state || {};
  console.log('update', viewobj);

  const {
    propertyTitle,
    offersImage,
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
    backgroundImage,
    brochurepdf,
    location,
    area,
    pinCode,
    amenities,
    builderName, builderDescription, MahaRera
  } = viewobj;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log("amenities ", amenities)
  console.log("brochurepdf ", brochurepdf)

  // contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    configuration: '',
    budget: '',
  });

  const [errors, setErrors] = useState({
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePhoneNumber = (phone) => {
    return true; // For now, bypass phone validation
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate phone number before submitting
    if (!validatePhoneNumber(formData.phone)) {
      alert('Please enter a valid phone number.');
      return;
    }

    const serviceID = 'your_service_id';
    const templateID = 'your_template_id';
    const userID = 'your_user_id'; // Use your Public Key here

    emailjs.send(serviceID, templateID, formData, userID).then(
      (result) => {
        console.log('Email sent successfully:', result.text);
        alert('Message sent successfully!');
      },
      (error) => {
        console.error('Error sending email:', error.text);
        alert('An error occurred, please try again.');
      },
    );

    // Clear the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      area: '',
      configuration: '',
      budget: '',
    });
  };

  const puneAreas = [
    'Shivaji Nagar',
    'Kothrud',
    'Baner',
    'Aundh',
    'Viman Nagar',
    'Koregaon Park',
    'Hadapsar',
    'Pimpri',
    'Chinchwad',
    'Wakad',
    'Kalyani Nagar',
    'Hinjewadi',
    'Bavdhan',
    'Pashan',
    'Kharadi',
    'Magarpatta',
    'Camp',
    'Deccan',
    'Pune University',
    'Yerwada',
    'Swargate',
    'Karve Nagar',
    'Dhanori',
    'Wanowrie',
    'Nigdi',
    'Tathawade',
    'Warje',
    'Lohegaon',
    'Sahakar Nagar',
    'Balewadi',
  ];
  // contact form

  let picture_Array = [2, 2, 3, 4, 4, 5, 6, 7];
  let icons_Array = [
    { icon: 'fa-solid fa-house', heading: 'Type', Description: propertyType },
    {
      icon: 'fa-solid fa-users',
      heading: 'MahaRera',
      Description: `${MahaRera}`,
    },
    { icon: 'fa-solid fa-bed', heading: 'Type', Description: bhk },
    {
      icon: 'fa-solid fa-key',
      heading: 'Year of build',
      Description: `${yearBuilt} `,
    },
  ];
  // let arr_content= [{heading:"Type",Description:"Residential"},{heading:"Type",Description:"Residential"},{heading:"Type",Description:"Residential"},{heading:"Type",Description:"Residential"}]
  let project = {
    titleName: 'About Project',

    titleValue: propertyTitle,
    titleDesc: propertyDescription,
  };

  let builder = {
    titleName: 'About Builder',
    titleValue: 'Welworth',
    titleDesc:
      'Welworth Realty was founded in 1987, and since then, it has completed 20 projects on time, with many more on the way in the coming years. Welworth has always set higher standards in terms of quality, durability, and perception.',
  };

  return (
    <><Corespace_navbar />
      <div className="flex flex-col justify-center ">
        <div className="w-full">
          {/* <div   className="  bg-gradient-to-b h-36 pl-4 sm:h-72"> */}
          {/* <div
            className="bg-gradient-to-b h-36 pl-4 sm:h-72 bg-cover bg-center" */}
          {/* // style={{ backgroundImage: `url(http://localhost:4000api/uploads/${backgroundImage})` }}> */}
          <div
            className="relative bg-gradient-to-b h-36 pl-4 sm:h-72 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            {/* Fade overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="text-slate-100 pt-20 pl-4 sm:pl-44 text-x sm:text-5xl font-bold subpixel-antialiased">
                {propertyTitle}
              </div>
              <div className="flex flex-row sm:flex-row mt-5 pl-4 sm:pl-44 text-red-600">
                <img
                  src={gps_resi}
                  className="h-4 bg-white rounded sm:h-6 sm:bg-white sm:rounded"
                  alt="GPS Icon"
                />
                <span className="ml-2 font-medium text-s sm:ml-4 text-slate-100">{area}</span>
              </div>
            </div>
          </div>

        </div>
        <div>
          <div className="flex flex-col sm:flex-row justify-center gap-[30px] sm:gap-[10px] md:gap-[50px] xl:gap-[20px]">
            {/* <div className='flex flex-col justify-center md:flex-row md:justify-between xl:w-[95%]'> */}
            <div className="w-[100%] ml-5 px-[20px] md:w-[60%] md:px-[0px] md:py-[20px] xl:w-[70%] ">
              <div className=" bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 lg:py-5 flex flex-wrap justify-center gap-6 p-6 sm:justify-around mt-5 ">
                {icons_Array.map((ele) => {
                  return (
                    <div className="px-5 flex flex-col justify-center items-center gap-[2px] w-[190px] h-[115px]">
                      <p className="text-[30px]">
                        <i className={ele.icon}></i>
                      </p>
                      <h2 className="font-5 text-blue-900 mt-[10px]">{ele.heading}</h2>
                      <p className="text-green-800">{ele.Description}</p>
                    </div>
                  );
                })}
              </div>
              <DescriptiveCardContainer title={project.titleName} titleValue={project.titleValue} titleDesc={project.titleDesc} />
              <DescriptiveCardContainer
                title={builder.titleName}
                titleValue={builderName}
                titleDesc={builderDescription}
              />
              {offersImage && (
                <div className="mt-5">
                  <h5 className="text-2xl font-bold">Offers</h5>
                  <img
                    src={offersImage}
                    alt="Offers"
                    className="mt-3"
                  />
                </div>
              )}


              <div className="block bg-white border border-gray-200 rounded-lg shadow w-full lg:py-5 mt-5">
                <div className="flex flex-wrap flex-col justify-center gap-6 p-6 sm:justify-around mt-5 ">
                  <h5 className=" mt-[-20px] text-start text-2xl font-bold tracking-tight  ">Project Configuration</h5>
                  <div className="flex flex-wrap flex-col justify-center gap-6 p-6 md:flex-row md:justify-evenly md:items-center mt-[-20px]">
                    <img src={featureImage} alt="property-img" srcset="" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-bold">Project Name: </span>{propertyTitle}
                        <br /><span className="font-bold">Project Type : </span>{propertyType}
                        <br /><span className="font-bold">Parent Property : </span>{parentProperty}
                        <br /><span className="font-bold">Property Status : </span>{status}
                        <br /><span className="font-bold">Configuration : </span>{bhk}
                        <br /><span className="font-bold">Project Completion Year : </span>{yearBuilt}
                        <br /><span className="font-bold">Total Carpet area : </span>{totalhomeArea}
                        <br /><span className="font-bold">Material use : </span>{material}
                        <br /><span className="font-bold">Total rooms : </span>{rooms}
                        <br /><span className="font-bold">Total Bedrooms : </span>{bedsroom}
                      </div>

                      <div>
                        <br /><span className="font-bold">Total Balcony : </span>{kitchen}
                        <br /><span className="font-bold">Location : </span>{area}
                        <br /><span className="font-bold">Price : </span>{price}
                        <br /><span className="font-bold">MahaRa : </span>{/* Insert MahaRa value here */}
                        <br /><span className="font-bold">Dimensions : </span>{builtDimentions}
                      </div>
                    </div>

                    <div>
                      <span className="bg-yellow-200 p-[10px] rounded-xl font-medium">Total Carpet Area = {totalhomeArea} / sq. ft</span>
                    </div>
                  </div>
                </div>
                <ViewAccordion brochurepdf={brochurepdf} />
              </div>
              {/* <ProjectConfigurationDown/> */}
              {/* <ViewPropertyMain /> */}
            </div>
            <div className="w-[100%] bg-[#F5F7FB] md:w-[40%] xl:w-[30%]">
              <div className="flex mt-5  flex-col gap-[35px]">
                {/* <Mortgage_property /> */}
                <Money_loan_calculator />

                {/* <Property_DOCS /> */}

                <div className="container mx-auto p-8">
                  <h2 className="text-[24px] font-bold">Contact Us</h2>
                  <form onSubmit={handleSubmit} className="flex  sm:gap-9 h-auto flex-col p-6">
                    <div>
                      <label className="block mb-2">
                        Name:
                        <input type="text" name="name" value={formData.name} placeholder="Enter Your Name" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" required />
                      </label>
                      <label className="block mb-2">
                        Email:
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          placeholder="Enter Email-Address"
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded mt-1"
                          required
                        />
                      </label>
                      <label className="block mb-2">
                        Phone:
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter Your Number"
                          className="w-full p-2 border border-gray-300 rounded mt-1"
                          required
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                      </label>
                    </div>
                    <div>
                      <label className="block mb-2">
                        Area:
                        <select name="area" value={formData.area} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" required>
                          <option value="">Select Area</option>
                          {puneAreas.map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block mb-2">
                        Configuration:
                        <select name="configuration" value={formData.configuration} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" required>
                          <option value="DEFAULT">Choose a config.</option>
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
                      </label>
                      <label className="block mb-2">
                        Budget:
                        <select name="budget" value={formData.budget} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" required>
                          <option value="DEFAULT">Choose a Budget</option>
                          <option value="DE">below 50L</option>
                          <option value="US">50L - 99L </option>
                          <option value="CA">1Cr - 1.99Cr</option>
                          <option value="FR">2Cr - 2.99Cr</option>
                          <option value="DE">3Cr - 3.99Cr</option>
                          <option value="DE">4Cr - 6Cr</option>
                          <option value="DE">above 6Cr</option>
                        </select>
                      </label>
                      <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {/* <Contact_property /> */}
              </div>
              {/* <Residential_vert_section /> */}
            </div>
          </div>
        </div>
      </div>
      <Corespace_footer />
    </>
    // </div>

  );
}

export default MainviewProperty;
