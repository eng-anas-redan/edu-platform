import { useEffect, useState } from "react";
import { getStats } from "../../services/adminService";

const DashboardStats = () => {
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

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <h3 className="text-slate-300">
          Users
        </h3>

        <p className="text-4xl font-bold text-white mt-2">
          {stats.users}
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <h3 className="text-slate-300">
          Articles
        </h3>

        <p className="text-4xl font-bold text-white mt-2">
          {stats.articles}
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <h3 className="text-slate-300">
          Comments
        </h3>

        <p className="text-4xl font-bold text-white mt-2">
          {stats.comments}
        </p>
      </div>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <h3 className="text-slate-300">
          Verification Request
        </h3>

        <p className="text-4xl font-bold text-white mt-2">
          {stats.verificationRequests}
        </p>
      </div>

    </div>
  );
};

export default DashboardStats;