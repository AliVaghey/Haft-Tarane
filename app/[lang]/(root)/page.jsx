// import Comment from "@/components/landingPage/comment/Comment";
import HeroSection from "@/components/landingPage/heroSection/HeroSection";
import Feature from "@/components/landingPage/features/Feature";
import OurService from "@/components/landingPage/ourServices/OurServices";
import Services from "@/components/landingPage/services/Services";
import SpecialTours from "@/components/landingPage/specialTours/SpecialTours";
import { getLangs } from "@/lib/langs";
import CheapTour from "@/components/landingPage/cheapTour/CheapTour";

const Home = async ({ params }) => {
  const dict = await getLangs(params.lang);
  return (
    <main className="bg-yellow-primary">
      <div>
        <HeroSection />
        <SpecialTours />
        <Feature />
        <CheapTour />
        <Services />
        {/* <Comment /> */}
        <OurService />
      </div>
    </main>
  );
};

export default Home;
