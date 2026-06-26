import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-10">
        Welcome Back
      </h2>

      <LoginForm />
    </div>
  );
};

export default Login;