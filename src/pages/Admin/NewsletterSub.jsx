import api from "../../library/api";
import { useState, useEffect } from "react";

import {
  FaEye,
  FaTrash,
  FaSearch,
  FaEnvelope,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";

const NewsletterSub = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  const [search, setSearch] = useState("");

  /* ================= FETCH ================= */

  const fetchSubscriptions = async () => {
    try {
      const res = await api.get("/newsletter/subscribers");

      if (res.data.status === "success") {
        setSubscriptions(res.data.subscribers || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subscriber?")) return;

    try {
      await api.delete(`/newsletter/subscribers/${id}`);

      setSubscriptions((prev) => prev.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= SEARCH ================= */

  const filteredSubscribers = subscriptions.filter((sub) =>
    sub.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="
      min-h-screen
      bg-gray-50
      p-4
      md:p-8
      space-y-6
    "
    >
      {/* ================= HEADER ================= */}

      <div
        className="
        bg-gradient-to-r
        from-orange-500
        via-pink-500
        to-purple-600
        rounded-3xl
        p-8
        text-white
        shadow-xl
      "
      >
        <div
          className="
          flex
          flex-col
          md:flex-row
          md:justify-between
          gap-6
        "
        >
          <div>
            <h1
              className="
              text-3xl
              md:text-4xl
              font-bold
            "
            >
              Newsletter Subscribers
            </h1>

            <p
              className="
              mt-2
              text-white/80
            "
            >
              Manage your email audience and marketing subscribers
            </p>
          </div>

          <div
            className="
            bg-white/20
            backdrop-blur
            rounded-2xl
            p-5
            min-w-[180px]
          "
          >
            <div className="flex items-center gap-3">
              <FaUsers size={25} />

              <div>
                <p className="text-sm">Total Subscribers</p>

                <h2
                  className="
                  text-3xl
                  font-bold
                "
                >
                  {subscriptions.length}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}

      <div
        className="
        bg-white
        rounded-2xl
        shadow
        p-4
      "
      >
        <div
          className="
          flex
          items-center
          gap-3
          border
          rounded-xl
          px-4
          py-3
        "
        >
          <FaSearch className="text-gray-400" />

          <input
            placeholder="Search subscriber email..."
            className="
              w-full
              outline-none
            "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      {loading ? (
        <div
          className="
            bg-white
            rounded-2xl
            p-10
            text-center
          "
        >
          Loading subscribers...
        </div>
      ) : filteredSubscribers.length === 0 ? (
        <div
          className="
            bg-white
            rounded-2xl
            p-10
            text-center
            text-gray-500
          "
        >
          No subscribers found
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}

          <div
            className="
          hidden
          md:block
          bg-white
          rounded-3xl
          shadow
          overflow-hidden
        "
          >
            <table className="w-full">
              <thead
                className="
          bg-gray-100
          text-gray-600
        "
              >
                <tr>
                  <th className="p-5 text-left">Subscriber</th>

                  <th className="p-5 text-left">Date</th>

                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubscribers.map((sub) => (
                  <tr
                    key={sub._id}
                    className="
              shadow-sm
              hover:bg-gray-50
              transition
            "
                  >
                    <td className="p-5">
                      <div
                        className="
            flex
            items-center
            gap-3
          "
                      >
                        <div
                          className="
            w-10
            h-10
            rounded-full
            bg-orange-100
            flex
            items-center
            justify-center
            text-orange-600
          "
                        >
                          <FaEnvelope />
                        </div>

                        <span>{sub.email}</span>
                      </div>
                    </td>

                    <td className="p-5 text-gray-500">
                      <div
                        className="
            flex
            items-center
            gap-2
          "
                      >
                        <FaCalendarAlt />

                        {new Date(
                          sub.subscribedAt || sub.createdAt,
                        ).toLocaleDateString()}
                      </div>
                    </td>

                    <td>
                      <div
                        className="
            flex
            justify-center
            gap-5
          "
                      >
                        <button
                          onClick={() => setSelectedSubscriber(sub)}
                          className="
              text-blue-600
              hover:scale-110
            "
                        >
                          <FaEye />
                        </button>

                        <button
                          onClick={() => handleDelete(sub._id)}
                          className="
              text-red-600
              hover:scale-110
            "
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}

          <div
            className="
          md:hidden
          space-y-4
        "
          >
            {filteredSubscribers.map((sub) => (
              <div
                key={sub._id}
                className="
            bg-white
            rounded-2xl
            shadow
            p-5
          "
              >
                <div
                  className="
            flex
            items-center
            gap-3
          "
                >
                  <div
                    className="
            w-12
            h-12
            rounded-full
            bg-orange-100
            flex
            items-center
            justify-center
            text-orange-600
          "
                  >
                    <FaEnvelope />
                  </div>

                  <div>
                    <h3 className="font-semibold">{sub.email}</h3>

                    <p
                      className="
            text-sm
            text-gray-500
          "
                    >
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div
                  className="
            flex
            justify-end
            gap-5
            mt-4
          "
                >
                  <button
                    onClick={() => setSelectedSubscriber(sub)}
                    className="text-blue-600"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => handleDelete(sub._id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= MODAL ================= */}

      {selectedSubscriber && (
        <div
          className="
          fixed
          inset-0
          bg-black/50
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-50
          p-4
        "
        >
          <div
            className="
          bg-white
          rounded-3xl
          shadow-2xl
          max-w-md
          w-full
          p-6
        "
          >
            <h2
              className="
          text-2xl
          font-bold
          mb-5
        "
            >
              Subscriber Details
            </h2>

            <div
              className="
          space-y-4
          text-gray-700
        "
            >
              <p>
                <b>ID:</b>
                <br />
                {selectedSubscriber._id}
              </p>

              <p>
                <b>Email:</b>
                <br />
                {selectedSubscriber.email}
              </p>

              <p>
                <b>Date Joined:</b>
                <br />

                {new Date(selectedSubscriber.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => setSelectedSubscriber(null)}
              className="
            mt-6
            w-full
            bg-orange-500
            text-white
            py-3
            rounded-xl
            font-semibold
          "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterSub;
