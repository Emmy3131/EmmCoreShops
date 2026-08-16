import { useAuth } from "../Context/AuthContext";

const UserInfo = () => {
  const { user } = useAuth();

  if (!user) return null;

  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""
    }`.toUpperCase();

  return (
    <div
      className="
        group
        flex
        items-center
        gap-3
        w-full
        p-3
        rounded-2xl
        bg-slate-50
        border
        border-slate-200
        transition-all
        duration-200
        hover:bg-blue-50
        hover:border-blue-100
      "
    >
      {/* ================= AVATAR ================= */}
      <div className="relative shrink-0">
        <div
          className="
            w-11
            h-11
            rounded-xl
            overflow-hidden
            bg-gradient-to-br
            from-blue-600
            to-cyan-500
            text-white
            flex
            items-center
            justify-center
            font-bold
            text-sm
            shadow-md
            shadow-blue-500/20
            transition-transform
            duration-200
            group-hover:scale-105
          "
        >
          {user.photo ? (
            <img
              src={user.photo}
              alt={`${user.firstName || ""} ${user.lastName || ""}`}
              className="w-full h-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        {/* ONLINE INDICATOR */}
        <span
          className="
            absolute
            -right-0.5
            -bottom-0.5
            w-3
            h-3
            rounded-full
            bg-emerald-500
            border-2
            border-white
          "
        />
      </div>

      {/* ================= USER INFO ================= */}
      <div className="min-w-0 flex-1 leading-tight">
        <p
          className="
            font-semibold
            text-sm
            text-slate-800
            truncate
            group-hover:text-blue-700
            transition-colors
          "
        >
          {user.firstName} {user.lastName}
        </p>

        <p
          className="
            mt-1
            text-xs
            text-slate-500
            truncate
          "
        >
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;