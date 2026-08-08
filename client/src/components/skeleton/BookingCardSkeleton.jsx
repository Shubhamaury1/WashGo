const BookingCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-md animate-pulse">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col lg:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
          {/* Left Section */}
          <div className="flex items-start gap-3 md:gap-5 w-full">
            {/* Vehicle Image */}
            <div className="w-20 md:w-28 h-20 md:h-28 rounded-xl md:rounded-2xl bg-gray-200 flex-shrink-0" />

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile title/status */}
              <div className="flex items-start justify-between gap-2 md:hidden">
                <div className="h-6 w-32 bg-gray-200 rounded-md" />
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
              </div>

              {/* Desktop title */}
              <div className="hidden md:block h-7 w-48 bg-gray-200 rounded-md" />

              {/* Package */}
              <div className="h-4 w-32 md:w-40 bg-gray-200 rounded-md mt-3" />

              {/* Amount */}
              <div className="h-5 w-20 bg-gray-200 rounded-md mt-3" />
            </div>
          </div>

          {/* Desktop Status + Button */}
          <div className="hidden md:flex items-center gap-4">
            <div className="h-7 w-24 bg-gray-200 rounded-full" />
            <div className="h-12 w-32 bg-gray-200 rounded-xl" />
          </div>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden w-full h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
};

export default BookingCardSkeleton;
