import { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import RatingStars from "./RatingStars";
import reviewApi from "../api/reviewApi";
import { toast } from "react-toastify";

function ReviewForm({ bookingId, onReviewAdded, reviewData, isEditing }) {
  const BaseUrl = import.meta.env.VITE_API_IMG_URL; 
  const [rating, setRating] = useState(reviewData?.rating || 0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState(reviewData?.review || "");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState(
    reviewData?.images || [],
  );
  const [loading, setLoading] = useState(false);

  // Upload Images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      toast.error("Maximum 5 images allowed.");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  // Remove Image
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Submit Review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      return toast.error("Please give rating.");
    }

    if (!review.trim()) {
      return toast.error("Please write your review.");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("bookingId", bookingId);
      formData.append("rating", rating);
      formData.append("review", review);
      formData.append("existingImages", JSON.stringify(existingImages));

      images.forEach((image) => {
        formData.append("images", image);
      });

      let res;

      if (isEditing) {
        res = await reviewApi.updateReview(reviewData._id, formData);
      } else {
        res = await reviewApi.createReview(formData);
      }

      toast.success(
        isEditing
          ? "Review Updated Successfully"
          : "Review Submitted Successfully"
      );

     if (!isEditing) {
       setRating(0);
       setHover(0);
       setReview("");
       setImages([]);
       setExistingImages([]);
     }
      if (onReviewAdded) {
        onReviewAdded(res.data.data);
      }
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reviewData) {
      setRating(reviewData.rating);
      setReview(reviewData.review);
      setExistingImages(reviewData.images || []);
    }
  }, [reviewData]);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Write a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}

        <div>
          <label className="block font-semibold mb-3">Rating</label>

          <RatingStars
            rating={rating}
            setRating={setRating}
            hover={hover}
            setHover={setHover}
          />
        </div>

        {/* Review */}

        <div>
          <label className="block font-semibold mb-3">Review</label>

          <textarea
            rows={5}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mb-6">
            <label className="block font-semibold mb-3">Existing Images</label>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {existingImages.map((img, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden"
                >
                  <img
                    src={`${BaseUrl}${img}`}
                    alt=""
                    className="h-28 w-full object-cover rounded-xl border"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setExistingImages(
                        existingImages.filter((_, i) => i !== index),
                      )
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload */}

        <div>
          <label className="block font-semibold mb-3">Upload Images</label>

          <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center cursor-pointer hover:border-blue-500 transition">
            <FaCloudUploadAlt size={45} className="text-blue-500" />

            <span className="mt-3 text-gray-500">Click to upload images</span>

            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Preview */}

        {images.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Selected Images</h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden border"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="w-full h-28 object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Review"
              : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
