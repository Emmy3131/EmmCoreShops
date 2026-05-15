import { useState } from "react";
import { FaUserCircle, FaEdit, FaLock } from "react-icons/fa";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "Super Admin",
    phone: "08012345678",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className=" md:p-6 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Profile</h1>

        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
        >
          <FaEdit />
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT CARD */}
        <div className="bg-white p-6 rounded-xl shadow text-center">

          <div className="flex justify-center mb-4 text-gray-400 text-6xl">
            <FaUserCircle />
          </div>

          <h2 className="text-xl font-bold">{formData.name}</h2>
          <p className="text-gray-500 text-sm">{formData.email}</p>

          <span className="inline-block mt-2 px-3 py-1 text-xs bg-pink-100 text-pink-600 rounded-full">
            {formData.role}
          </span>

          <div className="mt-4 text-sm text-gray-500">
            <p>📞 {formData.phone}</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded-lg w-full"
              placeholder="Full Name"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded-lg w-full"
              placeholder="Email"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded-lg w-full"
              placeholder="Phone Number"
            />

            <input
              type="text"
              name="role"
              value={formData.role}
              disabled
              className="border p-3 rounded-lg w-full bg-gray-100"
            />

          </div>

          {/* SAVE BUTTON */}
          {editMode && (
            <button className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
              Save Changes
            </button>
          )}

          {/* PASSWORD SECTION */}
          <div className="mt-8 border-t pt-6">

            <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-4">
              <FaLock /> Change Password
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="password"
                placeholder="Current Password"
                className="border p-3 rounded-lg w-full"
              />

              <input
                type="password"
                placeholder="New Password"
                className="border p-3 rounded-lg w-full"
              />

            </div>

            <button className="mt-4 bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-700">
              Update Password
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Profile;