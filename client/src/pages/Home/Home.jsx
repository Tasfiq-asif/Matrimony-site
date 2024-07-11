import { Helmet } from "react-helmet";
import Hero from "../../components/Hero/Hero";
import PremiumMembers from "../../components/PremiumMembers/PremiumMembers";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import SuccessStory from "../../components/SuccessStory/SuccessStory";


function Home() {
  return (
    <div className=" bg-red-50">
      <Helmet>
        <title>Matchmaker | Get Hitched</title>
      </Helmet>
      <Hero />
      <PremiumMembers />
      <HowItWorks />
      <SuccessStory />
      console.log(import.meta.env.VITE_API_URL);
    </div>
  );
}

export default Home