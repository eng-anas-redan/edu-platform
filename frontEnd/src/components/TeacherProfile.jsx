import React from "react";
import { FaStar} from "react-icons/fa";
import { PiCertificateLight } from "react-icons/pi";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";
const TeacherProfile = ({ teacher = {}, articles = [], currentUser = "" }) => {
  const {
    fname = "",
    lname = "",
    email = "",
    bio = "",
    specialty = "",
    experience = 0,
    rating = 0,
  } = teacher;

  const fullName = `${fname} ${lname}`.trim();

  return (
    <div className="max-w-6xl mx-auto px-6 pb-10 space-y-6">
      {/* 🔵 HEADER CARD */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 flex items-center gap-5">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-white text-2xl font-bold">
          {fname?.charAt(0) || "?"}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{fullName}</h2>

          <p className="text-gray-300">Teacher {specialty}</p>

          <div className="flex gap-4 mt-2 text-sm text-gray-400">
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <FaStar className="text-yellow-400" size={18} />
              <span>{rating > 0 ? rating : "No rating yet"}</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-300">
              <PiCertificateLight
                className="inline text-yellow-400"
                size={20}
              />
              <span>{experience} yrs experience</span>
            </div>
          </div>
        </div>

        {/* Action */}
        {currentUser === teacher._id && (
          <div className="flex gap-3">
             <Link
              to={`/editAccount/${currentUser}`}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Edit Profile
            </Link>
            <Link
              to="/createArticle"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              + New Article
            </Link>
          </div>
        )}
      </div>

      {/* 🟡 GRID SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: INFO */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5">
          <h3 className="text-white text-lg font-semibold">Info</h3>

          <div className="text-sm text-gray-400 space-y-2">
            <p>
              <span className="font-medium">Email:</span> {email}
            </p>
            <p>
              <span className="font-medium">Experience:</span> {experience}{" "}
              years
            </p>
          </div>
        </div>

        {/* RIGHT: BIO / SECTIONS */}
        <div className="md:col-span-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5">
          <h3 className="text-white text-lg font-semibold mb-3">Bio</h3>

          <p className="text-gray-400 leading-relaxed">
            {bio || "No bio added yet."}
          </p>
        </div>
      </div>
      {/* Future section placeholder */}
      <div className="text-center">
        <h3 className="text-white text-xl font-semibold mb-5">
          Articles ({articles.length})
        </h3>
        {articles.length === 0 ? (
          <p className="text-gray-500">No articles yet.</p>
        ) : (
          articles.map((article) => (
            <div key={article._id} className="flex justify-center">
              <ArticleCard
                currentUser={currentUser}
                id={article._id}
                title={article.title}
                content={article.content}
                tags={article.tags}
                images={article.images}
                likes={article.likes}
                comments={article.commentsCount}
                authorFirstName={article.author.fname}
                authorLastName={article.author.lname}
                createdAt={article.createdAt}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
