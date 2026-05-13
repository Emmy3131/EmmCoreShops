import {
  FaStore,
  FaUsers,
  FaMoneyBillWave,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const SellOnEmmCoreShopes = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">

      {/* HERO SECTION */}
      <div className="bg-[#ED017F] text-white text-center p-8">
        <FaStore size={40} className="mx-auto mb-4" />

        <h1 className="text-2xl font-bold">
          Sell on EmmCore Shops
        </h1>

        <p className="mt-3 text-sm opacity-90">
          Reach millions of customers across Nigeria
          and grow your business online.
        </p>

        <button className="mt-6 bg-white text-[#ED017F] px-6 py-3 rounded-lg font-semibold">
          Start Selling
        </button>
      </div>

      {/* WHY SELL */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">
          Why Sell With Us?
        </h2>

        <div className="grid grid-cols-1 gap-4">

          <div className="bg-white p-4 rounded-xl shadow-sm flex gap-4">
            <FaUsers className="text-[#ED017F]" size={24} />
            <div>
              <h3 className="font-semibold">
                Massive Customer Reach
              </h3>
              <p className="text-sm text-gray-500">
                Access thousands of active buyers daily.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm flex gap-4">
            <FaMoneyBillWave className="text-[#ED017F]" size={24} />
            <div>
              <h3 className="font-semibold">
                Secure Payments
              </h3>
              <p className="text-sm text-gray-500">
                Get paid safely through our trusted system.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm flex gap-4">
            <FaTruck className="text-[#ED017F]" size={24} />
            <div>
              <h3 className="font-semibold">
                Nationwide Delivery
              </h3>
              <p className="text-sm text-gray-500">
                We help connect you with logistics partners.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="p-6 bg-white mt-4">
        <h2 className="text-lg font-semibold mb-4">
          How It Works
        </h2>

        <div className="space-y-4">

          <div className="flex gap-3">
            <FaCheckCircle className="text-[#ED017F]" />
            <p>Create your seller account</p>
          </div>

          <div className="flex gap-3">
            <FaCheckCircle className="text-[#ED017F]" />
            <p>Upload your products</p>
          </div>

          <div className="flex gap-3">
            <FaCheckCircle className="text-[#ED017F]" />
            <p>Receive orders from customers</p>
          </div>

          <div className="flex gap-3">
            <FaCheckCircle className="text-[#ED017F]" />
            <p>Deliver & get paid</p>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold">
          Ready to grow your business?
        </h2>

        <button className="mt-4 bg-[#ED017F] text-white px-8 py-3 rounded-lg font-semibold shadow">
          Register as Seller
        </button>
      </div>

    </div>
  );
};

export default SellOnEmmCoreShopes;