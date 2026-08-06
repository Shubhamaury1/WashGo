import MainLayout from "../../layouts/MainLayout";

const Contact = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          {/* Left */}
          <div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-gray-900">
              Contact Us
            </h1>

            <p className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg text-gray-600 leading-relaxed md:leading-8">
              Have questions, feedback or partnership inquiries? Contact our
              team anytime.
            </p>

            <div className="mt-8 sm:mt-10 md:mt-12 space-y-6 sm:space-y-8 ">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Address
                </h2>

                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  Prayagraj, Uttar Pradesh, India
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Email
                </h2>

                <a
                  href="mailto:support@washgo.com"
                  className="text-blue-600 hover:text-blue-700 mt-2 text-sm sm:text-base transition"
                >
                  support@washgo.com
                </a>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Phone
                </h2>

                <a
                  href="tel:+916388390968"
                  className="text-blue-600 hover:text-blue-700 mt-2 text-sm sm:text-base transition"
                >
                  +91 6388390968
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[40px] shadow-md md:shadow-lg p-5 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 md:mb-10 text-gray-900">
              Send Message
            </h1>

            <form className="space-y-4 sm:space-y-5 md:space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition text-sm sm:text-base"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition text-sm sm:text-base"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition text-sm sm:text-base"
              />

              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition text-sm sm:text-base resize-none"
              />

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-semibold transition duration-200">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
