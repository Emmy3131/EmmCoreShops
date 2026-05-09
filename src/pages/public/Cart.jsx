const Cart = () => {
  // sample cart data (replace with state or context later)
  const cartItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 25000,
      qty: 1,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 45000,
      qty: 2,
    },
  ];

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 pt-14">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* CART ITEMS */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-500 text-sm">
                  Qty: {item.qty}
                </p>
              </div>

              <div className="mt-2 sm:mt-0 font-bold text-green-600">
                ₦{item.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="w-full lg:w-1/3 bg-white p-5 rounded-lg shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>₦{total.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Delivery</span>
            <span>₦0</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;