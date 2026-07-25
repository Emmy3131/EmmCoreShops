import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../library/api";

import {
  FaFacebookF,
  FaInstagram,
  FaArrowRight,
  FaShieldAlt,
  FaHeadset,
  FaCreditCard,
  FaTruck,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const DesktopFooter = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ===============================
        FETCH CMS PAGES
  =============================== */
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await api.get("/pages/published");

        if (res.data.status === "success") {
          setPages(res.data.data || []);
        }
      } catch (error) {
        console.error("CMS pages error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  /* ===============================
        FILTER PAGES
  =============================== */
  const companyPages = pages.filter(
    (page) => page.section === "company",
  );

  const legalPages = pages.filter(
    (page) => page.section === "legal",
  );

  const helpPages = pages.filter(
    (page) => page.section === "help",
  );

  const affiliatePages = pages.filter(
    (page) => page.section === "affiliate",
  );

  /* ===============================
        NEWSLETTER
  =============================== */
  const handleNewsletter = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      setSubmitting(true);

      // Connect this to your newsletter endpoint
      // await api.post("/newsletter", { email });

      setEmail("");
    } catch (error) {
      console.error(
        "Newsletter subscription error:",
        error,
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ===============================
        LINK GROUP
  =============================== */
  const FooterLinks = ({
    title,
    links,
  }) => (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
        {title}
      </h3>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-3 w-24 rounded-full bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : links.length === 0 ? (
        <p className="text-sm text-slate-500">
          No pages available
        </p>
      ) : (
        <ul className="space-y-3">
          {links.map((page) => (
            <li key={page._id}>
              <Link
                to={`/page/${page.slug}`}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-400
                  transition-all
                  duration-300
                  hover:text-cyan-400
                "
              >
                <span
                  className="
                    w-0
                    h-px
                    bg-cyan-400
                    transition-all
                    duration-300
                    group-hover:w-3
                  "
                />

                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <footer
      className="
        relative
        mt-20
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      {/* =====================================
          BACKGROUND DECORATION
      ====================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -top-32
          right-0
          h-96
          w-96
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-80
          w-80
          rounded-full
          bg-cyan-500/5
          blur-3xl
        "
      />

      {/* =====================================
          NEWSLETTER SECTION
      ====================================== */}

      <div className="relative border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-blue-500/20
              bg-gradient-to-br
              from-blue-600/20
              via-slate-900
              to-cyan-500/10
              p-6
              md:p-10
            "
          >
            {/* Glow */}
            <div
              className="
                absolute
                -right-20
                -top-20
                h-60
                w-60
                rounded-full
                bg-cyan-400/10
                blur-3xl
              "
            />

            <div
              className="
                relative
                flex
                flex-col
                gap-8
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              {/* TEXT */}
              <div className="max-w-xl">
                <div
                  className="
                    mb-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-cyan-400/20
                    bg-cyan-400/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-cyan-300
                  "
                >
                  Stay Updated
                </div>

                <h2 className="text-2xl md:text-3xl font-bold">
                  Get the latest deals
                  <span className="block text-cyan-400">
                    straight to your inbox.
                  </span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Subscribe to receive new product alerts,
                  exclusive deals, and updates from
                  EmmCoreShops.
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleNewsletter}
                className="
                  flex
                  w-full
                  max-w-xl
                  flex-col
                  gap-3
                  sm:flex-row
                "
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email address"
                  className="
                    min-w-0
                    flex-1
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-950/70
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-500
                    focus:border-cyan-400
                    focus:ring-4
                    focus:ring-cyan-400/10
                  "
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:from-blue-700
                    hover:to-cyan-600
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {submitting
                    ? "Joining..."
                    : "Subscribe"}

                  <FaArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          SERVICE FEATURES
      ====================================== */}

      <div className="relative border-b border-slate-800">
        <div
          className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-2
            gap-6
            px-4
            py-8
            sm:grid-cols-4
            sm:px-6
            lg:px-8
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
                text-blue-400
              "
            >
              <FaTruck />
            </div>

            <div>
              <h4 className="text-sm font-semibold">
                Reliable Delivery
              </h4>

              <p className="text-xs text-slate-500">
                Get your orders delivered
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-cyan-500/10
                text-cyan-400
              "
            >
              <FaShieldAlt />
            </div>

            <div>
              <h4 className="text-sm font-semibold">
                Secure Shopping
              </h4>

              <p className="text-xs text-slate-500">
                Shop with confidence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
                text-blue-400
              "
            >
              <FaCreditCard />
            </div>

            <div>
              <h4 className="text-sm font-semibold">
                Secure Payments
              </h4>

              <p className="text-xs text-slate-500">
                Powered by Paystack
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-cyan-500/10
                text-cyan-400
              "
            >
              <FaHeadset />
            </div>

            <div>
              <h4 className="text-sm font-semibold">
                Customer Support
              </h4>

              <p className="text-xs text-slate-500">
                We're here to help
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          MAIN FOOTER
      ====================================== */}

      <div className="relative">
        <div
          className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-2
            gap-10
            px-4
            py-14
            sm:px-6
            md:grid-cols-3
            lg:grid-cols-6
            lg:px-8
          "
        >
          {/* BRAND */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link
              to="/"
              className="
                inline-flex
                items-center
                gap-2
                text-2xl
                font-black
                tracking-tight
              "
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-600
                  to-cyan-400
                  text-lg
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                "
              >
                E
              </span>

              <span>
                EmmCore
                <span className="text-cyan-400">
                  Shops
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Your trusted destination for quality
              products, great deals, and a better
              online shopping experience.
            </p>

            {/* SOCIALS */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900
                  text-slate-400
                  transition
                  hover:border-blue-500
                  hover:bg-blue-500
                  hover:text-white
                "
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="X"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900
                  text-slate-400
                  transition
                  hover:border-cyan-500
                  hover:bg-cyan-500
                  hover:text-white
                "
              >
                <FaXTwitter />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900
                  text-slate-400
                  transition
                  hover:border-cyan-500
                  hover:bg-cyan-500
                  hover:text-white
                "
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* COMPANY */}
          <FooterLinks
            title="Company"
            links={companyPages}
          />

          {/* HELP */}
          <FooterLinks
            title="Help Center"
            links={helpPages}
          />

          {/* LEGAL */}
          <FooterLinks
            title="Legal"
            links={legalPages}
          />

          {/* MAKE MONEY */}
          <FooterLinks
            title="Make Money"
            links={affiliatePages}
          />
        </div>
      </div>

      {/* =====================================
          PAYMENT BAR
      ====================================== */}

      <div className="border-t border-slate-800">
        <div
          className="
            max-w-7xl
            mx-auto
            flex
            flex-col
            gap-5
            px-4
            py-6
            sm:px-6
            md:flex-row
            md:items-center
            md:justify-between
            lg:px-8
          "
        >
          <div>
            <p className="text-sm font-semibold text-white">
              Secure payments powered by Paystack
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Cards, bank transfers, and supported
              mobile payment methods accepted.
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-800
              bg-slate-900
              px-4
              py-2
            "
          >
            <FaShieldAlt className="text-cyan-400" />

            <span className="text-xs font-medium text-slate-400">
              Secure Checkout
            </span>
          </div>
        </div>
      </div>

      {/* =====================================
          COPYRIGHT
      ====================================== */}

      <div className="border-t border-slate-800 bg-slate-950">
        <div
          className="
            max-w-7xl
            mx-auto
            flex
            flex-col
            gap-2
            px-4
            py-5
            text-center
            text-xs
            text-slate-500
            sm:px-6
            md:flex-row
            md:items-center
            md:justify-between
            md:text-left
            lg:px-8
          "
        >
          <p>
            © {new Date().getFullYear()} EmmCoreShops.
            All rights reserved.
          </p>

          <p>
            Built for a better way to shop.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;