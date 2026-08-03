import {
  FaGift,
  FaCopy,
  FaShareAlt,
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaUserFriends,
} from "react-icons/fa";

import { useState } from "react";

const Referral = () => {
  // Replace with API data later
  const referralCode = "EMM-8XQ72";
  const referralLink = `https://emmcoreshops.com/register?ref=${referralCode}`;

  const stats = {
    totalReferrals: 18,
    successful: 12,
    pending: 6,
    bonus: 45000,
  };

  const history = [
    {
      id: 1,
      name: "John D.",
      date: "2 Aug 2026",
      status: "Reward Paid",
      amount: "₦5,000",
    },
    {
      id: 2,
      name: "Sarah M.",
      date: "28 Jul 2026",
      status: "Pending",
      amount: "₦0",
    },
  ];

  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shareReferral = async () => {
    if (navigator.share) {
      navigator.share({
        title: "Join EmmCore Shops",
        text: "Use my referral link to join EmmCore Shops.",
        url: referralLink,
      });
    } else {
      copyLink();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-5 py-5">
        <h1 className="text-2xl font-bold text-slate-800">
          Referral Program
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Invite friends and earn referral rewards.
        </p>
      </div>

      {/* Hero */}
      <div className="p-5">

        <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-500 text-white p-6 shadow-lg">

          <FaGift className="text-4xl mb-4"/>

          <h2 className="text-xl font-bold">
            Earn ₦5,000 for every successful referral
          </h2>

          <p className="mt-2 text-blue-100 text-sm">
            Share your link. Once your friend signs up and completes
            their first qualifying purchase, you'll receive your reward.
          </p>

          <div className="mt-6 bg-white/15 rounded-xl p-4">

            <p className="text-xs uppercase opacity-80">
              Referral Code
            </p>

            <h3 className="text-2xl font-bold tracking-widest">
              {referralCode}
            </h3>

            <div className="mt-4 bg-white rounded-lg text-slate-700 px-3 py-3 text-sm break-all">
              {referralLink}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">

              <button
                onClick={copyLink}
                className="bg-white text-blue-700 rounded-xl py-3 font-semibold flex justify-center items-center gap-2"
              >
                <FaCopy />
                {copied ? "Copied!" : "Copy Link"}
              </button>

              <button
                onClick={shareReferral}
                className="border border-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2"
              >
                <FaShareAlt />
                Share
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="px-5">

        <div className="grid grid-cols-2 gap-4">

          <StatCard
            icon={<FaUsers />}
            title="Total Referrals"
            value={stats.totalReferrals}
          />

          <StatCard
            icon={<FaCheckCircle />}
            title="Successful"
            value={stats.successful}
          />

          <StatCard
            icon={<FaClock />}
            title="Pending"
            value={stats.pending}
          />

          <StatCard
            icon={<FaMoneyBillWave />}
            title="Bonus Earned"
            value={`₦${stats.bonus.toLocaleString()}`}
          />

        </div>

      </div>

      {/* How it Works */}

      <div className="mt-6 px-5">

        <div className="bg-white rounded-2xl p-5 shadow-sm">

          <h2 className="font-bold text-lg mb-4">
            How it Works
          </h2>

          <div className="space-y-4">

            {[
              "Share your referral link.",
              "Your friend signs up.",
              "Friend completes first purchase.",
              "You receive your referral bonus.",
            ].map((step, index) => (
              <div key={index} className="flex gap-4">

                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                <p>{step}</p>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* History */}

      <div className="mt-6 px-5">

        <h2 className="font-bold text-lg mb-4">
          Referral History
        </h2>

        <div className="space-y-3">

          {history.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-xl p-4 shadow-sm flex justify-between"
            >

              <div>

                <h4 className="font-semibold">
                  {item.name}
                </h4>

                <p className="text-xs text-slate-500">
                  {item.date}
                </p>

              </div>

              <div className="text-right">

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    item.status === "Reward Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>

                <p className="mt-2 font-bold text-blue-700">
                  {item.amount}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm">
    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
      {icon}
    </div>

    <p className="text-sm text-slate-500">
      {title}
    </p>

    <h3 className="text-2xl font-bold text-slate-800 mt-1">
      {value}
    </h3>
  </div>
);

export default Referral;