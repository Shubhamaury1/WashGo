import MainLayout from "../../layouts/MainLayout";
import { FaStar, FaQuoteLeft, FaCheckCircle, FaUsers } from "react-icons/fa";

const reviews = [
  {
    name: "Rahul Sharma",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "Amazing service. The team arrived on time and cleaned my car professionally.",
    city: "Prayagraj",
    rating: 5,
  },
  {
    name: "Anjali Verma",
    image: "https://i.pravatar.cc/150?img=32",
    review: "Very smooth booking process and live tracking was super useful.",
    city: "Lucknow",
    rating: 5,
  },
  {
    name: "Rohit Kumar",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Affordable pricing and premium washing quality. Highly recommended.",
    city: "Kanpur",
    rating: 4,
  },
  {
    name: "Sakshi Gupta",
    image: "https://i.pravatar.cc/150?img=45",
    review: "Best doorstep vehicle washing platform I have used.",
    city: "Varanasi",
    rating: 5,
  },
  {
    name: "Vikas Singh",
    image: "https://i.pravatar.cc/150?img=20",
    review: "Professional staff with excellent service quality.",
    city: "Delhi",
    rating: 5,
  },
  {
    name: "Priya Mishra",
    image: "https://i.pravatar.cc/150?img=28",
    review: "Great experience. Booking and scheduling was very easy.",
    city: "Noida",
    rating: 4,
  },
];

const Reviews = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-slate-50 via-blue-50 to-white">
        {/* Hero */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <span className="inline-block bg-blue-100 text-blue-600 px-3 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm">
              ⭐ Customer Reviews
            </span>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mt-4 sm:mt-6 md:mt-8">
              What Our Customers Say
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4 sm:mt-5 md:mt-6 max-w-3xl mx-auto px-2">
              Thousands of customers trust WashGo for professional vehicle
              washing services at their doorstep.
            </p>
          </div>
        </section>

        {/* Rating Section */}
        <section className="pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[35px] shadow-lg md:shadow-xl p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600">
                    4.8
                  </h2>

                  <div className="flex justify-center mt-2 sm:mt-3 text-yellow-500 text-lg sm:text-xl">
                    ★★★★★
                  </div>

                  <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                    Average Rating
                  </p>
                </div>

                <div>
                  <FaUsers className="mx-auto text-blue-600 text-3xl sm:text-4xl md:text-5xl" />

                  <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold mt-2 sm:mt-3 md:mt-4">
                    10K+
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                    Happy Customers
                  </p>
                </div>

                <div>
                  <FaCheckCircle className="mx-auto text-green-500 text-3xl sm:text-4xl md:text-5xl" />

                  <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold mt-2 sm:mt-3 md:mt-4">
                    25K+
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                    Services Completed
                  </p>
                </div>

                <div>
                  <FaStar className="mx-auto text-yellow-500 text-3xl sm:text-4xl md:text-5xl" />

                  <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold mt-2 sm:mt-3 md:mt-4">
                    98%
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                    Satisfaction Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[35px] shadow-md md:shadow-lg p-5 sm:p-6 md:p-8 hover:-translate-y-2 md:hover:-translate-y-3 hover:shadow-lg md:hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  <FaQuoteLeft className="text-blue-100 text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-6" />

                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base min-h-[80px] sm:min-h-[100px] md:min-h-[120px] flex-1">
                    "{review.review}"
                  </p>

                  <div className="flex items-center gap-3 sm:gap-4 mt-5 sm:mt-6 md:mt-8">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full object-cover border-3 md:border-4 border-blue-100"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base sm:text-lg md:text-xl truncate">
                        {review.name}
                      </h3>

                      <p className="text-gray-500 text-xs sm:text-sm truncate">
                        {review.city}
                      </p>

                      <div className="flex mt-1 sm:mt-2 gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar
                            key={i}
                            className="text-yellow-500 text-xs sm:text-sm"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 md:mt-5">
                    <span className="inline-block bg-green-100 text-green-600 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                      Verified Customer
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl md:rounded-[40px] p-6 sm:p-10 md:p-16 text-center text-white">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold">
                Join Thousands Of Happy Customers
              </h2>

              <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-xl text-blue-100">
                Experience premium doorstep vehicle washing service.
              </p>

              <button className="mt-6 sm:mt-8 md:mt-10 bg-white text-blue-600 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-bold hover:scale-105 transition duration-200 text-sm sm:text-base">
                Book Your First Wash
              </button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Reviews;