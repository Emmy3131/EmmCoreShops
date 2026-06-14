import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../library/api";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const DesktopFooter = () => {
  const [pages, setPages] = useState([]);

  const fetchPages = async () => {
    try {
      const res = await api.get("/pages/published");

      if (res.data.status === "success") {
        setPages(res.data.data || []);
      }
    } catch (error) {
      console.error("CMS pages error:", error);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const companyPages = pages.filter((p) => p.section === "company");
  const legalPages = pages.filter((p) => p.section === "legal");
  const helpPages = pages.filter((p) => p.section === "help");
  const affiliatePages = pages.filter((p) => p.section === "affiliate");

  return (
    <footer className="bg-gradient-to-b from-black to-zinc-900 text-white mt-16">

      {/* TOP STRIP */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-3 text-pink-400">
              Customer Support
            </h3>
            <p className="text-gray-400 text-sm">
              Need help? Our support team is available to assist you with orders, payments, and inquiries.
            </p>
          </div>

          {/* PAYSTACK ONLY */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-3 text-pink-400">
              Secure Payments
            </h3>
            <p className="text-gray-400 text-sm">
              All payments are securely processed via <span className="text-white font-semibold">Paystack</span>.
            </p>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-3 text-pink-400">
              Follow Us
            </h3>

            <div className="flex gap-4 mt-2">
              <a href="#" className="bg-zinc-800 p-3 rounded-full hover:bg-pink-600 transition">
                <FaFacebookF />
              </a>

              <a href="#" className="bg-zinc-800 p-3 rounded-full hover:bg-pink-600 transition">
                <FaXTwitter />
              </a>

              <a href="#" className="bg-zinc-800 p-3 rounded-full hover:bg-pink-600 transition">
                <FaInstagram />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN LINKS */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">

        {/* COMPANY */}
        <div>
          <h3 className="font-bold mb-4 text-pink-400">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {companyPages.map((page) => (
              <li key={page._id}>
                <Link to={`/page/${page.slug}`} className="hover:text-white">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h3 className="font-bold mb-4 text-pink-400">Help Center</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {helpPages.map((page) => (
              <li key={page._id}>
                <Link to={`/page/${page.slug}`} className="hover:text-white">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="font-bold mb-4 text-pink-400">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {legalPages.map((page) => (
              <li key={page._id}>
                <Link to={`/page/${page.slug}`} className="hover:text-white">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* AFFILIATE */}
        <div>
          <h3 className="font-bold mb-4 text-pink-400">Make Money</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {affiliatePages.map((page) => (
              <li key={page._id}>
                <Link to={`/page/${page.slug}`} className="hover:text-white">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* PAYMENT INFO */}
        <div>
          <h3 className="font-bold mb-4 text-pink-400">Payments</h3>
          <p className="text-sm text-gray-400">
            We only accept secure payments via <span className="text-white font-semibold">Paystack</span>.
          </p>

          <div className="mt-4 text-xs text-gray-500">
            Cards, Bank Transfer & Mobile payments supported.
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-zinc-800 py-6 text-center text-gray-500 text-sm">
        © 2026 EmmCoreShops. All rights reserved.
      </div>
    </footer>
  );
};

export default DesktopFooter;