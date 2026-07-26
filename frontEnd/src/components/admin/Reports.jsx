import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getReports, updateReportStatus } from "../../services/reportService";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);

    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateReportStatus(id, { status });
      await fetchReports();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading)
    return <p className="text-white text-center text-lg py-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Article Reports</h2>

      {reports.length === 0 ? (
        <p className="text-center text-slate-400">No reports found.</p>
      ) : (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-blue-200">Status</th>

                  <th className="p-4 text-left text-blue-200">Reporter</th>

                  <th className="p-4 text-left text-blue-200">Email</th>

                  <th className="p-4 text-left text-blue-200">Article</th>

                  <th className="p-4 text-left text-blue-200">Reason</th>

                  <th className="p-4 text-left text-blue-200">Description</th>

                  <th className="p-4 text-center text-blue-200">View</th>

                  <th className="p-4 text-center text-blue-200">Actions</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr
                    key={report._id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          report.status === "resolved"
                            ? "bg-green-500/20 text-green-400"
                            : report.status === "ignored"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>

                    <td className="p-4 text-white">
                      {report.reporter?.fname} {report.reporter?.lname}
                    </td>

                    <td className="p-4 text-slate-300">
                      {report.reporter?.email}
                    </td>

                    <td className="p-4 text-white">{report.article?.title}</td>

                    <td className="p-4 text-slate-300">{report.reason}</td>

                    <td className="p-4 text-slate-300 max-w-sm break-words">
                      {report.description || "-"}
                    </td>

                    <td className="p-4 text-center">
                      {report.article ? (
                        <Link
                          to={`/articles/${report.article._id}`}
                          className="
      inline-flex
      items-center
      justify-center
      px-4
      py-2
      rounded-lg
      bg-cyan-500/20
      text-cyan-300
      hover:bg-cyan-500/30
      transition
      "
                        >
                          View
                        </Link>
                      ) : (
                        <span className="text-gray-500">Deleted</span>
                      )}
                    </td>

                    <td className="p-4">
                      {report.status === "pending" ? (
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() =>
                              handleUpdateStatus(report._id, "resolved")
                            }
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            <FaCheck size={18} />
                          </button>

                          <button
                            onClick={() =>
                              handleUpdateStatus(report._id, "ignored")
                            }
                            className="text-red-400 hover:text-red-300"
                          >
                            <FaTimes size={18} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
