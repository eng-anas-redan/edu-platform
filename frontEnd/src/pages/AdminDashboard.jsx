import DashboardStats from "../components/admin/DashboardStats";
import ArticlesTable from "../components/admin/ArticlesTable";
import CommentsTable from "../components/admin/CommentsTable";
import UsersTable from "../components/admin/UsersTable";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 text-white flex-row items-center justify-center">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardStats />
        <ArticlesTable />
        <CommentsTable />
        <UsersTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
