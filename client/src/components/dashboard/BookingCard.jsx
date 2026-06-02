const BookingCard = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col lg:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-5">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop"
          alt="car"
          className="w-28 h-28 rounded-2xl object-cover"
        />

        <div>
          <h1 className="text-2xl font-bold">Car Washing</h1>

          <p className="text-gray-500 mt-2">Premium Wash Package</p>

          <p className="text-blue-600 font-bold mt-3">₹499</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="bg-green-100 text-green-600 px-5 py-2 rounded-full font-medium">
          Active
        </span>

        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl transition">
          Track Live
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
