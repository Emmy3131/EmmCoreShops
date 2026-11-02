import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaGift,
  FaCopy,
  FaWhatsapp,
  FaCheckCircle,
  FaClock,
  FaWallet,
  FaShareAlt,
  FaArrowRight,
  FaUserPlus,
  FaMoneyBillWave,
} from "react-icons/fa";

import { toast } from "react-toastify";

import api from "../../library/api";

const Referral = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [copied, setCopied] = useState(false);

  /* =====================================================
     FETCH REFERRAL + WALLET DATA
  ===================================================== */

  const getReferralData = async () => {
    try {
      setLoading(true);

      const [referralRes, userRes] = await Promise.all([
        api.get("/referrals/me"),
        api.get("/users/me"),
      ]);

      setData(referralRes.data?.data);

      const user =
        userRes.data?.data?.user ||
        userRes.data?.data;

      setWalletBalance(user?.walletBalance || 0);
    } catch (error) {
      console.error("Referral data error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load referral data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReferralData();
  }, []);

  /* =====================================================
     COPY REFERRAL LINK
  ===================================================== */

  const copyReferral = async () => {
    if (!data?.referralLink) return;

    try {
      await navigator.clipboard.writeText(
        data.referralLink,
      );

      setCopied(true);

      toast.success("Referral link copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Unable to copy referral link");
    }
  };

  /* =====================================================
     WHATSAPP SHARE
  ===================================================== */

  const shareWhatsapp = () => {
    if (!data?.referralLink) return;

    const message = `Join me on EmmCoreShops and start shopping today! 🎉

Use my referral link:

${data.referralLink}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        message,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  /* =====================================================
     SHARE
  ===================================================== */

  const shareReferral = async () => {
    if (!data?.referralLink) return;

    const shareData = {
      title: "Join EmmCoreShops",
      text: "Join EmmCoreShops using my referral link.",
      url: data.referralLink,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await copyReferral();
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error(error);
      }
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 py-7 text-center">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin mx-auto mb-4" />

          <p className="font-semibold text-slate-700">
            Loading referral dashboard...
          </p>

          <p className="text-sm text-slate-400 mt-1">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-slate-500">
            Unable to load referral information.
          </p>

          <button
            onClick={getReferralData}
            className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FaUsers className="text-lg" />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Referral Program
              </h1>

              <p className="text-sm text-slate-500">
                Invite friends and earn rewards.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* =================================================
            HERO / EARNINGS CARD
        ================================================= */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 text-white shadow-xl">
          {/* Decorative circles */}

          <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/10" />

          <div className="absolute -right-20 bottom-[-60px] w-56 h-56 rounded-full bg-white/10" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Earnings */}

              <div>
                <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <FaGift />
                  Total Referral Earnings
                </div>

                <h2 className="text-4xl sm:text-5xl font-bold mt-3">
                  ₦
                  {Number(
                    data.totalBonus || 0,
                  ).toLocaleString()}
                </h2>

                <p className="text-sm text-white/75 mt-2 max-w-md">
                  Earn rewards when people sign up using
                  your referral link and complete the
                  qualifying purchase.
                </p>
              </div>

              {/* Wallet */}

              <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-5 min-w-[240px]">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <FaWallet />
                  Available Wallet Balance
                </div>

                <p className="text-2xl font-bold mt-2">
                  ₦
                  {Number(
                    walletBalance || 0,
                  ).toLocaleString()}
                </p>

                <Link
                  to="/withdrawal"
                  className="mt-4 w-full bg-white text-blue-600 hover:bg-slate-50 rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-bold transition"
                >
                  Withdraw Earnings
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total */}

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FaUsers />
              </div>

              <span className="text-xs font-semibold text-slate-400">
                TOTAL
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-4">
              {data.totalReferrals || 0}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Total Referrals
            </p>
          </div>

          {/* Successful */}

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <FaCheckCircle />
              </div>

              <span className="text-xs font-semibold text-green-600">
                SUCCESS
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-4">
              {data.successfulReferrals || 0}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Successful Referrals
            </p>
          </div>

          {/* Pending */}

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <FaClock />
              </div>

              <span className="text-xs font-semibold text-orange-600">
                PENDING
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-4">
              {data.pendingReferrals || 0}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Pending Referrals
            </p>
          </div>

          {/* Wallet */}

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <FaMoneyBillWave />
              </div>

              <span className="text-xs font-semibold text-purple-600">
                WALLET
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-4">
              ₦
              {Number(
                walletBalance || 0,
              ).toLocaleString()}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Available Balance
            </p>
          </div>
        </div>

        {/* =================================================
            REFERRAL LINK
        ================================================= */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FaShareAlt />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Your Referral Link
                </h2>

                <p className="text-sm text-slate-500">
                  Share this link with friends to start
                  earning.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {/* Referral Code */}

            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Referral Code
              </p>

              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold tracking-wider">
                {data.referralCode || "N/A"}
              </div>
            </div>

            {/* Link */}

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-2">
                Referral URL
              </p>

              <p className="text-sm text-slate-700 break-all font-medium">
                {data.referralLink}
              </p>
            </div>

            {/* Actions */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <button
                onClick={copyReferral}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                {copied ? (
                  <>
                    <FaCheckCircle />
                    Copied
                  </>
                ) : (
                  <>
                    <FaCopy />
                    Copy Link
                  </>
                )}
              </button>

              <button
                onClick={shareWhatsapp}
                className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <FaWhatsapp className="text-lg" />
                WhatsApp
              </button>

              <button
                onClick={shareReferral}
                className="bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <FaShareAlt />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900">
            How Referral Rewards Work
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Follow these simple steps to earn referral
            bonuses.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mt-6">
            {/* STEP 1 */}

            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FaShareAlt />
              </div>

              <h3 className="font-bold text-slate-900 mt-4">
                1. Share Your Link
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Send your unique referral link to friends
                and family.
              </p>
            </div>

            {/* STEP 2 */}

            <div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <FaUserPlus />
              </div>

              <h3 className="font-bold text-slate-900 mt-4">
                2. Friend Signs Up
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Your friend creates an EmmCoreShops
                account through your link.
              </p>
            </div>

            {/* STEP 3 */}

            <div>
              <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <FaGift />
              </div>

              <h3 className="font-bold text-slate-900 mt-4">
                3. Earn Your Bonus
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Once the qualifying purchase is completed,
                your referral bonus is credited to your
                wallet.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            REFERRAL HISTORY
        ================================================= */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Referral History
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Track everyone who joined through your
                referral.
              </p>
            </div>

            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-slate-100 items-center justify-center text-slate-600">
              <FaUsers />
            </div>
          </div>

          {data.referrals?.length === 0 ? (
            <div className="py-14 text-center px-5">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FaUsers className="text-xl" />
              </div>

              <h3 className="font-semibold text-slate-700 mt-4">
                No referrals yet
              </h3>

              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                Share your referral link with friends and
                start earning rewards.
              </p>

              <button
                onClick={copyReferral}
                className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold"
              >
                Copy Referral Link
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {data.referrals?.map((item) => (
                <div
                  key={item._id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  {/* USER */}

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {item.referredUser?.firstName
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.referredUser
                          ?.firstName || "User"}{" "}
                        {item.referredUser
                          ?.lastName || ""}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.referredUser?.email ||
                          "Registered user"}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {item.createdAt
                          ? new Date(
                              item.createdAt,
                            ).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                  </div>

                  {/* STATUS + BONUS */}

                  <div className="flex items-center justify-between sm:justify-end gap-5">
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status ===
                          "rewarded"
                            ? "bg-green-100 text-green-700"
                            : item.status ===
                                "qualified"
                              ? "bg-blue-100 text-blue-700"
                              : item.status ===
                                  "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.status ===
                        "rewarded" ? (
                          <FaCheckCircle />
                        ) : item.status ===
                          "cancelled" ? (
                          <FaClock />
                        ) : (
                          <FaClock />
                        )}

                        {item.status ===
                        "rewarded"
                          ? "Rewarded"
                          : item.status ===
                              "qualified"
                            ? "Qualified"
                            : item.status ===
                                "cancelled"
                              ? "Cancelled"
                              : "Pending"}
                      </span>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <p className="font-bold text-green-600">
                        ₦
                        {Number(
                          item.rewardAmount || 0,
                        ).toLocaleString()}
                      </p>

                      <p className="text-xs text-slate-400">
                        {item.status ===
                        "rewarded"
                          ? "Earned"
                          : "Bonus"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =================================================
            WITHDRAW CTA
        ================================================= */}

        <div className="bg-slate-900 rounded-2xl p-6 sm:p-7 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
              <FaWallet />
              Your Referral Wallet
            </div>

            <h2 className="text-2xl font-bold mt-2">
              ₦
              {Number(
                walletBalance || 0,
              ).toLocaleString()}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Available for withdrawal.
            </p>
          </div>

          <Link
            to="/withdrawal"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
          >
            Manage Withdrawal
            <FaArrowRight />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Referral;