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
          <BannerHome></BannerHome>
        </SwiperSlide>
        <SwiperSlide>
          <BannerHome></BannerHome>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
