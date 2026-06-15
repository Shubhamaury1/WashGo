
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
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      {/* Image */}

      <div className="relative">
        <img src={image} alt={title} className="h-44 w-full object-cover" />

        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      {/* Content */}

      <div className="p-5">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-slate-800">{title}</h3>

          {/* <span className="text-blue-600 font-bold text-xl">₹{price}</span>
           */}
          {price > 0 && (
            <span className="text-blue-600 font-bold text-xl">₹{price}</span>
          )}
        </div>

        <p className="mt-3 text-gray-500 leading-relaxed min-h-[55px]">
          {description}
        </p>

        <Link
          // to="/booking"
          to={user ? "/booking" : "/login"}
          className="mt-6 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition"
        >
          Book Service
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;