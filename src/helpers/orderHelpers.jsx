import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportExcel = (orders) => {
  const worksheet = XLSX.utils.json_to_sheet(
    orders.map((order) => ({
      Customer: order.user
        ? `${order.user.firstName} ${order.user.lastName}`
        : "Deleted",

      Total: order.totalPrice,

      Payment: order.paymentStatus,

      Status: order.orderStatus,

      Date: new Date(order.createdAt).toLocaleDateString(),
    }))
  );

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Orders"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Orders.xlsx");
};

export const exportPDF = (orders) => {
  const doc = new jsPDF();

  doc.text("Orders Report", 14, 15);

  autoTable(doc, {
    head: [["Customer", "Payment", "Status", "Total"]],

    body: orders.map((o) => [
      o.user
        ? `${o.user.firstName} ${o.user.lastName}`
        : "Deleted",

      o.paymentStatus,

      o.orderStatus,

      `₦${o.totalPrice}`,
    ]),
  });

  doc.save("Orders.pdf");
};