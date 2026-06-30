import React from "react";
import RequestForm from "../components/RequestForm"
import { createRequest } from "../services/requestsService";
import { useNavigate } from "react-router-dom";

const CreateRequest = () => {
  const navigate = useNavigate();
  const handleCreate = async (formData) => {
    await createRequest(formData);
    navigate("/home");
  };
  return (
    <div className="min-h-screen bg-gradient-to-bl from-primary-600 via-blue-950 to-primary-700 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Create your Verification Request
        </h2>

        <RequestForm onSubmit={handleCreate} />
      </div>
    </div>
  );
};

export default CreateRequest;
