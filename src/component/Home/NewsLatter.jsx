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
        alert(res.data.message || "Subscribed successfully");
        setEmail("");
      } else {
        alert("Subscription failed");
      }
      setEmail("");
      
    } catch (error) {
      alert(error.response?.data?.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-orange-600 rounded-lg">
      <div className=" mx-auto text-center">
       
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col md:flex-row gap-3 "
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