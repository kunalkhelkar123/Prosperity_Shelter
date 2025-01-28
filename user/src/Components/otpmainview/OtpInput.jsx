import React, { useState, useCallback, useEffect, useRef } from "react";
import axiosinstance from "../../../axiosConfig";
import toast, { Toaster } from "react-hot-toast";

const OtpInput = ({ length = 6, phoneNumber = "", onOtpSubmit = () => {} }) => {
  const [otpArr, setOtpArr] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Reset OTP input fields whenever phoneNumber prop changes
    setOtpArr(new Array(length).fill(""));
  }, [phoneNumber, length]);

  const notifySuss = () => toast("OTP Verified Successfully.");
  const notifyErr = () => toast("Wrong OTP");

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otpArr];
    newOtp[index] = value.substring(value.length - 1);
    setOtpArr(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otpArr[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmitVerify = useCallback(
    async (e) => {
      e.preventDefault();

      const otp = otpArr.join("");
      console.log("Verifying OTP:", otp);

      try {
        const response = await axiosinstance.post(
          "/api/otp/verify-otp",
          {
            phoneNumber,
            otp,
          }
        );
        notifySuss();
        console.log("Verification response:", response.data);
      } catch (error) {
        notifyErr();
        console.error("Error verifying OTP:", error);
      }
    },
    [otpArr, phoneNumber]
  );

  return (
    <>
      <p>Enter OTP sent to {phoneNumber}</p>
      <div>
        {otpArr.map((value, index) => {
          return (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otpInput border"
            />
          );
        })}
      </div>
      <button
        className="w-[100%] mt-3 bg-blue-700 text-white font-bold py-1 px-1 rounded-md"
        onClick={handleSubmitVerify}
      >
        Verify
      </button>
      <div>
        <Toaster />
      </div>
    </>
  );
};

export default OtpInput;
