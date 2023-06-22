import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiper.css";
import video from "../../assets/videos/intro.mp4";

SwiperCore.use([Pagination, Autoplay]);



export function SwiperHeader(props) {
  const [slides, setSlides] = useState(4); // Número inicial de slides a mostrar

  useEffect(() => {
    calculateSlidesPerView();
    window.addEventListener("resize", calculateSlidesPerView);
    return () => {
      window.removeEventListener("resize", calculateSlidesPerView);
    };
  }, []);

  const calculateSlidesPerView = () => {
    const screenWidth = window.innerWidth;
    let slidesToShow = 4; // Número predeterminado de slides a mostrar

    if (screenWidth < 768) {
      slidesToShow = 1; // Si el ancho de la pantalla es menor a 768px, muestra solo 1 slide
    } else if (screenWidth < 1024) {
      slidesToShow = 2; // Si el ancho de la pantalla es menor a 1024px, muestra 2 slides
    }

    setSlides(slidesToShow);
  };
  return (
    <>
      <div className="headerVideo">
        <video id="videoheader" src={video} autoPlay loop controls> </video>
          <div className="areaswiper">
        <Swiper
         spaceBetween={10}
         slidesPerView={slides}
         navigation
         pagination={{ clickable: true }}
         className="mySwiper"
        >
          <SwiperSlide className="swiper-slide-header">
            <img src={props.img} alt=""></img>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-header">
            <img src={props.img} alt=""></img>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-header">
            <img src={props.img} alt=""></img>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-header">
            <img src={props.img} alt=""></img>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-header">
            <img src={props.img} alt=""></img>
          </SwiperSlide>
        </Swiper>
        </div>
       
      </div>
    </>
  );
}
