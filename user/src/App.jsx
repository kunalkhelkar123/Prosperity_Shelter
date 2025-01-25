/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Homepage_filter_menu from "./Components/homepage/Homepage_filter_menu";
import Corespace_navbar from "./Components/Corespace_Navigation/Corespace_navbar";
import Corespace_footer from "./Components/Corespace_footer/Corespace_footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./Components/homepage/Test";
import InvestmentApp from "./Components/Investment/InvestmentApp";
import AppResidential from "./Components/Residential/AppResidential";
import EnquireNowForm from "./Components/Investment/EnquireNowForm";
import { useLocation } from "react-router-dom";
import MainviewProperty from "../src/Components/viewproperty/MainviewProperty";
import Compactblog from "./Components/ompblog/Compactblog";
import "flowbite/dist/flowbite.css";
import "flowbite";
import Aboutus from "./Components/compabout/Aboutus";
import PopupForm from "./Components/PopupForm";
import CommertialApp from "./Components/Commercial/Investment/CommertialApp";
import ContactUs from "./Components/ContactUs";
import SearchApp from "./Components/Search/SearchApp";
import filterdata from "./Components/homepage/Homepage_filter_menu";
import ViewAllApp from "./Components/ViewAll/ViewAllApp";
import HotProperties from './Components/HotProperties/HotProperties'

// import PropertySubmission from "../../admin/src/components/Property-submission/PropertySubmission";


import PropertySubmission from "./Components/Property-submission/PropertySubmission";
import StaffPropertySubmission from "./Components/Property-submission/StaffPropertySubmission";

import DashBoradSliderBar from "./Components/dashBorad/DashBoradSliderBar";
import StaffDashBoradSliderBar from "./Components/dashBorad/StaffDashBoradSliderBar";

import SingUp from "./Components/Registration/SingUp";
import LogIn from "./Components/Registration/LogIn";
import StaffLogIn from "./Components/Registration/StaffLogIn";

import Google from "./Components/google";
import UpdateProperty from "./Components/Property-submission/UpdateProperty";
import GetAllProperty from "./Components/dashBorad/GetAllProperty";
import StaffGetAllProperty from "./Components/dashBorad/StaffGetAllProperty";

import LeadContact from "./Components/leadPages/LeadContact";
import StaffLeadContact from "./Components/leadPages/StaffLeadContact";

import EditProperty from "./Components/Property-submission/EditProperty";
import StaffEditProperty from "./Components/Property-submission/StaffEditProperty";

import Managestaff from "./Components/Staff/Staffmanage";
import NotFound from "./Components/404-Notfound/NotFound";

import StaffBookings from "./Components/Staff/StaffBookings"
import Upcomingvisits from "./Components/Upcoming_Visits/Upcoming"
import StaffUpcoming from "./Components/Upcoming_Visits/StaffUpcoming"
import DailyScrum from "./Components/dailyscrums/dailyscrums"
import AdminDailyScrum from "./Components/dailyscrums/admindailyscrums"
import Client from "./Components/Client/clienthome"
import Booking from "./Components/Booking/BookingHome"
import LoanHome from "./Components/Loan/LoanHome"
import Payment from "./Components/Payment/paymentHome"
import EventManagement from "./Components/Client/Eventmanagement";
import ProfilHome from "./Components/Profile/profileHome";
// import ScratchCardPopup from "./Components/ScratchCardPopup/ScratchCardPopup";

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


          {/*  User routes  */}
          <Route path="/" element={<Homepage_filter_menu />} />
          {/* <Route path="/Test" element={<Test />} /> */}
          <Route path="/Investmentapp" element={<InvestmentApp />} />
          <Route path="/Commertialapp" element={<CommertialApp />} />
          <Route path="/Appresidential" element={<AppResidential />} />
          <Route path="/Investmentapp/Enquire" element={<EnquireNowForm />} />
          <Route path="/Appresidential/ViewDetail" element={<MainviewProperty />} />
          <Route path="/Commertialapp/ViewDetail" element={<MainviewProperty />} />
          <Route path="/Investmentapp/ViewDetail" element={<MainviewProperty />} />
          <Route path="/Searchapp/ViewDetail" element={<MainviewProperty />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Blog" element={<Compactblog />} />
          <Route path="/Contactus" element={<ContactUs />} />
          <Route path="/Popupform" element={<PopupForm />} />
          <Route path="/Searchapp" element={<SearchApp />} />
          <Route path="/ViewAllapp" element={<ViewAllApp />} />
          <Route path="/HotProperties" element={<HotProperties />} />




          {/* ////////////////////////////////////// */}
          {/*  Admin routes  */}
          <Route path="/admin/dashboard" element={<DashBoradSliderBar />} />
          <Route path="/admin/submit" element={<PropertySubmission />} />
          <Route path="/admin/signup" element={<SingUp />} />
          <Route path="/admin" element={<LogIn />} />
          <Route path="/admin/previewPage" element={<PropertySubmission />} />
          <Route path="/admin/myProperties" element={<GetAllProperty />} />
          <Route path="/admin/update/:id" element={<EditProperty />} />
          <Route path="/admin/leadsPage" element={<LeadContact />} />
          <Route path="/admin/staff" element={<Managestaff />} />
          <Route path="/admin/upcomingvisits" element={<Upcomingvisits />} />
          <Route path="/admin/dailyscrums" element={<AdminDailyScrum />} />
          <Route path="/admin/client" element={<Client />} />
          <Route path="/admin/booking" element={<Booking />} />
          <Route path="/admin/loan" element={<LoanHome />} />
          <Route path="/admin/payment" element={<Payment />} />
          <Route path="/admin/events" element={<EventManagement />} />
          <Route path="/admin/profile" element={<ProfilHome />} />
      




          <Route path="*" element={<NotFound />} />
          {/* ////////////////////////////////////// */}

          {/*  Staff routes  */}

          <Route path="/staff" element={<StaffLogIn />} />
          <Route path="/staff/dashboard" element={<StaffDashBoradSliderBar />} />
          <Route path="/staff/submit" element={<StaffPropertySubmission />} />
          <Route path="/staff/myProperties" element={<StaffGetAllProperty />} />
          <Route path="/update/:id" element={<StaffEditProperty />} />
          <Route path="/staff/bookings" element={<StaffBookings />} />
          <Route path="/staff/upcomingvisits" element={<StaffUpcoming />} />
          <Route path="/staff/dailyscrum" element={<DailyScrum />} />
          <Route path="/staff/leadsPage" element={<StaffLeadContact />} />
        </Routes>
        {/* <Corespace_footer /> */}
        {/* <PopupForm isOpen={isPopupOpen} onClose={closePopup} /> */}
      </BrowserRouter>


    </>
  );
}

export default App;
