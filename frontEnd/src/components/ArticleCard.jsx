import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { likedArticle } from "../services/articleService";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash, FaEdit, FaShare } from "react-icons/fa";
import { TbMessageReportFilled } from "react-icons/tb";
import ReportModal from "../components/ReportModal"
const ArticleCard = ({
  currentUser,
  currentUserRole,
  id,
  title = "",
  content = "",
  tags = [],
  images = [],
  likes = [],
  comments = 0,
  authorId,
  authorFirstName,
  authorLastName,
  createdAt,
  handleDelete,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const isOwner = currentUser === authorId;
  const isAdmin = currentUserRole === "admin";
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    setIsLiked(likes.some((userId) => userId.toString() === currentUser));
    setLikesCount(likes.length);
  }, [likes, currentUser]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleLike = async () => {
    try {
      await likedArticle(id);

      if (isLiked) {
        setLikesCount((prev) => prev - 1);
      } else {
        setLikesCount((prev) => prev + 1);
      }

      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      dir="auto"
      className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl mb-4 "
      dir="auto"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center font-bold text-white">
            {authorFirstName.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-primary-300">
              {authorFirstName} {authorLastName}
            </h3>
            <p className="text-xs text-center text-gray-400">
              {new Date(createdAt).toLocaleDateString("ar-EG")}
            </p>
          </div>
        </div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      <div className=" text-sm text-start text-gray-300">
        {content.length > 400 ? `${content.slice(0, 200)}...` : content}
        <div className="mt-2">
          <Link
            to={`/articles/${id}`}
            dir="rtl"
            className="
    inline-flex
    items-center
    text-primary-300
    hover:text-white
    font-medium
    transition-colors
  "
          >
            عرض المزيد →
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden mt-4">
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200"
              aria-label={"الصورة السابقة"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200"
              aria-label={"الصورة التالية"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </>
        )}
        <div className="flex justify-center">
          {images.length > 0 && (
            <img
              className="object-cover rounded-md mx-auto"
              src={`http://localhost:5000${images[currentImageIndex]}`}
              alt={`صورة للمقال ${title}`}
              loading="lazy"
            />
          )}
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      {/* Interaction buttons */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
        <div className="flex space-x-3">
          <button
            onClick={handleLike}
            className="flex items-center gap-1
text-gray-300
hover:text-white
transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                isLiked
                  ? "fill-current text-red-500"
                  : "fill-current text-gray-300"
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={isLiked ? 0 : 2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm">{likesCount}</span>
          </button>

          <Link
            to={`/articles/${id}`}
            className="
flex items-center gap-1
text-gray-300
hover:text-white
transition-colors
"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-sm">{comments}</span>
          </Link>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-1
text-gray-300
hover:text-white
transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <BsThreeDotsVertical />
          </button>
          {showDropdown && (
            <div className="absolute right-0 bottom-full translate-y-[-8px] w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-primary-100">
              <Link
                to={`/shareArticle`}
                className="flex items-center px-4 py-3 text-sm text-primary-700 hover:bg-primary-50 transition-colors duration-150"
                onClick={() => setShowDropdown(false)}
              >
                <FaShare className="mr-3 text-primary-400" />
                Share
              </Link>
              {isOwner && (
                <Link
                  to={`/updateArticle/${id}`}
                  className="flex items-center px-4 py-3 text-sm text-primary-700 hover:bg-primary-50 transition-colors duration-150"
                  onClick={() => setShowDropdown(false)}
                >
                  <FaEdit className="mr-3 text-primary-400" />
                  Edit
                </Link>
              )}
              {!isOwner && (
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    setShowReport(true);
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-primary-700 hover:bg-primary-50 transition-colors duration-150"
                >
                  <TbMessageReportFilled className="mr-3 text-lg text-primary-400" />
                  Report
                </button>
              )}
              {(isOwner || isAdmin) && (
                <button
                  onClick={() => {
                    handleDelete(id);
                    setShowDropdown(false);
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                >
                  <FaTrash className="mr-3" />
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* =========== */}
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, index) => (
          <span
            className="bg-white/10 text-gray-200 rounded-md px-2 py-1 text-xs"
            key={index}
          >
            {" "}
            #{tag}{" "}
          </span>
        ))}
      </div>
      <ReportModal
    articleId={id}
    isOpen={showReport}
    onClose={() => setShowReport(false)}
/>
    </div>
    
  );
};

export default ArticleCard;
