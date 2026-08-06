
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ServiceCard = ({
  title,
  image,
  price,
  description,
  badge,
  badgeColor,
}) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-40 sm:h-44 lg:h-52 w-full object-cover"
        />

        <span
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg sm:text-2xl font-bold text-slate-800 flex-1">
            {title}
          </h3>

          {price > 0 && (
            <span className="text-blue-600 font-bold text-sm sm:text-xl whitespace-nowrap">
              ₹{price}
            </span>
          )}
        </div>

        <p className="text-gray-500 text-sm sm:text-base leading-relaxed min-h-[50px] sm:min-h-[55px] flex-1">
          {description}
        </p>

        <Link
          to={user ? "/booking" : "/login"}
          className="mt-4 sm:mt-6 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition duration-200 text-sm sm:text-base"
        >
          Book Service
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;