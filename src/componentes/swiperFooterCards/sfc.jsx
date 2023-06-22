import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardsUser } from "../cardsPeliculas/cardsPeliculas";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiperCards.css";
import { listarPeliculas } from "../../api/peliculasListar";
import imgPel from "../../assets/img/2.jpg";

SwiperCore.use([Navigation, Pagination]);

export function SwiperFooterCards(props) {
    const { location } = props;
    const [listarPel, setListPeliculas] = useState(null);
  
    const obtenerPeliculas = () => {
      try {
        listarPeliculas()
          .then((response) => {
            const { data } = response;
  
            if (!listarPel && data) {
              setListPeliculas(formatModelPeliculas(data));
              console.log(data);
            } else {
              const datosPel = formatModelPeliculas(data);
              const filteredPel = datosPel.filter(data => data.recomendado === '1');
              setListPeliculas(filteredPel);
              console.log(filteredPel);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      obtenerPeliculas();
    }, [location]);


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
        <div className="footerCard">

          <div className="areaswiperFooter">
            <h4 id="home">Sugerencias</h4>
            <Swiper
              spaceBetween={10}
              slidesPerView={slides}
              navigation
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              <SwiperSlide className="swiper-slide-header">
                <CardsUser />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide-header">
                <CardsUser />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide-header">
                <CardsUser />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide-header">
                <CardsUser />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide-header">
                <CardsUser />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide-header">
                <CardsUser />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide-header">
                <CardsUser />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </>
   
  );
}

function formatModelPeliculas(data) {
    const dataTemp = [];
    data.forEach((data) => {
      if (data.recomendado === '1') {
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
      }
    });
    return dataTemp;
  }