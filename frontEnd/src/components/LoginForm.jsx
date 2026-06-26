import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) return;
    try {
      const data = await loginUser({
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
    console.log({ email, password });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={8}
              className="
              w-full
              px-4
              py-3
              pr-12
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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
  absolute
  right-4
  inset-y-0
  flex
  items-center
  text-gray-400
  hover:text-white
"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

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
          Sign In
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-300">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-primary-300 hover:text-white font-medium transition"
        >
          Create one
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
