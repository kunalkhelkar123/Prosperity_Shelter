
import { useEffect, useRef, useState } from "react";

import CORESPACE_LOGO from "./Asset/Logo.png";

import { Link, useLocation } from "react-router-dom";

function Corespace_navbar() {
  const [content, setContent] = useState(false);
  const [activeButton, setActiveButton] = useState("/");
  const location = useLocation();
  const menuRef = useRef(null); // Create a ref for the menu

  const contentHandler = () => {
    setContent((prev) => !prev);
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {


    // Prevent default navigation on hard refresh
    if (!location.pathname) {
      history.push("/Home"); // Redirect to your default page
    } else {
      // Set active button based on current route
      switch (location.pathname) {
        case "/Home":
          setActiveButton("/Home");
          break;
        case "/Residentails-Properties":
          setActiveButton("/Residentails-Properties");
          break;
        case "/Aboutus":
          setActiveButton("/Aboutus");
          break;
        case "/Contactus":
          setActiveButton("/Contactus");
          break;
        case "/Residentails-Properties/ViewDetail":
          setActiveButton("/Residentails-Properties");
          break;
        case "/Commertial-Properties":
          setActiveButton("/Commertial-Properties");
          break;
        case "/Commertial-Properties/ViewDetail":
          setActiveButton("/Commertial-Properties");
          break;
        case "/AllProperties":
          setActiveButton("/AllProperties");
          break;
        case "/AllProperties/ViewDetail":
          setActiveButton("/AllProperties");
          break;
        default:
          setActiveButton("");
          break;
      }
    }
  }, [location.pathname]);

  // Close the menu if clicking outside of it
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setContent(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="top-0 sticky ml-[-20px] z-30 w-[412x] bg-[#390255]">
        <div className="flex  justify-between items-center h-auto sm:h-[90px] p-2">
          {/* Logo Section */}
          <div>
            <button>
              <img
                src={CORESPACE_LOGO}
                className=" mt-3 pt-[4px] h-[3rem] w-[3rem] ml-4 sm:h-[2rem] sm:w-[3rem] md:h-[2rem] md:w-[3rem] lg:h-[2rem] lg:w-[3rem] xl:h-[6rem] xl:w-[6rem]"
              />
            </button>
          </div>

          {/* Navigation Links (Always Visible) */}
          <div className=" flex flex-wrap justify-center items-center gap-2 sm:gap-4 px-2">
            <Link to="/">
            <button
                onClick={() => handleButtonClick("/")}
                className={`hover:bg-[#ffff0c] hover:text-black px-4 py-2 text-[12px]  sm:text-[14px] rounded-[20px] font-medium ${activeButton === "/" ? "bg-[#ffff0c] text-black" : "text-white"}`}
              >
                HOME
              </button>
            </Link>

            <Link to="/Residentails-Properties">
              <button
                onClick={() => handleButtonClick(location.pathname)}
                className={`hover:bg-[#ffff0c] hover:text-black  px-2 py-1 rounded-[20px] text-[12px]  sm:text-[14px] font-medium ${activeButton === "/Residentails-Properties" ? "bg-[#ffff0c] text-black" : "text-white"
                  }`}
              >
                <strong>RESIDENTIAL</strong>
              </button>
            </Link>

            <Link to="/Commertial-Properties">
              <button
                onClick={() => handleButtonClick(location.pathname)}
                className={`hover:bg-[#ffff0c] hover:text-black  px-2 py-1 rounded-[20px] text-[12px] sm:text-[14px] font-medium ${activeButton === "/Commertial-Properties" ? "bg-[#ffff0c] text-black" : "text-white"
                  }`}
              >
                <strong>COMMERCIAL</strong>
              </button>
            </Link>

            <Link to="/AllProperties">
              <button
                onClick={() => handleButtonClick(location.pathname)}
                className={`hover:bg-[#ffff0c] hover:text-black  px-2 py-1 rounded-[20px] text-[12px] sm:text-[14px] font-medium ${activeButton === "/AllProperties" ? "bg-[#ffff0c] text-black" : "text-white"
                  }`}
              >
                <strong>INVESTMENT</strong>
              </button>
            </Link>
            <Link to="/Aboutus">
              <button
                onClick={() => handleButtonClick(location.pathname)}
                className={`hover:bg-[#ffff0c] hover:text-black  px-2 py-1 rounded-[20px] text-[12px]  sm:text-[14px] font-medium ${activeButton === "/Aboutus" ? "bg-[#ffff0c] text-black" : "text-white"
                  }`}
              >
                <strong>ABOUT </strong>
              </button>
            </Link>
            <Link to="/Contactus">
              <button
                onClick={() => handleButtonClick(location.pathname)}
                className={`hover:bg-[#ffff0c] hover:text-black  px-2 py-1 rounded-[20px] text-[12px] sm:text-[14px] font-medium ${activeButton === "/Contactus" ? "bg-[#ffff0c] text-black" : "text-white"
                  }`}
              >
                <strong>CONTACT </strong>
              </button>
            </Link>
           
          </div>

          {/* Optional: Add a menu icon for additional sections if needed */}
          <div>
            <button onClick={contentHandler} className="mr-[20px]">
              <span className={`material-symbols-outlined ${content ? "text-white" : "text-white"}`}>
                {content ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
        <div className="bg-opacity-0 flex justify-center items-center h-[100vh] sm:bg-[#390255] absolute right-0 z-50">
          <div
            ref={menuRef} // Attach the ref to the menu div
            className={`sm:bg-[#390255] h-[100vh] pr-[5px] sm:pr-[0px] ml-auto flex flex-col justify-center items-center sm:w-[25vw] lg:w-[20vw] xl:w-[16vw] sm:p-[0px] ${content ? "" : "hidden"}`}
          >
            {content && (
              <>
                 
              <div className="text-white h-[390px] sm:h-[100vh] flex flex-col justify-center items-center gap-[2rem] bg-[#390255]  rounded-lg sm:rounded-[0px]">
                 <button>
              <img
                src={CORESPACE_LOGO}
                className="  pt-[4px] h-[3rem] w-[4rem] ml-4 sm:h-[2rem] sm:w-[5rem] md:h-[2rem] md:w-[4rem] lg:h-[2rem] lg:w-[6rem] xl:h-[4rem] xl:w-[6rem]"
              />
            </button>
                
                <Link to="/" onClick={contentHandler}>
                  <button className="hidden sm:block">
                    <strong>HOME</strong>
                  </button>
                  <button className="sm:hidden">
                    <strong>
                      <i className="fa-solid fa-house"></i>
                    </strong>
                  </button>
                </Link>

                <Link to="/Aboutus" onClick={contentHandler}>
                  <div>
                    <button className="hidden sm:block">
                      <strong>ABOUT US</strong>
                    </button>
                    <button className="sm:hidden">
                      <strong>
                        <i className="fa-solid fa-circle-exclamation"></i>
                      </strong>
                    </button>
                  </div>
                </Link>

                <Link to="/hotproperties" onClick={contentHandler}>
                  <div>
                    <button className="hidden sm:block">
                      <strong>LATEST PROPERTIES</strong>
                    </button>
                    <button className="sm:hidden">
                      <strong>
                        <i className="fa-solid fa-blog"></i>
                      </strong>
                    </button>
                  </div>
                </Link>

                <Link to="/Contactus" onClick={contentHandler}>
                  <div>
                    <button className="hidden sm:block">
                      <strong>CONTACT US</strong>
                    </button>
                    <button className="sm:hidden">
                      <strong>
                        <i className="fa-solid fa-phone"></i>
                      </strong>
                    </button>
                  </div>
                </Link>
                <Link to="/admin" onClick={contentHandler}>
                  <div>
                    <button className="hidden sm:block">
                      <strong>ADMIN</strong>
                    </button>
                    <button className="sm:hidden">
                      <strong>
                        <i className="fa-solid fa-user"></i>
                      </strong>
                    </button>
                  </div>
                </Link>
              </div></>
            )}
          </div>
        </div>
      </div>

    </>
  );
}

export default Corespace_navbar;
