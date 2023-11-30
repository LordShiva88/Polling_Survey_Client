import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "@smastrom/react-rating/style.css";
import BannerHome from "../../../Components/BannerHome";
const Banner = () => {
  return (
    <div className="">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <BannerHome
            mainHeading="Make Your Voice Heard"
            subHeading="Participate in Our Polls Today"
            description="Influence positive change in your community. Your opinions matter!"
          />
        </SwiperSlide>

        <SwiperSlide>
          <BannerHome
            mainHeading="Shape Tomorrow"
            subHeading="Cast Your Votes, Share Your Insights"
            description="Influence decisions and be the change you want to see in the world."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
