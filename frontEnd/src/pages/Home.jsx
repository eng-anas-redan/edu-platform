import Navbar from "../components/Navbar";
import { getArticles, deleteArticle } from "../services/articleService";
import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
const Home = () => {
  const userData = JSON.parse(localStorage.getItem("user")) || {};
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticlesData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (articleId) => {
    try {
      await deleteArticle(articleId);

      setArticlesData((prevArticles) =>
        prevArticles.filter((article) => article._id !== articleId),
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 text-white flex items-center justify-center mx-10 pt-20">
      <Navbar userId={userData.id} fName={userData?.fname} />
      <div className="text-center">
        {articlesData.map((article) => (
          <div key={article._id}>
            <ArticleCard
              currentUser={userData?.id}
              currentUserRole={userData.role}
              id={article._id}
              title={article.title}
              content={article.content}
              tags={article.tags}
              images={article.images}
              likes={article.likes}
              comments={article.commentsCount}
              authorId={article.author._id}
              authorFirstName={article.author.fname}
              authorLastName={article.author.lname}
              createdAt={article.createdAt}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
