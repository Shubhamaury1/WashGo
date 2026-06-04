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

        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <span className="bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-medium">
              ⭐ Customer Reviews
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mt-8">
              What Our Customers Say
            </h1>

            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Thousands of customers trust WashGo for professional vehicle
              washing services at their doorstep.
            </p>
          </div>
        </section>

        {/* Rating Section */}

        <section className="pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[35px] shadow-xl p-10">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <h2 className="text-5xl font-bold text-blue-600">4.8</h2>

                  <div className="flex justify-center mt-3 text-yellow-500 text-xl">
                    ★★★★★
                  </div>

                  <p className="text-gray-500 mt-2">Average Rating</p>
                </div>

                <div>
                  <FaUsers className="mx-auto text-blue-600 text-5xl" />

                  <h3 className="text-3xl font-bold mt-4">10K+</h3>

                  <p className="text-gray-500">Happy Customers</p>
                </div>

                <div>
                  <FaCheckCircle className="mx-auto text-green-500 text-5xl" />

                  <h3 className="text-3xl font-bold mt-4">25K+</h3>

                  <p className="text-gray-500">Services Completed</p>
                </div>

                <div>
                  <FaStar className="mx-auto text-yellow-500 text-5xl" />

                  <h3 className="text-3xl font-bold mt-4">98%</h3>

                  <p className="text-gray-500">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}

        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[35px] shadow-lg p-8 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
                >
                  <FaQuoteLeft className="text-blue-100 text-5xl mb-6" />

                  <p className="text-gray-600 leading-8 min-h-[120px]">
                    "{review.review}"
                  </p>

                  <div className="flex items-center gap-4 mt-8">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                    />

                    <div>
                      <h3 className="font-bold text-xl">{review.name}</h3>

                      <p className="text-gray-500 text-sm">{review.city}</p>

                      <div className="flex mt-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                      Verified Customer
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[40px] p-16 text-center text-white">
              <h2 className="text-5xl font-bold">
                Join Thousands Of Happy Customers
              </h2>

              <p className="mt-6 text-xl text-blue-100">
                Experience premium doorstep vehicle washing service.
              </p>

              <button className="mt-10 bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold hover:scale-105 transition">
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