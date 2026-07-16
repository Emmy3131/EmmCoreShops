import { useEffect, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaTrash,
  FaUserCheck,
  FaUserSlash,
} from "react-icons/fa";
import api from "../../library/api";
import UserModal from "../../component/Admin/UserModel";
import PageHeader from "../../component/Admin/PageHeader";
import PageLoader from "../../component/PageLoader";

const User = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      const data = res.data.data?.users || res.data.data || [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= DELETE USER ================= */
  const deleteUser = async (id) => {
    try {
      const res = await api.delete(`/users/${id}`);
      if (res.data.status === "success") {
        fetchUsers();
      }
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  /* ================= ACTIVATE / DEACTIVATE ================= */
  const toggleStatus = async (id, status) => {
    try {
      const res = await api.patch(`/users/${id}/toggle-status`, {
        status: status === "active" ? "inactive" : "active",
      });

      if (res.data.status === "success") {
        fetchUsers();
      }
    } catch (err) {
      console.error("Toggle user status error:", err);
    }
  };

  /* ================= FILTER ================= */
  const filteredUsers = users.filter((u) => {
    const fullName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
    const email = (u.email || "").toLowerCase();
    const role = (u.role || "").toLowerCase();

    return (
      fullName.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      role.includes(search.toLowerCase())
    );
  });

  // if (loading) {
  //   return <div className="p-6 text-gray-500">Loading users...</div>;
  // }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <PageHeader
        title={"Users Management"}
        subtitle="Manage all platform users"
      />
  

      {/* SEARCH */}
      <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow">
        <FaSearch className="text-gray-400" />
        <input
          className="w-full outline-none"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USERS GRID */}
      {loading ? (
        <PageLoader text="Loading users..." />
      ) : filteredUsers.length === 0 ? (
        <div className="p-6 text-gray-500">No users found</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow p-4 space-y-3 hover:shadow-lg transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">
                {user.firstName} {user.lastName}
              </h2>

              {/* ONLINE STATUS */}
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  user.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {user.status === "active" ? "active" : "inactive"}
              </span>
            </div>

            <p className="text-sm text-gray-500">{user.email}</p>

            <p className="text-sm">
              Role: <span className="font-medium">{user.role}</span>
            </p>

            {/* ACTIONS */}
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setSelectedUser(user)}
                className="text-blue-600"
              >
                <FaEye />
              </button>

              <button
                onClick={() => toggleStatus(user._id, user.status)}
                className={`transition text-lg ${
                  user.status === "active"
                    ? "text-blue-600 hover:text-blue-800"
                    : "text-yellow-600 hover:text-yellow-800"
                }`}
              >
                {user.status === "active" ? <FaUserCheck /> : <FaUserSlash />}
              </button>

              <button
                onClick={() => deleteUser(user._id)}
                className="text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* MODAL */}
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default User;
