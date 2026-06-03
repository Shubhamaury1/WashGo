import Booking from "../models/Booking.js";
import Address from "../models/Address.js";

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
      .populate("packageId")
      

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
