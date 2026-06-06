import api from "../../library/api";
import { useState, useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";

const NewsletterSub = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscriber, setSelectedSubscriber] =
    useState(null);

  const fetchSubscriptions = async () => {
    try {
      const res = await api.get(
        "/newsletter/subscribers"
      );

      if (res.data.status === "success") {
        setSubscriptions(
          res.data.subscribers || []
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this subscriber?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/newsletter/subscribers/${id}`
      );

      setSubscriptions((prev) =>
        prev.filter((sub) => sub._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete subscriber");
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Newsletter Subscribers
        </h2>

        <div className="bg-orange-500 text-white px-5 py-3 rounded-lg shadow">
          <p className="text-sm">
            Total Subscribers
          </p>

          <h3 className="text-2xl font-bold">
            {subscriptions.length}
          </h3>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10">
          Loading subscribers...
        </div>
      ) : subscriptions.length === 0 ? (
        <div className="text-center py-10">
          No subscribers found
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Subscribed Date
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.map((sub) => (
                <tr
                  key={sub._id}
                  className="border-t"
                >
                  <td className="p-4">
                    {sub.email}
                  </td>

                  <td className="p-4">
                    {new Date(
                      sub.subscribedAt ||
                        sub.createdAt
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      {/* VIEW */}
                      <button
                        onClick={() =>
                          setSelectedSubscriber(
                            sub
                          )
                        }
                        className="text-blue-600"
                      >
                        <FaEye />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(
                            sub._id
                          )
                        }
                        className="text-red-600"
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
      )}

      {/* VIEW MODAL */}
      {selectedSubscriber && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              Subscriber Details
            </h3>

            <div className="space-y-3">
              <p>
                <strong>ID:</strong>{" "}
                {selectedSubscriber._id}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedSubscriber.email}
              </p>

              <p>
                <strong>Subscribed:</strong>{" "}
                {new Date(
                  selectedSubscriber.subscribedAt ||
                    selectedSubscriber.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() =>
                setSelectedSubscriber(null)
              }
              className="mt-6 w-full bg-orange-500 text-white py-2 rounded"
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