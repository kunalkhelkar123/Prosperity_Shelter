/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// import axios from "../../../axiosConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashBoardHomePage() {
  const [lead, setLead] = useState([]);
  const [allProperty, setAllProperty] = useState(0);
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  // Check token and redirect appropriately
  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      const admin = JSON.parse(sessionStorage.getItem("admin"));
      setUser(admin)

      // console.log("admin ==> ", admin)
      if (!token || !admin || admin.role !== "admin") {
        navigate("/admin");
      }
    }
    catch (error) {
      navigate("/admin");

    }
  }, [navigate]);


  //   useEffect(() => {
  //     const token = sessionStorage.getItem("token");
  //     const encryptedAdmin = sessionStorage.getItem("admin");

  //     // If there's no token or encryptedAdmin data, or if the token is invalid, redirect to login
  //     if (!token || !encryptedAdmin) {
  //         navigate("/admin");
  //         return;
  //     }

  //     try {    
  //         // Decrypt the admin data if encrypted
  //         const bytes = CryptoJS.AES.decrypt(encryptedAdmin, "kunaljdsdbfhdsbf765havsd78@sdfty");
  //         const decryptedAdmin = bytes.toString(CryptoJS.enc.Utf8);

  //         // If decryption fails or the decrypted data is empty, redirect to login
  //         if (!decryptedAdmin) {
  //             navigate("/admin");
  //             return;
  //         }

  //         const admin = JSON.parse(decryptedAdmin);

  //         // Check if the admin role is valid
  //         if (admin && admin.role !== "admin") {
  //             navigate("/admin");
  //         }

  //         console.log("admin ==> ", admin);
  //     } catch (error) {
  //         // Handle any errors, such as invalid token format or decryption failure
  //         console.error("Error decoding token or admin data:", error);
  //         navigate("/admin");
  //     }
  // }, [navigate]);


  // Fetch data when token is verified




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/property/getleads-count");
        setLead(response.data);
        // console.log("leads data ==>", response.data);

        const allProperties = await axios.get("/api/property/property-count");
        setAllProperty(allProperties.data);
        // console.log(allProperties.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (lead) {
      // console.log("Updated leads data length ==>", lead.length);
    }
  }, [lead]);

  return (
    <div className="bg-purple-100  w-full px-4 md:px-8 ">
      <div className="mb-5">
        <h1 className="p-5 text-3xl text-slate-700">Hello {user.name} </h1>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">

        {/* Show leads  */}
        <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex flex-col justify-center items-center pr-[150px]">
            <p className="text-[29px] ml-[60px]  ">{lead.totalLeads}</p>
            <p className="sm:text-base text-[13px] ml-16">Leads</p>
            <button
              onClick={() => navigate("/admin/LeadDashboard")}
              className="text-[#FFF848] p-[-6px]  mt-2 ml-16 text-[13px]  rounded-[10px] bg-[#FFF848] text-black hover:bg-[#FFF848] hover:text-[#390255]"
              style={{ width: "90px" }}
            >
              Show Leads
            </button>
          </div>
          <div className="text-center text-black flex justify-center items-center rounded-full border p-2 h-30 w-30 bg-slate-200 absolute right-6">
            <span className="material-symbols-outlined text-5xl">groups</span>
          </div>
        </div>

        {/* Add Leads */}
        <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex flex-col justify-center items-center pr-[150px]">
            {/* <p className="text-3xl mt-8">{lead.totalLeads}</p> */}
            <p className="sm:text-base text-[13px] ml-14">Add Leads</p>
            <button
              onClick={() => navigate("/admin/addnewlead")}
              className="text-[#FFF848] p-[-6px] mt-2 ml-[60px]  mt-4 rounded-[10px] bg-[#FFF848] text-black hover:bg-[#FFF848] hover:text-[#390255]"
              style={{ fontSize: "13px", width: "90px" }}
            >
              Add
            </button>
          </div>
          <div className="text-center text-black flex justify-center items-center rounded-full border p-2 h-30 w-30 bg-slate-200 absolute right-6">
            <span className="material-symbols-outlined text-5xl">group</span>
          </div>
        </div>


        {/* My properties */}
        {/* <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center pr-[100px]">
              <p className="text-[29px] ml-[0px] ">{allProperty.totalProperties}</p>
              <p className="sm:text-base text-[13px]">My Properties</p>
              <button
                onClick={() => navigate("/admin/AllProperties")}
                className="text-[#FFF848]  p-[-6px]  mt-2 ml-4 rounded-[10px] text-[13px] bg-[#FFF848] text-black hover:bg-[#FFF848] hover:text-[#390255]"
                style={{ width: "110px" }}
              >
                Show Properties
              </button>
            </div>
            <div className="text-center text-black flex justify-center items-center rounded-full border p-2 h-30 w-30 bg-red-200 absolute right-6">
              <span className="material-symbols-outlined text-5xl">home</span>
            </div>
          </div>
        </div> */}

        {/* Upcomming visites */}
        <div className="border border-gray-100 bg-[#390255]  text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center  pr-[150px]">
              {/* <p className="text-3xl">0</p> */}
              <p className=" sm:text-base text-[13px] ml-16 sm:ml-0">Show Visits</p>
              <button
                onClick={() => navigate("/admin/upcomingvisits")}
                className="text-[#FFF848] p-[-6px]  mt-2 ml-16 sm:ml-0 rounded-[10px] text-[13px] bg-[#FFF848] text-black hover:bg-[#FFF848] hover:text-[#390255]"
                style={{ width: "100px" }}
              >
                Show visits
              </button>
            </div>
            <div className="text-center text-black flex justify-center items-center rounded-full border p-2 h-30 w-30 bg-blue-300 absolute right-6">
              <span className="material-symbols-outlined text-5xl">event</span>
            </div>
          </div>
        </div>


        {/* Daily scrums */}
        <div className="border border-gray-100 bg-[#390255]  text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center  pr-[150px]">
              {/* <p className="text-3xl">0</p> */}
              <p className="sm:text-base text-[13px] sm:ml-[70px] ml-12 sm:ml-0">Daily Scrums</p>
              <button
                onClick={() => navigate("/admin/DailyScrum")}
                className="text-[#FFF848] p-[-6px]  mt-2 ml-16 rounded-[10px] bg-[#FFF848] text-black hover:bg-[#FFF848] hover:text-[#390255]"
                style={{ fontSize: "13px", width: "90px" }}
              >
                Show
              </button>
            </div>
            <div className="text-center text-black flex justify-center items-center rounded-full border p-2 h-30 w-30 bg-blue-300 absolute right-6">
              <span className="material-symbols-outlined text-5xl">note</span>
            </div>
          </div>
        </div>


        {/* Birthday and aniversarry */}
        <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex flex-col justify-center items-center pr-[150px]">
            {/* <p className="text-3xl mt-8">{lead.totalLeads}</p> */}
            <p className="sm:text-base text-[13px] ml-14">Todays Birthday & Aniversary</p>
            <button
              onClick={() => navigate("/admin/events")}
              className="text-[#FFF848] p-[-6px] mt-2 ml-[60px]  mt-4 rounded-[10px] bg-[#FFF848] text-black hover:bg-[#FFF848] hover:text-[#390255]"
              style={{ fontSize: "13px", width: "90px" }}
            >
              Show Events
            </button>
          </div>
          <div className="text-center text-black flex justify-center items-center rounded-full border p-2 h-30 w-30 bg-slate-200 absolute right-6">
            <span className="material-symbols-outlined text-5xl">event</span>
          </div>
        </div>






      </div>
    </div>
  );
}

export default DashBoardHomePage;
