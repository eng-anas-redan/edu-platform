import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AuthLayout from "../pages/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateArticle from "../pages/CreateArticle";
import ProtectedRoute from "./ProtectedRoute";
import UpdateArticle from "../pages/UpdateArticle";
import Article from "../pages/Article";
import AdminDashboard from "../pages/AdminDashboard";
import CreateRequest from "../pages/createRequest";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from "/" → "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createRequest"
          element={
            <ProtectedRoute>
              <CreateRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createArticle"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <CreateArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateArticle/:id"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <UpdateArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articles/:id"
          element={
              <Article />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
