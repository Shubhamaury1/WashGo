import MainLayout from "../../layouts/MainLayout";

import HeroSection from "../../components/hero/HeroSection";
import ServicesSection from "../../components/services/ServicesSection";
import CustomerReview from "../../components/customerReview/CustomerReview";

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection />
    </MainLayout>
  );
};

export default Home;
