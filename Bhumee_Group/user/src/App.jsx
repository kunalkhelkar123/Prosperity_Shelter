/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Homepage_filter_menu from "./Components/homepage/Homepage_filter_menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProperties from "./Components/Investment/InvestmentApp";
import ResidentailsProperties from "./Components/Residential/AppResidential";
import EnquireNowForm from "./Components/Investment/EnquireNowForm";
import MainviewProperty from "../src/Components/viewproperty/MainviewProperty";
import Compactblog from "./Components/ompblog/Compactblog";
import "flowbite/dist/flowbite.css";
import "flowbite";
import Aboutus from "./Components/compabout/Aboutus";
import PopupForm from "./Components/PopupForm";
import CommertialProperties from "./Components/Commercial/Investment/CommertialApp";
import ContactUs from "./Components/ContactUs";
import SearchApp from "./Components/Search/SearchApp";
import ViewAllApp from "./Components/ViewAll/ViewAllApp";
import HotProperties from './Components/HotProperties/HotProperties'
import NotFound from "./Components/404-Notfound/NotFound";
import Userattendance from "./Staff/Attendance/index";

import { useLocation } from "react-router-dom";


// New admin routs 
import AdminDashboard from "./Admin/Dashboard/index";
import LeadDashboard from "./Admin/Leads/index";
import ShowAllProperties from "./Admin/ShowProperties/index";
import UpdateProperties from "./Admin/UpdateProperties/index";
import UpcommingVisites from "./Admin/UpcommingVisites/index";
import DailyScrums from "./Admin/DailyScrum/index";
import Event from "./Admin/Events/index";
import Managestaffs from "./Admin/Staff/index";
import AddProperties from "./Admin/AddProperties/index";
import Offer from "./Admin/offers/index";
import ShowProfile from "./Admin/Profile/index";
import Signup2 from "./Admin/Signup/index";
import Login2 from "./Admin/Login/index";
import Showclient from "./Admin/Client/index";
import Booking2 from "./Admin/Client/Booking/index"
import Loan from "./Admin/Client/Loan/index"
import Payment2 from "./Admin/Client/Payment/index"
import AdminAddnewLead from "./Admin/AddLeads/index"


// New Staff routs

import StaffLogin from "./Staff/Login/index"
import StaffDashBorad from "./Staff/Dashboard/index"
import StaffBookings from "./Staff/Bookings/index"
import StaffUpcoming from "./Staff/UpCommingVisits/index"
import DailyScrum from "./Staff/DailyScrums/index"
import ShowLeads from "./Staff/Leads/index"
import ChanelPartners from "./Admin/ChanelPartners/index"
import StaffAddnewLead from "./Staff/AddNewLead/index"







function App() {
  // const { pathname } = useLocation();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);
  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        {/* <Corespace_navbar /> */}
        <Routes>

          {/* New admin routes */}
          <Route path="/admin/" element={<Login2 />} />
          <Route path="/" element={<Login2 />} />


          <Route path="/admin/Dashboard" element={<AdminDashboard />} />
          <Route path="/admin/LeadDashboard" element={<LeadDashboard />} />
          {/* <Route path="/admin/AllProperties" element={<ShowAllProperties />} /> */}
          {/* <Route path="/admin/update/:id" element={<UpdateProperties />} /> */}
          <Route path="/admin/upcomingvisits" element={<UpcommingVisites />} />
          <Route path="/admin/DailyScrum" element={<DailyScrums />} />
          <Route path="/admin/events" element={<Event />} />
          <Route path="/admin/ManageStaff" element={<Managestaffs />} />
          {/* <Route path="/admin/AddProperty" element={<AddProperties />} /> */}
          <Route path="/admin/offers" element={<Offer />} />
          <Route path="/admin/ShowProfile" element={<ShowProfile />} />
          <Route path="/admin/signup" element={<Signup2 />} />
          <Route path="/admin/booking" element={<Booking2 />} />
          <Route path="/admin/Showclient" element={<Showclient />} />
          <Route path="/admin/ChanelPartners" element={<ChanelPartners />} />
          <Route path="/admin/loan" element={<Loan />} />
          <Route path="/admin/payment" element={<Payment2 />} />
          <Route path="/admin/addnewlead" element={<AdminAddnewLead />} />

          <Route path="*" element={<NotFound />} />


          {/* New Staff Routs */}
          <Route path="/staff" element={<StaffLogin />} />
          <Route path="/staff/dashboard" element={<StaffDashBorad />} />
          <Route path="/staff/bookings" element={<StaffBookings />} />
          <Route path="/staff/upcomingvisits" element={<StaffUpcoming />} />
          <Route path="/staff/dailyscrum" element={<DailyScrum />} />
          <Route path="/staff/leadsPage" element={<ShowLeads />} />
          <Route path="/staff/addnewlead" element={<StaffAddnewLead />} />





          {/*  User routes  */}
          {/* <Route path="/" element={<Homepage_filter_menu />} />
          <Route path="/AllProperties" element={<AllProperties />} />
          <Route path="/Commertial-Properties" element={<CommertialProperties />} />
          <Route path="/Residentails-Properties" element={<ResidentailsProperties />} />
          <Route path="/AllProperties/Enquire" element={<EnquireNowForm />} />
          <Route path="/Residentails-Properties/ViewDetail" element={<MainviewProperty />} />
          <Route path="/Commertial-Properties/ViewDetail" element={<MainviewProperty />} />
          <Route path="/AllProperties/ViewDetail" element={<MainviewProperty />} />
          <Route path="/Searchapp/ViewDetail" element={<MainviewProperty />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Blog" element={<Compactblog />} />
          <Route path="/Contactus" element={<ContactUs />} />
          <Route path="/Popupform" element={<PopupForm />} />
          <Route path="/Searchapp" element={<SearchApp />} />
          <Route path="/ViewAllapp" element={<ViewAllApp />} />
          <Route path="/HotProperties" element={<HotProperties />} />
          <Route path="/Userattendance" element={<Userattendance />} /> */}

          <Route path="*" element={<NotFound />} />


        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
