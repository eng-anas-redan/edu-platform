import { useState, useEffect } from "react";
import {
  getRequests,
  approveRequest,
  rejectRequest,
} from "../../services/requestsService";
import { FaCheck, FaTimes } from "react-icons/fa";

const VerificationRequest = () => {
  const [requests, setRequests] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const IMAGE_URL = "http://localhost:5000";

  const imageStyle =
    "w-20 h-20 object-cover rounded-xl border border-slate-600 shadow-md cursor-pointer hover:scale-110 hover:shadow-xl transition-all duration-300 mx-auto";

  const fetchRequests = async () => {
    setLoading(true);

    try {
      const data = await getRequests();
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await approveRequest(requestId);
      await fetchRequests();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);
      await fetchRequests();
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading)
    return (
      <p className="text-white text-center text-lg py-10">
        Loading...
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Verification Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-gray-400 text-center">
          No verification requests
        </p>
      ) : (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-blue-200">
                    Status
                  </th>

                  <th className="p-4 text-left text-blue-200">
                    Name
                  </th>

                  <th className="p-4 text-left text-blue-200">
                    Email
                  </th>

                  <th className="p-4 text-left text-blue-200">
                    Bio
                  </th>
                  <th className="p-4 text-left text-blue-200">
                    Specialty
                  </th>
                  <th className="p-4 text-center text-blue-200">
                    Experience
                  </th>

                  <th className="p-4 text-center text-blue-200">
                    Front ID
                  </th>

                  <th className="p-4 text-center text-blue-200">
                    Back ID
                  </th>

                  <th className="p-4 text-center text-blue-200">
                    Certificate
                  </th>

                  <th className="p-4 text-center text-blue-200">
                    Other Documents
                  </th>

                  <th className="p-4 text-center text-blue-200">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>{requests.map((request) => (
                  <tr
                    key={request._id}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-200"
                  >
                    {/* STATUS */}
                    <td className="p-4 text-white font-medium">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          request.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : request.status === "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>

                    {/* NAME */}
                    <td className="p-4 text-white font-medium">
                      {request.user?.fname} {request.user?.lname}
                    </td>

                    {/* EMAIL */}
                    <td className="p-4 text-white font-medium">
                      {request.user?.email}
                    </td>

                    {/* BIO */}
                    <td className="p-4 text-slate-400 max-w-xs break-words">
                      {request.bio}
                    </td>
                    {/* SPECIALTY */}
                    <td className="p-4 text-slate-400 max-w-xs break-words">
                      {request?.specialty}
                    </td>

                    {/* EXPERIENCE */}
                    <td className="p-4 text-center">
                      {request.experience}
                    </td>

                    {/* FRONT ID */}
                    <td className="p-4 text-center">
                      {request.documents?.idCard?.front ? (
                        <img
                          src={`${IMAGE_URL}${request.documents.idCard.front}`}
                          alt="Front ID"
                          onClick={() =>
                            setSelectedImage(
                              `${IMAGE_URL}${request.documents.idCard.front}`
                            )
                          }
                          className={imageStyle}
                        />
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>

                    {/* BACK ID */}
                    <td className="p-4 text-center">
                      {request.documents?.idCard?.back ? (
                        <img
                          src={`${IMAGE_URL}${request.documents.idCard.back}`}
                          alt="Back ID"
                          onClick={() =>
                            setSelectedImage(
                              `${IMAGE_URL}${request.documents.idCard.back}`
                            )
                          }
                          className={imageStyle}
                        />
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>

                    {/* CERTIFICATE */}
                    <td className="p-4 text-center">
                      {request.documents?.certificate ? (
                        <img
                          src={`${IMAGE_URL}${request.documents.certificate}`}
                          alt="Certificate"
                          onClick={() =>
                            setSelectedImage(
                              `${IMAGE_URL}${request.documents.certificate}`
                            )
                          }
                          className={imageStyle}
                        />
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>

                    {/* OTHER DOCUMENTS */}
                    <td className="p-4">
                      <div className="flex flex-wrap justify-center gap-2">
                        {request.documents?.otherDocuments?.length ? (
                          request.documents.otherDocuments.map((doc, index) => (
                            <img
                              key={index}
                              src={`${IMAGE_URL}${doc}`}
                              alt={`Document ${index + 1}`}
                              onClick={() =>
                                setSelectedImage(`${IMAGE_URL}${doc}`)
                              }
                              className="w-16 h-16 object-cover rounded-lg border border-slate-500 shadow hover:scale-110 transition-all duration-300 cursor-pointer"
                            />
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">—</span>
                        )}
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4 text-center">
                      {request.status === "pending" ? (
                        <div className="flex justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleApprove(request._id)}
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            <FaCheck size={18} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleReject(request._id)}
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

          {/* IMAGE MODAL */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-5 right-5 text-white text-4xl"
              >
                ×
              </button>

              <img
                src={selectedImage}
                alt="Preview"
                className="max-w-[90%] max-h-[90%] rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerificationRequest;