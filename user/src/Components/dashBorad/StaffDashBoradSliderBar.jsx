import React, { useEffect, useState } from 'react';

import StaffDashBoardHomePage from './StaffDashBoardHomePage';
import StaffNavBar from '../StaffNavBar';
import { Link, useNavigate } from "react-router-dom";

function DashBoradSliderBar() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const token = sessionStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem("user"));

        // Check if the token exists and user has the role 'staff'
        if (!token || !user || user.role !== "staff") {
            navigate("/staff");
        }

    }, [navigate]);





    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menus = [
        { id: 1, name: 'Home', link: '#', icons: 'home' },
        { id: 2, name: 'All Properties', link: '/staff/myProperties', icons: 'dashboard_customize' },
        // { id: 3, name: 'Profile', link: '#', icons: 'person ' },
        { id: 4, name: 'Add Property', link: '/staff/submit', icons: 'add' },
        { id: 5, name: 'Bookings', link: '/staff/bookings', icons: 'home' },
        { id: 6, name: 'Logout', link: '/staff', icons: 'logout' },
    ];



    function check(menus) {
        if (menus.name === 'Logout') {

            console.log("logout == ")
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("admin");


        }

    }
    return (
        <div className='flex  bg-[#390255]  md:h-screen '>
            <nav className={`bg-[#390255] ${isOpen ? "w-40" : "w-20"} sm:w-20 md:w-72 h-screen   `}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between">
                        <div className="mt-10">
                            {/* <a href="#" className="text-white font-bold text-xl">Logo</a> */}
                        </div>
                        <div className="block sm:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-white hover:text-gray-300 focus:outline-none focus:text-white"
                            >
                                <span className="material-symbols-outlined">
                                    menu
                                </span>
                            </button>
                        </div>
                        <div className="hidden sm:block ">
                            <div className=" flex flex-col justify-center items-center text-[#FFF848] mt-10  ">
                                {menus.map((menu, index) => (
                                    <Link to={menu.link} >
                                        <a key={index} href="#" className="text-[#FFF848]  py-2 px-2 rounded-md text-sm font-medium  hover:bg-[#FFF848]  hover:text-[#390255] flex items-center">
                                            {menu.icons && <span className="material-symbols-outlined  p-2 text-2xl">{menu.icons}</span>}
                                            <span className=' items-center text-lg' onClick={() => check(menu)} >{menu.name}</span>
                                        </a></Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="sm:hidden lg:h-screen">
                        <div className="px-2 pt-2 pb-3 ">
                            {menus.map((menu, index) => (
                                <a key={index} href={menu.link} className="text-[#FFF848] block px-3 py-2 rounded-md text-base font-base">
                                    {menu.icons && <span className="material-symbols-outlined text-lg">{menu.icons}</span>}
                                    <span className='p-2'>{menu.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            <div className='p-p-7 text-2xl  font-semibold flex-1  bg-purple-100'>
                <StaffNavBar />

                <StaffDashBoardHomePage />
            </div>
        </div>
    );
}

export default DashBoradSliderBar;
