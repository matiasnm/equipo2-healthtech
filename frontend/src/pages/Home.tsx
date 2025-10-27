
import HeroClinic from "../components/Home/HeroClinic";
import HomeNavbar from "../components/Home/HomeNavbar";
import { Footer } from "../components/ui";
import { useEffect } from "react";
import InfoStats from "../components/Home/InfoStats";
import Departments from "../components/Home/Departaments";
import TopSpecialistsCarousel from "../components/Home/TopSpecialistsCarousel";
import NewsSection from "../components/Home/NewsSection";

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