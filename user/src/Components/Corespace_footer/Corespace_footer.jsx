/* eslint-disable no-unused-vars */
import React from "react";
import CORESPACE_LOGO from "./footer_assets/Logo.png";
import { Link } from "react-router-dom";

function Corespace_footer() {
  return (
    <>
      <footer className="bg-blue-100 text-black">
        {/* Main content section */}
        <div className="container mx-auto py-10 flex flex-col sm:flex-row justify-between items-center space-y-8 sm:space-y-0 pl-6 pr-6 sm:pl-10">
          <div className="text-center sm:text-left space-y-2">
            <h1 className="text-2xl font-semibold">89% of customers</h1>
            <h1 className="text-xl font-bold">recommend us</h1>
          </div>

          <div className="text-center">
            <p>
              If you are looking for a dream home or want to sell your property!
            </p>
            <p>Looking for investment or office space?</p>
          </div>

          <Link to="/Investmentapp">
            <div className="group flex items-center justify-center bg-yellow-300 hover:bg-yellow-400 rounded-md px-6 py-2 w-[174px]">
              <span className="font-bold text-black">Get Started</span>
              <svg
                className="ml-2 text-black h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* Quick Links and Company section */}
        <div className="bg-blue-200 py-8 pl-6 sm:pl-10">
          <div className="container mx-auto flex flex-col sm:flex-row justify-around space-y-8 sm:space-y-0">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/Commertialapp">Commercial Property</Link>
                </li>
                {/* <li><Link to="/Appresidential">Residential Property</Link></li> */}
                <li>
                  <Link to="/Investmentapp">Property Management Services</Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Property Centre</h2>
              <ul className="space-y-2">
                <li>Commercial Property For Investment</li>
                <li>Commercial Property For Leasing</li>
                <li>Commercial Property For Outright</li>
                <li>Why Commercial Real Estate</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Company</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/Aboutus">About Us</Link>
                </li>
                {/* <li>
                  <Link to="/Blog">Blog</Link>
                </li> */}
                {/* <li>Careers</li> */}
                <li>
                  <Link to="/Contactus">Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* <div className="space-y-4">
              <h2 className="text-xl font-semibold">Legal</h2>
              <ul className="space-y-2">
                <li>Privacy Policy</li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* Social media section */}
        <div className="bg-yellow-300 py-6 pl-6 pr-6 sm:pl-10">
          <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="text-xl font-semibold">Follow us</div>

            <div className="flex justify-center space-x-8">
              <a
                // href="https://www.facebook.com/profile.php?id=100094539866083&mibextid=kFxxJD"
                target="_blank"
                className="flex flex-col items-center text-blue-900"
              >
                <i className="fa-brands fa-facebook-f text-2xl"></i>
                <span className="text-sm hidden lg:block">Facebook</span>
              </a>
              <a
                // href="https://www.instagram.com/corespace_realty?igsh=Mjg2dHByeGo0MGg2"
                target="_blank"
                className="flex flex-col items-center text-blue-900"
              >
                <i className="fa-brands fa-instagram-square text-2xl"></i>
                <span className="text-sm hidden lg:block">Instagram</span>
              </a>
              <a
                // href="https://www.linkedin.com/company/corespace-realty/"
                target="_blank"
                className="flex flex-col items-center text-blue-900"
              >
                <i className="fa-brands fa-linkedin-in text-2xl"></i>
                <span className="text-sm hidden lg:block">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Call to action section */}
        <div className="bg-blue-100 py-3 flex flex-col lg:flex-row justify-around items-center pl-6 sm:pl-10">
          <img
            className="h-24 w-32 bg-purple-900 rounded-lg p-4"
            src={CORESPACE_LOGO}
            alt="homiGrow Logo"
          />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">
              Need help getting started?
            </h2>
            <p>Schedule a call with our investment advisor today</p>
          </div>

          <Link to="tel:+91 9146219186">
            <button className="bg-purple-900 text-white px-6 py-2 rounded-lg flex items-center gap-2">
              <i className="fa-solid fa-phone"></i>
              <span>Schedule Call</span>
            </button>
          </Link>
        </div>

        {/* Copyright section */}
        <div className="bg-blue-100 text-center py-6 font-semibold">
          © 2025 Prosperity Shelters designed by Comet All Rights Reserved.
        </div>
      </footer>
    </>
  );
}

export default Corespace_footer;
