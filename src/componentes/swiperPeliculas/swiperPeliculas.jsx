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

export function SwiperPeliculas(props) {
  const { location } = props;
  const [listarPel, setListPeliculas] = useState(null);

  const obtenerPeliculas = () => {
    try {
      listarPeliculas()
        .then((response) => {
          const { data } = response;

          if (!listarPel && data) {
            setListPeliculas(formatModelPeliculas(data));
          } else {
            const datosPel = formatModelPeliculas(data);
            setListPeliculas(datosPel);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerPeliculas();
  }, [location]);

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

          <Swiper
            spaceBetween={10}
            slidesPerView={slides}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            {listarPel &&
              listarPel.map((pelicula) => (
                <SwiperSlide className="swiper-slide" key={pelicula.id}>
                  <CardsUser
                    img1={imgPel}
                    actores={pelicula.actores}
                    anio={pelicula.año}
                    calificacion={pelicula.calificacion}
                    director={pelicula.director}
                    disponibilidad={pelicula.disponibilidad}
                    duracion={pelicula.duracion}
                    estado={pelicula.estado}
                    genero={pelicula.genero}
                    sinopsis={pelicula.sinopsis}
                    titulo={pelicula.titulo}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
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
      genero: data.genero,
      actores: data.actores,
      director: data.director,
      duracion: data.duracion,
      sinopsis: data.sinopsis,
      calificacion: data.calificacion,
      año: data.año,
      disponibilidad: data.disponibilidad,
      estado: data.estado,
    });
  });
  return dataTemp;
}
