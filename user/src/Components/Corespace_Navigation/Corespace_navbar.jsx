import  { useEffect, useRef, useState } from "react";
import LOGO from "./Asset/logo.png";
import { Link, useLocation } from "react-router-dom";

function Corespace_navbar() {
  const [content, setContent] = useState(false);
  const [activeButton, setActiveButton] = useState("/Home");
  const location = useLocation();
  const menuRef = useRef(null); // Create a ref for the menu

  const contentHandler = () => {
    setContent((prev) => !prev);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
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
        case "/Appresidential":
          setActiveButton("/Appresidential");
          break;
          case "/Aboutus":
          setActiveButton("/Aboutus");
          break;
          case "/Contactus":
          setActiveButton("/Contactus");
          break;
        case "/Appresidential/ViewDetail":
          setActiveButton("/Appresidential");
          break;
        case "/Commertialapp":
          setActiveButton("/Commertialapp");
          break;
        case "/Commertialapp/ViewDetail":
          setActiveButton("/Commertialapp");
          break;
        case "/Investmentapp":
          setActiveButton("/Investmentapp");
          break;
        case "/Investmentapp/ViewDetail":
          setActiveButton("/Investmentapp");
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
      <div className="top-0 sticky z-50">
        <div className="flex justify-between items-center h-fit bg-[#390255] relative">
          <div>
            <button>
              <img
                src={LOGO}
                className="sm:p-1 p-0.5 h-[4rem] w-[5rem] ml-[3rem] md:w-[4rem] md:h-[3rem] md:ml-[3rem] md:text-[14px] lg:w-[6rem] lg:h-[5rem] lg:ml-[6rem] sm:w-[5rem] sm:h-[4rem] sm:ml-[3rem]"
              />
            </button>
          </div>

          <div className="hidden sm:flex justify-around items-center">
            <div>
              <Link to="/">
                <button
                  onClick={() => handleButtonClick(location.pathname)}
                  className={`hover:bg-[#ffff0c] hover:text-black ${
                    activeButton === ""
                      ? "active text-black bg-[#ffff0c]"
                      : "text-white"
                  } focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 md:py-[8px] lg:py-[12px] sm:text-sm sm:pt-[7px] sm:pb-[8px] sm:pl-[9px] sm:pr-[9px] lg:px-[15px]`}
                >
                  <strong>HOME</strong>
                </button>
              </Link>
            </div>
            <div>
              <Link to="/Appresidential">
                <button
                  onClick={() => handleButtonClick(location.pathname)}
                  className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium ${
                    activeButton === "/Appresidential"
                      ? "active text-black bg-[#ffff0c]"
                      : "text-white"
                  } hover:bg-[#ffff0c] hover:text-black hover:font-medium rounded-full hover:text-sm px-5 py-2.5 focus:outline-none md:py-[8px] lg:py-[12px] sm:text-sm sm:pt-[7px] sm:pb-[8px] sm:pl-[9px] sm:pr-[9px]`}
                >
                  <strong> RESIDENTIAL</strong>
                </button>
              </Link>
            </div>
            <div>
              <Link to="/Commertialapp">
                <button
                  onClick={() => handleButtonClick(location.pathname)}
                  className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium ${
                    activeButton === "/Commertialapp"
                      ? "active text-black bg-[#ffff0c]"
                      : "text-white"
                  } hover:bg-[#ffff0c] hover:text-black hover:font-medium rounded-full hover:text-sm px-5 py-2.5 focus:outline-none md:py-[8px] lg:py-[12px] sm:text-sm sm:pt-[7px] sm:pb-[8px] sm:pl-[9px] sm:pr-[9px]`}
                >
                  <strong>COMMERCIAL</strong>
                </button>
              </Link>
            </div>

            <div>
              <Link to="/Investmentapp">
                <button
                  onClick={() => handleButtonClick(location.pathname)}
                  className={`hover:bg-[#ffff0c] hover:text-black ${
                    activeButton === "/Investmentapp"
                      ? "active text-black bg-[#ffff0c]"
                      : "text-white"
                  } focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 md:py-[8px] lg:py-[12px] sm:text-sm sm:pt-[7px] sm:pb-[8px] sm:pl-[9px] sm:pr-[9px] lg:px-[15px]`}
                >
                  <strong>INVESTMENT</strong>
                </button>
              </Link>
            </div>


            <div>
              <Link to="/Aboutus">
                <button
                  onClick={() => handleButtonClick(location.pathname)}
                  className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium ${
                    activeButton === "/Aboutus"
                      ? "active text-black bg-[#ffff0c]"
                      : "text-white"
                  } hover:bg-[#ffff0c] hover:text-black hover:font-medium rounded-full hover:text-sm px-5 py-2.5 focus:outline-none md:py-[8px] lg:py-[12px] sm:text-sm sm:pt-[7px] sm:pb-[8px] sm:pl-[9px] sm:pr-[9px]`}
                >
                  <strong> ABOUT</strong>
                </button>
              </Link>
            </div>
            <div>
              <Link to="/Contactus">
                <button
                  onClick={() => handleButtonClick(location.pathname)}
                  className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium ${
                    activeButton === "/Contactus"
                      ? "active text-black bg-[#ffff0c]"
                      : "text-white"
                  } hover:bg-[#ffff0c] hover:text-black hover:font-medium rounded-full hover:text-sm px-5 py-2.5 focus:outline-none md:py-[8px] lg:py-[12px] sm:text-sm sm:pt-[7px] sm:pb-[8px] sm:pl-[9px] sm:pr-[9px]`}
                >
                  <strong> CONTACT-US</strong>
                </button>
              </Link>
            </div>


          </div>
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
              <div className="text-white h-[350px] sm:h-[100vh] flex flex-col justify-center items-center gap-[2rem] bg-[#390255] px-[20px] sm:px-[0px] rounded-lg sm:rounded-[0px]">
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
                
                <Link to="/Blog" onClick={contentHandler}>
                  <div>
                    <button className="hidden sm:block">
                      <strong>BLOG</strong>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Corespace_navbar;
