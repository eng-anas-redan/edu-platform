import { useState, useEffect } from "react";
import {
  getArticles,
  updateArticle,
  deleteArticle,
} from "../../services/articleService";
import { FaTrash, FaEdit } from "react-icons/fa";

const ArticlesTable = () => {
  const [articles, setArticles] = useState([]);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        console.log(data);
        setArticles(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticles();
  }, []);

  const startEdit = (article) => {
    setEditingArticleId(article._id);
    setEditContent(article.content);
  };
  const handleEdit = async (articleId) => {
    try {
    const formData = new FormData();

    formData.append("content", editContent);
    await updateArticle(articleId, formData);

      setArticles((prev) =>
        prev.map((article) =>
          article._id === articleId
            ? { ...article, content: editContent }
            : article,
        ),
      );

      setEditingArticleId(null);
      setEditContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (articleId) => {
    try {
      await deleteArticle(articleId);

      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== articleId),
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Articles</h2>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left text-blue-200">Title</th>
                <th className="p-4 text-left text-blue-200">Author</th>
                <th className="p-4 text-left text-blue-200">Content</th>
                <th className="p-4 text-center text-blue-200">Update</th>
                <th className="p-4 text-center text-blue-200">Delete</th>
              </tr>
            </thead>

            <tbody>
              {articles.map((article) => (
                <tr
                  key={article._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all duration-200"
                >
                  <td className="p-4 text-white font-medium">
                    {article.title}
                  </td>

                  <td className="p-4 text-slate-300">
                    {article.author
                      ? `${article.author.fname} ${article.author.lname}`
                      : "Unknown"}
                  </td>

                  <td className="p-4 text-slate-400">
                    {editingArticleId === article._id ? (
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full rounded-lg bg-slate-900/80 border border-slate-700 p-2 text-white"
                      />
                    ) : (
                      article.content.slice(0, 100) + "..."
                    )}
                  </td>

                  <td className="p-4 text-center">
                    {editingArticleId === article._id ? (
                      <button
                        onClick={() => handleEdit(article._id)}
                        className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="text-cyan-400 hover:text-cyan-300"
                        onClick={() => startEdit(article)}
                      >
                        <FaEdit />
                      </button>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    {editingArticleId === article._id ? (
                      <button
                        onClick={() => {
                          setEditingArticleId(null);
                          setEditContent("");
                        }}
                        className="px-3 py-1 rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button 
                  onClick={() => handleDelete(article._id)} className="text-red-400 hover:text-red-300">
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

export default ArticlesTable;
