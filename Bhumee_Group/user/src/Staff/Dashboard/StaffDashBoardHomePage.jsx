/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// import axios from "../../../axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashBoardHomePage() {
  const [lead, setLead] = useState(0);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const cardData = [
    {
      id: 1,
      title: "Leads",
      count: lead || 0,
      buttonText: "Show Leads",
      navigateTo: "/staff/leadsPage",
      bgColor: "bg-[#390255]",
      iconBg: "bg-slate-200",
      icon: "groups",
    },
    {
      id: 3,
      title: "Show Visits",
      count: "",
      buttonText: "Show Visits",
      navigateTo: "/staff/upcomingvisits",
      bgColor: "bg-[#390255]",
      iconBg: "bg-blue-300",
      icon: "event",
    },
    {
      id: 4,
      title: "Daily Scrum/Updates",
      count: "",
      buttonText: "Add",
      navigateTo: "/staff/dailyscrum",
      bgColor: "bg-[#390255]",
      iconBg: "bg-blue-300",
      icon: "note",
    },
       {
      id: 5,
      title: "Add new lead",
      count: "",
      buttonText: "Add",
      navigateTo: "/staff/addnewlead",
      bgColor: "bg-[#390255]",
      iconBg: "bg-blue-300",
      icon: "groups",
    },
  ];

  // Check token and redirect appropriately
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (!token || !storedUser || storedUser.role !== "staff") {
      navigate("/staff");
    } else {
      setUser(storedUser); // ✅ Set user after validation
    }
  }, [navigate]);

  // ✅ Second useEffect: Fetch data only when user is set
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // ✅ Ensure user is available before API call

      try {
        console.log("User fetched fullname:", user.name);

        const response = await axios.get(
          `/api/property/getstaffleads/${encodeURIComponent(user.name)}` // ✅ Fixed URL
        );

        console.log("Response:", response.data.data.length);
        setLead(response.data.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]); // ✅ Runs only when `user` is updated



  useEffect(() => {
    if (lead) {
      // console.log("Updated leads data length ==>", lead.length);
    }
  }, [lead]);

  return (
    <div className="bg-purple-100 min-h-screen  w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8">
      <div className="mb-8 mt-[-30px]  sm:mt-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-700">
          Hello, {user.name || "User"}!
        </h1>
      </div>

      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-1 mt-[-10px] flex flex-col sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <div
            key={card.id}
            className={`${card.bgColor} text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between relative`}
          >
            <p className="text-2xl md:text-2xl lg:text-2xl font-bold">
              {card.count}
            </p>
            <p className="text-base md:text-lg lg:text-[13px] mt-2">{card.title}</p>
            <button
              onClick={() => navigate(card.navigateTo)}
              className="text-[#FFF848] mt-3 px-3 md:px-4 py-2 text-sm md:text-base rounded-lg hover:bg-[#FFF848] hover:text-[#390255] transition-all duration-200"
            >
              {card.buttonText}
            </button>
            <div
              className={`${card.iconBg} absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-2 sm:p-3 md:p-4 rounded-full flex justify-center items-center`}
            >
              <span className="material-symbols-outlined h-7 w-7 text-2xl sm:text-2xl md:text-2xl lg:text-2xl text-black">
                {card.icon}
              </span>
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}

export default DashBoardHomePage;
