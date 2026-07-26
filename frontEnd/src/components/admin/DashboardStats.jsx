import { useEffect, useState } from "react";
import { getStats } from "../../services/adminService";

const DashboardStats = ({ sections }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p>Loading...</p>;
  }

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <div
        onClick={() => scrollToSection(sections.articles)}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-blue-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
      >
        <h3 className="text-slate-300">Users</h3>

        <p className="text-4xl font-bold text-white mt-2">{stats.users}</p>
      </div>

      <div
        onClick={() => scrollToSection(sections.users)}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-blue-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
      >
        <h3 className="text-slate-300">Articles</h3>

        <p className="text-4xl font-bold text-white mt-2">{stats.articles}</p>
      </div>

      <div
        onClick={() => scrollToSection(sections.comments)}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-blue-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
      >
        <h3 className="text-slate-300">Comments</h3>

        <p className="text-4xl font-bold text-white mt-2">{stats.comments}</p>
      </div>
      <div
        onClick={() => scrollToSection(sections.requests)}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-blue-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
      >
        <h3 className="text-slate-300">Verification Request</h3>

        <p className="text-4xl font-bold text-white mt-2">
          {stats.verificationRequests}
        </p>
      </div>

      <div
        onClick={() => scrollToSection(sections.reports)}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-blue-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
      >
        <h3 className="text-slate-300">Reports</h3>

        <p className="text-4xl font-bold text-white mt-2">{stats.reports}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
