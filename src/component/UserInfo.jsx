import { useAuth } from "../Context/AuthContext";

const UserInfo = () => {
  const { user } = useAuth();

  if (!user) return null;

  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="flex items-center gap-3">

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500
      text-white flex items-center justify-center font-bold">
        {user.photo ? (
          <img
            src={user.photo}
            alt="user"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      {/* Info */}
      <div className="leading-tight">
        <p className="font-semibold text-sm">
          {user.firstName} {user.lastName}
        </p>

        <p className="text-xs text-gray-500 truncate">
          {user.email}
        </p>
      </div>

    </div>
  );
};

export default UserInfo;