import { useState } from "react";

const RequestForm = ({
  initialBio = "",
  initialSpecialty="",
  initialExperience = 0,
  initialIdCardFront = "",
  initialIdCardBack = "",
  initialCertificate = "",
  initialOtherDocuments = [],
  onSubmit,
}) => {
  const [bio, setBio] = useState(initialBio);
  const [specialty,setSpecialty] = useState(initialSpecialty);
  const [experience, setExperience] = useState(initialExperience);
  const [idCardFront, setIdCardFront] = useState(initialIdCardFront);
  const [idCardBack, setIdCardBack] = useState(initialIdCardBack);
  const [certificate, setCertificate] = useState(initialCertificate);
  const [otherDocuments, setOtherDocuments] = useState(initialOtherDocuments);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();

      formData.append("bio", bio);
      formData.append("specialty",specialty);
      formData.append("experience", experience);
      formData.append("idCardFront", idCardFront);
      formData.append("idCardBack", idCardBack);
      formData.append("certificate", certificate);

      otherDocuments.forEach((file) => {
        formData.append("otherDocuments", file);
      });

      await onSubmit(formData);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong",
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Bio :
          </label>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter Your Bio"
            rows={4}
            className="
              w-full
              px-4
              py-3
              rounded-lg
              bg-white/10
              border
              border-white/20
              text-white
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-primary-300
            "
            required
          />
        </div>
        {/* specialty */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Specialty :
          </label>
          <input
            type="text"
            value={specialty}
            placeholder="Enter Your Specialty"
            onChange={(e) => setSpecialty(e.target.value)}
            className="
    w-full
    px-4
    py-3
    rounded-lg
    bg-white/10
    border
    border-white/20
    text-white
    placeholder:text-gray-400
    focus:outline-none
    focus:ring-2
    focus:ring-primary-300
  "
            required
          />
        </div>
        {/* experience */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Experience :
          </label>
          <input
            type="number"
            value={experience}
            placeholder="Enter Your Years Of Experience"
            onChange={(e) => setExperience(e.target.value)}
            className="
    w-full
    px-4
    py-3
    rounded-lg
    bg-white/10
    border
    border-white/20
    text-white
    placeholder:text-gray-400
    focus:outline-none
    focus:ring-2
    focus:ring-primary-300
  "
            required
          />
        </div>
        {/* idCardFront */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            IdCardFront :
          </label>

          <input
            placeholder="Upload Your Front-facing Photo of Id"
            type="file"
            accept="image/*"
            name="idCardFront"
            onChange={(e) => setIdCardFront(e.target.files[0])}
            className="
              w-full
              px-4
              py-3
              rounded-lg
              bg-white/10
              border
              border-white/20
              text-white
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-primary-300
            "
          />
        </div>
        {/* idCardBack */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            IdCardBack :
          </label>

          <input
            placeholder="Upload Your Back-facing Photo of Id"
            type="file"
            accept="image/*"
            name="idCardBack"
            onChange={(e) => setIdCardBack(e.target.files[0])}
            className="
              w-full
              px-4
              py-3
              rounded-lg
              bg-white/10
              border
              border-white/20
              text-white
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-primary-300
            "
          />
        </div>
        {/* certificate */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Certificate :
          </label>

          <input
            placeholder="Upload Your Certificate"
            type="file"
            accept="image/*"
            name="certificate"
            onChange={(e) => setCertificate(e.target.files[0])}
            className="
              w-full
              px-4
              py-3
              rounded-lg
              bg-white/10
              border
              border-white/20
              text-white
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-primary-300
            "
          />
        </div>
        {/* certificates */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Other Documents :
          </label>

          <input
            placeholder="Upload Your Other Certificate"
            type="file"
            accept="image/*"
            name="otherDocuments"
            multiple
            onChange={(e) => setOtherDocuments([...e.target.files])}
            className="
              w-full
              px-4
              py-3
              rounded-lg
              bg-white/10
              border
              border-white/20
              text-white
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-primary-300
            "
          />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {/* Submit */}
        <button
          type="submit"
          className="
            w-full
            py-3
            rounded-lg
            bg-primary-600
            hover:bg-primary-700
            text-white
            font-medium
            transition
          "
        >
          Create
        </button>
      </form>
    </>
  );
};

export default RequestForm;
