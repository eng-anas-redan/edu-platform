import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { likedArticle } from "../services/articleService";

const ArticleCard = ({
  currentUser,
  id,
  title = "",
  content = "",
  tags = [],
  images = [],
  likes = [],
  comments = 0,
  authorFirstName,
  authorLastName,
  createdAt,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);

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
      className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl mb-4"
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

        <button
          className="flex items-center gap-1
text-gray-300
hover:text-white
transition-colors"
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
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
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
    </div>
  );
};

export default ArticleCard;
