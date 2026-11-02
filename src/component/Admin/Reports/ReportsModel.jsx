import { useState } from "react";

import {
  FaTimes,
  FaFileExcel,
  FaFilePdf,
  FaFileCsv,
  FaDownload,
} from "react-icons/fa";

import api from "../../../library/api";

const ReportDownloadModal = ({ closeModal }) => {
  const [type, setType] = useState("sales");

  const [format, setFormat] = useState("xlsx");

  const [from, setFrom] = useState("");

  const [to, setTo] = useState("");

  const [loading, setLoading] = useState(false);

  /*
    =================================
    DOWNLOAD REPORT
    =================================
    */

  const downloadReport = async () => {
    try {
      setLoading(true);

      const response = await api.get("/reports/download", {
        params: {
          type,
          format,
          from,
          to,
        },

        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.download = `${type}-report.${format}`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      closeModal();
    } catch (error) {
      console.log("DOWNLOAD ERROR", error);

      alert("Unable to download report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
      "
    >
      <div
        className="
        bg-white
        rounded-2xl
        shadow-xl
        w-[95%]
        max-w-lg
        p-6
        "
      >
        {/* HEADER */}

        <div
          className="
          flex
          justify-between
          items-center
          mb-6
          "
        >
          <h2
            className="
            text-xl
            font-bold
            "
          >
            Download Report
          </h2>

          <button
            onClick={closeModal}
            className="
            text-gray-500
            hover:text-black
            "
          >
            <FaTimes />
          </button>
        </div>

        {/* REPORT TYPE */}

        <label
          className="
          text-sm
          font-medium
          "
        >
          Report Type
        </label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="
          w-full
          border
          rounded-lg
          p-3
          mt-2
          mb-4
          "
        >
          <option value="sales">Sales Report</option>

          <option value="orders">Orders Report</option>

          <option value="customers">Customers Report</option>

          <option value="products">Products Report</option>
        </select>

        {/* FORMAT */}

        <label
          className="
          text-sm
          font-medium
          "
        >
          File Format
        </label>

        <div
          className="
          grid
          grid-cols-3
          gap-3
          mt-3
          mb-5
          "
        >
          <button
            onClick={() => setFormat("xlsx")}
            className={`
            border
            rounded-xl
            p-3
            flex
            flex-col
            items-center
            gap-2

            ${format === "xlsx" ? "bg-green-100 border-green-500" : ""}

            `}
          >
            <FaFileExcel className="text-green-600" />
            Excel
          </button>

          <button
            onClick={() => setFormat("pdf")}
            className={`
            border
            rounded-xl
            p-3
            flex
            flex-col
            items-center
            gap-2

            ${format === "pdf" ? "bg-red-100 border-red-500" : ""}

            `}
          >
            <FaFilePdf className="text-red-600" />
            PDF
          </button>

          <button
            onClick={() => setFormat("csv")}
            className={`
            border
            rounded-xl
            p-3
            flex
            flex-col
            items-center
            gap-2

            ${format === "csv" ? "bg-blue-100 border-blue-500" : ""}

            `}
          >
            <FaFileCsv className="text-blue-600" />
            CSV
          </button>
        </div>

        {/* DATE RANGE */}

        <div
          className="
          grid
          grid-cols-2
          gap-3
          mb-6
          "
        >
          <div>
            <label className="text-sm">From</label>

            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="
              border
              rounded-lg
              p-2
              w-full
              "
            />
          </div>

          <div>
            <label className="text-sm">To</label>

            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="
              border
              rounded-lg
              p-2
              w-full
              "
            />
          </div>
        </div>

        {/* BUTTON */}

        <button
          onClick={downloadReport}
          disabled={loading}
          className="
          w-full
          bg-black
          text-white
          py-3
          rounded-xl
          flex
          justify-center
          items-center
          gap-2
          "
        >
          <FaDownload />

          {loading ? "Generating..." : "Download Report"}
        </button>
      </div>
    </div>
  );
};

export default ReportDownloadModal;
