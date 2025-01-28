/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import axiosinstance from "../../../axiosConfig";
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
        const response = await axiosinstance.get("api/property/getleads-count");
        setLead(response.data);
        // console.log("leads data ==>", response.data);

        const allProperties = await axiosinstance.get("api/property/property-count");
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
        <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex flex-col justify-center items-center pr-[150px]">
            <p className="text-3xl mt-8">{lead.totalLeads}</p>
            <p className="text-base">Leads</p>
            <button
              onClick={() => navigate("/admin/leadsPage")}
              className="text-[#FFF848] p-2 mt-2 ml-8  rounded-[10px] hover:bg-[#FFF848] hover:text-[#390255]"
              style={{ fontSize: "18px", width: "120px" }}
            >
              Show Leads
            </button>
          </div>
          <div className="text-center text-black flex justify-center items-center rounded-full border p-5 h-30 w-30 bg-slate-200 absolute right-6">
            <span className="material-symbols-outlined text-5xl">groups</span>
          </div>
        </div>
        <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center pr-[100px]">
              <p className="text-3xl mt-8">{allProperty.totalProperties}</p>
              <p className="text-base">My Properties</p>
              <button
                onClick={() => navigate("/admin/myProperties")}
                className="text-[#FFF848] p-2  mt-2 ml-4 rounded-[10px] hover:bg-[#FFF848] hover:text-[#390255]"
                style={{ fontSize: "18px", width: "150px" }}
              >
                Show Properties
              </button>
            </div>
            <div className="text-center text-black flex justify-center items-center rounded-full border p-5 h-30 w-30 bg-red-200 absolute right-2">
              <span className="material-symbols-outlined text-5xl">home</span>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 bg-[#390255]  text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center mt-10 pr-[150px]">
              {/* <p className="text-3xl">0</p> */}
              <p className="text-base">Upcoming Visits</p>
              <button
                onClick={() => navigate("/admin/upcomingvisits")}
                className="text-[#FFF848] p-2  mt-6 ml-4 rounded-[10px] hover:bg-[#FFF848] hover:text-[#390255]"
                style={{ fontSize: "18px", width: "150px" }}
              >
                Show visits
              </button>
            </div>
            <div className="text-center text-black flex justify-center items-center rounded-full border p-5 h-30 w-30 bg-blue-300 absolute right-10">
              <span className="material-symbols-outlined text-5xl">visibility</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-100 bg-[#390255]  text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center mt-10 pr-[150px]">
              {/* <p className="text-3xl">0</p> */}
              <p className="text-base">Daily Scrums</p>
              <button
                onClick={() => navigate("/admin/dailyscrums")}
                className="text-[#FFF848] p-2  mt-6 ml-4 rounded-[10px] hover:bg-[#FFF848] hover:text-[#390255]"
                style={{ fontSize: "18px", width: "150px" }}
              >
                Show 
              </button>
            </div>
            <div className="text-center text-black flex justify-center items-center rounded-full border p-5 h-30 w-30 bg-blue-300 absolute right-10">
              <span className="material-symbols-outlined text-5xl">visibility</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex flex-col justify-center items-center pr-[150px]">
            {/* <p className="text-3xl mt-8">{lead.totalLeads}</p> */}
            <p className="text-base ml-14 mt-4">Todays Birthday & Aniversary</p>
            <button
              onClick={() => navigate("/admin/events")}
              className="text-[#FFF848] p-2 mt-2 ml-8  mt-4 rounded-[10px] hover:bg-[#FFF848] hover:text-[#390255]"
              style={{ fontSize: "18px", width: "120px" }}
            >
              Show Events
            </button>
          </div>
          <div className="text-center text-black flex justify-center items-center rounded-full border p-5 h-30 w-30 bg-slate-200 absolute right-6">
            <span className="material-symbols-outlined text-5xl">groups</span>
          </div>
        </div>
        {/* <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center pr-[150px]">
              <p className="text-3xl">0</p>
              <p className="text-base">Favorite</p>
            </div>
            <div className="text-center text-black flex justify-center items-center rounded-full border p-5 h-30 w-30 bg-red-500 absolute right-10">
              <span className="material-symbols-outlined text-5xl">favorite</span>
            </div>
          </div>
        </div> */}
       
      </div>
    </div>
  );
}

export default DashBoardHomePage;
