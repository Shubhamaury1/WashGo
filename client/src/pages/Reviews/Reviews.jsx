import MainLayout from "../../layouts/MainLayout";

const reviews = [
  {
    name: "Rahul Sharma",
    rating: "★★★★★",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "Amazing service. The team arrived on time and cleaned my car professionally.",
  },
  {
    name: "Anjali Verma",
    rating: "★★★★★",
    image: "https://i.pravatar.cc/150?img=32",
    review: "Very smooth booking process and live tracking was super useful.",
  },
  {
    name: "Rohit Kumar",
    rating: "★★★★☆",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Affordable pricing and premium washing quality. Highly recommended.",
  },
  {
    name: "Sakshi Gupta",
    rating: "★★★★★",
    image: "https://i.pravatar.cc/150?img=45",
    review: "Best doorstep vehicle washing platform I have used.",
  },
  {
    name: "Vikas Singh",
    rating: "★★★★★",
    image: "https://i.pravatar.cc/150?img=20",
    review: "Professional staff with excellent service quality.",
  },
  {
    name: "Priya Mishra",
    rating: "★★★★☆",
    image: "https://i.pravatar.cc/150?img=28",
    review: "Great experience. Booking and scheduling was very easy.",
  },
];

const Reviews = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900">Customer Reviews</h1>

          <p className="text-gray-600 text-lg mt-6">
            What our happy customers say about WashGo.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-[35px] shadow-lg p-8 hover:shadow-2xl transition"
            >
              <div className="flex items-center gap-5">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 rounded-full object-cover"
                />

                <div>
                  <h2 className="text-2xl font-bold">{review.name}</h2>

                  <p className="text-yellow-500 text-xl mt-2">
                    {review.rating}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 leading-8 mt-8">“{review.review}”</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Reviews;
