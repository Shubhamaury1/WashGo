const SkeletonService = () => {
  return (
    <div className="animate-pulse bg-white rounded-3xl shadow-md overflow-hidden">
      {/* Image */}
      <div className="w-full h-52 bg-gray-200"></div>

      <div className="p-5">
        {/* Badge */}
        <div className="w-20 h-6 bg-gray-200 rounded-full mb-4"></div>

        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Price */}
        <div className="h-8 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonService;
