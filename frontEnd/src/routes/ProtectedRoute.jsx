import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!allowedRoles.includes(payload.role)) {
      return <Navigate to="/home" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;