const PackageSkeleton = () => {
  return (
    <div className="animate-pulse border-2 border-gray-200 rounded-3xl p-6">
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>

          <div className="h-4 bg-gray-200 rounded mb-2"></div>

          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        <div className="w-20 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default PackageSkeleton;
