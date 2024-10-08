import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MasVistos } from "../cardsMasVistos/masVistos";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/cardVermas.css";

import "../../css/swiper.css";
import "../../css/cardHeader.css";

import c1 from "../../assets/img/especiales/1.jpg";
import c2 from "../../assets/img/especiales/2.jpg";
import c3 from "../../assets/img/especiales/4.jpg";
import c4 from "../../assets/img/especiales/5.jpg";
import c5 from "../../assets/img/especiales/3.jpg";

export function Especiales3(props) {
  const [slides, setSlides] = useState(5); // Número inicial de slides a mostrar

  useEffect(() => {
    calculateSlidesPerView();
    window.addEventListener("resize", calculateSlidesPerView);
    return () => {
      window.removeEventListener("resize", calculateSlidesPerView);
    };
  }, []);

  const calculateSlidesPerView = () => {
    const screenWidth = window.innerWidth;
    let slidesToShow = 5; // Número predeterminado de slides a mostrar

    if (screenWidth < 768) {
      slidesToShow = 2; // Si el ancho de la pantalla es menor a 768px, muestra solo 1 slide
    } else if (screenWidth < 1024) {
      slidesToShow = 3; // Si el ancho de la pantalla es menor a 1024px, muestra 2 slides
    }

    setSlides(slidesToShow);
  };

  return (
    <>
      <section className="main-container">
        <div className="location" id="home">
          <h4 id="home">{props.titulo}</h4>

          <div className="swiper-container">
            <Swiper
              spaceBetween={20}
              slidesPerView={slides}
              navigation
              pagination={{
                clickable: true,
              }}
            >
              <SwiperSlide className="swiper-slide">
                <MasVistos img1={c1} />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <MasVistos img1={c2} />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <MasVistos img1={c3} />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <MasVistos img1={c4} />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <MasVistos img1={c5} />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

function formatModelPeliculas(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      titulo: data.titulo,
      categorias: data.categorias,
      actores: data.actores,
      director: data.director,
      duracion: data.duracion,
      tipo: data.tipo,
      sinopsis: data.sinopsis,
      calificacion: data.calificacion,
      año: data.año,
      disponibilidad: data.disponibilidad,
      masVisto: data.masVisto,
      recomendado: data.recomendado,
      urlVideo: data.urlVideo,
      urlPortada: data.urlPortada,
      seccion: data.seccion,
      estado: data.estado,
    });
  });
  return dataTemp;
}
