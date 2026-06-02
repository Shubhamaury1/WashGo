import MainLayout from "../../layouts/MainLayout";
import car from "../../assets/images/ca.webp";
const About = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="px-6 md:px-16 py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                About WashGo
              </h1>

              <p className="mt-8 text-lg text-gray-600 leading-8">
                WashGo is a modern vehicle washing platform that provides
                professional doorstep washing services for cars, bikes,
                tractors, trucks, cycles, JCBs and heavy vehicles.
              </p>

              <p className="mt-6 text-lg text-gray-600 leading-8">
                Our mission is to make vehicle cleaning easy, fast, affordable
                and accessible with real-time booking, live tracking and premium
                service quality.
              </p>
            </div>

            {/* Right */}
            <div>
              <img
                src={car}
                alt="about"
                className="w-full rounded-[40px] shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 md:px-16 py-20">
          <h1 className="text-4xl font-bold text-center mb-16">
            Why Choose Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-4">Fast Booking</h2>

              <p className="text-gray-600 leading-7">
                Book your wash service instantly with a smooth and modern
                booking experience.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-4">Doorstep Service</h2>

              <p className="text-gray-600 leading-7">
                Our partners arrive at your location and clean your vehicle
                professionally.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-4">Live Tracking</h2>

              <p className="text-gray-600 leading-7">
                Track your washing partner in real time just like food delivery
                apps.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-4">Premium Quality</h2>

              <p className="text-gray-600 leading-7">
                Professional washing solutions with customer-first service
                quality.
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default About;
