import React from "react";
import { getArticleById } from "../services/articleService";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  getComments,
  createComment,
  editComment,
  deleteComment,
} from "../services/commentService";
import { likedArticle } from "../services/articleService";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [content, setContent] = useState();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const userData = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticleById(id);
      setArticle(data);
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    const fetchComment = async () => {
      const data = await getComments(id);
      setComments(Array.isArray(data.comments) ? data.comments : []);
    };
    fetchComment();
  }, [id]);

  useEffect(() => {
    if (article) {
      setIsLiked(
        article.likes.some((userId) => userId.toString() === userData.id),
      );
      setLikesCount(article.likes.length);
    }
  }, [article, userData.id]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? article.images.length - 1 : prevIndex - 1,
    );
  };
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === article.images.length - 1 ? 0 : prevIndex + 1,
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment({ content }, id);
      const commentsData = await getComments(id);
      setComments(commentsData.comments);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditContent(comment.content);
  };
  const handleEdit = async (commentId) => {
    try {
      await editComment({ content: editContent }, commentId);

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: editContent }
            : comment,
        ),
      );

      setEditingCommentId(null);
      setEditContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);

      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId),
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 text-white flex items-center justify-center mx-10 pt-20">
      <div
        dir="auto"
        className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl mb-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <div>
            <h3 className="font-semibold text-primary-300">
              {article.author.fname} {article.author.lname}
            </h3>

            <p className="text-xs text-center text-gray-400">
              {new Date(article.createdAt).toLocaleDateString("ar-EG")}
            </p>
          </div>

          <h2 className="text-lg font-bold text-white">{article.title}</h2>
        </div>
        <div className=" text-sm text-end text-gray-300">{article.content}</div>

        <div className="relative overflow-hidden mt-4">
          {article.images.length > 1 && (
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
            {article.images.length > 0 && (
              <img
                className="object-cover rounded-md mx-auto"
                src={`http://localhost:5000${article.images[currentImageIndex]}`}
                alt={`صورة للمقال ${article.title}`}
                loading="lazy"
              />
            )}
          </div>

          {article.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {article.images.map((_, index) => (
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
          {article.tags.map((tag, index) => (
            <span
              className="bg-white/10 text-gray-200 rounded-md px-2 py-1 text-xs"
              key={index}
            >
              {" "}
              #{tag}{" "}
            </span>
          ))}
        </div>
        <div className="mt-6 border-t border-white/10 pt-4">
          <h3 className="text-lg font-semibold mb-4">
            التعليقات ({comments.length})
          </h3>
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">أضف تعليقاً</h3>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="اكتب تعليقك هنا..."
                rows={4}
                className="
      w-full
      resize-none
      px-4
      py-3
      rounded-xl
      bg-white/5
      border
      border-white/10
      text-white
      placeholder:text-gray-400
      focus:outline-none
      focus:ring-2
      focus:ring-primary-400
      focus:border-transparent
    "
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="
        px-6
        py-2.5
        rounded-xl
        bg-primary-600
        hover:bg-primary-700
        text-white
        font-medium
        transition-all
        duration-200
      "
                >
                  نشر التعليق
                </button>
              </div>
            </form>
          </div>
          {comments.length === 0 ? (
            <div className="bg-white/5 rounded-lg p-4 text-center text-gray-400">
              لا توجد تعليقات بعد. كن أول من يعلق ✨
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="flex flex-cols items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center font-bold">
                      {comment.author.fname.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {comment.author.fname} {comment.author.lname}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "ar-EG",
                        )}
                      </p>
                    </div>
                  </div>

                  {editingCommentId === comment._id ? (
                    <div className="mt-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 rounded bg-white/10"
                      />
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => handleEdit(comment._id)}
                          className="bg-green-600 px-3 py-1 rounded"
                        >
                          حفظ
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="bg-gray-600 px-3 py-1 rounded"
                        >
                          إلغاء
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start mt-2">
                      <p className="text-gray-200">{comment.content}</p>
                      {comment.author._id === userData.id && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(comment)}
                            className="text-gray-300 hover:text-white transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(comment._id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;
