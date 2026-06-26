import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { getArticleById, updateArticle } from "../services/articleService";

const UpdateArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticleById(id);
      setArticle(data);
    };

    fetchArticle();
  }, [id]);

  const handleUpdate = async (formData) => {
    await updateArticle(id, formData);
    navigate("/home");
  };

  if (!article) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-primary-600 via-blue-950 to-primary-700 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Create your Article
        </h2>
      <ArticleForm
        initialTitle={article.title}
        initialContent={article.content}
        initialTags={article.tags?.join(",")}
        onSubmit={handleUpdate}
        buttonText="Update"
      />
    </div>
    </div>
  );
};

export default UpdateArticle;