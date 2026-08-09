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
  FaCreditCard,
  FaTimes,
  FaEye,
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

  const [status, setStatus] = useState("approved");
  const [adminNote, setAdminNote] = useState("");

  /* =====================================================
     FETCH WITHDRAWALS
  ===================================================== */

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/withdrawals");

      setWithdrawals(res.data?.data || []);
    } catch (err) {
      console.error("Fetch withdrawals error:", err);

      toast.error(
        err.response?.data?.message ||
          "Failed to load withdrawals"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  /* =====================================================
     FILTER WITHDRAWALS
  ===================================================== */

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return withdrawals.filter((item) => {
      const firstName =
        item.user?.firstName?.toLowerCase() || "";

      const lastName =
        item.user?.lastName?.toLowerCase() || "";

      const email =
        item.user?.email?.toLowerCase() || "";

      const accountNumber =
        item.bankDetails?.accountNumber
          ?.toLowerCase() || "";

      const bankName =
        item.bankDetails?.bankName
          ?.toLowerCase() || "";

      const matchesSearch =
        !keyword ||
        firstName.includes(keyword) ||
        lastName.includes(keyword) ||
        email.includes(keyword) ||
        accountNumber.includes(keyword) ||
        bankName.includes(keyword);

      const matchesStatus =
        statusFilter === "all" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [withdrawals, search, statusFilter]);

  /* =====================================================
     STATISTICS
  ===================================================== */

  const stats = useMemo(() => {
    const total = withdrawals.length;

    const pending = withdrawals.filter(
      (item) => item.status === "pending"
    ).length;

    const approved = withdrawals.filter(
      (item) => item.status === "approved"
    ).length;

    const paid = withdrawals.filter(
      (item) => item.status === "paid"
    ).length;

    const rejected = withdrawals.filter(
      (item) => item.status === "rejected"
    ).length;

    const totalAmount = withdrawals.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const pendingAmount = withdrawals
      .filter((item) => item.status === "pending")
      .reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      );

    return {
      total,
      pending,
      approved,
      paid,
      rejected,
      totalAmount,
      pendingAmount,
    };
  }, [withdrawals]);

  /* =====================================================
     OPEN REVIEW
  ===================================================== */

  const openReview = (withdrawal) => {
    setSelected(withdrawal);

    setStatus(
      withdrawal.status === "pending"
        ? "approved"
        : withdrawal.status
    );

    setAdminNote(withdrawal.adminNote || "");
  };

  /* =====================================================
     CLOSE REVIEW
  ===================================================== */

  const closeReview = () => {
    if (processing) return;

    setSelected(null);
    setAdminNote("");
    setStatus("approved");
  };

  /* =====================================================
     UPDATE WITHDRAWAL
  ===================================================== */

  const submitDecision = async () => {
    if (!selected) return;

    if (
      !["approved", "rejected", "paid"].includes(status)
    ) {
      toast.error("Invalid withdrawal status");
      return;
    }

    try {
      setProcessing(true);

      await api.patch(
        `/withdrawals/${selected._id}`,
        {
          status,
          adminNote: adminNote.trim(),
        }
      );

      toast.success(
        status === "approved"
          ? "Withdrawal approved successfully"
          : status === "paid"
          ? "Withdrawal marked as paid"
          : "Withdrawal rejected successfully"
      );

      closeReview();

      await fetchWithdrawals();
    } catch (err) {
      console.error(
        "Update withdrawal error:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Unable to update withdrawal"
      );
    } finally {
      setProcessing(false);
    }
  };

  /* =====================================================
     MARK AS PAID
  ===================================================== */

  const markAsPaid = async (withdrawal) => {
    if (!withdrawal) return;

    const confirmed = window.confirm(
      `Mark ₦${Number(
        withdrawal.amount
      ).toLocaleString()} withdrawal as paid?`
    );

    if (!confirmed) return;

    try {
      setProcessing(true);

      await api.patch(
        `/withdrawals/${withdrawal._id}/aprove`,
        {
          status: "paid",
          adminNote:
            withdrawal.adminNote ||
            "Withdrawal payment completed.",
        }
      );

      toast.success(
        "Withdrawal marked as paid"
      );

      await fetchWithdrawals();
    } catch (err) {
      console.error(
        "Mark paid error:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Unable to mark withdrawal as paid"
      );
    } finally {
      setProcessing(false);
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6 p-4 md:p-6 bg-slate-50 min-h-screen">

      {/* =================================================
          HEADER
      ================================================= */}

      <PageHeader
        title="Withdrawal Management"
        subtitle="Review, approve and manage customer referral withdrawals"
      />

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">

        <StatCard
          title="Total Requests"
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
          color="purple"
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={<FaTimesCircle />}
          color="red"
        />

        <StatCard
          title="Pending Amount"
          value={`₦${stats.pendingAmount.toLocaleString()}`}
          icon={<FaWallet />}
          color="blue"
        />

      </div>

      {/* =================================================
          SEARCH + FILTER
      ================================================= */}

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* SEARCH */}

          <div className="relative flex-1">

            <FaSearch
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search customer, email, bank or account number..."
              className="
                w-full
                pl-11
                pr-4
                py-3
                border
                border-slate-200
                rounded-xl
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                transition
              "
            />

          </div>

          {/* STATUS FILTER */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
              px-4
              py-3
              border
              border-slate-200
              rounded-xl
              bg-white
              outline-none
              focus:border-blue-500
              min-w-[180px]
            "
          >
            <option value="all">
              All Withdrawals
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="approved">
              Approved
            </option>

            <option value="paid">
              Paid
            </option>

            <option value="rejected">
              Rejected
            </option>
          </select>

        </div>

      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

          <div>
            <h2 className="font-bold text-slate-800">
              Withdrawal Requests
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              {filtered.length} request
              {filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 uppercase text-[11px] tracking-wide text-slate-500">

              <tr>

                <th className="text-left px-6 py-4">
                  Customer
                </th>

                <th className="text-left px-6 py-4">
                  Bank Details
                </th>

                <th className="text-left px-6 py-4">
                  Amount
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-left px-6 py-4">
                  Date
                </th>

                <th className="text-right px-6 py-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-16"
                  >

                    <FaWallet className="mx-auto text-4xl text-slate-300 mb-3" />

                    <p className="font-medium text-slate-600">
                      No withdrawal requests found
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      Try changing your search or filter.
                    </p>

                  </td>

                </tr>

              ) : (

                filtered.map((item) => (

                  <tr
                    key={item._id}
                    className="
                      border-t
                      border-slate-100
                      hover:bg-slate-50
                      transition
                    "
                  >

                    {/* CUSTOMER */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="
                          w-10
                          h-10
                          rounded-full
                          bg-blue-50
                          text-blue-600
                          flex
                          items-center
                          justify-center
                          shrink-0
                        ">
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

                    <td className="px-6 py-4">

                      <div className="flex items-start gap-3">

                        <FaUniversity className="text-slate-400 mt-1" />

                        <div>

                          <p className="font-medium text-slate-700">
                            {item.bankDetails?.bankName ||
                              "N/A"}
                          </p>

                          <p className="text-xs text-slate-500">
                            {item.bankDetails?.accountName ||
                              "N/A"}
                          </p>

                          <p className="text-xs font-mono text-slate-600 mt-1">
                            {item.bankDetails?.accountNumber ||
                              "N/A"}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* AMOUNT */}

                    <td className="px-6 py-4">

                      <p className="font-bold text-blue-600">
                        ₦
                        {Number(
                          item.amount || 0
                        ).toLocaleString()}
                      </p>

                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <StatusBadge
                        status={item.status}
                      />

                    </td>

                    {/* DATE */}

                    <td className="px-6 py-4 text-slate-500">

                      <p>
                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>

                      <p className="text-xs mt-1">
                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : ""}
                      </p>

                    </td>

                    {/* ACTION */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            openReview(item)
                          }
                          className="
                            inline-flex
                            items-center
                            gap-2
                            px-3
                            py-2
                            rounded-lg
                            bg-slate-100
                            text-slate-700
                            hover:bg-slate-200
                            transition
                            font-medium
                          "
                        >
                          <FaEye />

                          View
                        </button>

                        {item.status ===
                          "pending" && (

                          <button
                            onClick={() =>
                              openReview(item)
                            }
                            className="
                              px-3
                              py-2
                              rounded-lg
                              bg-blue-600
                              hover:bg-blue-700
                              text-white
                              font-medium
                              transition
                            "
                          >
                            Review
                          </button>

                        )}

                        {item.status ===
                          "approved" && (

                          <button
                            disabled={processing}
                            onClick={() =>
                              markAsPaid(item)
                            }
                            className="
                              px-3
                              py-2
                              rounded-lg
                              bg-green-600
                              hover:bg-green-700
                              disabled:opacity-50
                              text-white
                              font-medium
                              transition
                            "
                          >
                            Mark Paid
                          </button>

                        )}

                      </div>

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

        <div className="
          fixed
          inset-0
          bg-black/50
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-50
          p-4
        ">

          <div className="
            bg-white
            rounded-2xl
            w-full
            max-w-xl
            max-h-[90vh]
            overflow-y-auto
            shadow-2xl
          ">

            {/* MODAL HEADER */}

            <div className="
              px-6
              py-5
              border-b
              border-slate-200
              flex
              items-center
              justify-between
            ">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Withdrawal Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Review this withdrawal request
                </p>

              </div>

              <button
                onClick={closeReview}
                disabled={processing}
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-slate-100
                  text-slate-500
                  flex
                  items-center
                  justify-center
                  hover:bg-slate-200
                "
              >
                <FaTimes />
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="p-6 space-y-5">

              {/* USER */}

              <div className="
                bg-slate-50
                rounded-xl
                p-4
              ">

                <div className="flex items-center gap-3">

                  <div className="
                    w-11
                    h-11
                    rounded-full
                    bg-blue-100
                    text-blue-600
                    flex
                    items-center
                    justify-center
                  ">
                    <FaUser />
                  </div>

                  <div>

                    <p className="font-bold text-slate-800">
                      {selected.user?.firstName}{" "}
                      {selected.user?.lastName}
                    </p>

                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <FaEnvelope className="text-xs" />

                      {selected.user?.email}
                    </p>

                  </div>

                </div>

              </div>

              {/* AMOUNT */}

              <div className="
                bg-blue-50
                border
                border-blue-100
                rounded-xl
                p-5
                text-center
              ">

                <p className="text-sm text-blue-600">
                  Withdrawal Amount
                </p>

                <p className="
                  text-3xl
                  font-bold
                  text-blue-700
                  mt-1
                ">
                  ₦
                  {Number(
                    selected.amount || 0
                  ).toLocaleString()}
                </p>

              </div>

              {/* BANK DETAILS */}

              <div>

                <h3 className="
                  font-bold
                  text-slate-800
                  mb-3
                  flex
                  items-center
                  gap-2
                ">
                  <FaUniversity className="text-blue-600" />

                  Bank Details
                </h3>

                <div className="
                  border
                  border-slate-200
                  rounded-xl
                  divide-y
                  divide-slate-100
                ">

                  <DetailRow
                    label="Bank"
                    value={
                      selected.bankDetails?.bankName ||
                      "N/A"
                    }
                  />

                  <DetailRow
                    label="Account Name"
                    value={
                      selected.bankDetails?.accountName ||
                      "N/A"
                    }
                  />

                  <DetailRow
                    label="Account Number"
                    value={
                      selected.bankDetails?.accountNumber ||
                      "N/A"
                    }
                    mono
                  />

                </div>

              </div>

              {/* CURRENT STATUS */}

              <div>

                <p className="text-sm font-semibold text-slate-700 mb-2">
                  Current Status
                </p>

                <StatusBadge
                  status={selected.status}
                />

              </div>

              {/* DECISION */}

              {selected.status === "pending" && (

                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    Decision
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      p-3
                      outline-none
                      focus:border-blue-500
                    "
                  >

                    <option value="approved">
                      Approve Withdrawal
                    </option>

                    <option value="rejected">
                      Reject Withdrawal
                    </option>

                  </select>

                </div>

              )}

              {/* ADMIN NOTE */}

              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                  mb-2
                ">
                  Admin Note
                </label>

                <textarea
                  rows={4}
                  placeholder="Add a note for this withdrawal..."
                  value={adminNote}
                  onChange={(e) =>
                    setAdminNote(e.target.value)
                  }
                  disabled={
                    selected.status !== "pending"
                  }
                  className="
                    w-full
                    border
                    border-slate-200
                    rounded-xl
                    p-3
                    resize-none
                    outline-none
                    focus:border-blue-500
                    disabled:bg-slate-50
                  "
                />

              </div>

              {/* EXISTING ADMIN NOTE */}

              {selected.adminNote && (

                <div className="
                  bg-yellow-50
                  border
                  border-yellow-100
                  rounded-xl
                  p-4
                ">

                  <p className="
                    text-xs
                    uppercase
                    font-bold
                    text-yellow-700
                    mb-1
                  ">
                    Previous Admin Note
                  </p>

                  <p className="text-sm text-yellow-800">
                    {selected.adminNote}
                  </p>

                </div>

              )}

            </div>

            {/* MODAL FOOTER */}

            <div className="
              px-6
              py-5
              border-t
              border-slate-200
              flex
              flex-col-reverse
              sm:flex-row
              justify-end
              gap-3
            ">

              <button
                onClick={closeReview}
                disabled={processing}
                className="
                  px-5
                  py-3
                  border
                  border-slate-200
                  rounded-xl
                  font-semibold
                  text-slate-600
                  hover:bg-slate-50
                "
              >
                Close
              </button>

              {selected.status === "pending" && (

                <button
                  disabled={processing}
                  onClick={submitDecision}
                  className={`
                    px-5
                    py-3
                    rounded-xl
                    text-white
                    font-semibold
                    transition
                    ${
                      status === "rejected"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }
                    disabled:opacity-50
                  `}
                >
                  {processing
                    ? "Processing..."
                    : status === "rejected"
                    ? "Reject Withdrawal"
                    : "Approve Withdrawal"}
                </button>

              )}

              {selected.status === "approved" && (

                <button
                  disabled={processing}
                  onClick={() =>
                    markAsPaid(selected)
                  }
                  className="
                    px-5
                    py-3
                    rounded-xl
                    bg-green-600
                    hover:bg-green-700
                    disabled:opacity-50
                    text-white
                    font-semibold
                  "
                >
                  {processing
                    ? "Processing..."
                    : "Mark as Paid"}
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

/* =====================================================
   STAT CARD
===================================================== */

const StatCard = ({
  title,
  value,
  icon,
  color = "blue",
}) => {

  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      p-5
      shadow-sm
      flex
      items-center
      justify-between
    ">

      <div>

        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </p>

        <h3 className="
          text-xl
          md:text-2xl
          font-bold
          text-slate-800
          mt-1
        ">
          {value}
        </h3>

      </div>

      <div
        className={`
          w-11
          h-11
          rounded-xl
          flex
          items-center
          justify-center
          ${colors[color]}
        `}
      >
        {icon}
      </div>

    </div>
  );
};

/* =====================================================
   DETAIL ROW
===================================================== */

const DetailRow = ({
  label,
  value,
  mono = false,
}) => {
  return (
    <div className="
      px-4
      py-3
      flex
      justify-between
      gap-4
    ">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span
        className={`
          text-sm
          font-semibold
          text-slate-800
          text-right
          ${mono ? "font-mono" : ""}
        `}
      >
        {value}
      </span>

    </div>
  );
};

/* =====================================================
   STATUS BADGE
===================================================== */

const StatusBadge = ({ status }) => {

  const styles = {
    pending:
      "bg-orange-100 text-orange-700",
    approved:
      "bg-blue-100 text-blue-700",
    paid:
      "bg-green-100 text-green-700",
    rejected:
      "bg-red-100 text-red-700",
  };

  const labels = {
    pending: "Pending",
    approved: "Approved",
    paid: "Paid",
    rejected: "Rejected",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1.5
        rounded-full
        text-xs
        font-bold
        ${styles[status] || "bg-slate-100 text-slate-600"}
      `}
    >
      {labels[status] || status}
    </span>
  );
};

export default WithdrawalManagement;