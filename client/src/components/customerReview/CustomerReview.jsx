import { FaStar, FaRegStar } from "react-icons/fa";

const reviews = [
  {
    name: "Shubham Maurya",
    location: "Prayagraj, U.P",
    rating: 5,
    review:
      "Amazing service! The team arrived on time and my car looks brand new. Highly recommend WashGo for doorstep washing.",
    initials: "SM",
  },

  {
    name: "Priya Sharma",
    location: "Lucknow, U.P",
    rating: 5,
    review:
      "Very professional and thorough. Booked for bike washing and the result was outstanding. Will definitely use again!",
    initials: "PS",
  },

  {
    name: "Rahul Verma",
    location: "Kanpur, U.P",
    rating: 4,
    review:
      "Great pricing and excellent work. The premium wash package is worth every rupee. Convenient booking process.",
    initials: "RV",
  },
];

const CustomerReview = () => {
  return (
    <section className="py-24 bg-[#EEF5FF]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-xl text-slate-500">
            Real experiences from real customers across India.
          </p>
        </div>

        {/* Reviews */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
            >
              {/* Rating */}

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) =>
                  i < review.rating ? (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300 text-lg" />
                  ),
                )}
              </div>

              {/* Review */}

              <p className="text-gray-600 leading-relaxed text-lg min-h-[120px]">
                "{review.review}"
              </p>

              {/* User */}

              <div className="flex items-center gap-4 mt-8">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {review.initials}
                </div>

                <div>
                  <h4 className="font-bold text-lg text-slate-900">
                    {review.name}
                  </h4>

                  <p className="text-gray-500 text-sm">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
