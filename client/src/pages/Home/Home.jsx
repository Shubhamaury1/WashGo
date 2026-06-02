import MainLayout from "../../layouts/MainLayout";

import HeroSection from "../../components/hero/HeroSection";
import ServicesSection from "../../components/services/ServicesSection";

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />

      <ServicesSection />
    </MainLayout>
  );
};

export default Home;
