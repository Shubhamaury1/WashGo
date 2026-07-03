import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
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

    couponCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    redeemCode: {
      type: String,
      default: "",
      trim: true,
    },

    // NEW
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },

    // NEW
    discountValue: {
      type: Number,
      required: true,
      default: 0,
    },

    // Minimum order required
    minimumOrderAmount: {
      type: Number,
      default: 0,
    },

    // Only used for percentage coupons
    maximumDiscountAmount: {
      type: Number,
      default: 0,
    },

    expiryDate: {
      type: Date,
    },

    targetType: {
      type: String,
      enum: ["all", "selected"],
      default: "all",
    },

    selectedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    usageLimit: {
      type: Number,
      default: 1,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Expired"],
      default: "Active",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Coupon", couponSchema);
