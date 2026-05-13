import { FaWallet, FaArrowDown, FaArrowUp } from "react-icons/fa";

const MyWallet = () => {

  // SAMPLE DATA (Replace with API later)
  const walletBalance = 125000;

  const transactions = [
    {
      id: 1,
      type: "credit",
      title: "Wallet Funding",
      amount: "₦50,000",
      date: "12 May 2026",
    },
    {
      id: 2,
      type: "debit",
      title: "Order Payment",
      amount: "₦18,500",
      date: "10 May 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* HEADER */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-semibold">
          My Wallet
        </h1>
      </div>

      {/* BALANCE CARD */}
      <div className="p-4">
        <div className="bg-[#ED017F] text-white rounded-2xl p-6 shadow-md">

          <div className="flex items-center gap-2">
            <FaWallet />
            <p className="text-sm opacity-80">
              Wallet Balance
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-2">
            ₦{walletBalance.toLocaleString()}
          </h2>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mt-6">
            <button className="bg-white text-[#ED017F] px-4 py-2 rounded-lg text-sm font-semibold">
              Fund Wallet
            </button>

            <button className="border border-white px-4 py-2 rounded-lg text-sm font-semibold">
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* TRANSACTION HEADER */}
      <div className="px-4 mt-4">
        <h2 className="font-semibold text-lg">
          Transaction History
        </h2>
      </div>

      {/* TRANSACTIONS */}
      <div className="p-4 space-y-3">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-400 mt-8">
            No transactions yet
          </p>
        ) : (
          transactions.map((trx) => (
            <div
              key={trx.id}
              className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center"
            >
              <div className="flex items-center gap-3">

                <div
                  className={`p-3 rounded-full ${
                    trx.type === "credit"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {trx.type === "credit" ? (
                    <FaArrowDown />
                  ) : (
                    <FaArrowUp />
                  )}
                </div>

                <div>
                  <p className="font-medium">
                    {trx.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {trx.date}
                  </p>
                </div>
              </div>

              <p
                className={`font-semibold ${
                  trx.type === "credit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {trx.type === "credit" ? "+" : "-"}
                {trx.amount}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default MyWallet;