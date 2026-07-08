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

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  /* ================= FETCH PROFILE ================= */

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/me");

      if (res.data.status === "success") {
        setProfileData(res.data.data.user);
        setPreview(res.data.data.user.image);
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

  /* ================= SAVE PROFILE ================= */

  const updateProfile = async () => {
    try {
      setLoading(true);

      await api.patch("/users/updateMe", {
        firstName: formData.firstName,

        lastName: formData.lastName,

        phone: formData.phone,
      });

      alert("Profile updated successfully");

      setEditMode(false);

      fetchProfile();
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
      await api.patch("/users/updatePassword", password);

      alert("Password updated successfully");

      setPassword({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div
      className="
min-h-screen
bg-gray-50
p-4
md:p-8
space-y-6
"
    >
      {/* HEADER */}

      <div
        className="
bg-gradient-to-r
from-pink-600
via-purple-600
to-indigo-600
rounded-3xl
p-6
md:p-8
text-white
shadow-xl
"
      >
        <div
          className="
flex
flex-col
md:flex-row
justify-between
gap-5
"
        >
          <div>
            <h1
              className="
text-3xl
font-bold
"
            >
              Admin Profile
            </h1>

            <p className="text-white/80 mt-2">
              Manage your administrator account
            </p>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="
bg-white
text-purple-700
px-5
py-3
rounded-xl
flex
items-center
gap-2
font-semibold
"
          >
            <FaEdit />

            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      <div
        className="
grid
grid-cols-1
lg:grid-cols-3
gap-6
"
      >
        {/* PROFILE CARD */}

        <div
          className="
bg-white
rounded-3xl
shadow-lg
p-6
text-center
"
        >
          <div
            className="
relative
flex
justify-center
"
          >
            {preview ? (
              <img
                src={preview}
                className="
w-32
h-32
rounded-full
object-cover
border-4
border-purple-500
"
              />
            ) : (
              <FaUserCircle
                className="
text-gray-300
text-[130px]
"
              />
            )}

            {editMode && (
              <label
                className="
absolute
bottom-2
right-20
bg-purple-600
text-white
p-3
rounded-full
cursor-pointer
"
              >
                <FaCamera />

                <input type="file" hidden onChange={handleImage} />
              </label>
            )}
          </div>

          <h2
            className="
text-2xl
font-bold
mt-4
"
          >
            {profileData?.firstName} {profileData?.lastName}
          </h2>

          <p className="text-gray-500">{profileData?.email}</p>

          <span
            className="
inline-block
mt-3
px-4
py-1
rounded-full
bg-purple-100
text-purple-700
text-sm
font-semibold
"
          >
            {profileData?.role}
          </span>

          <div
            className="
mt-5
space-y-3
text-gray-600
text-sm
"
          >
            <p>📞 {profileData?.phone}</p>

            <p
              className="
flex
justify-center
items-center
gap-2
"
            >
              <FaCalendarAlt />
              Joined:
              {profileData?.createdAt &&
                new Date(profileData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div
          className="
lg:col-span-2
space-y-6
"
        >
          {/* INFORMATION */}

          <div
            className="
bg-white
rounded-3xl
shadow-lg
p-6
"
          >
            <h2
              className="
text-xl
font-bold
mb-5
"
            >
              Personal Information
            </h2>

            <div
              className="
grid
md:grid-cols-2
gap-5
"
            >
              <input
                name="firstName"
                value={profileData?.firstName}
                disabled={!editMode}
                onChange={handleChange}
                className="
border
rounded-xl
p-3
disabled:bg-gray-100
"
              />

              <input
                name="lastName"
                value={profileData?.lastName}
                disabled={!editMode}
                onChange={handleChange}
                className="
border
rounded-xl
p-3
disabled:bg-gray-100
"
              />

              <input
                name="email"
                value={profileData?.email}
                disabled
                className="
border
rounded-xl
p-3
bg-gray-100
"
              />

              <input
                name="phone"
                value={profileData?.phone}
                disabled={!editMode}
                onChange={handleChange}
                className="
border
rounded-xl
p-3
disabled:bg-gray-100
"
              />
            </div>

            {editMode && (
              <button
                onClick={updateProfile}
                disabled={loading}
                className="
mt-6
bg-green-600
text-white
px-6
py-3
rounded-xl
flex
items-center
gap-2
"
              >
                <FaSave />

                {loading ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>

          {/* PASSWORD */}

          <div
            className="
bg-white
rounded-3xl
shadow-lg
p-6
"
          >
            <h2
              className="
flex
items-center
gap-2
font-bold
text-xl
mb-5
"
            >
              <FaShieldAlt />
              Security
            </h2>

            <div
              className="
grid
md:grid-cols-2
gap-5
"
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
                className="
border
rounded-xl
p-3
"
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
                className="
border
rounded-xl
p-3
"
              />
            </div>

            <button
              onClick={updatePassword}
              className="
mt-5
bg-pink-600
text-white
px-6
py-3
rounded-xl
flex
items-center
gap-2
"
            >
              <FaLock />
              Update Password
            </button>
          </div>

          {/* STATS */}

          <div
            className="
grid
md:grid-cols-3
gap-4
"
          >
            <div className="bg-white rounded-2xl p-5 shadow">
              <FaChartLine className="text-purple-600 text-2xl" />

              <p className="text-gray-500 mt-3">Actions</p>

              <h2 className="text-3xl font-bold">245</h2>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow">
              <FaShieldAlt className="text-green-600 text-2xl" />

              <p className="text-gray-500 mt-3">Security</p>

              <h2 className="font-bold">High</h2>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow">
              <FaCalendarAlt className="text-blue-600 text-2xl" />

              <p className="text-gray-500 mt-3">Last Login</p>

              <h2 className="font-bold">Today</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
