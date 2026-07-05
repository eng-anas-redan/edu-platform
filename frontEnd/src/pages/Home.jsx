import React from "react";
import Navbar from "../components/Navbar";
import { getArticles } from "../services/articleService";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 text-white flex items-center justify-center mx-10 pt-20">
      <Navbar userId={userData.id} fName={userData?.fname} />
      <div className="text-center">
        {articlesData.map((article) => (
          <div key={article._id}>
            <ArticleCard
              currentUser={userData?.id}
              id = {article._id}
              title={article.title}
              content={article.content}
              tags={article.tags}
              images={article.images}
              likes={article.likes}
              comments={article.commentsCount}
              authorFirstName ={article.author.fname}
              authorLastName ={article.author.lname}
              createdAt = {article.createdAt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
