import { FaStar } from "react-icons/fa";

function RatingStars({
  rating,
  setRating,
  hover,
  setHover,
  editable = true,
  size = 28,
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={size}
          className={`cursor-pointer transition-all duration-200 ${
            (hover || rating) >= star
              ? "text-yellow-400 scale-110"
              : "text-gray-300"
          } ${editable ? "hover:scale-125" : "cursor-default"}`}
          onClick={() => editable && setRating(star)}
          onMouseEnter={() => editable && setHover(star)}
          onMouseLeave={() => editable && setHover(0)}
        />
      ))}
    </div>
  );
}

export default RatingStars;
    