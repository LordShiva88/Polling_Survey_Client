import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import useAxios from "../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { FaQuoteRight } from "react-icons/fa";
import "@smastrom/react-rating/style.css";
import Container from "../../../Components/Container";
import Heading from "../../../Components/Heading";

const Testimonials = () => {
  const axios = useAxios();

  const [reviews, serReview] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/review")
      .then((res) => {
        serReview(res.data);
      })
      .catch((error) => console.error(error));
  }, [axios]);

  return (
    <Container>
      <Heading
        mainHeading="What Our Users Say"
        subHeading="See what our users have to say about their experience. Join the community!"
      ></Heading>
      <div className="">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col items-center md:mx-4  shadow-sm md:p-10 px-10 p-2">
                <div
                  className="text-center max-w-xl space-y-4"
                  key={review._id}
                >
                  <div className="flex justify-center gap-5">
                    <Rating
                      style={{ maxWidth: 120 }}
                      value={review.rating}
                      readOnly
                    />
                    <div className="flex justify-center">
                      <FaQuoteRight className="text-[#D99904] text-5xl" />
                    </div>
                  </div>

                  <p className="text-gray-700">{review.details}</p>

                  <div className="flex items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <img
                        src={review.image}
                        alt={`${review.name}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="divider"></div>
                    <div className="text-left">
                      <h2 className="text-[#D99904] font-bold text-xl">
                        {review.name}
                      </h2>
                      <p className="text-[#D99904]">{review.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default Testimonials;
