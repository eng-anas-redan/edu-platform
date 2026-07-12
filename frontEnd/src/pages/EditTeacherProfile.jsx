import React from "react";
import EditProfileForm from "../components/EditProfileForm";
import {  updateUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const EditTeacherProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();


  const handleUpdate = async (userData) => {
    await updateUser(userData , currentUser.id);
    navigate(`/account/${currentUser.id}`);
  };
  return (
    <div className="min-h-screen bg-gradient-to-bl from-primary-600 via-blue-950 to-primary-700 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Update your Information
        </h2>
        <EditProfileForm
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
};

export default EditTeacherProfile;
