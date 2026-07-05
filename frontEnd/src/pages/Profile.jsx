import React from "react";
import TeacherProfile from "../components/TeacherProfile";
import { getUserById } from "../services/authService";
import { getArticlesByUserId } from "../services/articleService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [userData, setUserData] = useState({});
  const [articles, setArticles] = useState([]);
  const currentUserId = user.id;
  const {id: userId} = useParams();
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 pt-20">
      <TeacherProfile teacher={userData} articles={articles} currentUser={currentUserId}/>
    </div>
  );
};

export default Profile;
