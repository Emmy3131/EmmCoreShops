import { useEffect, useMemo, useState } from "react";
import {
  FaWallet,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSearch,
  FaMoneyBillWave,
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

  const [selected, setSelected] = useState(null);

  const [status, setStatus] = useState("approved");

  const [adminNote, setAdminNote] = useState("");

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/withdrawals");

      setWithdrawals(res.data.data || []);
    } catch (err) {
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

  const filtered = useMemo(() => {
    return withdrawals.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.user?.firstName
          ?.toLowerCase()
          .includes(keyword) ||
        item.user?.lastName
          ?.toLowerCase()
          .includes(keyword) ||
        item.user?.email
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [withdrawals, search]);

  const stats = {
    total: withdrawals.length,

    pending: withdrawals.filter(
      (x) => x.status === "pending"
    ).length,

    approved: withdrawals.filter(
      (x) =>
        x.status === "approved" ||
        x.status === "paid"
    ).length,

    rejected: withdrawals.filter(
      (x) => x.status === "rejected"
    ).length,

    totalAmount: withdrawals.reduce(
      (sum, x) => sum + x.amount,
      0
    ),
  };

  const submitDecision = async () => {
    if (!selected) return;

    try {
      setProcessing(true);

      await api.patch(`/withdrawals/${selected._id}`, {
        status,
        adminNote,
      });

      toast.success(
        `Withdrawal ${status} successfully`
      );

      setSelected(null);

      setAdminNote("");

      fetchWithdrawals();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to update withdrawal"
      );
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Withdrawal Management"
        description="Review and process user withdrawal requests."
      />

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
        <StatCard
          title="Total Requests"
          value={stats.total}
          icon={<FaWallet />}
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
          title="Rejected"
          value={stats.rejected}
          icon={<FaTimesCircle />}
          color="red"
        />

        <StatCard
          title="Total Amount"
          value={`₦${stats.totalAmount.toLocaleString()}`}
          icon={<FaMoneyBillWave />}
        />
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-4 text-slate-400" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by customer..."
            className="w-full pl-11 pr-4 py-3 border rounded-lg outline-none"
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 uppercase text-xs text-slate-500">
              <tr>
                <th className="text-left px-6 py-4">
                  Customer
                </th>

                <th className="text-left px-6 py-4">
                  Bank
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
                    className="text-center py-10 text-slate-400"
                  >
                    No withdrawal requests found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold">
                        {item.user?.firstName}{" "}
                        {item.user?.lastName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.user?.email}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p>
                          {
                            item.bankDetails
                              ?.bankName
                          }
                        </p>

                        <p className="text-xs text-slate-500">
                          {
                            item.bankDetails
                              ?.accountNumber
                          }
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-semibold text-blue-600">
                      ₦
                      {item.amount.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge
                        status={item.status}
                      />
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {item.status ===
                        "pending" && (
                        <button
                          onClick={() => {
                            setSelected(item);
                            setStatus(
                              "approved"
                            );
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                          Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-5">
              Review Withdrawal
            </h2>

            <div className="space-y-4">
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              >
                <option value="approved">
                  Approve
                </option>

                <option value="rejected">
                  Reject
                </option>
              </select>

              <textarea
                rows={4}
                placeholder="Admin note..."
                value={adminNote}
                onChange={(e) =>
                  setAdminNote(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg p-3 resize-none"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() =>
                    setSelected(null)
                  }
                  className="px-5 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  disabled={processing}
                  onClick={submitDecision}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {processing
                    ? "Saving..."
                    : "Save Decision"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
  };

  return (
    <div className="bg-white border rounded-xl p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h3 className="text-2xl font-bold mt-1">
          {value}
        </h3>
      </div>

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}
      >
        {icon}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    pending:
      "bg-orange-100 text-orange-700",
    approved:
      "bg-green-100 text-green-700",
    paid:
      "bg-green-100 text-green-700",
    rejected:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default WithdrawalManagement;