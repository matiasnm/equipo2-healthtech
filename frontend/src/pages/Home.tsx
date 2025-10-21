import HeroClinic from "../components/home/HeroClinic";
import InfoStats from "../components/home/InfoStats";
import Departments from "../components/home/Departments";
import TopSpecialistsCarousel from "../components/home/TopSpecialistsCarousel";
import NewsSection from "../components/home/NewsSection";
import HomeNavbar from "../components/home/HomeNavbar";
import { Footer } from "../components/ui";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
     window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])
  
  return (
    <div>
      <HomeNavbar />
      <HeroClinic />
      <InfoStats />
      <Departments />
      <TopSpecialistsCarousel />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Home;