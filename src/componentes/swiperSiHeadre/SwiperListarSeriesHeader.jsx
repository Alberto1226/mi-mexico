import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardsUser } from "../cardsPeliculas/cardsPeliculas";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiperCards.css";
import { listarSeries } from "../../api/series";
import imgPel from "../../assets/img/2.jpg";
import { CardsSeries } from "../cardsPeliculas/cardSeries";

SwiperCore.use([Navigation, Pagination]);

export function SwiperHeaderSel(props) {
  const { location } = props;
  const [listarSer, setListSeries] = useState([]);

  const [screenResolution, setScreenResolution] = useState(window.innerWidth);

  // Función para actualizar la resolución cuando cambia el tamaño de la ventana
  const updateScreenResolution = () => {
    setScreenResolution(window.innerWidth);
  };

  // Agregar un event listener para actualizar la resolución cuando cambia el tamaño de la ventana
  useEffect(() => {
    window.addEventListener('resize', updateScreenResolution);

    // Limpieza del event listener cuando se desmonta el componente
    return () => {
      window.removeEventListener('resize', updateScreenResolution);
    };
  }, []);

  const obtenerSeries = () => {
    try {
      listarSeries()
        .then((response) => {
          const { data } = response;

          if (!listarSer && data) {
            setListSeries(formatModelSeries(data));
            console.log(data);
          } else {
            const datosSer = formatModelSeries(data);
            setListSeries(datosSer);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerSeries();
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
      slidesToShow = 3; // Si el ancho de la pantalla es menor a 768px, muestra solo 1 slide
    } else if (screenWidth < 1024) {
      slidesToShow = 3; // Si el ancho de la pantalla es menor a 1024px, muestra 2 slides
    }

    setSlides(slidesToShow);
  };

  return (
    <>
      <section className="main-container">
        <div className="location" id="home">
          <h1 id="home">{props.titulo}</h1>

          <Swiper
            spaceBetween={20}
            slidesPerView={slides}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            {listarSer &&
              listarSer.map((pelicula) => (
                <SwiperSlide className="swiper-slide" key={pelicula.id}>
                  <CardsSeries
                    id={pelicula.id}
                    img1={screenResolution > 750 ? pelicula.urlPortada : pelicula.urlPortadaMovil}
                    urlVideo={pelicula.urlTrailer}
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

function formatModelSeries(data) {
    const filteredData = data.filter((item) => item.header === "1");
    
    const dataTemp = filteredData.map((data) => ({
      id: data._id,
      titulo: data.titulo,
      categorias: data.categorias,
      actores: data.actores,
      director: data.director,
      duracion: data.duracion,
      sinopsis: data.sinopsis,
      calificacion: data.calificacion,
      datosTemporada: data.datosTemporada,
      año: data.año,
      disponibilidad: data.disponibilidad,
      masVisto: data.masVisto,
      recomendado: data.recomendado,
      urlPortada: data.urlPortada,
      seccion: data.seccion,
      estado: data.estado,
      header: data.header,
      patrocinador: data.patrocinador,
      urlTrailer: data.urlTrailer,
      patrocinadorPortada: data.patrocinadorPortada,
      urlPortadaMovil: data.urlPortadaMovil,
    }));
    
    return dataTemp;
  }
  