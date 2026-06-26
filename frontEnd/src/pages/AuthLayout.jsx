import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../assets/lightLogo.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-primary-600 via-blue-950 to-primary-700 text-white flex items-center justify-center">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* LEFT SIDE */}
        <div className="flex flex-col items-center text-center gap-8">
          <img
            src={Logo}
            alt="Logo"
            className="w-52 hover:scale-105 transition rounded-xl"
          />

          <p className="text-gray-300 text-3xl leading-relaxed max-w-md">
            <span className="block">Study anywhere.</span>
            <span className="block">Study anytime.</span>
            <span className="block" >Stream your studies.</span>
          </p>
        </div>

        {/* RIGHT SIDE (Login/Register will appear here) */}
        <div className="w-full max-w-md">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;