import { useState, useEffect } from "react";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../services/authService";
import { FaTrash, FaEdit } from "react-icons/fa";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editRole, setEditRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const startEdit = (user) => {
    setEditingUserId(user._id);
    setEditRole(user.role);
  };
  const handleEdit = async (userId) => {
    try {
      const data = await updateUser({ role: editRole }, userId);
      console.log(data);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: editRole } : user,
        ),
      );

      setEditingUserId(null);
      setEditRole("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Users</h2>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left text-blue-200">Name</th>
                <th className="p-4 text-left text-blue-200">Emeil</th>
                <th className="p-4 text-left text-blue-200">Role</th>
                <th className="p-4 text-center text-blue-200">Update</th>
                <th className="p-4 text-center text-blue-200">Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all duration-200"
                >
                  <td className="p-4 text-white font-medium">
                    {user.fname} {user.lname}
                  </td>
                  <td className="p-4 text-white font-medium">{user.email}</td>

                  <td className="p-4 text-slate-400">
                    {editingUserId === user._id ? (
                      <select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="w-full rounded-lg bg-slate-900/80 border border-slate-700 p-2 text-white"
                      >
                        <option value="user">user</option>
                        <option value="user">teacher</option>
                        <option value="admin">admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>

                  <td className="p-4 text-center">
                    {editingUserId === user._id ? (
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="text-cyan-400 hover:text-cyan-300"
                        onClick={() => startEdit(user)}
                      >
                        <FaEdit />
                      </button>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    {editingUserId === user._id ? (
                      <button
                        onClick={() => {
                          setEditingUserId(null);
                          setEditRole("");
                        }}
                        className="px-3 py-1 rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
