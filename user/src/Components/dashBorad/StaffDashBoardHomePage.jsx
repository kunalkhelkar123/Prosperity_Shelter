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

    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user)
    // Check if the token exists and user has the role 'staff'
    if (!token || !user || user.role !== "staff") {
      navigate("/staff");
    }

  }, [navigate]);

  // Fetch data when token is verified
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosinstance.get("/api/property/getleads-count");
        setLead(response.data);
        // console.log("leads data ==>", response.data);

        const allProperties = await axiosinstance.get("/api/property/property-count");
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
        <h1 className="p-5 text-3xl text-slate-700">Hello {user.name}</h1>
      </div>

      {/*   adjust the columns on below div                              here  */}
      <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex flex-col justify-center items-center pr-[150px]">
            <p className="text-3xl mt-8">{lead.totalLeads}</p>
            <p className="text-base">Leads</p>
            <button
              onClick={() => navigate("/staff/leadsPage")}
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
                onClick={() => navigate("/staff/myProperties")}
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
        {/* <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center pr-[150px]">
              <p className="text-3xl">0</p>
              <p className="text-base">Bookings</p>
            </div>
            <div className="text-center text-black flex justify-center items-center rounded-full border p-5 h-30 w-30 bg-red-500 absolute right-10">
              <span className="material-symbols-outlined text-5xl">favorite</span>
            </div>
          </div>
        </div> */}
        <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center pr-[150px]">
              {/* <p className="text-3xl">0</p> */}
              <p className="text-base">Upcomming Visites</p>
              <button
                onClick={() => navigate("/staff/upcomingvisits")}
                className="text-[#FFF848] p-2  mt-2 ml-4 rounded-[10px] hover:bg-[#FFF848] hover:text-[#390255]"
                style={{ fontSize: "18px", width: "150px" }}
              >
                Show Visits
              </button>
            </div>
            <div className="text-center text-black flex justify-center items-center rounded-full border p-5 h-30 w-30 bg-blue-300 absolute right-10">
              <span className="material-symbols-outlined text-5xl">visibility</span>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 bg-[#390255] text-white p-2 h-44 flex justify-center items-center relative">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center pr-[150px]">
              {/* <p className="text-3xl">0</p> */}
              <p className="text-base">Daily Scrum/Updates</p>
              <button
                onClick={() => navigate("/staff/dailyscrum")}
                className="text-[#FFF848] p-2  mt-6 ml-4 rounded-[10px] hover:bg-[#FFF848] hover:text-[#390255]"
                style={{ fontSize: "18px", width: "150px" }}
              >
                Add 
              </button>
            </div>
            <div className="text-center text-black flex justify-center items-center rounded-full border p-5 h-30 w-30 bg-blue-300 absolute right-10">
              <span className="material-symbols-outlined text-5xl">visibility</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardHomePage;
