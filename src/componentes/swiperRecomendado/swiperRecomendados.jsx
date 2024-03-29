import React, { useEffect, useState } from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardsUser } from "../cardsPeliculas/cardsPeliculas";
//import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../css/swiperCards.css";
import { listarPeliculas } from "../../api/peliculasListar";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faHouse,
  faUser,
  faArrowDown,
  faSearch,
  faPersonCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

SwiperCore.use([Navigation, Pagination]);

export function SwiperPeliculasRecomendadas(props) {
  const { location } = props;
  const [listarPel, setListPeliculas] = useState(null);
  const [swiperRef, setSwiperRef] = useState(null);
  const [screenResolution, setScreenResolution] = useState(window.innerWidth);

  // Función para actualizar la resolución cuando cambia el tamaño de la ventana
  const updateScreenResolution = () => {
    setScreenResolution(window.innerWidth);
  };

  // Agregar un event listener para actualizar la resolución cuando cambia el tamaño de la ventana
  useEffect(() => {
    window.addEventListener("resize", updateScreenResolution);

    // Limpieza del event listener cuando se desmonta el componente
    return () => {
      window.removeEventListener("resize", updateScreenResolution);
    };
  }, []);

  const obtenerPeliculas = () => {
    try {
      listarPeliculas("peliculas")
        .then((response) => {
          const { data } = response;
          //console.log(data);
          if (!listarPel && data) {
            setListPeliculas(formatModelPeliculas(data));
            //console.log(data);
          } else {
            const datosPel = formatModelPeliculas(data);
            const filteredPel = datosPel.filter(
              (data) => data.recomendado === "1"
            );
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
      <div>
        <Helmet>
          <meta name="description" content="Recomendadas en miMéxicoTv." />
          {listarPel &&
            listarPel.map((pelic, i) => (
              <meta
                key={i}
                name={`Recomendaciones_${i}`}
                content={pelic.titulo}
              />
            ))}
        </Helmet>
      </div>
      <section className="main-container">
        <div className="location" id="home">
          <a href="/recomendadosMiMexico">
            
          </a>
         
          <h1 id="home">{props.titulo}
            <button className="ver-mas-button">
           
              +
              </button>
            </h1>
          

          <Swiper
            spaceBetween={20}
            slidesPerView={slides}
            navigation={true}
            virtual
            onSwiper={setSwiperRef}
            pagination={{
              type: "fraction",
            }}
            modules={[Virtual, Navigation, Pagination]}
            className="mySwiper"
          >
            {listarPel &&
              listarPel.map((pelicula) => (
                <SwiperSlide className="swiper-slide" key={pelicula.id}>
                  <CardsUser
                    img1={
                      screenResolution > 750
                        ? pelicula.urlPortada
                        : pelicula.urlPortadaMovil
                    }
                    urlVideo={pelicula.urlVideo}
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
      urlPortadaMovil: data.urlPortadaMovil,
    });
  });
  return dataTemp;
}
