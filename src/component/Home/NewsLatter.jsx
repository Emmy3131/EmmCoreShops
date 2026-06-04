import { useState } from "react";
import api from "../../library/api";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) return alert("Enter your email");

    try {
      setLoading(true);

      const res = await api.post("/newsletter/subscribe", { email });

      if (res.data.status === "success") {
        alert(res.data.message);
        console.log(res.data.message);
        setEmail("");
      } else {
        alert("Subscription failed");
      }
      

      console.log(res.data.message);
      setEmail("");
    } catch (error) {
      alert(error.response?.data?.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-orange-600 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white">
          Subscribe To Our Newsletter
        </h2>

        <p className="text-white mt-2">
          Get updates on new arrivals, discounts and flash sales.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col md:flex-row gap-3 mt-6"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-3 rounded outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;