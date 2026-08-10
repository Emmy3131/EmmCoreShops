import { useEffect, useMemo, useState } from "react";

import {
  FaWallet,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSearch,
  FaMoneyBillWave,
  FaUniversity,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaCreditCard,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

import { toast } from "react-toastify";

import PageHeader from "../../component/Admin/PageHeader";
import PageLoader from "../../component/PageLoader";

import api from "../../library/api";

const WithdrawalManagement = () => {
  const [loading, setLoading] = useState(true);

  const [processing, setProcessing] = useState(false);

  const [withdrawals, setWithdrawals] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [selected, setSelected] = useState(null);

  const [adminNote, setAdminNote] = useState("");

  /*
    =====================================================
    FETCH WITHDRAWALS
    =====================================================
    */

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/withdrawals");

      setWithdrawals(res.data?.data || []);
    } catch (error) {
      console.error("Fetch withdrawals error:", error);

      toast.error(
        error.response?.data?.message || "Failed to load withdrawals",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  /*
    =====================================================
    FILTER
    =====================================================
    */

  const filteredWithdrawals = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return withdrawals.filter((item) => {
      const fullName = `${item.user?.firstName || ""} ${
        item.user?.lastName || ""
      }`.toLowerCase();

      const email = item.user?.email?.toLowerCase() || "";

      const accountNumber = item.bankDetails?.accountNumber || "";

      const bankName = item.bankDetails?.bankName?.toLowerCase() || "";

      const matchesSearch =
        !keyword ||
        fullName.includes(keyword) ||
        email.includes(keyword) ||
        accountNumber.includes(keyword) ||
        bankName.includes(keyword);

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [withdrawals, search, statusFilter]);

  /*
    =====================================================
    STATISTICS
    =====================================================
    */

  const stats = useMemo(() => {
    const totalAmount = withdrawals.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );

    const pending = withdrawals.filter((item) => item.status === "pending");

    const approved = withdrawals.filter((item) => item.status === "approved");

    const paid = withdrawals.filter((item) => item.status === "paid");

    const rejected = withdrawals.filter((item) => item.status === "rejected");

    return {
      total: withdrawals.length,

      pending: pending.length,

      approved: approved.length,

      paid: paid.length,

      rejected: rejected.length,

      totalAmount,
    };
  }, [withdrawals]);

  /*
    =====================================================
    OPEN REVIEW
    =====================================================
    */

  const openReview = (withdrawal) => {
    setSelected(withdrawal);

    setAdminNote(withdrawal.adminNote || "");
  };

  /*
    =====================================================
    CLOSE MODAL
    =====================================================
    */

  const closeModal = () => {
    if (processing) return;

    setSelected(null);

    setAdminNote("");
  };

  /*
    =====================================================
    APPROVE
    =====================================================
    */

  const approveWithdrawal = async () => {
    if (!selected) return;

    try {
      setProcessing(true);

      const res = await api.patch(`/admin/withdrawals/${selected._id}/approve`);

      toast.success(res.data?.message || "Withdrawal approved successfully");

      closeModal();

      await fetchWithdrawals();
    } catch (error) {
      console.error("Approve withdrawal error:", error);

      toast.error(
        error.response?.data?.message || "Unable to approve withdrawal",
      );
    } finally {
      setProcessing(false);
    }
  };

  /*
    =====================================================
    REJECT
    =====================================================
    */

  const rejectWithdrawal = async () => {
    if (!selected) return;

    if (!adminNote.trim()) {
      toast.error("Please provide a reason for rejection");

      return;
    }

    try {
      setProcessing(true);

      const res = await api.patch(`/admin/withdrawals/${selected._id}/reject`, {
        adminNote: adminNote.trim(),
      });

      toast.success(res.data?.message || "Withdrawal rejected successfully");

      closeModal();

      await fetchWithdrawals();
    } catch (error) {
      console.error("Reject withdrawal error:", error);

      toast.error(
        error.response?.data?.message || "Unable to reject withdrawal",
      );
    } finally {
      setProcessing(false);
    }
  };

  /*
    =====================================================
    MARK AS PAID
    =====================================================
    */

  const markAsPaid = async () => {
    if (!selected) return;

    try {
      setProcessing(true);

      const res = await api.patch(`/admin/withdrawals/${selected._id}/paid`);

      toast.success(res.data?.message || "Withdrawal marked as paid");

      closeModal();

      await fetchWithdrawals();
    } catch (error) {
      console.error("Mark withdrawal paid error:", error);

      toast.error(
        error.response?.data?.message || "Unable to mark withdrawal as paid",
      );
    } finally {
      setProcessing(false);
    }
  };

  /*
    =====================================================
    FORMAT MONEY
    =====================================================
    */

  const formatMoney = (amount) => {
    return `₦${Number(amount || 0).toLocaleString()}`;
  };

  /*
    =====================================================
    LOADING
    =====================================================
    */

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
      {/* =================================================
          HEADER
      ================================================= */}

      <PageHeader
        title="Withdrawal Management"
        subtitle="Review, approve, reject and process user wallet withdrawals"
      />

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total"
          value={stats.total}
          icon={<FaWallet />}
          color="blue"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<FaClock />}
          color="orange"
        />

        <StatCard
          title="Approved"
          value={stats.approved}
          icon={<FaCheckCircle />}
          color="green"
        />

        <StatCard
          title="Paid"
          value={stats.paid}
          icon={<FaMoneyBillWave />}
          color="green"
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={<FaTimesCircle />}
          color="red"
        />

        <StatCard
          title="Requested"
          value={formatMoney(stats.totalAmount)}
          icon={<FaMoneyBillWave />}
          color="blue"
        />
      </div>

      {/* =================================================
          FILTER BAR
      ================================================= */}

      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* SEARCH */}

          <div className="relative w-full lg:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer, email, bank..."
              className="
                w-full
                pl-11
                pr-4
                py-3
                rounded-xl
                border
                border-slate-200
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                outline-none
              "
            />
          </div>

          {/* STATUS */}

          <div className="flex gap-2 overflow-x-auto">
            {[
              ["all", "All"],
              ["pending", "Pending"],
              ["approved", "Approved"],
              ["paid", "Paid"],
              ["rejected", "Rejected"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  whitespace-nowrap
                  transition
                  ${
                    statusFilter === value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <h2 className="font-bold text-lg text-slate-800">
              Withdrawal Requests
            </h2>

            <p className="text-sm text-slate-500">
              {filteredWithdrawals.length} request
              {filteredWithdrawals.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={fetchWithdrawals}
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-4 text-xs uppercase text-slate-500">
                  Customer
                </th>

                <th className="text-left px-5 py-4 text-xs uppercase text-slate-500">
                  Bank Details
                </th>

                <th className="text-left px-5 py-4 text-xs uppercase text-slate-500">
                  Amount
                </th>

                <th className="text-left px-5 py-4 text-xs uppercase text-slate-500">
                  Status
                </th>

                <th className="text-left px-5 py-4 text-xs uppercase text-slate-500">
                  Date
                </th>

                <th className="text-right px-5 py-4 text-xs uppercase text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredWithdrawals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-400">
                    <FaWallet className="mx-auto text-4xl mb-3 opacity-30" />

                    <p className="font-medium">No withdrawal requests found</p>
                  </td>
                </tr>
              ) : (
                filteredWithdrawals.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    {/* CUSTOMER */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <FaUser />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {item.user?.firstName || "Unknown"}{" "}
                            {item.user?.lastName || ""}
                          </p>

                          <p className="text-xs text-slate-500">
                            {item.user?.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* BANK */}

                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-700">
                        {item.bankDetails?.bankName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.bankDetails?.accountName}
                      </p>

                      <p className="text-xs font-mono text-slate-600">
                        {item.bankDetails?.accountNumber}
                      </p>
                    </td>

                    {/* AMOUNT */}

                    <td className="px-5 py-4">
                      <p className="font-bold text-blue-600">
                        {formatMoney(item.amount)}
                      </p>
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <StatusBadge status={item.status} />
                    </td>

                    {/* DATE */}

                    <td className="px-5 py-4 text-slate-500">
                      <p>{new Date(item.createdAt).toLocaleDateString()}</p>

                      <p className="text-xs">
                        {new Date(item.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => openReview(item)}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-lg
                            bg-blue-600
                            text-white
                            hover:bg-blue-700
                            transition
                          "
                      >
                        Review
                        <FaArrowRight className="text-xs" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================
          REVIEW MODAL
      ================================================= */}

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Withdrawal Review
                </h2>

                <p className="text-sm text-slate-500">
                  Request #{selected._id?.slice(-8)}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={processing}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* AMOUNT */}

              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 text-white">
                <p className="text-sm opacity-80">Withdrawal Amount</p>

                <h3 className="text-3xl font-bold mt-1">
                  {formatMoney(selected.amount)}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-sm">
                  <StatusBadge status={selected.status} light />
                </div>
              </div>

              {/* CUSTOMER */}

              <div className="border rounded-xl p-5">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <FaUser className="text-blue-600" />
                  Customer Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <InfoItem
                    icon={<FaUser />}
                    label="Name"
                    value={`${selected.user?.firstName || ""} ${
                      selected.user?.lastName || ""
                    }`}
                  />

                  <InfoItem
                    icon={<FaEnvelope />}
                    label="Email"
                    value={selected.user?.email || "N/A"}
                  />

                  <InfoItem
                    icon={<FaPhone />}
                    label="Phone"
                    value={selected.user?.phone || "N/A"}
                  />

                  <InfoItem
                    icon={<FaWallet />}
                    label="Current Wallet"
                    value={formatMoney(selected.user?.walletBalance)}
                  />
                </div>
              </div>

              {/* BANK */}

              <div className="border rounded-xl p-5">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <FaUniversity className="text-blue-600" />
                  Withdrawal Bank Account
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <InfoItem
                    label="Bank"
                    value={selected.bankDetails?.bankName}
                  />

                  <InfoItem
                    label="Account Name"
                    value={selected.bankDetails?.accountName}
                  />

                  <InfoItem
                    label="Account Number"
                    value={selected.bankDetails?.accountNumber}
                    mono
                  />
                </div>
              </div>

              {/* ADMIN NOTE */}

              {selected.status === "pending" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Admin Note
                  </label>

                  <textarea
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    rows={4}
                    placeholder="Add a note. A rejection requires a reason."
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      p-4
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                      resize-none
                    "
                  />
                </div>
              )}

              {/* EXISTING NOTE */}

              {selected.adminNote && selected.status !== "pending" && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs uppercase text-slate-400 font-semibold mb-1">
                    Admin Note
                  </p>

                  <p className="text-sm text-slate-700">{selected.adminNote}</p>
                </div>
              )}

              {/* ACTIONS */}

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                <button
                  onClick={closeModal}
                  disabled={processing}
                  className="
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    text-slate-700
                    hover:bg-slate-50
                  "
                >
                  Close
                </button>

                {/* PENDING */}

                {selected.status === "pending" && (
                  <>
                    <button
                      onClick={rejectWithdrawal}
                      disabled={processing}
                      className="
                        px-5
                        py-3
                        rounded-xl
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >
                      <FaTimesCircle />

                      {processing ? "Processing..." : "Reject"}
                    </button>

                    <button
                      onClick={approveWithdrawal}
                      disabled={processing}
                      className="
                        px-5
                        py-3
                        rounded-xl
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >
                      <FaCheck />

                      {processing ? "Processing..." : "Approve"}
                    </button>
                  </>
                )}

                {/* APPROVED */}

                {selected.status === "approved" && (
                  <button
                    onClick={markAsPaid}
                    disabled={processing}
                    className="
                      px-5
                      py-3
                      rounded-xl
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <FaMoneyBillWave />

                    {processing ? "Processing..." : "Mark as Paid"}
                  </button>
                )}

                {/* PAID */}

                {selected.status === "paid" && (
                  <div className="px-5 py-3 rounded-xl bg-green-50 text-green-700 font-semibold flex items-center gap-2">
                    <FaCheckCircle />
                    Payment Completed
                  </div>
                )}

                {/* REJECTED */}

                {selected.status === "rejected" && (
                  <div className="px-5 py-3 rounded-xl bg-red-50 text-red-700 font-semibold flex items-center gap-2">
                    <FaTimesCircle />
                    Withdrawal Rejected
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/*
=====================================================
STAT CARD
=====================================================
*/

const StatCard = ({ title, value, icon, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",

    green: "bg-green-50 text-green-600",

    orange: "bg-orange-50 text-orange-600",

    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>

        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-1">
          {value}
        </h3>
      </div>

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${colors[color]}`}
      >
        {icon}
      </div>
    </div>
  );
};

/*
=====================================================
INFO ITEM
=====================================================
*/

const InfoItem = ({ icon, label, value, mono = false }) => {
  return (
    <div>
      <p className="text-xs text-slate-400 mb-1">
        {icon && <span className="inline-block mr-1">{icon}</span>}

        {label}
      </p>

      <p className={`font-medium text-slate-700 ${mono ? "font-mono" : ""}`}>
        {value || "N/A"}
      </p>
    </div>
  );
};

/*
=====================================================
STATUS BADGE
=====================================================
*/

const StatusBadge = ({ status, light = false }) => {
  const styles = {
    pending: "bg-orange-100 text-orange-700",

    approved: "bg-green-100 text-green-700",

    paid: "bg-blue-100 text-blue-700",

    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${styles[status] || "bg-slate-100 text-slate-600"}
        ${light ? "shadow-sm" : ""}
      `}
    >
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
    </span>
  );
};

export default WithdrawalManagement;
