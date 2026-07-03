import Booking from "../models/Booking.js";
import Address from "../models/Address.js";
import { sendNotification } from "../utils/notificationService.js";

export const createBooking = async (req, res) => {
  try {
    const selectedAddress = await Address.findById(req.body.addressId);

    const booking = await Booking.create({
      bookingId: req.body.bookingId,
      userId: req.body.userId,
      vehicleId: req.body.vehicleId,
      packageId: req.body.packageId,

      bookingDate: req.body.bookingDate,
      timeSlot: req.body.timeSlot,
      amount: req.body.amount,

      address: {
        name: selectedAddress.name,
        mobile: selectedAddress.mobile,
        address: selectedAddress.address,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
      },
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("vehicleId")
      .populate("packageId");
    
     await sendNotification({
       receiver: booking.userId,
       booking: booking._id,
       title: "Booking Confirmed",
       message: "Your booking has been placed successfully.",
       type: "booking",
     });

    res.status(201).json({
      success: true,
      booking: populatedBooking,
    });
   
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId")
      .populate("vehicleId")
      .populate("packageId");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId })
      .populate("vehicleId")
      .populate("packageId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Don't allow changing completed booking
    if (booking.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Completed booking cannot be updated.",
      });
    }

    booking.status = status;

    await booking.save();

    if (status === "Pending") {
      await sendNotification({
        receiver: booking.userId,
        booking: booking._id,
        title: "Booking Pending",
        message: "Your booking is waiting for confirmation.",
        type: "status",
      });
    }

    if (status === "Accepted") {
      await sendNotification({
        receiver: booking.userId,
        booking: booking._id,
        title: "Booking Accepted",
        message: "Your booking has been accepted.",
        type: "status",
      });
    }

    if (status === "Completed") {
      await sendNotification({
        receiver: booking.userId,
        booking: booking._id,
        title: "Booking Completed",
        message: "Your vehicle wash has been completed successfully.",
        type: "status",
      });
    }

    if (status === "Cancelled") {
      await sendNotification({
        receiver: booking.userId,
        booking: booking._id,
        title: "Booking Cancelled",
        message: "Your booking has been cancelled.",
        type: "status",
      });
    }
    
    res.json({
      success: true,
      message: "Booking status updated.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate("userId")
      .populate("vehicleId")
      .populate("packageId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};