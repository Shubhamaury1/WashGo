import jsPDF from "jspdf";
import "jspdf-autotable";

const generateInvoicePDF = (booking) => {
  if (!booking) return;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Colors
  const primaryColor = [37, 99, 235]; // Blue
  const successColor = [34, 197, 94]; // Green
  const textColor = [31, 41, 55]; // Dark Gray
  const lightGray = [243, 244, 246]; // Light Gray

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 35, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("INVOICE", 15, 22);
  doc.setFontSize(11);
  doc.text(`Booking ID: ${booking.bookingId}`, pageWidth - 15, 15, {
    align: "right",
  });
  doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, pageWidth - 15, 22, {
    align: "right",
  });

  // Booking Details Section
  let yPosition = 45;
  doc.setTextColor(...textColor);
  doc.setFontSize(13);
  doc.setFont(undefined, "bold");
  doc.text("BOOKING DETAILS", 15, yPosition);

  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, "normal");

  const bookingDetails = [
    ["Booking ID:", booking.bookingId],
    ["Vehicle:", booking.vehicleId?.name || "N/A"],
    ["Package:", booking.packageId?.packageName || "N/A"],
    ["Status:", booking.status],
    ["Payment Method:", booking.paymentMethod || "N/A"],
  ];

  bookingDetails.forEach((detail) => {
    doc.text(detail[0], 15, yPosition);
    doc.text(detail[1], 100, yPosition);
    yPosition += 7;
  });

  // Service Details Section
  yPosition += 5;
  doc.setFontSize(13);
  doc.setFont(undefined, "bold");
  doc.text("SERVICE DETAILS", 15, yPosition);

  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, "normal");

  const serviceDetails = [
    ["Booking Date:", new Date(booking.bookingDate).toLocaleDateString("en-GB")],
    ["Time Slot:", booking.timeSlot],
    ["Service Person Name:", booking.address?.name || "N/A"],
    ["Mobile:", booking.address?.mobile || "N/A"],
    ["Address:", booking.address?.address || "N/A"],
    [
      "Location:",
      `${booking.address?.city || ""}, ${booking.address?.state || ""} - ${booking.address?.pincode || ""}`,
    ],
  ];

  serviceDetails.forEach((detail) => {
    if (detail[0] === "Address:") {
      doc.text(detail[0], 15, yPosition);
      doc.text(detail[1], 100, yPosition, { maxWidth: 95 });
      yPosition += 10;
    } else if (detail[0] === "Location:") {
      doc.text(detail[0], 15, yPosition);
      doc.text(detail[1], 100, yPosition, { maxWidth: 95 });
      yPosition += 10;
    } else {
      doc.text(detail[0], 15, yPosition);
      doc.text(detail[1], 100, yPosition);
      yPosition += 7;
    }
  });

  // Payment Summary Section
  yPosition += 5;
  doc.setFontSize(13);
  doc.setFont(undefined, "bold");
  doc.text("PAYMENT SUMMARY", 15, yPosition);

  yPosition += 10;
  doc.setFillColor(...lightGray);
  doc.rect(15, yPosition - 5, pageWidth - 30, 25, "F");

  doc.setFontSize(10);
  doc.setFont(undefined, "normal");
  doc.setTextColor(...textColor);

  doc.text("Service Amount:", 15, yPosition);
  doc.text(
    `₹ ${(booking.amount + (booking.discountAmount || 0)).toFixed(2)}`,
    pageWidth - 15,
    yPosition,
    { align: "right" },
  );

  yPosition += 7;
  doc.text("Convenience Fee:", 15, yPosition);
  doc.setTextColor(...successColor);
  doc.text("FREE", pageWidth - 15, yPosition, { align: "right" });

  yPosition += 7;
  doc.setTextColor(...textColor);
  if (booking.discountAmount > 0) {
    doc.text("Discount:", 15, yPosition);
    doc.setTextColor(...successColor);
    doc.text(`-₹ ${booking.discountAmount.toFixed(2)}`, pageWidth - 15, yPosition, {
      align: "right",
    });
  }

  // Total Paid
  yPosition += 12;
  doc.setFillColor(...primaryColor);
  doc.rect(15, yPosition - 5, pageWidth - 30, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, "bold");
  doc.setFontSize(12);

  doc.text("TOTAL PAID:", 15, yPosition);
  doc.text(`₹ ${booking.amount.toFixed(2)}`, pageWidth - 15, yPosition, {
    align: "right",
  });

  // Footer
  yPosition = pageHeight - 30;
  doc.setTextColor(...textColor);
  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  doc.text("Thank you for choosing WashGo!", pageWidth / 2, yPosition, {
    align: "center",
  });
  doc.text(
    "Your booking will be confirmed instantly after successful payment.",
    pageWidth / 2,
    yPosition + 5,
    { align: "center" },
  );

  // Download
  doc.save(`Invoice_${booking.bookingId}.pdf`);
};

export default generateInvoicePDF;
