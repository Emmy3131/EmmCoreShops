import { useEffect, useState } from "react";
import { FaSearch, FaUserSlash, FaEye, FaTrash } from "react-icons/fa";
import api from "../../library/api";

const User = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      if(res.data.status === "success") {
        alert("Users fetched successfully");
        setUsers(res.data.data || []);
      } else {
        alert("Failed to fetch users");
      }
    }
    catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" space-y-6">

      {/* ================= HEADER ================= */}
      <div className="p4">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-gray-500">
          View, manage and control all platform users
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">

                <td className="p-3 font-medium">
                  {user.name}
                </td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full
                      ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="flex gap-3 p-3 text-gray-600">

                  <button className="hover:text-blue-500">
                    <FaEye />
                  </button>

                  <button className="hover:text-yellow-500">
                    <FaUserSlash />
                  </button>

                  <button className="hover:text-red-500">
                    <FaTrash />
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4">

        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-xl shadow space-y-2"
          >

            <div className="flex justify-between">
              <h2 className="font-semibold">{user.name}</h2>

              <span
                className={`text-xs px-2 py-1 rounded-full
                  ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
              >
                {user.status}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              {user.email}
            </p>

            <p className="text-sm">
              Role: {user.role}
            </p>

            <div className="flex justify-end gap-4 text-gray-600 pt-2">

              <FaEye className="cursor-pointer hover:text-blue-500" />
              <FaUserSlash className="cursor-pointer hover:text-yellow-500" />
              <FaTrash className="cursor-pointer hover:text-red-500" />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default User;