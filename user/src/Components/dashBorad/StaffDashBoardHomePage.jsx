/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import axiosinstance from "../../../axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashBoardHomePage() {
  const [lead, setLead] = useState(0);
  const [allProperty, setAllProperty] = useState(0);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const cardData = [
    {
      id: 1,
      title: "Leads",
      count: lead.totalLeads || 0,
      buttonText: "Show Leads",
      navigateTo: "/staff/leadsPage",
      bgColor: "bg-[#390255]",
      iconBg: "bg-slate-200",
      icon: "groups",
    },
    {
      id: 2,
      title: "My Properties",
      count: allProperty.totalProperties || 0,
      buttonText: "Show Properties",
      navigateTo: "/staff/myProperties",
      bgColor: "bg-[#390255]",
      iconBg: "bg-red-200",
      icon: "home",
    },
    {
      id: 3,
      title: "Upcoming Visits",
      count: "",
      buttonText: "Show Visits",
      navigateTo: "/staff/upcomingvisits",
      bgColor: "bg-[#390255]",
      iconBg: "bg-blue-300",
      icon: "visibility",
    },
    {
      id: 4,
      title: "Daily Scrum/Updates",
      count: "",
      buttonText: "Add",
      navigateTo: "/staff/dailyscrum",
      bgColor: "bg-[#390255]",
      iconBg: "bg-blue-300",
      icon: "visibility",
    },
  ];

  // Check token and redirect appropriately
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);

    // Check if the token exists and user has the role 'staff'
    if (!token || !user || user.role !== "staff") {
      navigate("/staff");
    }
  }, [navigate]);

  // Fetch data when token is verified
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosinstance.get(
          "/api/property/getleads-count"
        );
        setLead(response.data);

        const allProperties = await axiosinstance.get(
          "/api/property/property-count"
        );
        setAllProperty(allProperties.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-purple-100 min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-700">
          Hello, {user.name || "User"}!
        </h1>
      </div>

      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-1 flex flex-col sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <div
            key={card.id}
            className={`${card.bgColor} text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between relative`}
          >
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {card.count}
            </p>
            <p className="text-base md:text-lg lg:text-xl mt-2">{card.title}</p>
            <button
              onClick={() => navigate(card.navigateTo)}
              className="text-[#FFF848] mt-4 px-3 md:px-4 py-2 text-sm md:text-base rounded-lg hover:bg-[#FFF848] hover:text-[#390255] transition-all duration-200"
            >
              {card.buttonText}
            </button>
            <div
              className={`${card.iconBg} absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-2 sm:p-3 md:p-4 rounded-full flex justify-center items-center`}
            >
              <span className="material-symbols-outlined text-2xl sm:text-3 xl md:text-4xl lg:text-5xl text-black">
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
