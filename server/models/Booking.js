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

    address: {
      name: String,
      mobile: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },

    bookingDate: Date,

    timeSlot: String,

    amount: Number,

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Assigned",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Booking", bookingSchema);
