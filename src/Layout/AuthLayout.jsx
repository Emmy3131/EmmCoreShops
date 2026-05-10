import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AuthLayout = () => {
  const navigate = useNavigate();
  const handlebBack = () => {
    navigate("/");
  }

  return (
    <div className=" bg-gray-100">

      {/* FIXED TOP BAR */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* BACK BUTTON */}
          <button
            onClick={handlebBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#ED017F] transition"
          >
            <FaArrowLeft />
            Back
          </button>

          {/* LOGO */}
          <Link
            to="/"
            className="text-3xl font-bold text-[#ED017F]"
          >
            EmmCoreShops
          </Link>

          {/* EMPTY SPACE (keeps logo centered) */}
          <div className="w-[70px]" />
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="pt-28 flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;