import { useState, useEffect } from "react";
import { getAllComments , editComment , deleteComment } from "../../services/commentService";
import { FaTrash, FaEdit } from "react-icons/fa";

const CommentsTable = () => {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getAllComments();
        console.log(data);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, []);

  const startEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditContent(comment.content);
  };
  const handleEdit = async (commentId) => {
    try {

    const data = await editComment({content : editContent} , commentId);
    console.log(data)
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
        prevComments.filter((comment => comment._id !== commentId)),
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Comments</h2>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left text-blue-200">Article Title</th>
                <th className="p-4 text-left text-blue-200">Author</th>
                <th className="p-4 text-left text-blue-200">Content</th>
                <th className="p-4 text-center text-blue-200">Update</th>
                <th className="p-4 text-center text-blue-200">Delete</th>
              </tr>
            </thead>

            <tbody>
              {comments.map((comment) => (
                <tr
                  key={comment._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all duration-200"
                >
                  <td className="p-4 text-white font-medium">
                     {comment.article.title}
                  </td>
                  <td className="p-4 text-white font-medium">
                     {comment.author
                      ? `${comment.author.fname} ${comment.author.lname}`
                      : "Unknown"}
                  </td>

                  <td className="p-4 text-slate-400">
                    {editingCommentId === comment._id ? (
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full rounded-lg bg-slate-900/80 border border-slate-700 p-2 text-white"
                      />
                    ) : (
                      comment.content.slice(0, 100) + "..."
                    )}
                  </td>

                  <td className="p-4 text-center">
                    {editingCommentId === comment._id ? (
                      <button
                        onClick={() => handleEdit(comment._id)}
                        className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="text-cyan-400 hover:text-cyan-300"
                        onClick={() => startEdit(comment)}
                      >
                        <FaEdit />
                      </button>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    {editingCommentId === comment._id ? (
                      <button
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditContent("");
                        }}
                        className="px-3 py-1 rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button 
                  onClick={() => handleDelete(comment._id)} className="text-red-400 hover:text-red-300">
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommentsTable;
