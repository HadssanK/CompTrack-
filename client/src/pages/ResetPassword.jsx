import React, { useContext, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { data, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import Lottie from "lottie-react";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [Otp, setOtp] = useState(0);
  const [isOtpsubmited, setIsOtpsubmited] = useState(false);

  // const {backendUrl , Userdata} = useContext(AppContext)
  axios.defaults.withCredentials = true;

  const inputRefs = useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeydown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0)
      inputRefs.current[index - 1].focus();
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/send-reset-Otp",
        { Email }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // otp input form
  const onsubmitOtp = async (e)=>{
    e.preventDefault();
    const otpArray = inputRefs.current.map((e)=> e.value)
    setOtp(otpArray.join(''))
    setIsOtpsubmited(true)
  }

  const onsubmitnewPassword = async (e)=>{
    e.preventDefault();
    try {
     const {data} = await axios.post("http://localhost:4000/api/auth/reset-password",{Email , Otp , newPassword})
      if(data.success){
        toast.success(data.message)
        navigate("/")
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      {/* <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      /> */}
      <Lottie  animationData={assets.LottieLogo}  className='absolute left-5 sm:left-20 top-5 w-28 sm:w-20 cursor-pointer' />


      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registerd Email Address
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" className="w-3 h-3" />
            <input
              value={Email}
              type="Email"
              placeholder="Email Id"
              className="bg-transparent outline-none text-white"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-3 py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full"
          >
            Submit
          </button>
        </form>
      )}

      {/* otp for reset */}
      {!isOtpsubmited && isEmailSent && (
        <form onSubmit={onsubmitOtp} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your Email id.
          </p>

          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => {
                return (
                  <input
                    type="text"
                    maxLength="2"
                    key={index}
                    required
                    className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeydown(e, index)}
                  />
                );
              })}
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}
      {/* enter new password */}
      {isOtpsubmited && isEmailSent && (
        <form onSubmit={onsubmitnewPassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            new Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the new password below
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" className="w-3 h-3" />
            <input
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              type="password"
              placeholder="New Password"
              className="bg-transparent outline-none text-white"
              required
            />
          </div>
          <button className="w-full mt-3 py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
