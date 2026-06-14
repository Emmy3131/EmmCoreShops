import { useState } from "react";
import api from "../../../library/api";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [section, setSection] = useState("company"); // ✅ ADDED

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title,
        slug,
        content,
        section, // ✅ IMPORTANT
        status: "draft",
      };

      const res = await api.post("/pages", payload);

      if (res.data.status === "success") {
        alert("Page created successfully");
        navigate("/admin/cms-pages");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">

      <h1 className="text-2xl font-bold mb-6">Add CMS Page</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <input
          placeholder="Page Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* SLUG */}
        <input
          placeholder="Slug (e.g about-us)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* SECTION DROPDOWN */}
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="company">Company</option>
          <option value="help">Help</option>
          <option value="legal">Legal</option>
          <option value="affiliate">Affiliate</option>
        </select>

        {/* CKEDITOR */}
        <div className="border rounded">
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </div>

        {/* SUBMIT */}
        <button className="bg-pink-600 text-white px-4 py-3 w-full rounded font-semibold">
          Create Page
        </button>

      </form>
    </div>
  );
};

export default AddPage;