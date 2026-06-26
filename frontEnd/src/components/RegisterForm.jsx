import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // تصفير الخطأ أولاً

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const data = await registerUser({
        fname: firstName,
        lname: lastName,
        email,
        password,
      });

      console.log(data);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* fname */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              First name :
            </label>

            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter you First Name"
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
          {/*lname */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Last name :
            </label>

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter you Last Name"
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
        </div>
        {/* Email */}
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
        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            minLength={8}
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
        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
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

          <div className="flex justify-end mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-primary-300 hover:text-white transition"
            >
              Forgot password?
            </Link>
          </div>
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
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-300">
        Already Registered ?{" "}
        <Link
          to="/login"
          className="text-primary-300 hover:text-white font-medium transition"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
