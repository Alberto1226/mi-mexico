import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { CardPatrocinadores } from "../cardsPatrocinadores/cardPatrocinador";

import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import imgPatro from '../../assets/img/PMnegro.png';


SwiperCore.use([Navigation, Pagination, Autoplay]);

export function SwiperPatrocinadores() {
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
    let slidesToShow = 7; // Número predeterminado de slides a mostrar

    if (screenWidth < 768) {
      slidesToShow = 3; // Si el ancho de la pantalla es menor a 768px, muestra solo 1 slide
    } else if (screenWidth < 1024) {
      slidesToShow = 5; // Si el ancho de la pantalla es menor a 1024px, muestra 2 slides
    }

    setSlides(slidesToShow);
  };

  return (
    <>
      <hr/>
        <div className="location" id="home">
          <h4 id="home">Patrocinadores</h4>

          <Swiper
            spaceBetween={10}
            slidesPerView={slides}
            navigation
            
            autoplay={{
              delay: 500,
              loop: true,
              disableOnInteraction: false,
            }}
           
            className="mySwiperPatrocinadores"
          >
            <SwiperSlide className="swiper-slide1">
              <CardPatrocinadores imgpa={imgPatro}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide1">
              <CardPatrocinadores imgpa={imgPatro}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide1">
              <CardPatrocinadores imgpa={imgPatro}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide1">
              <CardPatrocinadores imgpa={imgPatro}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide1">
              <CardPatrocinadores imgpa={imgPatro}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide1">
              <CardPatrocinadores imgpa={imgPatro}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide1">
              <CardPatrocinadores imgpa={imgPatro}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide1">
              <CardPatrocinadores imgpa={imgPatro}/>
            </SwiperSlide>
          </Swiper>
        </div>
      
    </>
  );
}
