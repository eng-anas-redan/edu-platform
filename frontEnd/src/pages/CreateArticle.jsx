import React from "react";
import ArticleForm from "../components/ArticleForm";
import { createArticle } from "../services/articleService";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const navigate = useNavigate();
  const handleCreate = async (formData) => {
    await createArticle(formData);
    navigate("/home");
  };
  return (
    <div className="min-h-screen bg-gradient-to-bl from-primary-600 via-blue-950 to-primary-700 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Create your Article
        </h2>

        <ArticleForm onSubmit={handleCreate} buttonText="Create" />
      </div>
    </div>
  );
};

export default CreateArticle;
