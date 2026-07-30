import TeacherProfile from "../components/TeacherProfile";
import { getUserById } from "../services/authService";
import { getArticlesByUserId, deleteArticle } from "../services/articleService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const [userData, setUserData] = useState({});
  const [articles, setArticles] = useState([]);
  const { id: userId } = useParams();
  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const [user, userArticles] = await Promise.all([
          getUserById(userId),
          getArticlesByUserId(userId),
        ]);
        setUserData(user);
        setArticles(userArticles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);
  if (loading) {
    return <div>Loading...</div>;
  }
  const handleDelete = async (articleId) => {
    try {
      await deleteArticle(articleId);

      setArticles((prevArticles) =>
        prevArticles.filter(item => item.article._id !== articleId)
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleRemoveShare = (sharedArticleId) => {
    setArticles((prev) =>
      prev.filter((item) => item.sharedArticleId !== sharedArticleId),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 pt-20">
      <TeacherProfile
        teacher={userData}
        articles={articles}
        currentUser={currentUser.id}
        currentUserRole={currentUser.role}
        handleDelete={handleDelete}
        handleRemoveShare={handleRemoveShare}
      />
    </div>
  );
};

export default Profile;
