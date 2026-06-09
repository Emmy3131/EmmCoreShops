import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaShieldAlt,
  FaUndo,
  FaLock,
  FaAward,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import Newsletter from "../Home/NewsLatter";

const DesktopFooter = () => {
  return (
    <footer className="bg-black text-white mt-10">
      {/* TOP BAR */}
      <div className="bg-zinc-800 py-6 px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Support */}
          <div className="flex gap-10">
            <div className="flex items-center gap-3">
              <FaEnvelope size={25} />
              <div>
                <h4 className="font-bold text-sm">
                  EMAIL SUPPORT
                </h4>
                <p className="text-gray-300 text-sm">
                  help@yourstore.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone size={25} />
              <div>
                <h4 className="font-bold text-sm">
                  PHONE SUPPORT
                </h4>
                <p className="text-gray-300 text-sm">
                  +234 800 000 0000
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaWhatsapp size={25} />
              <div>
                <h4 className="font-bold text-sm">
                  WHATSAPP
                </h4>
                <p className="text-gray-300 text-sm">
                  +234 800 000 0000
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-sm">
              GET LATEST DEALS
            </h4>

            <p className="text-gray-400 text-xs mb-2">
              Our best promotions sent to your inbox.
            </p>
            <Newsletter />
            
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-6 gap-10">
          {/* About */}
          <div>
            <h3 className="font-bold mb-4 uppercase">
              About Us
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Our Blog</li>
              <li>Forum</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h3 className="font-bold mb-4 uppercase">
              Payment
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Wallet</li>
              <li>Verve</li>
              <li>Mastercard</li>
              <li>Visa</li>
            </ul>
          </div>

          {/* Buying Guide */}
          <div>
            <h3 className="font-bold mb-4 uppercase">
              Buying Guide
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Buyer Safety Centre</li>
              <li>FAQs</li>
              <li>Delivery</li>
              <li>Return Policy</li>
              <li>Bulk Purchase</li>
            </ul>
          </div>

          {/* More Info */}
          <div>
            <h3 className="font-bold mb-4 uppercase">
              More Info
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Site Map</li>
              <li>Track My Order</li>
              <li>Privacy Policy</li>
              <li>Authentic Items Policy</li>
            </ul>
          </div>

          {/* Affiliate */}
          <div>
            <h3 className="font-bold mb-4 uppercase">
              Make Money
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Become an Affiliate</li>
              <li>Sell on Our Platform</li>
            </ul>
          </div>

          {/* App Download */}
          <div>
            <h3 className="font-bold mb-4 uppercase">
              Download App
            </h3>

            <div className="bg-white rounded-lg p-4 text-black">
              <div className="h-24 bg-gray-200 flex items-center justify-center rounded">
                QR CODE
              </div>

              <p className="text-xs mt-3">
                Scan QR code to download
              </p>

              <div className="flex gap-2 mt-3">
                <div className="bg-black text-white text-xs px-2 py-1 rounded">
                  Google Play
                </div>

                <div className="bg-black text-white text-xs px-2 py-1 rounded">
                  App Store
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8">
              <h4 className="font-bold mb-4 uppercase">
                Connect With Us
              </h4>

              <div className="flex gap-4">
                <div className="bg-zinc-700 p-3 rounded-full">
                  <FaFacebookF />
                </div>

                <div className="bg-zinc-700 p-3 rounded-full">
                  <FaXTwitter />
                </div>

                <div className="bg-zinc-700 p-3 rounded-full">
                  <FaInstagram />
                </div>

                <div className="bg-zinc-700 p-3 rounded-full">
                  <FaYoutube />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-zinc-700 py-5">
        <p className="text-center text-gray-400">
          © 2026 YourStore. All Rights Reserved.
        </p>
      </div>

      {/* TRUST BADGES */}
      <div className="border-t border-zinc-700 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6">
          <div className="flex items-center justify-center gap-3">
            <FaShieldAlt size={32} />

            <div>
              <h4 className="font-bold text-sm">
                100% SECURE
              </h4>

              <p className="text-xs text-gray-400">
                Secure Shopping
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <FaUndo size={32} />

            <div>
              <h4 className="font-bold text-sm">
                EASY RETURNS
              </h4>

              <p className="text-xs text-gray-400">
                30 Days Return
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <FaLock size={32} />

            <div>
              <h4 className="font-bold text-sm">
                PAYMENT SECURED
              </h4>

              <p className="text-xs text-gray-400">
                Safe Payments
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <FaAward size={32} />

            <div>
              <h4 className="font-bold text-sm">
                GENUINE PRODUCTS
              </h4>

              <p className="text-xs text-gray-400">
                Authentic Products
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;