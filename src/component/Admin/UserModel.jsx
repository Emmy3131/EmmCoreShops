import { useEffect, useState } from "react";
import api from "../../library/api";

const UserModal = ({ user, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ORDER HISTORY ================= */
  const fetchUserOrderHistory = async (userId) => {
    if (!userId) return;

    try {
      setLoading(true);

      const res = await api.get(`/users/${userId}/orders`);
      const orders = res.data?.data || [];

      setUserData({
        ...user,
        orders,
      });
    } catch (err) {
      console.error("Fetch user order history error:", err);

      setUserData({
        ...user,
        orders: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?._id) return;

    setUserData(null);
    fetchUserOrderHistory(user._id);
  }, [user?._id]);

  if (!user) return null;
  if (!userData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 z-50">

      {/* MODAL CONTAINER */}
      <div className="bg-white w-full max-w-4xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-700 text-white p-4 md:p-6">

          <div className="flex justify-between items-start gap-4">

            {/* USER INFO */}
            <div className="flex gap-3 md:gap-4">

              <img
                src={user.photo || "/avatar.png"}
                alt="user"
                className="w-14 h-14 md:w-20 md:h-20 rounded-full border-4 border-white object-cover"
              />

              <div className="min-w-0">

                <h2 className="text-lg md:text-2xl font-bold truncate">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-xs md:text-sm opacity-90 truncate">
                  {user.email}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">

                  {/* STATUS */}
                  <span
                    className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-2 ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        user.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                    {user.status === "active" ? "Active" : "Inactive"}
                  </span>

                  {/* ROLE */}
                  <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs">
                    {user.role}
                  </span>

                </div>
              </div>
            </div>

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="text-xl md:text-2xl font-bold hover:scale-110 transition"
            >
              ✕
            </button>

          </div>
        </div>

        {/* ================= BODY ================= */}
        <div className="p-4 md:p-6 space-y-5 overflow-y-auto">

          {/* GRID (STACK ON MOBILE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

            {/* USER INFO */}
            <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-5">

              <h3 className="font-semibold mb-3">User Information</h3>

              <div className="space-y-2 text-sm text-gray-700">

                <p><span className="font-medium">ID:</span> {user._id}</p>
                <p><span className="font-medium">Status:</span> {user.status}</p>
                <p>
                  <span className="font-medium">Joined:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>

              </div>
            </div>

            {/* SUMMARY */}
            <div className="bg-indigo-50 rounded-xl md:rounded-2xl p-4 md:p-5">

              <h3 className="font-semibold mb-3">Order Summary</h3>

              <p className="text-xs md:text-sm text-gray-500">Total Orders</p>
              <h2 className="text-xl md:text-2xl font-bold">
                {userData?.orders?.length || 0}
              </h2>

              <p className="text-xs md:text-sm text-gray-500 mt-3">
                Total Spent
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-indigo-600">
                ₦
                {(
                  userData?.orders?.reduce(
                    (sum, order) => sum + (order.totalPrice || 0),
                    0
                  ) || 0
                ).toLocaleString()}
              </h2>

            </div>

          </div>

          {/* ================= ORDERS ================= */}
          <div>

            <h3 className="font-semibold text-base md:text-lg mb-3">
              Recent Orders
            </h3>

            {/* SCROLL AREA */}
            <div className="max-h-[250px] md:max-h-[300px] overflow-y-auto pr-1 md:pr-2 space-y-3">

              {loading ? (
                <p className="text-gray-500 text-sm">Loading orders...</p>
              ) : userData?.orders?.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-xl text-center text-gray-500 text-sm">
                  No orders found.
                </div>
              ) : (
                userData.orders.map((order) => (
                  <div
                    key={order._id}
                    className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 bg-white border rounded-xl p-4 shadow-sm"
                  >

                    {/* LEFT */}
                    <div>
                      <p className="font-semibold text-sm md:text-base">
                        Order #{order._id.slice(-6)}
                      </p>

                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="text-left md:text-right">

                      <p className="font-bold text-sm md:text-base">
                        ₦{order.totalPrice?.toLocaleString()}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2 md:justify-end">

                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          {order.paymentStatus}
                        </span>

                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                          {order.orderStatus}
                        </span>

                      </div>

                    </div>

                  </div>
                ))
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserModal;