/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Aminities from "./Aminities";

import GoogleMapComonent from "./GoogleMapComonent";
// import axios from "../../../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../NavBar";
import axios from "axios";

function PropertySubmission() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      const admin = JSON.parse(sessionStorage.getItem("admin"));

      // console.log("admin ==> ", admin)
      if (!token || !admin || admin.role !== "admin") {
        navigate("/admin");
      }
    }
    catch (error) {
      navigate("/admin");

    }
  }, [navigate]);



  const [formData, setFormData] = useState({
    propertyTitle: "",
    propertyType: [],
    propertyDescription: "",
    propertyID: "",
    parentProperty: "",
    status: [],
    label: [],
    material: "",
    rooms: "",
    bedsroom: "",
    kitchen: "",
    bhk: "",
    yearBuilt: "",
    totalhomeArea: "",
    builtDimentions: "",
    openArea: "",
    price: "",
    featureImage: null,
    backgroundImage: null,
    offersImage: null,
    brochurepdf: null,
    location: "",
    area: "",
    pinCode: "",
    amenities: []
    , builderName: "",
    builderDescription: "",
    MahaRera: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleChangeImage = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleChangeImage = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };


  const handleAmenityChange = (amenityName, isChecked) => {
    if (isChecked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityName],
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(
          (amenity) => amenity !== amenityName
        ),
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("featureImage", image);

    try {

      // console.log("data ==>", formData)
      console.log("data ==>", formData.featureImage, formData.backgroundImage, formData.offersImage)

      const response = await axios.post("/api/property/propertyDetails", data);
      toast.success("Property submitted successfully out");

      if (response.status == "201") {

        toast.success("Property submitted successfully");
        // setFormData({
        //   propertyTitle: "",
        //   propertyType: [],
        //   propertyDescription: "",
        //   propertyID: "",
        //   parentProperty: "",
        //   status: [],
        //   label: [],
        //   material: "",
        //   rooms: "",
        //   bedsroom: "",
        //   kitchen: "",
        //   bhk: "",
        //   yearBuilt: "",
        //   totalhomeArea: "",
        //   builtDimentions: "",
        //   openArea: "",
        //   price: "",
        //   featureImage: null,
        //   backgroundImage: null,
        //   offersImage: null,
        //   brochurepdf: null,
        //   location: "",
        //   area: "",
        //   pinCode: "",
        //   amenities: []
        //   , builderName: "",
        //   builderDescription: "",
        //   MahaRera: "",
        // })
      }
      // console.log("Property Details created:", response.data);
      // setFormData(""); // Reset form state as needed
      // navigate("/admin/myProperties")
    } catch (error) {
      console.error("Error creating Property Details:", error);
    }
  };

  const handleChangePdf = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (file) {
      const maxSizeInMB = 5; // Maximum file size in MB
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert to bytes

      if (file.size > maxSizeInBytes) {
        alert(`The file size exceeds ${maxSizeInMB} MB. Please upload a smaller file.`);
        event.target.value = ""; // Clear the input
        return;
      }
      else {

        handleChangeImage(event)
      }

      // Proceed with the file upload
      // console.log("File is valid:", file);
      // Add your logic here to handle the file (e.g., upload to the server or set state)
    } else {
      console.log("No file selected");
    }
  };


  const amenities = [
    { name: "Air Conditioning" },
    { name: "Barbequem" },
    { name: "Gym" },
    { name: "Laundry" },
    { name: "Lawn" },
    { name: "Microwave" },
    { name: "Outdoor Shower" },
    { name: "Refrigerator" },
    { name: "Sauna" },
    { name: "Swimming Pool" },
    { name: "TV Cable" },
    { name: "Washer" },
    { name: "WiFi" },
    { name: "Window Coverings" },
  ];

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
    "Fergusson College Road",
    "Hadapsar",
    "Hinjewadi",
    "Kamshet",
    "Katraj",
    "Kondhwa",
    "Kothrud",
    "Koregaon Park",
    "Kharadi",
    "Lake Town Housing Society",
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
    "Yewlewadi Nearby Areas"
  ];




  return (

    <>
      <NavBar />
      <div className="flex justify-center items-center bg-slate-50">
        <ToastContainer />
        <div className=" ">
          <div className="flex justify-between items-center mt-20">
            <h1 className="text-4xl pl-10 font-black text-gray-900 dark:text-black  mt-4">
              Add New Property
            </h1>
            <div className="">
              <button
                className="mr-10 text-xl text-gray-800 font-bold"
                onClick={() => navigate("/admin/myProperties")}
              >
                {" "}
                Show All Properties
              </button>
            </div>
          </div>
          <div className="w-full">
            <form className=" w-full p-8" onSubmit={handleSubmit}>
              <div className=" bg-white p-5 w-full">
                <h1 className="text-xl font-bold text-gray-900 mb-8">
                  Basic Infomation
                </h1>
                <div>
                  <label className="mb-22 pb-7 text-lg  block font-medium  text-gray-900 dark:text-black">
                    Property Title *
                  </label>
                  <input required
                    className="placeholder:italic  bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                    placeholder="Enter the Property Title"
                    type="text"
                    name="propertyTitle"
                    value={formData.propertyTitle}
                    onChange={handleChange}
                  />
                  <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                    Type
                  </label>
                  <select required
                    id="countries"
                    className="bg-gray-50 border border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.propertyType}
                    onChange={handleChange}
                    name="propertyType"
                  >
                    <option value="">Select Property Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Investment">Investment</option>
                    <option value="Town House">Town House</option>
                    <option value="Pent House">Pent House</option>
                    <option value="Ploting">Ploting</option>
                    <option value="Open Space">Open Space</option>
                    <option value="Shop">Shop</option>
                    <option value="Office">Office</option>
                  </select>
                  <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                    Property Description
                  </label>
                  <textarea
                    required
                    className="placeholder:italic h-36 bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    placeholder="Enter the Property Description"
                    name="propertyDescription"
                    value={formData.propertyDescription}
                    onChange={handleChange}
                  />

                  <label className="mb-22 pb-7 text-lg  block font-medium  text-gray-900 dark:text-black">
                    Builder Name *
                  </label>
                  <input required
                    className="placeholder:italic  bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                    placeholder="Enter the Buildername"
                    type="text"
                    name="builderName"
                    value={formData.builderName}
                    onChange={handleChange}
                  />

                  <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                    Builder Description
                  </label>
                  <textarea
                    required
                    className="placeholder:italic h-36 bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    placeholder="Enter the Builder Description"
                    name="builderDescription"
                    value={formData.builderDescription}
                    onChange={handleChange}
                  />

                  <label className="mb-22 pb-7 text-lg  block font-medium  text-gray-900 dark:text-black">
                    MahaRera Number
                  </label>
                  <input required
                    className="placeholder:italic  bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                    placeholder="Enter the Buildername"
                    type="text"
                    name="MahaRera"
                    value={formData.MahaRera}
                    onChange={handleChange}
                  />

                </div>
              </div>
              <div className=" bg-white mt-8 p-2">
                <h1 className="text-xl font-bold text-gray-900 mb-8">
                  Additional
                </h1>
                <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Property ID
                    </label>
                    <input
                      className="placeholder:italic h-[50px] bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                      placeholder="Enter the Property ID"
                      type="text"
                      name="propertyID"
                      value={formData.propertyID}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Parent Property{" "}
                    </label>
                    {/* <select required
                      id="status"
                      className="bg-gray-50   border border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={formData.parentProperty}
                      onChange={handleChange}
                      name="parentProperty"
                    >
                      <option value="">Select Parent Property</option>
                      <option value="Diamond Manor Apartment">Golden Lakh Katraj</option>
                      <option value="Quality House For Sale">Raman Mayara Pune</option>
                    </select> */}
                    <input required
                      className="placeholder:italic h-[50px] bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                      placeholder="Enter the Parent Property"
                      type="text"
                      name="parentProperty"
                      value={formData.parentProperty}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Status{" "}
                    </label>
                    <select
                      required
                      id="status"
                      className="bg-gray-50  border border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={formData.status}
                      onChange={handleChange}
                      name="status"
                    >
                      <option value="">Select Status</option>
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Label
                    </label>
                    <select
                      required
                      id="label"
                      className="bg-gray-50 border h-[50px] border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={formData.label}
                      onChange={handleChange}
                      name="label"
                    >
                      <option value="">Select Label</option>
                      <option value="Hot">Hot and Upcomming </option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Material
                    </label>
                    <select required
                      id="material"
                      className="bg-gray-50  border border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={formData.material}
                      onChange={handleChange}
                      name="material"
                    >
                      <option value="">Select Material</option>
                      <option value="Block">Block</option>
                      <option value="Brick">Brick</option>
                      <option value="Concrete">Concrete</option>

                    </select>
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Total Rooms
                    </label>
                    <input
                      required
                      className="placeholder:italic  bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                      placeholder=""
                      type="number"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Total BedRooms
                    </label>
                    <input
                      required
                      className="placeholder:italic h-[50px]  bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                      placeholder=""
                      type="number"
                      name="bedsroom"
                      value={formData.bedsroom}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Number of Balcony
                    </label>
                    <input
                      required
                      className="placeholder:italic   bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                      placeholder=""
                      type="number"
                      name="kitchen"
                      value={formData.kitchen}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black" >Select the BHK</label>
                    <select required
                      id="bhk"
                      className="bg-gray-50  border border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={formData.bhk}
                      onChange={handleChange}
                      name="bhk"
                    >
                      <option value="" selected>Select the Configuration </option>
                      <option value="Rk">RK</option>
                      <option value="1 BHK">1BHK</option>
                      <option value="2 BHK">2BHK</option>
                      <option value="3 Bhk">3Bhk</option>
                      <option value="4 Bhk">4Bhk</option>
                      <option value="5 Bhk">5Bhk</option>
                      <option value="penthouse">PentHouse</option>
                      <option value="Garage">Garage</option>
                      <option value="others">Open Space</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Year built or Possession Year
                    </label>
                    <input
                      required
                      className="placeholder:italic h-[50px]  bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                      placeholder="Enter the Year built"
                      type="number"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Total Home Area(sqrt)
                    </label>
                    <input
                      required
                      className="placeholder:italic   bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                      placeholder="Enter the Total Home Area"
                      type="text"
                      name="totalhomeArea"
                      value={formData.totalhomeArea}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Built dimensions
                    </label>
                    <input
                      required
                      className="placeholder:italic   bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                      placeholder="Enter the built area"
                      type="text"
                      name="builtDimentions"
                      value={formData.builtDimentions}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-400 p-2">
                      e.g. 20x30, 20x30x40, 20x30x40x50.
                    </p>
                  </div>
                  <div>
                    <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                      Open area(sqrt)
                    </label>
                    <input
                      className="placeholder:italic   bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                      placeholder="Enter the Open Area"
                      type="text"
                      name="openArea"
                      value={formData.openArea}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full ">
                <div className="bg-white mt-8 p-2">
                  <h1 className="text-xl font-bold text-gray-900 mb-4">Price</h1>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block   text-lg font-medium text-gray-900 dark:text-black">
                        Price ( Rs in Lakhs )
                      </label>
                      {/* <select required
                        id="price"
                        className="bg-gray-50  border border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.price}
                        onChange={handleChange}
                        name="price"
                      >
                        <option value="" selected>Select the Price</option>
                        <option value="0-50lac">0-50 lakh</option>
                        <option value="1Cr-2Cr">1 Crore-2 Crore</option>
                        <option value="2Cr-3Crk">2 Crore-3 Crore</option>
                        <option value="4Cr-Above">4 Crore-Above</option>
                      </select> */}

                      <input
                        required
                        className="placeholder:italic   bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                        placeholder="Enter the price in lakhs"
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white mt-8 p-2">
                <h1 className="text-xl font-bold text-gray-900 mb-8">Location</h1>
                {/* <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                  Location
                </label> */}
                {/* <input
                className="h-[50px] bg-white w-full border border-slate-300 rounded-md py-2 pr-3  focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                placeholder=""
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              /> */}
                <select required className="bg-gray-50  border border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.location} onChange={handleChange} name="location">
                  {
                    puneAreas.map((area, index) => {
                      return (
                        <option key={index} value={area}>{area}</option>
                      )
                    })
                  }
                </select>
                <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                  Area
                </label>
                <input
                  required
                  className="h-[50px] bg-white w-full border border-slate-300 rounded-md py-2 pr-3  focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                  placeholder="Enter the Area"
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                />
                <label className="block  mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                  Area Pin-code
                </label>
                <input
                  required
                  className="h-[50px] bg-white w-full border border-slate-300 rounded-md py-2 pr-3  focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                  placeholder="Enter the Pin code"
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                />



                {/* <GoogleMapComonent /> */}
              </div>


              {/* //////////////// */}

              <div>
                <label className="block mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                  Property Image
                </label>
                <input
                  required
                  className="b h-[50px]"
                  id="small_size"
                  type="file"
                  name="featureImage"
                  onChange={handleChangeImage}
                />
              </div>
              <div>
                <label className="block mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                  Property Background Image
                </label>
                <input
                  required
                  className="b h-[50px]"
                  id="small_size"
                  type="file"
                  name="backgroundImage"
                  onChange={handleChangeImage}
                />
              </div>
              <div>
                <label className="block mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                  Offers Banner
                </label>
                <input
                  className="b h-[50px]"
                  id="small_size"
                  type="file"
                  name="offersImage"
                  onChange={handleChangeImage}
                />
              </div>

              <div>
                <label className="block mt-5 mb-5 text-lg font-medium text-gray-900 dark:text-black">
                  Brochure PDF (only pdf, size less than 5 MB)
                </label>
                <input
                  required
                  className="b h-[50px]"
                  id="small_size"
                  type="file"
                  name="brochurepdf"
                  accept=".pdf" // Restrict to PDF files
                  onChange={handleChangePdf}
                />
              </div>


              {/* ////////////// */}
              {/* <div className=" bg-white mt-8 p-2 mx-3">
                <h1 className="text-xl font-bold text-gray-900 mb-8">
                  Aminities
                </h1>
                <div className="bg-white mt-8 p-2 mx-3">
                  <h2 className=" text-xl font-bold text-gray-900 mb-8">
                    Select Amenities:
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity, index) => (
                      <Aminities
                        key={index}
                        amenity={amenity}
                        onAmenityChange={handleAmenityChange}
                      />
                    ))}
                  </div>
                </div>
              </div> */}
              <hr />
              <div className=" mt-8 p-2 ">
                <button className="bg-red-500 text-white p-3 font-semibold rounded-lg border-red-500  hover:bg-white  hover:text-red-500  hover: border border-red-500">
                  {" "}
                  Submit
                </button>{" "}
                {/* /////////////////////////////// */}
                {/* <button className="bg-red-500 text-white p-3 font-semibold rounded-lg border-red-500  hover:bg-white  hover:text-red-500  hover: border border-red-500">
                <Link to={"/admin/dashboard"}> Submit</Link>
              </button> */}
                {/* ///////////////////////////////////////// */}
                <button
                  className="bg-red-500 text-white p-3 font-semibold rounded-lg border-red-500  hover:bg-white  hover:text-red-500  hover: border border-red-500"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  {" "}
                  Cancle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertySubmission;
