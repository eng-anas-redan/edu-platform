import LogoIcon from "../assets/Icon.png";
import { FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = ({ userId, fName }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="px-6 rounded-md fixed top-0 max-w-7xl mx-auto left-0 right-0 bg-gradient-to-r from-primary-500 text-white shadow-lg h-14 z-50">
      <div className="container mx-auto pt-1 flex items-center justify-between">
        {/* الجزء الأيسر: الشعار */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-2xl font-bold text-primary-100 gap-4">
            <img
              className="rounded-lg w-12 h-12 object-cover"
              src={LogoIcon}
              alt="React Jobs"
            />
            <h4 className="font-bold tracking-widest">EDU</h4>
          </div>
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive
                    ? "text-primary-300 font-semibold"
                    : "hover:text-primary-400"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/users"
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive
                    ? "text-primary-300 font-semibold"
                    : "hover:text-primary-400"
                }`
              }
            >
              Teachers
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive
                    ? "text-primary-300 font-semibold"
                    : "hover:text-primary-400"
                }`
              }
            >
              Contact Us
            </NavLink>
          </div>

          {/* مربع البحث */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search"
              className="bg-primary-800 text-white placeholder-primary-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-accent-500 w-64"
            />
            <FaSearch className="absolute left-3 top-3 text-primary-300" />
          </div>
        </div>

        {/* الجزء الأيمن: الأيقونات */}
        <div className="flex items-center space-x-6">
          {/* أيقونة الملف الشخصي */}
          <div
            ref={dropdownRef}
            className="flex items-center space-x-2 cursor-pointer relative"
          >
            {/* User icon button */}
            <div
              className="
    flex items-center gap-2
    bg-primary-600
    hover:bg-primary-700
    hover:scale-105
    rounded-full
    px-3 py-2
    transition-all
    duration-200
    cursor-pointer
  "
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUser className="text-lg text-primary-50" />

              <h6 className="text-sm font-medium text-primary-50">{fName}</h6>
            </div>

            {/* Dropdown menu */}
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-primary-100">
              {(user.role === "teacher" && <Link
                to={`/account/${userId}`}
                className="flex items-center px-4 py-3 text-sm text-primary-700 hover:bg-primary-50 transition-colors duration-150"
                onClick={() => setShowDropdown(false)}
              >
                <FaUser className="mr-3 text-primary-400" />
                Your Profile
              </Link>)}

                <button
                  className="flex items-center w-full text-left px-4 py-3 text-sm text-secondary hover:bg-primary-50 transition-colors duration-150"
                  onClick={async () => {
                    try {
                      localStorage.removeItem("user");
                      localStorage.removeItem("token");
                      localStorage.removeItem("isAuthenticated");
                      setShowDropdown(false);
                      navigate("/");
                    } catch (error) {
                      console.error("Logout failed:", error);
                      alert("حدث خطأ أثناء تسجيل الخروج");
                    }
                  }}
                >
                  <FaSignOutAlt className="mr-3 text-secondary" />
                  logout
                </button>
                <div className="px-4 py-2 border-t border-primary-100 bg-primary-50 text-xs text-primary-500">
                  E D U
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* مربع البحث للجوال */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-primary-800 text-white placeholder-primary-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-accent-500 w-full"
          />
          <FaSearch className="absolute left-3 top-3 text-primary-300" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
