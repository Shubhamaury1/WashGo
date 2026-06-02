import { Link } from "react-router-dom";

const ServiceCard = ({ title, image, price }) => {
  return (
    <div className="bg-white p-5 rounded-3xl shadow-md hover:shadow-xl transition">
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-cover rounded-2xl"
      />

      <h2 className="text-2xl font-semibold mt-4">{title}</h2>

      <p className="text-blue-600 font-bold mt-2">Starting ₹{price}</p>
      <Link
        to="/booking"
        className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl text-center block"
      >
        Book Now
      </Link>
    </div>
  );
};

export default ServiceCard;
