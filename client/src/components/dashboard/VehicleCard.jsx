const VehicleCard = ({ image, title }) => {
  return (
    <div className="bg-white p-5 rounded-3xl shadow-md hover:shadow-xl transition cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-28 object-cover rounded-2xl"
      />

      <h2 className="text-center font-semibold text-lg mt-4">{title}</h2>
    </div>
  );
};

export default VehicleCard;
