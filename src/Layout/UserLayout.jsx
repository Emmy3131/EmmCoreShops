import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-3 md:px-6">

      {/* USER PAGE WRAPPER */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default UserLayout;