import React, { useEffect, useState } from "react";
import axiosinstance from "../../../axiosConfig";
import OtpInput from "./OtpInput";

function MyComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [verificationResult, setVerificationResult] = useState("");
  const [isOpen1, setIsOpen1] = useState(true);
  console.log(isOpen1, "in mycomponent");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const regexName = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
    const regexPhoneNum = /^\+91(?!0)\d{10}$/;
    const regexEmail = /\S+@\S+\.\S+/;

    if (!regexName.test(name)) {
      alert("Invalid Name");
      return;
    } else if (!regexEmail.test(email)) {
      alert("Invalid Email");
      return;
    } else if (!regexPhoneNum.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    setShowOtpInput(true);
    console.log(regexPhoneNum.test(phoneNumber));

    try {
      const response = await axiosinstance.post(
        "/api/otp/send-otp",
        {
          name,
          email,
          phoneNumber,
        }
      );
      console.log(response.data);
      setOtpSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onOtpSubmit = (otp) => {
    console.log("Login Successful", otp);
  };

  const openDialog = () => {
    setIsOpen1(true);
  };
  const closeDialog = () => {
    setIsOpen1(false);
  };
  useEffect(() => {
    openDialog();
  }, []);

  return (
    <>
      {/* otp component start */}

      {isOpen1 && (
        <div className="dialog-overlay absolute top-0 mt-[-200px]  bg-black opacity-80 w-full">
          <div className="dialog">
            <div className="p-56 flex flex-col justify-center items-center  ">
              <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto relative bg-white">
                <button
                  className="close-button rounded-md w-fit right-3 top-3 absolute bg-red-600 text-black"
                  onClick={closeDialog}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>

                <div className="mx-auto mb-2 space-y-3">
                  <h1 className="text-3xl font-bold text-black">
                    Verify Your Number For Details
                  </h1>
                </div>

                <div>
                  <div className="relative mt-2 w-full">
                    <input
                      type="text"
                      id="Name"
                      value={name}
                      className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                      placeholder=" "
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="Name"
                      className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                    >
                      Enter Your Name
                    </label>
                  </div>
                </div>
                <div>
                  <div className="relative mt-2 w-full">
                    <input
                      type="text"
                      id="Email"
                      value={email}
                      className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                      placeholder=" "
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="Email"
                      className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                    >
                      Enter Your Email
                    </label>
                  </div>
                </div>

                <div>
                  <div className="relative mt-2 w-full flex flex-row justify-center items-center">
                    <div className=" flex flex-col item-center">
                      {!showOtpInput ? (
                        <>
                          <h1 className="">Enter Your Number</h1>
                          <div className="flex flex-row ">
                            <input
                              type="text"
                              defaultValue={"+91"}
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                            />
                            <button
                              onClick={handleSubmit}
                              className="rounded-lg bg-blue-600 px-2 ml-2  font-bold text-white"
                            >
                              <span className="material-symbols-outlined">
                                send
                              </span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <div>
                          <OtpInput length={6} phoneNumber={phoneNumber} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyComponent;
