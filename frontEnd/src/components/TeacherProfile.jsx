import { FaStar } from "react-icons/fa";
import { PiCertificateLight } from "react-icons/pi";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import RatingStars from "./RatingStars";
import { rateTeacher, getTeacherRating } from "../services/ratingService";
const TeacherProfile = ({
  teacher = {},
  articles = [],
  currentUser = "",
  currentUserRole = "",
  handleDelete,
  handleRemoveShare,
}) => {
  const handleRate = async (value) => {
    try {
      await rateTeacher({
        teacherId: teacher._id,
        rating: value,
      });

      const data = await getTeacherRating(teacher._id);

      setMyRating(data.myRating);
      setAverageRating(data.averageRating);
    } catch (error) {
      console.log(error);
    }
  };
  const {
    fname = "",
    lname = "",
    email = "",
    bio = "",
    specialty = "",
    experience = 0,
  } = teacher;

  const fullName = `${fname} ${lname}`.trim();
  const canRate = currentUserRole === "student" && currentUser !== teacher._id;
  const [myRating, setMyRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const data = await getTeacherRating(teacher._id);

        setAverageRating(data.averageRating);
        setMyRating(data.myRating || 0);
      } catch (error) {
        console.log(error);
      }
    };

    if (teacher._id) {
      fetchRating();
    }
  }, [teacher._id]);
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

          <p className="text-gray-300">{specialty} teacher</p>
          {/* Experience */}
          <div className="flex items-center gap-2 mt-2 text-gray-300">
            <PiCertificateLight className="text-yellow-400" size={18} />
            <span>{experience} yrs experience</span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="space-y-2">
              {/* Average Rating */}
              <div className="flex items-center gap-3">
                <RatingStars rating={averageRating} />

                <span className="text-gray-300 font-medium">
                  {averageRating > 0 ? averageRating : "No rating yet"}
                </span>
              </div>

              {/* Student Rating */}
              {canRate && (
                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-1">
                    Rate this teacher
                  </p>

                  <RatingStars rating={myRating} editable onRate={handleRate} />
                </div>
              )}
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
          articles.map((item) => (
            <div
              key={`${item.type}-${item.sharedArticleId || item.article._id}`}
              className="flex justify-center"
            >
              <ArticleCard
                currentUser={currentUser}
                currentUserRole={currentUserRole}
                id={item.article._id}
                title={item.article.title}
                content={item.article.content}
                tags={item.article.tags}
                images={item.article.images}
                likes={item.article.likes}
                comments={item.article.commentsCount}
                authorId={item.article.author._id}
                authorFirstName={item.article.author.fname}
                authorLastName={item.article.author.lname}
                createdAt={item.article.createdAt}
                sharedAt={item.sharedBy ? item.createdAt : null}
                sharedBy={item.sharedBy}
                isShared={item.isShared}
                sharedArticleId={item.sharedArticleId}
                handleDelete={handleDelete}
                handleRemoveShare={handleRemoveShare}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
