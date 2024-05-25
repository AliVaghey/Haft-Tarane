import { getLangs } from "@/lib/langs";
import About from "@/components/landingPage/about/About";
import CheapestTour from "@/components/landingPage/cheapestTour/CheapestTour";
import Comment from "@/components/landingPage/comment/Comment";
import HeroSection from "@/components/landingPage/heroSection/HeroSection";
import OurService from "@/components/landingPage/ourService/OurService";
import SearchTabs from "@/components/landingPage/searchTabs/SearchTabs";
import Services from "@/components/landingPage/services/Services";
import SpecialTours from "@/components/landingPage/specialTours/SpecialTours";

const Home = async ({ params }) => {
  const dict = await getLangs(params.lang);
  return (
    <main className="bg-yellow-primary">
      <div>
        <HeroSection />
        <SearchTabs />
        <About />
        <CheapestTour />
        <SpecialTours />
        <Services />
        <Comment />
        <OurService />
      </div>
    </main>
  );
};

export default Home;
