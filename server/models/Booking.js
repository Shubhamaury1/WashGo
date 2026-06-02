import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: String,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },

    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },

    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },

    bookingDate: Date,

    timeSlot: String,

    amount: Number,

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Booking", bookingSchema);
