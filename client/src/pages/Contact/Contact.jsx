import MainLayout from "../../layouts/MainLayout";

const Contact = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900">Contact Us</h1>

            <p className="mt-8 text-lg text-gray-600 leading-8">
              Have questions, feedback or partnership inquiries? Contact our
              team anytime.
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <h2 className="text-2xl font-bold">Address</h2>

                <p className="text-gray-600 mt-2">
                  Prayagraj, Uttar Pradesh, India
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold">Email</h2>

                <p className="text-gray-600 mt-2">support@washgo.com</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold">Phone</h2>

                <p className="text-gray-600 mt-2">+91 6388390968</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="bg-white rounded-[40px] shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-10">Send Message</h1>

            <form className="space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-2xl p-5 outline-none focus:border-blue-600"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-2xl p-5 outline-none focus:border-blue-600"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-2xl p-5 outline-none focus:border-blue-600"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-2xl p-5 outline-none focus:border-blue-600"
              />

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl text-lg font-semibold transition">
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
