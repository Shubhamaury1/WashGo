import ServiceCard from "./ServiceCard";
import tractor from "../../assets/images/tractor.jpg";
const services = [
  {
    title: "Car Wash",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
    price: 299,
    description: "Professional exterior and interior car cleaning",
    badge: "Popular",
    badgeColor: "bg-blue-100 text-blue-600",
  },
  {
    title: "Bike Wash",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop",
    price: 149,
    description: "Quick and premium bike washing services",
    badge: "Fast",
    badgeColor: "bg-green-100 text-green-600",
  },
  {
    title: "Truck Wash",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000&auto=format&fit=crop",
    price: 799,
    description: "Heavy-duty truck washing services",
    badge: "Pro",
    badgeColor: "bg-orange-100 text-orange-600",
  },
  {
    title: "Tractor Wash",
    image: tractor,
    price: 999,
    description: "Heavy-duty tractor washing services",
    badge: "Expert",
    badgeColor: "bg-red-100 text-red-600",
  },
];

const ServicesSection = () => {

  return (
    <section className="px-6 md:px-16 py-20 bg-gray-50">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-slate-900 text-center ">
          Our Services
        </h1>
        <p className="mt-5 text-xl text-slate-500">
          Professional washing solutions for all types of vehicles.
        </p>{" "}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;




