import { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaLock,
  FaCamera,
  FaShieldAlt,
  FaCalendarAlt,
  FaChartLine,
  FaSave,
} from "react-icons/fa";

import api from "../../library/api";
import PageHeader from "../../component/Admin/PageHeader";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    role: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  /* ================= FETCH PROFILE ================= */

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/me");

      if (res.data.status === "success") {
        const user = res.data.data.user;

        setProfileData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          country: user.country || "",
          address: user.address || "",
          gender: user.gender || "",
          dateOfBirth: user.dateOfBirth || "",
          role: user.role || "",
        });

        if (user.image) {
          setPreview(user.image);
        }
      }
    } catch (error) {
      console.error(
        "Fetch profile error:",
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    setProfileData({
      ...profileData,

      [e.target.name]: e.target.value,
    });
  };

  /* ================= IMAGE ================= */

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfileData({
      ...profileData,

      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  /* ================= UPDATE PROFILE ================= */

  const updateProfile = async () => {
    try {
      setLoading(true);

      const payload = {
        firstName: profileData.firstName,

        lastName: profileData.lastName,

        phone: profileData.phone,

        country: profileData.country,

        address: profileData.address,

        gender: profileData.gender,

        dateOfBirth: profileData.dateOfBirth,
      };

      const res = await api.patch("/users/updateMe", payload);

      if (res.data.status === "success") {
        alert("Profile updated successfully");

        setEditMode(false);

        fetchProfile();
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PASSWORD UPDATE ================= */

  const updatePassword = async () => {
    try {
      const res = await api.patch("/users/updatePassword", password);

      if (res.data.status === "success") {
        alert("Password updated successfully");

        setPassword({
          currentPassword: "",
          newPassword: "",
        });
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-6">
      {/* HEADER */}
      <PageHeader
        title="Admin Profile"
        subtitle="Manage your administrator account"
        buttonIcon={<FaEdit/>}
        buttonText={editMode? "Cancel" : "Edit Profile"}
        onButtonClick={() => setEditMode(!editMode)}
      />


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PROFILE CARD */}

        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <div className="relative flex justify-center">
            {preview ? (
              <img
                src={preview}
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
              />
            ) : (
              <FaUserCircle className="text-gray-300 text-[130px]" />
            )}

            {editMode && (
              <label className="absolute bottom-2 right-20 bg-purple-600 text-white p-3 rounded-full cursor-pointer">
                <FaCamera />

                <input type="file" hidden onChange={handleImage} />
              </label>
            )}
          </div>

          <h2 className=" text-2xl font-bold mt-4">
            {profileData.firstName} {profileData.lastName}
          </h2>

          <p className="text-gray-500">{profileData.email}</p>

          <span className="inline-block mt-3 px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
            {profileData.role}
          </span>

          <div className="mt-5 space-y-3 text-sm text-gray-600">
            <p>📞 {profileData.phone}</p>

            <p
              className="flex justify-center items-center gap-2"
            >
              <FaCalendarAlt />
              Joined:
              {profileData.createdAt}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div
          className="lg:col-span-2 space-y-6"
        >
          {/* PERSONAL INFORMATION */}

          <div
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <h2
              className="text-xl font-bold mb-6"
            >
              Personal Information
            </h2>

            <div
              className="grid md:grid-cols-2 gap-5"
            >
              {[
                ["firstName", "First Name"],
                ["lastName", "Last Name"],
                ["phone", "Phone"],
                ["country", "Country"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    {label}
                  </label>

                  <input
                    name={name}
                    value={profileData[name] || ""}
                    disabled={!editMode}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                  />
                </div>
              ))}

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                >
                  Gender
                </label>

                <select
                  name="gender"
                  value={profileData.gender}
                  disabled={!editMode}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                >
                  <option value="">Select Gender</option>

                  <option value="male">Male</option>

                  <option value="female">Female</option>

                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                >
                  Date Of Birth
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={
                    profileData.dateOfBirth
                      ? profileData.dateOfBirth.substring(0, 10)
                      : ""
                  }
                  disabled={!editMode}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                />
              </div>

              <div
                className="md:col-span-2"
              >
                <label
                  className="block text-sm font-medium mb-2"
                >
                  Address
                </label>

                <textarea
                  rows="3"
                  name="address"
                  value={profileData.address}
                  disabled={!editMode}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 disabled:bg-gray-100"
                />
              </div>
            </div>

            {editMode && (
              <button
                onClick={updateProfile}
                disabled={loading}
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <FaSave />

                {loading ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>

          {/* PASSWORD */}

          <div
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <h2
              className="text-xl font-bold flex gap-2 items-center mb-5"
            >
              <FaShieldAlt />
              Security
            </h2>

            <div
              className="grid md:grid-cols-2 gap-5"
            >
              <input
                type="password"
                placeholder="Current Password"
                value={password.currentPassword}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    currentPassword: e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              />

              <input
                type="password"
                placeholder="New Password"
                value={password.newPassword}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    newPassword: e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              />
            </div>

            <button
              onClick={updatePassword}
              className="mt-5 bg-pink-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <FaLock />
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
