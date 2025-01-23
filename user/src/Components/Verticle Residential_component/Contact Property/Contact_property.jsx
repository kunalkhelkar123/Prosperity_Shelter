import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

function Contact_property() {

    const [user, setuser] = useState("");
    const [user_err, setuser_err] = useState(false);

    const [mob, setmob] = useState("");
    const [mob_err, setmob_err] = useState(false);

    const [mail, setmail] = useState("");
    const [mail_err, setmail_err] = useState(false)

    const [formValid, setFormValid] = useState(false);



    const notify = (msg) => toast(msg);


    const handlesubmit = (event) => {
        event.preventDefault();
        if (user !== "" || mob !== "" || mail !== "") {
           
            setuser("");
            setmob("");
            setmail("");
            setFormValid(true)
        }
        else if(user == "" || mob == "" || mail == "") {
            
            toast('Filled all details')
        }

    }

    const userhandler = (event) => {
        let userdata = event.target.value;

        if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(userdata)) {
            setuser_err(false);
        }
        else {
            setuser_err(true);
        }
        setuser(userdata);
    }

    const passwordhandler = (event) => {
        let passdata = event.target.value;
        if (/^[1-9]\d{9}$/.test(passdata)) {
            setmob_err(false);
        }
        else {
            setmob_err(true);
        }
        setmob(passdata);
    }

    const mailhandler = (event) => {
        let maildata = event.target.value;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(maildata)) {
            setmail_err(false);
        }
        else {
            setmail_err(true);
        }
        setmail(maildata);
    }

    const updateFormValidity = () => {
        
        if (!user_err && !mob_err && !mail_err && user !== "" && mob !== "" && mail !== "" && user && mob && mail) {
            setFormValid(true);
            notify("Thank you")
        } else {
            setFormValid(false);
            notify("er")

        }
    };


    return (
        <>
            <div className=" ">
                <div className=" flex flex-col justify-center items-center rounded-[7px] ">
                    <div className="w-[260px] bg-[#390255] flex justify-center py-[8px] lg:w-[310px] sm:w-[310px] md:w-[260px]">
                        <p className="text-[24px] text-white"><strong>Contact Property</strong></p>
                    </div>
                    <form onSubmit={handlesubmit} className="flex flex-col justify-center items-center gap-[20px]  bg-white  p-[3px] md:p-[3px] sm:p-[25px] lg:p-[25px]">

                        <div>
                            <div className="flex flex-col justify-center items-baseline gap-[10px]">
                                <div>
                                    <p>Your Name*</p>
                                </div>
                                <div className="flex flex-row justify-center items-center border border-gray-400 ">
                                    <div className="flex flex-row justify-center items-center gap-[10px] bg-white p-[4px]">
                                        <div className="py-[6px] pl-[12px] pr-[6px]">
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                        <div>
                                            <hr className="w-[1px] h-[35px]  bg-gray-200 border-0  text-[#a7a7a7]" />

                                        </div>
                                    </div>
                                    <div className="">
                                        <input
                                            className="w-[175px] py-[10px] lg:w-[205px] md:w-[175px] sm:w-[205px]"
                                            value={user}
                                            required
                                            onChange={userhandler}
                                        />
                                    </div>
                                </div>
                                <div>{user_err ? (<div className='text-red-900'><strong>Enter correct name</strong></div>) : ("")}</div>
                            </div>

                            <div className="flex flex-col justify-center items-baseline gap-[10px]">
                                <div>
                                    <p>Your Phone*</p>
                                </div>
                                <div className="flex flex-row justify-center items-center border border-gray-400 ">
                                    <div className="flex flex-row justify-center items-center gap-[10px] bg-white p-[4px]">
                                        <div className="py-[6px] pl-[12px] pr-[6px]">
                                            <i className="fa-solid fa-phone"></i>
                                        </div>
                                        <div>
                                            <hr className="w-[1px] h-[35px]  bg-gray-200 border-0  text-[#a7a7a7]" />

                                        </div>
                                    </div>
                                    <div className="">
                                        <input
                                            className="w-[175px] py-[10px] lg:w-[205px] md:w-[175px] sm:w-[205px]"
                                            value={mob}
                                            required
                                            onChange={passwordhandler}
                                        />
                                    </div>
                                </div>
                                <div>{mob_err ? (<div className='text-red-900'><strong>Enter correct phone number</strong></div>) : ("")}</div>

                            </div>

                            <div className="flex flex-col justify-center items-baseline gap-[10px]">
                                <div>
                                    <p>Your Email*</p>
                                </div>
                                <div className="flex flex-row justify-center items-center border border-gray-400 ">
                                    <div className="flex flex-row justify-center items-center gap-[10px] bg-white p-[4px]">
                                        <div className="py-[6px] pl-[12px] pr-[6px]">
                                            <i className="fa-solid fa-envelope"></i>
                                        </div>
                                        <div>
                                            <hr className="w-[1px] h-[35px]  bg-gray-200 border-0  text-[#a7a7a7]" />

                                        </div>
                                    </div>
                                    <div className="">
                                        <input
                                            className="w-[175px] py-[10px] lg:w-[205px] md:w-[175px] sm:w-[205px]"
                                            required

                                            value={mail}
                                            onChange={mailhandler}
                                        />
                                    </div>
                                </div>
                                <div>{mail_err ? (<div className='text-red-900'><strong>Enter correct Email</strong></div>) : ("")}</div>

                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <button type="submit" onClick={updateFormValidity} className='p-[10px] bg-yellow-300 w-[255px]'><strong>Submit</strong></button>
                        </div>
                        {
                            formValid? (<Toaster />): ("")
                        }

                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact_property;