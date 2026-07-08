import { useState } from "react";
import {
  PlusCircle,
  Image,
  Save,
  ArrowLeft,
  Layers,
  CheckCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import api from "../../../library/api";

const AddCategory = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    status: "active",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setMessage("Category name is required");

      return;
    }

    try {
      setLoading(true);

      setMessage("");

      const res = await api.post("/categories", form);

      if (res.data.status === "success") {
        setMessage("Category created successfully");

        setTimeout(() => {
          navigate("/admin/category");
        }, 1000);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);

      setMessage("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

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
      {/* HEADER */}

      <div
        className="
bg-gradient-to-r
from-indigo-600
via-blue-600
to-cyan-600
rounded-3xl
p-6
md:p-8
text-white
shadow-xl
"
      >
        <div
          className="
flex
items-center
gap-4
"
        >
          <button
            onClick={() => navigate(-1)}
            className="
bg-white/20
p-3
rounded-xl
hover:bg-white/30
"
          >
            <ArrowLeft />
          </button>

          <div>
            <h1
              className="
text-3xl
font-bold
"
            >
              Create Category
            </h1>

            <p
              className="
text-blue-100
"
            >
              Add a new product category
            </p>
          </div>
        </div>
      </div>

      <div
        className="
grid
lg:grid-cols-3
gap-6
"
      >
        {/* FORM */}

        <div
          className="
lg:col-span-2
bg-white
rounded-3xl
shadow
p-6
"
        >
          <div
            className="
flex
items-center
gap-3
mb-6
"
          >
            <PlusCircle
              className="
text-indigo-600
"
            />

            <h2
              className="
text-xl
font-bold
"
            >
              Category Information
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
space-y-5
"
          >
            {/* NAME */}

            <div>
              <label
                className="
text-sm
font-semibold
"
              >
                Category Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Smartphones"
                className="
mt-2
w-full
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-indigo-500
"
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label
                className="
text-sm
font-semibold
"
              >
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                placeholder="
Describe your category...
"
                className="
mt-2
w-full
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-indigo-500
"
              />

              <div
                className="
text-right
text-xs
text-gray-400
"
              >
                {form.description.length}/200
              </div>
            </div>

            {/* IMAGE */}

            <div>
              <label
                className="
text-sm
font-semibold
flex
items-center
gap-2
"
              >
                <Image size={18} />
                Image URL
              </label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="
https://image-url.com/image.jpg
"
                className="
mt-2
w-full
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-indigo-500
"
              />
            </div>

            {/* STATUS */}

            <div>
              <label
                className="
text-sm
font-semibold
"
              >
                Status
              </label>

              <div
                className="
flex
gap-3
mt-3
"
              >
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      status: "active",
                    })
                  }
                  className={`

px-5
py-2
rounded-xl
font-medium

${
  form.status === "active"
    ? "bg-green-100 text-green-700"
    : "bg-gray-100 text-gray-500"
}

`}
                >
                  Active
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      status: "inactive",
                    })
                  }
                  className={`

px-5
py-2
rounded-xl
font-medium

${
  form.status === "inactive"
    ? "bg-red-100 text-red-700"
    : "bg-gray-100 text-gray-500"
}

`}
                >
                  Hidden
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="
w-full
bg-indigo-600
text-white
py-4
rounded-xl
font-semibold
flex
justify-center
items-center
gap-2
hover:bg-indigo-700
transition
"
            >
              <Save />

              {loading ? "Creating..." : "Create Category"}
            </button>

            {message && (
              <div
                className="

bg-gray-100
rounded-xl
p-3
text-center
text-sm

"
              >
                {message}
              </div>
            )}
          </form>
        </div>

        {/* PREVIEW */}

        <div
          className="
space-y-6
"
        >
          <div
            className="
bg-white
rounded-3xl
shadow
overflow-hidden
"
          >
            <div
              className="
bg-gray-100
h-48
flex
items-center
justify-center
"
            >
              {form.image ? (
                <img
                  src={form.image}
                  alt="preview"
                  className="
w-full
h-full
object-cover
"
                />
              ) : (
                <Image
                  size={50}
                  className="
text-gray-400
"
                />
              )}
            </div>

            <div
              className="
p-5
"
            >
              <div
                className="
flex
justify-between
items-center
"
              >
                <h2
                  className="
text-xl
font-bold
"
                >
                  {form.name || "Category Name"}
                </h2>

                <span
                  className="
text-xs
bg-green-100
text-green-700
px-3
py-1
rounded-full
"
                >
                  {form.status}
                </span>
              </div>

              <p
                className="
text-gray-500
text-sm
mt-3
"
              >
                {form.description || "Category description preview"}
              </p>
            </div>
          </div>

          {/* QUICK STATS */}

          <div
            className="
bg-indigo-600
text-white
rounded-3xl
p-5
shadow
"
          >
            <div
              className="
flex
items-center
gap-3
mb-4
"
            >
              <Layers />

              <h3
                className="
font-bold
"
              >
                Category Tips
              </h3>
            </div>

            <ul
              className="
text-sm
space-y-2
text-indigo-100
"
            >
              <li>✓ Use clear category names</li>

              <li>✓ Add quality images</li>

              <li>✓ Keep descriptions short</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
