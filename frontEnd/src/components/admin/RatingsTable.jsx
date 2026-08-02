import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  getAllRatings,
  deleteRating,
} from "../../services/ratingService";

const RatingsTable = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRatings = async () => {
    setLoading(true);

    try {
      const data = await getAllRatings();
      setRatings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this rating?")) {
      return;
    }

    try {
      await deleteRating(id);
      await fetchRatings();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return <p className="text-white text-center text-lg py-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Ratings</h2>

      {ratings.length === 0 ? (
        <p className="text-center text-slate-400">No ratings found.</p>
      ) : (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-blue-200">Student</th>

                  <th className="p-4 text-left text-blue-200">Teacher</th>

                  <th className="p-4 text-center text-blue-200">Rating</th>

                  <th className="p-4 text-center text-blue-200">Date</th>

                  <th className="p-4 text-center text-blue-200">Delete</th>
                </tr>
              </thead>

              <tbody>
                {ratings.map((rating) => (
                  <tr
                    key={rating._id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="p-4 text-white">
                      {rating.student.fname} {rating.student.lname}
                    </td>

                    <td className="p-4 text-white">
                      {rating.teacher.fname} {rating.teacher.lname}
                    </td>

                    <td className="p-4 text-center text-yellow-400 font-semibold">
                      ⭐ {rating.rating}/5
                    </td>

                    <td className="p-4 text-center text-slate-300" dir="auto">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(rating._id)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
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

export default RatingsTable;