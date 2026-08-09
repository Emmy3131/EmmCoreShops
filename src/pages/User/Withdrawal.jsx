import { useEffect, useState } from "react";
import {
    FaWallet,
    FaUniversity,
    FaMoneyBillWave,
    FaSave,
    FaHistory,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../../library/api";

const Withdrawal = () => {
    const [loading, setLoading] = useState(true);
    const [savingBank, setSavingBank] = useState(false);
    const [requesting, setRequesting] = useState(false);

    const [bankAccount, setBankAccount] = useState(null);
    const [withdrawals, setWithdrawals] = useState([]);

    const [walletBalance, setWalletBalance] = useState(0);

    const [bankForm, setBankForm] = useState({
        bankName: "",
        accountName: "",
        accountNumber: "",
    });

    const [amount, setAmount] = useState("");

    /* =====================================================
       LOAD WITHDRAWAL DATA
    ===================================================== */

    const loadData = async () => {
        try {
            setLoading(true);

            const [bankRes, withdrawalRes, userRes] =
                await Promise.all([
                    api.get("/withdrawal/bank-account"),
                    api.get("/withdrawal"),
                    api.get("/users/me"),
                ]);

            const bank = bankRes.data?.data;

            setBankAccount(bank || null);

            if (bank) {
                setBankForm({
                    bankName: bank.bankName || "",
                    accountName: bank.accountName || "",
                    accountNumber: bank.accountNumber || "",
                });
            }

            setWithdrawals(withdrawalRes.data?.data || []);

            const user = userRes.data?.data?.user || userRes.data?.data;

            setWalletBalance(user?.walletBalance || 0);
        } catch (error) {
            console.error("Withdrawal page error:", error);

            toast.error(
                error.response?.data?.message ||
                "Unable to load withdrawal information",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    /* =====================================================
       BANK FORM
    ===================================================== */

    const handleBankChange = (e) => {
        const { name, value } = e.target;

        setBankForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* =====================================================
       SAVE BANK ACCOUNT
    ===================================================== */

    const saveBankAccount = async (e) => {
        e.preventDefault();

        if (
            !bankForm.bankName.trim() ||
            !bankForm.accountName.trim() ||
            !bankForm.accountNumber.trim()
        ) {
            return toast.error(
                "Please complete all bank account details",
            );
        }

        if (!/^\d{10}$/.test(bankForm.accountNumber)) {
            return toast.error(
                "Account number must contain exactly 10 digits",
            );
        }

        try {
            setSavingBank(true);

            const res = await api.post(
                "/withdrawals/bank-account",
                bankForm,
            );

            toast.success(
                res.data?.message ||
                "Bank account saved successfully",
            );

            setBankAccount(res.data?.data || null);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to save bank account",
            );
        } finally {
            setSavingBank(false);
        }
    };

    /* =====================================================
       REQUEST WITHDRAWAL
    ===================================================== */

    const requestWithdrawal = async (e) => {
        e.preventDefault();

        const withdrawalAmount = Number(amount);

        if (!withdrawalAmount || withdrawalAmount <= 0) {
            return toast.error(
                "Please enter a valid withdrawal amount",
            );
        }

        if (withdrawalAmount < 5000) {
            return toast.error(
                "Minimum withdrawal amount is ₦5,000",
            );
        }

        if (withdrawalAmount > walletBalance) {
            return toast.error(
                "Insufficient wallet balance",
            );
        }

        if (!bankAccount) {
            return toast.error(
                "Please save your bank account first",
            );
        }

        try {
            setRequesting(true);

            const res = await api.post("/withdrawals", {
                amount: withdrawalAmount,
            });

            toast.success(
                res.data?.message ||
                "Withdrawal request submitted successfully",
            );

            setAmount("");

            await loadData();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to submit withdrawal request",
            );
        } finally {
            setRequesting(false);
        }
    };

    /* =====================================================
       STATUS
    ===================================================== */

    const getStatusStyle = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-700";

            case "paid":
                return "bg-blue-100 text-blue-700";

            case "rejected":
                return "bg-red-100 text-red-700";

            default:
                return "bg-orange-100 text-orange-700";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "approved":
            case "paid":
                return <FaCheckCircle />;

            case "rejected":
                return <FaTimesCircle />;

            default:
                return <FaClock />;
        }
    };

    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex items-center gap-3 text-slate-500">
                    <FaSpinner className="animate-spin" />
                    Loading withdrawal information...
                </div>
            </div>
        );
    }

    /* =====================================================
       PAGE
    ===================================================== */

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* HEADER */}

            <div className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Withdraw Funds
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        Withdraw your referral earnings securely to
                        your bank account.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
                {/* =================================================
            WALLET BALANCE
        ================================================= */}

                <div className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                            <FaWallet />
                        </div>

                        <div>
                            <p className="text-sm text-white/80">
                                Available Balance
                            </p>

                            <h2 className="text-3xl font-bold">
                                ₦{walletBalance.toLocaleString()}
                            </h2>
                        </div>
                    </div>

                    <div className="mt-5 text-sm text-white/80">
                        Minimum withdrawal:{" "}
                        <span className="font-semibold text-white">
                            ₦5,000
                        </span>
                    </div>
                </div>

                {/* =================================================
            MAIN GRID
        ================================================= */}

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* =================================================
              BANK ACCOUNT
          ================================================= */}

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="p-5 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <FaUniversity />
                                </div>

                                <div>
                                    <h2 className="font-bold text-slate-900">
                                        Withdrawal Account
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Where your withdrawal will be sent
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={saveBankAccount}
                            className="p-5 space-y-4"
                        >
                            {/* BANK */}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Bank Name
                                </label>

                                <input
                                    type="text"
                                    name="bankName"
                                    value={bankForm.bankName}
                                    onChange={handleBankChange}
                                    placeholder="e.g. Access Bank"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                                />
                            </div>

                            {/* ACCOUNT NAME */}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Account Name
                                </label>

                                <input
                                    type="text"
                                    name="accountName"
                                    value={bankForm.accountName}
                                    onChange={handleBankChange}
                                    placeholder="Account holder name"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                                />
                            </div>

                            {/* ACCOUNT NUMBER */}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Account Number
                                </label>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={10}
                                    name="accountNumber"
                                    value={bankForm.accountNumber}
                                    onChange={handleBankChange}
                                    placeholder="10 digit account number"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={savingBank}
                                className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
                            >
                                {savingBank ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FaSave />
                                        {bankAccount
                                            ? "Update Bank Account"
                                            : "Save Bank Account"}
                                    </>
                                )}
                            </button>

                            {bankAccount && (
                                <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-sm text-green-700 flex items-center gap-2">
                                    <FaCheckCircle />
                                    Bank account saved successfully.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* =================================================
              WITHDRAWAL REQUEST
          ================================================= */}

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="p-5 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                                    <FaMoneyBillWave />
                                </div>

                                <div>
                                    <h2 className="font-bold text-slate-900">
                                        Request Withdrawal
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Request your available earnings
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={requestWithdrawal}
                            className="p-5 space-y-5"
                        >
                            {/* AVAILABLE */}

                            <div className="bg-slate-50 rounded-xl p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">
                                        Available Balance
                                    </span>

                                    <span className="font-bold text-slate-900">
                                        ₦{walletBalance.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* AMOUNT */}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Withdrawal Amount
                                </label>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                                        ₦
                                    </span>

                                    <input
                                        type="number"
                                        min="5000"
                                        max={walletBalance}
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        placeholder="Enter amount"
                                        className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>

                                <p className="text-xs text-slate-400 mt-2">
                                    Minimum withdrawal is ₦5,000.
                                </p>
                            </div>

                            {/* BANK PREVIEW */}

                            {bankAccount ? (
                                <div className="border border-slate-200 rounded-xl p-4">
                                    <p className="text-xs text-slate-500 mb-2">
                                        Withdrawal will be sent to
                                    </p>

                                    <p className="font-semibold text-slate-900">
                                        {bankAccount.bankName}
                                    </p>

                                    <p className="text-sm text-slate-600">
                                        {bankAccount.accountName}
                                    </p>

                                    <p className="text-sm text-slate-600">
                                        ****
                                        {bankAccount.accountNumber?.slice(
                                            -4,
                                        )}
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-sm text-orange-700">
                                    Please save your bank account details
                                    before requesting a withdrawal.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={
                                    requesting ||
                                    !bankAccount ||
                                    walletBalance < 5000
                                }
                                className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
                            >
                                {requesting ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <FaMoneyBillWave />
                                        Request Withdrawal
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* =================================================
            WITHDRAWAL HISTORY
        ================================================= */}

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                            <FaHistory />
                        </div>

                        <div>
                            <h2 className="font-bold text-slate-900">
                                Withdrawal History
                            </h2>

                            <p className="text-xs text-slate-500">
                                Track your withdrawal requests
                            </p>
                        </div>
                    </div>

                    {withdrawals.length === 0 ? (
                        <div className="py-12 text-center">
                            <FaHistory className="mx-auto text-3xl text-slate-300 mb-3" />

                            <p className="font-medium text-slate-600">
                                No withdrawals yet
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                Your withdrawal requests will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="text-left px-5 py-4 text-xs uppercase text-slate-500">
                                            Amount
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs uppercase text-slate-500">
                                            Bank
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs uppercase text-slate-500">
                                            Status
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs uppercase text-slate-500">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {withdrawals.map((item) => (
                                        <tr
                                            key={item._id}
                                            className="border-t border-slate-100"
                                        >
                                            <td className="px-5 py-4">
                                                <span className="font-bold text-slate-900">
                                                    ₦
                                                    {Number(
                                                        item.amount || 0,
                                                    ).toLocaleString()}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-medium">
                                                    {item.bankDetails?.bankName}
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    ****
                                                    {item.bankDetails?.accountNumber?.slice(
                                                        -4,
                                                    )}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                                                        item.status,
                                                    )}`}
                                                >
                                                    {getStatusIcon(
                                                        item.status,
                                                    )}

                                                    {item.status
                                                        ?.charAt(0)
                                                        .toUpperCase() +
                                                        item.status?.slice(
                                                            1,
                                                        )}
                                                </span>

                                                {item.adminNote && (
                                                    <p className="text-xs text-slate-400 mt-1">
                                                        {item.adminNote}
                                                    </p>
                                                )}
                                            </td>

                                            <td className="px-5 py-4 text-slate-500">
                                                {new Date(
                                                    item.createdAt,
                                                ).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Withdrawal;