import RatingStars from "./RatingStars";
import { FaCalendarAlt, FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";

const BaseUrl = import.meta.env.VITE_API_IMG_URL; // Change if your backend URL is different

function ReviewCard({ review, onEdit, onDelete }) {
  if (!review) return null;

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6 mt-4 md:mt-6">
      {/* Header */}
      <div className="flex justify-between items-start md:items-center border-b pb-3 md:pb-4 gap-3">
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <FaUserCircle size={32} className="text-blue-600 flex-shrink-0 md:w-10 md:h-10" />

          <div className="min-w-0">
            <h2 className="text-lg md:text-xl font-bold">Your Review</h2>

            <p className="text-gray-500 text-xs md:text-sm truncate">{review.userId?.fullName}</p>
          </div>
        </div>

        <div className="text-gray-500 text-xs md:text-sm flex items-center gap-1 md:gap-2 flex-shrink-0">
          <FaCalendarAlt className="text-xs md:text-sm" />
          <span className="hidden sm:inline">{new Date(review.createdAt).toLocaleDateString("en-GB")}</span>
          <span className="sm:hidden">{new Date(review.createdAt).toLocaleDateString("en-GB", { month: "2-digit", day: "2-digit" })}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mt-4 md:mt-6">
        <RatingStars rating={review.rating} editable={false} size={20} />
      </div>

      {/* Review */}
      <div className="mt-3 md:mt-5">
        <p className="text-gray-700 leading-7 md:leading-8 text-sm md:text-lg">{review.review}</p>
      </div>

      {/* Images */}
      {review.images?.length > 0 && (
        <div className="mt-6 md:mt-8">
          <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Uploaded Images</h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {review.images.map((img, index) => (
              <img
                key={index}
                src={img?.startsWith("http") ? img : `${BaseUrl}${img}`}
                alt="review"
                className="h-24 md:h-40 w-full object-cover rounded-lg md:rounded-xl border hover:scale-105 transition duration-300"
              />
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-6 md:mt-8 flex gap-2 md:gap-3 items-center">
        {/* Icon only buttons for both mobile and desktop */}
        <button
          onClick={onEdit}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 md:p-2.5 rounded-lg md:rounded-lg transition"
          title="Edit Review"
        >
          <FaEdit size={18} />
        </button>

        <button
          onClick={onDelete}
          className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-2 md:p-2.5 rounded-lg md:rounded-lg transition"
          title="Delete Review"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
}

export default ReviewCard;
