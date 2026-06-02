import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import vehicleApi from "../../api/vehicleApi";

const Services = () => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await vehicleApi.getVehicles();

      console.log("Vehicles:", res.data);

      setServices(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-20">Loading...</div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900">Our Services</h1>

          <p className="text-gray-600 text-lg mt-6">
            Professional washing solutions for all types of vehicles.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-[35px] shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={`http://localhost:5000/${service.image}`}
                alt={service.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold">{service.name}</h2>

                  {/* <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
                    {service.price}
                  </span> */}
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
                    Available
                  </span>
                </div>

                <p className="text-gray-600 mt-6 leading-7">
                  {service.description}
                </p>

                <Link
                  to="/booking"
                  className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition text-center block"
                >
                  Book Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Services;
