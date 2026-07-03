import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },

    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "chat",
        "booking",
        "payment",
        "status",
        "coupon",
        "redeem",
        "offer",
        "admin",
      ],
      default: "admin",
    },

    couponCode: {
      type: String,
      default: "",
    },

    redeemCode: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Notification", notificationSchema);
