import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {
  const [state, setState] = useState("Sign up");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin , getUserData} = useContext(AppContext);

  // ✅ Optimized Form Submission Handler
const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    axios.defaults.withCredentials = true;

    let endpoint = state === "Sign up" ? "/api/auth/register" : "/api/auth/login";
    const { data } = await axios.post(`${backendUrl}${endpoint}`, { Name, Email, Password });

    if (data.success) {
       localStorage.setItem('token', data.token);
    console.log("Token set in localStorage:", data.token);
    // redirect or do other things
 
      setIsLoggedin(true);
      toast.dark(state === "Sign up" ? "Registration Successful" : "User is LoggedIn");

      // await karo getUserData ko
      const userData = await getUserData();

      if (data.role === "admin" || userData?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      {/* <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      /> */}
      {/* <Lottie animationData={assets.LottieLogo}  className='absolute left-5 sm:left-20 top-5 w-28 sm:w-20 cursor-pointer' /> */}

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign up" ? "Create an Account" : "Login to Your Account"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign up" ? "Create your account to get started" : "Login to access your account"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="Person Icon" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={Name}
                className="bg-transparent outline-none w-full text-white"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="bg-transparent outline-none w-full text-white"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              className="bg-transparent outline-none w-full text-white"
              type="Password"
              placeholder="Password"
              required
            />
          </div>

          <p onClick={() => navigate("/reset-Password")} className="mb-4 text-indigo-500 cursor-pointer">
            Forgot Password?
          </p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white">
            {state}
          </button>
        </form>

        {state === "Sign up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span onClick={() => setState("Login")} className="text-blue-400 cursor-pointer underline">
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span onClick={() => setState("Sign up")} className="text-blue-400 cursor-pointer underline">
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
