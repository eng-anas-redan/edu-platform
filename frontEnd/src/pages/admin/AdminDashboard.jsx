import DashboardStats from "../../components/admin/DashboardStats";
import ArticlesTable from "../../components/admin/ArticlesTable";
import CommentsTable from "../../components/admin/CommentsTable";
import UsersTable from "../../components/admin/UsersTable";
import VerificationRequest from "../../components/admin/VerificationRequest";
import Reports from "../../components/admin/Reports";
import { useRef } from "react";

const AdminDashboard = () => {
  const articlesRef = useRef(null);
  const commentsRef = useRef(null);
  const usersRef = useRef(null);
  const requestsRef = useRef(null);
  const reportsRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 text-white flex-row items-center justify-center">
      <div className="max-w-7xl mx-auto space-y-8 pt-10">
        <DashboardStats
          sections={{
            articles: articlesRef,
            comments: commentsRef,
            users: usersRef,
            requests: requestsRef,
            reports: reportsRef,
          }}
        />
        <div ref={articlesRef}>
          <ArticlesTable />
        </div>

        <div ref={commentsRef}>
          <CommentsTable />
        </div>
        <div ref={usersRef}>
          <UsersTable />
        </div>
        <div ref={requestsRef}>
          <VerificationRequest />
        </div>
        <div ref={reportsRef}>
          <Reports />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
