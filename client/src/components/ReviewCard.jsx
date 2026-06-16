import RatingStars from "./RatingStars";
import { FaCalendarAlt, FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";

const BaseUrl = import.meta.env.VITE_API_IMG_URL; // Change if your backend URL is different

function ReviewCard({ review, onEdit, onDelete }) {
  if (!review) return null;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">
      {/* Header */}

      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-4">
          <FaUserCircle size={40} className="text-blue-600" />

          <div>
            <h2 className="text-xl font-bold">Your Review</h2>

            <p className="text-gray-500">{review.userId?.fullName}</p>
          </div>
        </div>

        <div className="text-gray-500 text-sm flex items-center gap-2">
          <FaCalendarAlt />

          {new Date(review.createdAt).toLocaleDateString("en-GB")}
        </div>
      </div>

      {/* Rating */}

      <div className="mt-6">
        <RatingStars rating={review.rating} editable={false} size={26} />
      </div>

      {/* Review */}

      <div className="mt-5">
        <p className="text-gray-700 leading-8 text-lg">{review.review}</p>
      </div>

      {/* Images */}

      {review.images?.length > 0 && (
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-4">Uploaded Images</h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {review.images.map((img, index) => (
              <img
                key={index}
                src={`${BaseUrl}${img}`}
                alt=""
                className="h-40 w-full object-cover rounded-xl border hover:scale-105 transition duration-300"
              />
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}

      <div className="mt-8 flex gap-4">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          <FaEdit />
          Edit Review
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
        >
          <FaTrash />
          Delete Review
        </button>
      </div>
    </div>
  );
}

export default ReviewCard;
