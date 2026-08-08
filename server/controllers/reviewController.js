import Review from "../models/Review.js";
import Booking from "../models/Booking.js";

export const createReview = async (req, res) => {
  try {
    const { bookingId, rating, review } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Review allowed only after completed booking",
      });
    }

    const alreadyReviewed = await Review.findOne({
      bookingId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "Review already submitted",
      });
    }

    const images =
      req.files?.map((file) => file.path) || [];

    const newReview = await Review.create({
      bookingId,
      userId: booking.userId,
      vehicleId: booking.vehicleId,
      rating,
      review,
      images,
    });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReviewByBooking = async (req, res) => {
  try {
    const review = await Review.findOne({
      bookingId: req.params.bookingId,
    })
      .populate("userId")
      .populate("vehicleId");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "No Review Found",
      });
    }

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, review, existingImages } = req.body;

    const existing = await Review.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    let oldImages = [];

    if (existingImages) {
      oldImages = JSON.parse(existingImages);
    }

    const newImages =
      req.files?.map((file) => file.path) || [];

    const finalImages = [...oldImages, ...newImages];

    existing.rating = rating;
    existing.review = review;
    existing.images = finalImages;

    await existing.save();

    res.json({
      success: true,
      data: existing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Review Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
