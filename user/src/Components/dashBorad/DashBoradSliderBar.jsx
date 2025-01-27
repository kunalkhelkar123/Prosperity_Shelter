import React, { useEffect, useState } from 'react';

import DashBoardHomePage from './DashBoardHomePage';
import NavBar from '../NavBar';
import { Link, useNavigate } from "react-router-dom";
// import CryptoJS from "crypto-js";

function DashBoradSliderBar() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {

        const token = sessionStorage.getItem("token");
        const admin = JSON.parse(sessionStorage.getItem("admin"));

        console.log("admin ==> ", admin)
        if (!token || !admin || admin.role !== "admin") {
            navigate("/admin");
        }


    }, [navigate]);



    // useEffect(() => {
    //     const token = sessionStorage.getItem("token");
    //     const encryptedAdmin = sessionStorage.getItem("admin");
    
    //     // If there's no token or encryptedAdmin data, or if the token is invalid, redirect to login
    //     if (!token || !encryptedAdmin) {
    //         navigate("/admin");
    //         return;
    //     }
    
    //     try {
    //         // Decode the token to check if it's expired
    //         // const decodedToken = jwt_decode.decode(token);
    
    //         // if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
    //         //     // If the token is expired or invalid, redirect to login
    //         //     navigate("/admin");
    //         //     return;
    //         // }
    
    //         // Decrypt the admin data if encrypted
    //         const bytes = CryptoJS.AES.decrypt(encryptedAdmin, "kunaljdsdbfhdsbf765havsd78@jhasdvr64646%#%#%^");
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




    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menus = [
        { id: 1, name: 'Home', link: '#', icons: 'home' },
        { id: 2, name: 'My Properties', link: '/admin/myProperties', icons: 'dashboard_customize' },
        { id: 4, name: 'Add Property', link: '/admin/submit', icons: 'add' },
        { id: 6, name: 'Staff', link: '/admin/staff', icons: 'person' },
        { id: 5, name: 'User Home', link: '/', icons: 'home' },
        { id: 3, name: 'Profile', link: '/admin/profile', icons: 'person ' },
        { id: 7, name: 'Logout', link: '/admin', icons: 'logout' },


    ];



    function check(menus) {
        if (menus.name === 'Logout') {
            console.log("logout == ")
            sessionStorage.removeItem("token");
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
                                    <a key={index} href={menu.link} className="text-[#FFF848]  py-2 px-2 rounded-md text-sm font-medium  hover:bg-[#FFF848]  hover:text-[#390255] flex items-center">
                                        {menu.icons && <span className="material-symbols-outlined  p-2 text-2xl">{menu.icons}</span>}
                                        <span className=' items-center text-lg' onClick={() => check(menu)} >{menu.name}</span>
                                    </a>
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
                <NavBar />

                <DashBoardHomePage />
            </div>
        </div>
    );
}

export default DashBoradSliderBar;
