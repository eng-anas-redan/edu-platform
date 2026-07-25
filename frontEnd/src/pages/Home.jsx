import Navbar from "../components/Navbar";
import {
  getArticles,
  deleteArticle,
  getAllTags,
} from "../services/articleService";
import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import FilterSidebar from "../components/FilterSidebar";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("user")) || {};

  const [articlesData, setArticlesData] = useState([]);
  const [tags, setTags] = useState([]);

  const [tag, setTag] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await getArticles();
        const allTags = await getAllTags();

        setArticlesData(articles);
        setTags(allTags);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (word) => {
    try {
      const data = await getArticles(
        word.trim() ? { word } : {}
      );

      setArticlesData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilters = async () => {
    try {
      const data = await getArticles({
        tag,
        sort,
      });

      setArticlesData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetFilters = async () => {
    setTag("");
    setSort("");

    const data = await getArticles();
    setArticlesData(data);
  };

  const handleDelete = async (articleId) => {
    try {
      await deleteArticle(articleId);

      setArticlesData((prevArticles) =>
        prevArticles.filter(
          (article) => article._id !== articleId
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Navbar
        userId={userData.id}
        fName={userData?.fname}
        onSearch={handleSearch}
      />

      <div
        className="
        min-h-screen
        bg-gradient-to-br
        from-slate-800
        via-blue-950
        to-slate-900
        text-white
        px-10
        pt-24
        "
      >

        <div
          className="
          w-full
          max-w-[1400px]
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-4
          gap-6
          "
        >

          {/* Filters */}
          <aside className="lg:col-span-1">
            <FilterSidebar
              tags={tags}
              tag={tag}
              setTag={setTag}
              sort={sort}
              setSort={setSort}
              onApply={handleFilters}
              onReset={resetFilters}
            />
          </aside>


          {/* Articles */}
          <section className="lg:col-span-3 space-y-6">

            {articlesData.length === 0 ? (
              <div
                className="
                text-center
                text-gray-300
                py-20
                text-xl
                "
              >
                No articles found
              </div>
            ) : (

              articlesData.map((article) => (

                <ArticleCard
                  key={article._id}
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

              ))
            )}

          </section>

        </div>

      </div>
    </>
  );
};

export default Home;