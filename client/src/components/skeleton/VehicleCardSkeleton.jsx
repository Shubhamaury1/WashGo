const VehicleCardSkeleton = () => {
  return (
    <div className="bg-white p-3 sm:p-5 rounded-2xl sm:rounded-3xl shadow-md animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-20 sm:h-28 bg-gray-200 rounded-lg sm:rounded-2xl" />

      {/* Title Skeleton */}
      <div className="mt-2 sm:mt-4 flex justify-center">
        <div className="h-4 sm:h-5 w-24 sm:w-32 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
};

export default VehicleCardSkeleton;
