import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const SendverificationOtp = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-Otp`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const Logout = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        setUserData(null);
        setIsLoggedin(false);
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed!");
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full flex justify-between items-center px-4 sm:px-8 py-4 bg-white text-gray-800 shadow-md sticky top-0 z-50">
        {/* Mobile Hamburger */}
        <div className="sm:hidden flex items-center">
          <GiHamburgerMenu className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        </div>

        {/* Logo */}
        <div className="text-xl font-bold cursor-pointer hidden sm:block" onClick={() => navigate("/")}>
          MyLogo
        </div>

        {/* All users see these links */}
        <div className="hidden sm:flex gap-6 text-md font-medium">
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/raise-issue" className="hover:text-blue-600">Raise Issue</Link>
          <Link to="/my-complaints" className="hover:text-blue-600">My Complaints</Link>
        </div>

        {/* User Avatar or Login Button */}
        {userData ? (
          <div className="relative group cursor-pointer">
            <div className="w-9 h-9 flex items-center justify-center bg-black text-white rounded-full">
              {userData.Name?.[0]?.toUpperCase()}
            </div>
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md text-sm min-w-[140px] z-50">
              <ul className="py-2">
                {/* Show verify option only if not verified */}
                {!userData.isAccountVerified && (
                  <li onClick={SendverificationOtp} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Verify Email
                  </li>
                )}
                <li onClick={Logout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden sm:flex items-center gap-2 border border-gray-800 rounded-full px-5 py-2 hover:bg-gray-800 hover:text-white transition-all"
          >
            Login
            <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
          </button>
        )}
      </nav>

      {/* Sidebar for Mobile */}
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[999] p-6 flex flex-col gap-6 transition-transform duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Menu</h2>
            <IoClose className="text-2xl cursor-pointer" onClick={toggleSidebar} />
          </div>

          {/* Mobile Nav Links for All */}
          <Link to="/dashboard" className="hover:text-blue-600" onClick={toggleSidebar}>Dashboard</Link>
          <Link to="/raise-issue" className="hover:text-blue-600" onClick={toggleSidebar}>Raise Issue</Link>
          <Link to="/my-complaints" className="hover:text-blue-600" onClick={toggleSidebar}>My Complaints</Link>

          {/* Login Button (if not logged in) */}
          {!userData && (
            <button
              onClick={() => {
                navigate("/login");
                toggleSidebar();
              }}
              className="mt-4 border border-gray-800 px-4 py-2 rounded hover:bg-gray-800 hover:text-white"
            >
              Login
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
