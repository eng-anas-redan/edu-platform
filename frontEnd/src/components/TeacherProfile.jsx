import React from "react";

const TeacherProfile = ({ teacher = {} }) => {
  const {
    fname = "",
    lname = "",
    email = "",
    role = "",
    bio = "",
    experience = 0,
    rating = 0,
  } = teacher;

  const fullName = `${fname} ${lname}`.trim();

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">

      {/* 🔵 HEADER CARD */}
      <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-5">
        
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-white text-2xl font-bold">
          {fname?.charAt(0) || "?"}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {fullName}
          </h2>

          <p className="text-gray-500">{role}</p>

          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>⭐ {rating > 0 ? rating : "No rating yet"}</span>
            <span>📚 {experience} yrs experience</span>
          </div>
        </div>

        {/* Action */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Edit Profile
        </button>
      </div>

      {/* 🟡 GRID SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT: INFO */}
        <div className="bg-white shadow rounded-2xl p-5 space-y-4">
          <h3 className="text-lg font-semibold">Info</h3>

          <div className="text-sm text-gray-600 space-y-2">
            <p><span className="font-medium">Email:</span> {email}</p>
            <p><span className="font-medium">Experience:</span> {experience} years</p>
          </div>
        </div>

        {/* RIGHT: BIO / SECTIONS */}
        <div className="md:col-span-2 bg-white shadow rounded-2xl p-5">
          <h3 className="text-lg font-semibold mb-3">Bio</h3>

          <p className="text-gray-600 leading-relaxed">
            {bio || "No bio added yet."}
          </p>

          {/* Future section placeholder */}
          <div className="mt-6 border-t pt-4 text-gray-400 text-sm">
            More sections (subjects, reviews, requests) coming soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;