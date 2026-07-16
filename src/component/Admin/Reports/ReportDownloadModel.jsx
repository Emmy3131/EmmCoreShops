import { useState } from "react";

import {
  FaTimes,
  FaDownload,
  FaFileExcel,
  FaFilePdf,
  FaFileCsv,
} from "react-icons/fa";

import api from "../../../library/api";

const ReportDownloadModal = ({ closeModal }) => {
  const [reportType, setReportType] = useState("sales");

  const [format, setFormat] = useState("xlsx");

  const [from, setFrom] = useState("");

  const [to, setTo] = useState("");

  const [loading, setLoading] = useState(false);

  /*
    =====================================
    DOWNLOAD REPORT
    =====================================
    */

  const handleDownload = async () => {
    try {
      setLoading(true);

      const res = await api.get("/reports/download", {
        params: {
          type: reportType,

          format,

          from,

          to,
        },

        responseType: "blob",
      });

      /*
            CREATE FILE URL
            */

      const fileURL = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");

      link.href = fileURL;

      link.download = `${reportType}-report.${format}`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(fileURL);

      closeModal();
    } catch (error) {
      console.log("DOWNLOAD REPORT ERROR", error);

      alert("Report download failed");
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
w-[95%]
max-w-lg
rounded-2xl
shadow-xl
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
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="
w-full
border
rounded-xl
p-3
mt-2
mb-5
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
          Export Format
        </label>

        <div
          className="
grid
grid-cols-3
gap-3
mt-3
mb-6
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

${format === "xlsx" ? "border-green-500 bg-green-50" : ""}

`}
          >
            <FaFileExcel
              className="
text-green-600
text-xl
"
            />
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

${format === "pdf" ? "border-red-500 bg-red-50" : ""}

`}
          >
            <FaFilePdf
              className="
text-red-600
text-xl
"
            />
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

${format === "csv" ? "border-blue-500 bg-blue-50" : ""}

`}
          >
            <FaFileCsv
              className="
text-blue-600
text-xl
"
            />
            CSV
          </button>
        </div>

        {/* DATE FILTER */}

        <div
          className="
grid
grid-cols-2
gap-4
mb-6
"
        >
          <div>
            <label
              className="
text-sm
"
            >
              From
            </label>

            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="
w-full
border
rounded-lg
p-2
"
            ></input>
          </div>

          <div>
            <label
              className="
text-sm
"
            >
              To
            </label>

            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="
w-full
border
rounded-lg
p-2
"
            ></input>
          </div>
        </div>

        {/* DOWNLOAD BUTTON */}

        <button
          onClick={handleDownload}
          disabled={loading}
          className="
w-full
bg-black
text-white
rounded-xl
py-3
flex
justify-center
items-center
gap-2
hover:bg-gray-800
disabled:opacity-50
"
        >
          <FaDownload />

          {loading ? "Generating Report..." : "Download Report"}
        </button>
      </div>
    </div>
  );
};

export default ReportDownloadModal;
