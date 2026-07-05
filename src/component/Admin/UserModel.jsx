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

  /* ================= LOAD ON USER CHANGE ================= */
  useEffect(() => {
    if (!user?._id) return;

    setUserData(null);
    fetchUserOrderHistory(user._id);
  }, [user?._id]);

  if (!user) return null;
  if (!userData) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">

      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-700 text-white p-6">

          <div className="flex justify-between items-start">

            {/* USER INFO */}
            <div className="flex gap-4">

              <img
                src={user.photo || "/avatar.png"}
                alt="user"
                className="w-20 h-20 rounded-full border-4 border-white object-cover"
              />

              <div>
                <h2 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-sm opacity-90">{user.email}</p>

                <div className="flex gap-2 mt-2">

                  {/* ONLINE STATUS */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${
                      user.isOnline
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        user.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    {user.isOnline ? "Online" : "Offline"}
                  </span>

                  {/* ROLE */}
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                    {user.role}
                  </span>

                </div>
              </div>
            </div>

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="text-2xl font-bold hover:scale-110 transition"
            >
              ✕
            </button>

          </div>
        </div>

        {/* ================= BODY ================= */}
        <div className="p-6 space-y-5 overflow-hidden">

          {/* USER DETAILS */}
          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold mb-3">User Information</h3>

              <div className="space-y-2 text-sm text-gray-700">

                <p><span className="font-medium">ID:</span> {user._id}</p>
                <p><span className="font-medium">Status:</span> {user.status}</p>
                <p><span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>

              </div>
            </div>

            {/* SUMMARY */}
            <div className="bg-indigo-50 rounded-2xl p-5 shadow-sm">

              <h3 className="font-semibold mb-3">Order Summary</h3>

              <p className="text-sm text-gray-500">Total Orders</p>
              <h2 className="text-2xl font-bold">
                {userData?.orders?.length || 0}
              </h2>

              <p className="text-sm text-gray-500 mt-3">Total Spent</p>
              <h2 className="text-2xl font-bold text-indigo-600">
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

          {/* ================= ORDERS (SCROLLABLE) ================= */}
          <div className="flex flex-col">

            <h3 className="font-semibold text-lg mb-3">
              Recent Orders
            </h3>

            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3">

              {loading ? (
                <p className="text-gray-500">Loading orders...</p>
              ) : userData?.orders?.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-xl text-center text-gray-500">
                  No orders found.
                </div>
              ) : (
                userData.orders.map((order) => (
                  <div
                    key={order._id}
                    className="flex justify-between items-center bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                  >

                    <div>
                      <p className="font-semibold">
                        Order #{order._id.slice(-6)}
                      </p>

                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">
                        ₦{order.totalPrice?.toLocaleString()}
                      </p>

                      <div className="flex gap-2 mt-2 justify-end">

                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
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