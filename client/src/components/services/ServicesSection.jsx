import ServiceCard from "./ServiceCard";
import tractor from "../../assets/images/tractor.jpg";
const services = [
  {
    title: "Car Wash",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
    price: 299,
  },
  {
    title: "Bike Wash",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop",
    price: 149,
  },
  {
    title: "Truck Wash",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000&auto=format&fit=crop",
    price: 799,
  },
  {
    title: "Tractor Wash",
    image: tractor,
    price: 999,
  },
];

const ServicesSection = () => {
  return (
    <section className="px-6 md:px-16 py-20 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-14">Our Services</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
