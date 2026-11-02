import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="max-w-7xl mx-auto md:px-6 pt-10">

      {/* USER PAGE WRAPPER */}
      <div className="bg-white md:p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default UserLayout;