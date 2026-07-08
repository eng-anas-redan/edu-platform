import React from "react";
import { FaStar , FaArrowRight} from "react-icons/fa";
import { PiCertificateLight } from "react-icons/pi";
import { Link } from "react-router-dom";
const ProfileCard = ({
  id,
  fName = "",
  lName = "",
  specialty,
  experience,
  rating = 0,
}) => {
  return (
    <div
      dir="auto"
      className="flex flex-col items-center w-full h-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-xl
      hover:scale-[1.03]
hover:border-primary-500
hover:shadow-blue-500/20
transition-all duration-300"
    >
      <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-white text-4xl font-bold m-2">
        {fName?.charAt(0) || "?"}
      </div>
      <h2 className="text-md font-bold text-white mb-2">
        {fName} {lName}
      </h2>
      <p className="px-3 py-1 rounded-full bg-emerald-500/20
text-emerald-300 text-sm">
        {specialty} Teacher
      </p>

      <div className="grid grid-cols-2 gap-3 w-full mt-5">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <FaStar className="mx-auto text-yellow-400" />
          <p className="mt-1 text-sm">{rating || "No Reviews Yet"}</p>
        </div>

        <div className="bg-white/5 rounded-xl p-3 text-center">
          <PiCertificateLight className="mx-auto text-blue-400" />
          <p className="mt-1 text-sm">{experience} Years</p>
        </div>
      </div>
      <Link
        to={`/account/${id}`}
        className="mt-6
        text-center
        w-full
        py-3
        rounded-xl
        bg-primary-500
        hover:bg-primary-600
        font-semibold
        transition"
      >
        View Profile
        <FaArrowRight className="inline text-md m-2" />
      </Link>
    </div>
  );
};

export default ProfileCard;
