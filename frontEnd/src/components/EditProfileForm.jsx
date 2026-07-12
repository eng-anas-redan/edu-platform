import React, { useState } from "react";
import { useEffect } from "react";
import { getUserById } from "../services/authService";
const EditProfileForm = ({ onSubmit }) => {
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {if(currentUser.id)
        {
    const fetchUser = async () => {
      try {
        const data = await getUserById(currentUser.id);
        setEmail(data.email || "");
        setBio(data.bio || "");
        setExperience(data.experience ||"");}
       catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }}, [currentUser.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onSubmit({ email: email, bio: bio, experience: experience });
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2 text-white">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@domain.com"
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
        Save Your Update
      </button>
    </form>
  );
};

export default EditProfileForm;
