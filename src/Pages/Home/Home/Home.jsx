import HelmetProvider from "../../../Components/HelmetProvider";
import Banner from "../Banner/Banner";
import Testimonials from "../Testimonials/Testimonials";
import RecentPublish from "./RecentPublish";
const Home = () => {
  return (
    <div>
      <HelmetProvider helmetTitle={"SurveySift || Home"}></HelmetProvider>
      <Banner></Banner>
      <RecentPublish></RecentPublish>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
