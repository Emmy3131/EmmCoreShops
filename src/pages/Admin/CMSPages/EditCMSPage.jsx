import { useEffect, useState } from "react";
import api from "../../../library/api";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [section, setSection] = useState("company"); // ✅ ADDED

  const fetchPage = async () => {
    try {
      const res = await api.get(`/pages/${id}`);

      const data = res.data.data;

      setTitle(data.title);
      setSlug(data.slug);
      setContent(data.content);
      setStatus(data.status);
      setSection(data.section || "company"); // ✅ FIXED
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/pages/${id}`, {
        title,
        slug,
        content,
        status,
        section, // ✅ IMPORTANT
      });

      navigate("/admin/cms-pages");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">

      <h1 className="text-2xl font-bold mb-6">Edit CMS Page</h1>

      <form onSubmit={handleUpdate} className="space-y-4">

        {/* TITLE */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Page Title"
        />

        {/* SLUG */}
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Slug"
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

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        {/* SUBMIT */}
        <button className="bg-blue-600 text-white px-4 py-3 w-full rounded font-semibold">
          Update Page
        </button>

      </form>
    </div>
  );
};

export default EditPage;