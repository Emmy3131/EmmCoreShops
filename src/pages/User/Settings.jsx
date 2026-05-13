import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";

const Settings = () => {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "08012345678",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* HEADER */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-semibold">
          Account Settings
        </h1>
      </div>

      {/* PROFILE CARD */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-[#ED017F] text-white flex items-center justify-center text-xl font-bold">
            JD
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              {form.name}
            </h2>
            <p className="text-sm text-gray-500">
              Member Account
            </p>
          </div>

        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="px-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">

          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <FaUser /> Personal Information
          </h2>

          {/* NAME */}
          <div className="mb-3">
            <label className="text-sm text-gray-600">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-[#ED017F]"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="text-sm text-gray-600 flex items-center gap-1">
              <FaEnvelope /> Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-[#ED017F]"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm text-gray-600 flex items-center gap-1">
              <FaPhone /> Phone
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-[#ED017F]"
            />
          </div>

        </div>
      </div>

      {/* PASSWORD SECTION */}
      <div className="p-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">

          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <FaLock /> Change Password
          </h2>

          <input
            type="password"
            placeholder="Current Password"
            className="w-full border p-2 rounded-lg mb-3 outline-none focus:border-[#ED017F]"
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded-lg mb-3 outline-none focus:border-[#ED017F]"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full border p-2 rounded-lg outline-none focus:border-[#ED017F]"
          />

          <button className="mt-4 w-full bg-[#ED017F] text-white py-2 rounded-lg font-semibold">
            Update Password
          </button>

        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="p-4">
        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold">
          Save Changes
        </button>
      </div>

    </div>
  );
};

export default Settings;