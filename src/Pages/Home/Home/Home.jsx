import HelmetProvider from "../../../Components/HelmetProvider";
import Banner from "../Banner/Banner";
import FAQ from "../Faq/Faq";
import FeaturedSurveys from "../FeaturedSurveys/FeaturedSurveys";
import RecentPublish from "../RecentPublish/RecentPublish";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <HelmetProvider helmetTitle={"SurveySift || Home"}></HelmetProvider>
      <Banner></Banner>
      <FeaturedSurveys></FeaturedSurveys>
      <RecentPublish></RecentPublish>
      <FAQ></FAQ>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
