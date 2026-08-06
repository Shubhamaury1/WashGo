const VehicleCard = ({ image, title }) => {
  return (
    <div className="bg-white p-3 sm:p-5 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-20 sm:h-28 object-cover rounded-lg sm:rounded-2xl"
      />

      <h2 className="text-center font-semibold text-sm sm:text-lg mt-2 sm:mt-4 line-clamp-2">{title}</h2>
    </div>
  );
};

export default VehicleCard;
