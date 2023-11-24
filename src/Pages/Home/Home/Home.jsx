import HelmetProvider from "../../../Components/HelmetProvider";
import Banner from "../Banner/Banner";
import Testimonials from "../Testimonials/Testimonials";
const Home = () => {
  return (
    <div>
      <HelmetProvider helmetTitle={"SurveySift || Home"}></HelmetProvider>
      <Banner></Banner>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
