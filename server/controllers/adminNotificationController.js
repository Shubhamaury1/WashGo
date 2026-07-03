import User from "../models/User.js";
import Coupon from "../models/Coupon.js";
import { sendNotification } from "../utils/notificationService.js";

// Send notification/coupon to all or selected users
export const sendAdminNotification = async (req, res) => {
  try {
    const {
      title,
      message,
      couponCode,
      redeemCode,
      discountType,
      discountValue,
      expiryDate,
      targetType,
      selectedUsers,
      createdBy,
    } = req.body;

    // Save coupon
    const coupon = await Coupon.create({
      title,
      message,
      couponCode,
      redeemCode,
      discountType,
      discountValue,
      expiryDate,
      targetType,
      selectedUsers: targetType === "selected" ? selectedUsers : [],
      createdBy,
    });

    let users = [];

    if (targetType === "all") {
      users = await User.find({}, "_id");
    } else {
      users = await User.find(
        {
          _id: { $in: selectedUsers },
        },
        "_id",
      );
    }

   await Promise.all(
     users.map((user) =>
       sendNotification({
         sender: createdBy,
         receiver: user._id,
         title,
         message,
         couponCode,
         redeemCode,
         type: "coupon",
       }),
     ),
   );

    res.status(201).json({
      success: true,
      message: "Notification sent successfully.",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all coupons
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find()
      .populate("createdBy", "fullName")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Toggle coupon status (active/inactive)
export const toggleCouponStatus = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    coupon.isActive = !coupon.isActive;

    await coupon.save();

    res.json({
      success: true,
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a coupon
export const deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Coupon deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};