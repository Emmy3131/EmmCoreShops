<div className="p-6 space-y-6">

          {/* SUMMARY */}
          <div className="bg-indigo-50 rounded-xl p-4">
            <h3 className="font-semibold mb-3">Summary</h3>

            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <h2 className="text-2xl font-bold">
              {userData?.orders?.length || 0}
            </h2>

            <p className="text-sm text-gray-500 mt-3">
              Total Spent
            </p>

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

          {/* ORDER HISTORY */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Recent Orders
            </h3>

            {loading ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : userData?.orders?.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-5 text-center text-gray-500">
                No orders found.
              </div>
            ) : (
              <div className="space-y-3">
                {userData?.orders?.map((order) => (
                  <div
                    key={order._id}
                    className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
                  >
                    <div>
                      <p className="font-semibold">
                        Order #{order._id.slice(-6)}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">
                        ₦{order.totalPrice?.toLocaleString()}
                      </p>

                      <div className="flex gap-2 justify-end mt-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>

                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>


 const fetchUserOrderHistory = async (userId) => {
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

  /* ================= HANDLE USER CHANGE ================= */
  useEffect(() => {
    if (!user?._id) return;

    setUserData(null); // reset before loading
    fetchUserOrderHistory(user._id);
  }, [user?._id]);

  /* ================= SAFETY GUARD ================= */
  if (!user) return null;