import { useEffect, useState } from "react";
import {
  FaUsers,
  FaGift,
  FaCopy,
  FaWhatsapp,
  FaCheckCircle,
  FaClock,
  FaWallet,
} from "react-icons/fa";

import { toast } from "react-toastify";

import api from "../../library/api";

const Referral = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  /*
  =====================================
  FETCH REFERRAL DATA
  =====================================
  */

  const getReferralData = async () => {
    try {
      setLoading(true);

      const res = await api.get("/referrals/me");

      setData(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load referral data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReferralData();
  }, []);

  /*
  =====================================
  COPY LINK
  =====================================
  */

  const copyReferral = () => {
    navigator.clipboard.writeText(data.referralLink);

    toast.success("Referral link copied");
  };

  /*
  =====================================
  WHATSAPP SHARE
  =====================================
  */

  const shareWhatsapp = () => {
    const message = `Join EmmCoreShops using my referral link and get started:\n\n${data.referralLink}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,

      "_blank",
    );
  };

  if (loading) {
    return (
      <div
        className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      "
      >
        <p>Loading referral...</p>
      </div>
    );
  }

  return (
    <div
      className="
min-h-screen
bg-gray-50
pb-24
"
    >
      {/* HEADER */}

      <div
        className="
bg-white
p-5
shadow-sm
"
      >
        <h1
          className="
text-xl
font-bold
"
        >
          My Referral
        </h1>

        <p
          className="
text-sm
text-gray-500
"
        >
          Invite friends and earn rewards
        </p>
      </div>

      {/* BONUS CARD */}

      <div className="p-5">
        <div
          className="
bg-gradient-to-r
from-blue-600
to-cyan-500
text-white
rounded-2xl
p-6
shadow-lg
"
        >
          <div className="flex items-center gap-3">
            <FaWallet size={25} />

            <p>Referral Bonus</p>
          </div>

          <h2
            className="
text-3xl
font-bold
mt-3
"
          >
            ₦{data.totalBonus.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* STATS */}

      <div
        className="
grid
grid-cols-3
gap-3
px-5
"
      >
        <div
          className="
bg-white
rounded-xl
p-4
text-center
shadow-sm
"
        >
          <FaUsers
            className="
mx-auto
text-blue-600
"
          />

          <h3
            className="
font-bold
mt-2
"
          >
            {data.totalReferrals}
          </h3>

          <p className="text-xs text-gray-500">Total</p>
        </div>

        <div
          className="
bg-white
rounded-xl
p-4
text-center
shadow-sm
"
        >
          <FaCheckCircle
            className="
mx-auto
text-green-500
"
          />

          <h3 className="font-bold mt-2">{data.successfulReferrals}</h3>

          <p className="text-xs text-gray-500">Completed</p>
        </div>

        <div
          className="
bg-white
rounded-xl
p-4
text-center
shadow-sm
"
        >
          <FaClock
            className="
mx-auto
text-orange-500
"
          />

          <h3 className="font-bold mt-2">{data.pendingReferrals}</h3>

          <p className="text-xs text-gray-500">Pending</p>
        </div>
      </div>

      {/* REFERRAL LINK */}

      <div className="p-5">
        <div
          className="
bg-white
rounded-xl
p-5
shadow-sm
"
        >
          <h3
            className="
font-semibold
mb-3
"
          >
            Your Referral Link
          </h3>

          <div
            className="
bg-gray-100
rounded-lg
p-3
text-sm
break-all
"
          >
            {data.referralLink}
          </div>

          <div
            className="
flex
gap-3
mt-4
"
          >
            <button
              onClick={copyReferral}
              className="
flex-1
bg-blue-600
text-white
py-3
rounded-lg
flex
items-center
justify-center
gap-2
"
            >
              <FaCopy />
              Copy
            </button>

            <button
              onClick={shareWhatsapp}
              className="
flex-1
bg-green-500
text-white
py-3
rounded-lg
flex
items-center
justify-center
gap-2
"
            >
              <FaWhatsapp />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* HISTORY */}

      <div className="px-5">
        <h2
          className="
font-bold
text-lg
mb-3
"
        >
          Referral History
        </h2>

        {data.referrals.length === 0 ? (
          <p
            className="
text-center
text-gray-400
"
          >
            No referrals yet
          </p>
        ) : (
          data.referrals.map((item) => (
            <div
              key={item._id}
              className="
bg-white
p-4
rounded-xl
mb-3
shadow-sm
flex
justify-between
"
            >
              <div>
                <p
                  className="
font-semibold
"
                >
                  {item.referredUser?.firstName} {item.referredUser?.lastName}
                </p>

                <p
                  className="
text-xs
text-gray-500
"
                >
                  {item.status}
                </p>
              </div>

              <div
                className="
font-bold
text-green-600
"
              >
                ₦{item.rewardAmount.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Referral;
