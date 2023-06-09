import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiper.css";

SwiperCore.use([ Pagination, Autoplay]);

export function SwiperHeader(props) {
  return (
    <>
      <Swiper
        direction={"vertical"}
        modules={[Pagination, Autoplay]}
        spaceBetween={1}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={props.img} alt=""></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src={props.img} alt=""></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src={props.img} alt=""></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src={props.img} alt=""></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
