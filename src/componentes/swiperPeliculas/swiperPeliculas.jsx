import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import {CardsUser} from '../cardsPeliculas/cardsPeliculas';

import 'swiper/swiper.min.css';
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiperCards.css";

SwiperCore.use([Navigation, Pagination]);

export function SwiperPeliculas() {
  const [slides, setSlides] = useState(4); // Número inicial de slides a mostrar

  useEffect(() => {
    calculateSlidesPerView();
    window.addEventListener('resize', calculateSlidesPerView);
    return () => {
      window.removeEventListener('resize', calculateSlidesPerView);
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
        <section className="main-container">
          <div className="location" id="home">
            <h4 id="home">Peliculas</h4>
           
              <Swiper
                spaceBetween={10}
                slidesPerView={slides}
                navigation
                pagination={{ clickable: true }}
                
                className="mySwiper"
              >
                
                <SwiperSlide className="swiper-slide">
                  <CardsUser />
                </SwiperSlide >
                <SwiperSlide className="swiper-slide">
                  <CardsUser />
                </SwiperSlide >
                <SwiperSlide className="swiper-slide">
                  <CardsUser />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <CardsUser />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <CardsUser />
                </SwiperSlide>
              </Swiper>
            
          </div>
        </section>
      </>
      );
  
}
