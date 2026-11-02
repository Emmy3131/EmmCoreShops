import { useEffect, useState } from "react";
import {
  FaUsers,
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import PageHeader from "../../component/Admin/PageHeader";
import PageLoader from "../../component/PageLoader";
import api from "../../library/api";
import { toast } from "react-toastify";

const ReferralManagement = () => {
  const [loading, setLoading] = useState(true);

  const [referrals, setReferrals] = useState([]);

  /*
    =====================================
    FETCH REFERRALS
    =====================================
    */

  const fetchReferrals = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/referrals");

      setReferrals(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load referrals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  /*
    =====================================
    STATISTICS
    =====================================
    */

  const totalReferrals = referrals.length;

  const rewarded = referrals.filter(
    (item) => item.status === "rewarded",
  ).length;

  const pending = referrals.filter((item) => item.status === "pending").length;

  const totalBonus = referrals
    .filter((item) => item.status === "rewarded")
    .reduce((sum, item) => sum + item.rewardAmount, 0);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div
      className="
space-y-6
"
    >
      <PageHeader
        title="Referral Management"
        description="
Monitor users referrals, bonuses and performance
"
      />

      {/* STAT CARDS */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-5
"
      >
        <StatCard
          title="Total Referrals"
          value={totalReferrals}
          icon={<FaUsers />}
        />

        <StatCard title="Rewarded" value={rewarded} icon={<FaCheckCircle />} />

        <StatCard title="Pending" value={pending} icon={<FaClock />} />

        <StatCard
          title="Bonus Paid"
          value={`₦${totalBonus.toLocaleString()}`}
          icon={<FaMoneyBillWave />}
        />
      </div>

      {/* TABLE */}

      <div
        className="
bg-white
rounded-2xl
border
border-slate-200
overflow-hidden
"
      >
        <div
          className="
px-6
py-4
border-b
border-slate-200
"
        >
          <h2
            className="
font-bold
text-lg
"
          >
            Referral History
          </h2>
        </div>

        <div
          className="
overflow-x-auto
"
        >
          <table
            className="
w-full
text-sm
"
          >
            <thead
              className="
bg-slate-50
text-slate-500
uppercase
text-xs
"
            >
              <tr>
                <th className="px-6 py-4 text-left">Referrer</th>

                <th className="px-6 py-4 text-left">Referred User</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-left">Bonus</th>

                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {referrals.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="
text-center
py-10
text-slate-400
"
                  >
                    No referrals found
                  </td>
                </tr>
              ) : (
                referrals.map((item) => (
                  <tr
                    key={item._id}
                    className="
border-t
border-slate-100
hover:bg-slate-50
"
                  >
                    <td
                      className="
px-6
py-4
"
                    >
                      <p className="font-semibold">
                        {item.referrer?.firstName} {item.referrer?.lastName}
                      </p>

                      <p
                        className="
text-xs
text-slate-500
"
                      >
                        {item.referrer?.email}
                      </p>
                    </td>

                    <td
                      className="
px-6
py-4
"
                    >
                      <p className="font-medium">
                        {item.referredUser?.firstName}{" "}
                        {item.referredUser?.lastName}
                      </p>

                      <p
                        className="
text-xs
text-slate-500
"
                      >
                        {item.referredUser?.email}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>

                    <td
                      className="
px-6
py-4
font-semibold
text-green-600
"
                    >
                      ₦{(item.rewardAmount || 0).toLocaleString()}
                    </td>

                    <td
                      className="
px-6
py-4
text-slate-500
"
                    >
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/*
=====================================
STAT CARD
=====================================
*/

const StatCard = ({ title, value, icon }) => (
  <div
    className="
bg-white
border
border-slate-200
rounded-2xl
p-5
flex
items-center
justify-between
shadow-sm
"
  >
    <div>
      <p
        className="
text-sm
text-slate-500
"
      >
        {title}
      </p>

      <h3
        className="
text-2xl
font-bold
mt-1
"
      >
        {value}
      </h3>
    </div>

    <div
      className="
w-12
h-12
rounded-xl
bg-blue-50
text-blue-600
flex
items-center
justify-center
text-xl
"
    >
      {icon}
    </div>
  </div>
);

/*
=====================================
STATUS BADGE
=====================================
*/

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-orange-100 text-orange-600",

    qualified: "bg-blue-100 text-blue-600",

    rewarded: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`
px-3
py-1
rounded-full
text-xs
font-semibold
${styles[status] || "bg-gray-100"}
`}
    >
      {status}
    </span>
  );
};

export default ReferralManagement;
