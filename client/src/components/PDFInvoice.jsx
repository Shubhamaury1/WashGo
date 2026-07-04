import jsPDF from "jspdf";
import "jspdf-autotable";

const generateInvoicePDF = (booking) => {
  if (!booking) return;

  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // ================= COLORS =================
  const primary = [37, 99, 235];
  const dark = [31, 41, 55];
  const gray = [107, 114, 128];
  const light = [245, 247, 250];
  const green = [34, 197, 94];
  const red = [239, 68, 68];

  // ================= HEADER =================

  doc.setFillColor(...primary);
  doc.rect(0, 0, pageWidth, 36, "F");

  // WashGo Logo
  doc.setFillColor(255, 255, 255);
  doc.circle(18, 19, 7, "F");

  doc.setTextColor(...primary);
  doc.setFontSize(18);
  doc.setFont(undefined, "bold");
  doc.text("W", 18, 21, { align: "center" });

  // Brand

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("WashGo", 30, 17);

  doc.setFontSize(10);
  doc.setFont(undefined, "normal");
  doc.text("Professional Car Wash & Doorstep Cleaning", 30, 24);

  // Invoice Title

  doc.setFont(undefined, "bold");
  doc.setFontSize(24);
  doc.text("INVOICE", pageWidth - 15, 17, {
    align: "right",
  });

  doc.setFont(undefined, "normal");
  doc.setFontSize(10);

  doc.text(
    `Invoice Date : ${new Date().toLocaleDateString("en-GB")}`,
    pageWidth - 15,
    24,
    {
      align: "right",
    },
  );

  doc.text(`Invoice No : WG-${booking.bookingId}`, pageWidth - 15, 30, {
    align: "right",
  });

  let y = 40;

  // ================= CUSTOMER CARD =================

  doc.setFillColor(...light);
  doc.roundedRect(10, y, 92, 38, 4, 4, "F");

  doc.setTextColor(...primary);
  doc.setFontSize(13);
  doc.setFont(undefined, "bold");
  doc.text("CUSTOMER DETAILS", 15, y + 6);

  doc.setTextColor(...dark);
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);

  doc.text("Name", 15, y + 14);
  doc.text(booking.address?.name || "N/A", 45, y + 14);

  doc.text("Mobile", 15, y + 20);
  doc.text(booking.address?.mobile || "N/A", 45, y + 20);

  doc.text("Address", 15, y + 26);
  doc.text(booking.address?.address || "N/A", 45, y + 26, {
    maxWidth: 50,
  });

  doc.text("Location", 15, y + 32);
  doc.text(
    `${booking.address?.city || ""}, ${booking.address?.state || ""} ${booking.address?.pincode || ""}`,
    45,
    y + 32,
    {
      maxWidth: 50,
    },
  );

  // ================= BOOKING CARD =================

  doc.setFillColor(...light);
  doc.roundedRect(108, y, 92, 38, 4, 4, "F");

  doc.setTextColor(...primary);
  doc.setFont(undefined, "bold");
  doc.setFontSize(13);
  doc.text("BOOKING DETAILS", 113, y + 6);

  doc.setTextColor(...dark);
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);

  doc.text("Booking ID", 113, y + 14);
  doc.text(booking.bookingId, 155, y + 14);

  doc.text("Vehicle", 113, y + 20);
  doc.text(booking.vehicleId?.name || "N/A", 155, y + 20);

  doc.text("Package", 113, y + 26);
  doc.text(booking.packageId?.packageName || "N/A", 155, y + 26);

  doc.text("Payment", 113, y + 32);
  doc.text(booking.paymentMethod || "Online", 155, y + 32);

  y += 40;
  // ================= SERVICE DETAILS =================

  doc.setFillColor(...light);
  doc.roundedRect(10, y, 190, 48, 4, 4, "F");

  doc.setTextColor(...primary);
  doc.setFont(undefined, "bold");
  doc.setFontSize(13);
  doc.text("SERVICE INFORMATION", 15, y + 8);

  doc.setTextColor(...dark);
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);

  const bookingDate = booking.bookingDate
    ? new Date(booking.bookingDate).toLocaleDateString("en-GB")
    : "N/A";

  const rows = [
    ["Booking Date", bookingDate, "Time Slot", booking.timeSlot || "N/A"],
    [
      "Service Person",
      booking.address?.name || "N/A",
      "Mobile",
      booking.address?.mobile || "N/A",
    ],
    [
      "Vehicle",
      booking.vehicleId?.name || "N/A",
      "Package",
      booking.packageId?.packageName || "N/A",
    ],
  ];

  let rowY = y + 16;

  rows.forEach((row) => {
    doc.setFont(undefined, "bold");
    doc.text(row[0], 15, rowY);

    doc.setFont(undefined, "normal");
    doc.text(String(row[1]), 45, rowY);

    doc.setFont(undefined, "bold");
    doc.text(row[2], 110, rowY);

    doc.setFont(undefined, "normal");
    doc.text(String(row[3]), 145, rowY);

    rowY += 8;
  });

  // Address

  doc.setFont(undefined, "bold");
  doc.text("Service Address", 15, rowY);

  doc.setFont(undefined, "normal");

  const fullAddress = `${booking.address?.address || ""} ${booking.address?.city || ""}, ${booking.address?.state || ""}${booking.address?.pincode || ""}`;

  doc.text(fullAddress, 45, rowY, {
    maxWidth: 245,
  });
  y += 60;

  // ================= STATUS =================

  let statusColor = green;

  if (booking.status === "Cancelled" || booking.status === "Rejected") {
    statusColor = red;
  }

  if (booking.status === "Pending") {
    statusColor = [234, 179, 8];
  }

  doc.setFillColor(...statusColor);

  doc.roundedRect(150, y - 8, 40, 10, 3, 3, "F");

  doc.setTextColor(255, 255, 255);

  doc.setFont(undefined, "bold");
  doc.setFontSize(10);

  doc.text(booking.status || "Pending", 170, y - 2, {
    align: "center",
  });

  // ================= PAYMENT TABLE =================

  doc.setTextColor(...primary);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");

  doc.text("PAYMENT SUMMARY", 15, y );

  y += 4  ;

  const serviceAmount = booking.amount + (booking.discountAmount || 0);

  const discount = booking.discountAmount || 0;

  const total = booking.amount;

  doc.autoTable({
    startY: y,

    head: [["Description", "Amount"]],

    body: [
      ["Service Amount", `Rs. ${serviceAmount.toFixed(2)}`],
      ["Convenience Fee", "FREE"],
      ["Discount", discount > 0 ? `- Rs. ${discount.toFixed(2)}` : "Rs. 0.00"],
    ],

    theme: "striped",

    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 4,
      overflow: "linebreak",
      valign: "middle",
    },

    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
      fontSize: 11,
    },

    alternateRowStyles: {
      fillColor: [248, 249, 250],
    },

    columnStyles: {
      0: {
        cellWidth: 130,
      },
      1: {
        cellWidth: 50,
        halign: "right",
      },
    },
  });

  y = doc.lastAutoTable.finalY + 4;
  // ================= TOTAL PAID CARD =================

  doc.setFillColor(...primary);

  doc.roundedRect(10, y, 190, 19, 5, 5, "F");

  // Left Side

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont(undefined, "normal");

  doc.text("Total Amount Paid", 18, y + 6);

  doc.setFontSize(18 );
  doc.setFont(undefined, "bold");

  doc.text(`Rs. ${total.toFixed(2)}`, 18, y + 14);

  // Right Side

  doc.setFont(undefined, "bold");
  doc.setFontSize(12);

  doc.text("PAYMENT SUCCESSFUL", 185, y + 12, {
    align: "right",
  });

  y += 22;

  // ================= THANK YOU =================

  doc.setFillColor(245, 248, 255);

  doc.roundedRect(10, y, 190, 38, 5, 5, "F");

  doc.setTextColor(...primary);
  doc.setFontSize(18);
  doc.setFont(undefined, "bold");

  doc.setFontSize(14);

  doc.text("Thank You For Choosing WashGo!", pageWidth / 2, y + 8, {
    align: "center",
  });

  doc.setTextColor(...dark);

  doc.setFontSize(10);
  doc.setFont(undefined, "normal");

  doc.text("We appreciate your trust in WashGo.", pageWidth / 2, y + 14, {
    align: "center",
  });

  doc.text(
    "Your vehicle deserves the best care, and we're happy to serve you.",
    pageWidth / 2,
    y + 18,
    {
      align: "center",
    },
  );

  doc.text("See you again soon!", pageWidth / 2, y + 22, {
    align: "center",
  });

  y += 28;

  // ================= CONTACT CARD =================

  doc.setFillColor(248, 250, 252);

  doc.roundedRect(10, y, 190, 26, 5, 5, "F");

  doc.setTextColor(...primary);
  doc.setFont(undefined, "bold");
  doc.setFontSize(12);

  doc.text("WashGo Customer Support", 15, y + 6);

  doc.setTextColor(...dark);

  doc.setFont(undefined, "normal");
  doc.setFontSize(10);

 doc.text("Phone : +91 6388390968", 15, y + 14);
 doc.text("Email : support@washgo.com", 80, y + 14);
 doc.text("Website : www.washgo.com", 145, y + 14);

  doc.text("Mon - Sun | 8:00 AM - 9:00 PM", 15, y + 20);

  // ================= FOOTER =================

  doc.setDrawColor(...primary);

  doc.line(10, pageHeight - 20, 200, pageHeight - 20);

  doc.setTextColor(...gray);

  doc.setFontSize(9);

  doc.text(
    "This is a computer generated invoice and does not require a signature.",
    pageWidth / 2,
    pageHeight - 14,
    {
      align: "center",
    },
  );

  doc.text(
    "© 2026 WashGo. All Rights Reserved.",
    pageWidth / 2,
    pageHeight - 8,
    {
      align: "center",
    },
  );

  // ================= SAVE PDF =================

  doc.save(`WashGo_Invoice_${booking.bookingId}.pdf`);
};

export default generateInvoicePDF;
