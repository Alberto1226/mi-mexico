import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MasVistos } from "../cardsMasVistos/masVistos";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/cardVermas.css";
import { listarSeriesMasVistas } from "../../api/series";
import { Link } from "react-router-dom";


SwiperCore.use([Navigation, Pagination]);

export function SwiperMasVistosSer(props) {
  const { location } = props;
  const [listarSer, setListSeries] = useState([]);

  const obtenerSeries = () => {
    try {
        listarSeriesMasVistas()
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

  console.log(listarSer)

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
              {/* Agrega tus SwiperSlides aquí */}
              {listarSer &&
                listarSer.map((serie, index) => (
                  <SwiperSlide
                    className="swiper-slide"
                    data-slide-number={index + 1}
                    key={serie.id}
                  >
                    <Link to={`/full?id=${serie.id}&titulo=${serie.titulo}`} >
                    <MasVistos
                      img1={serie.urlPortada}
                      nombre={serie.titulo}
                      duracion={serie.duracion}
                      des={serie.sinopsis}
                    />
                    </Link>
                  </SwiperSlide>
                ))}
              {/* ... Agrega el resto de los slides */}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

function formatModelSeries(data) {
    const dataTemp = [];
    data.forEach((data) => {
      dataTemp.push({
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
      });
    });
    return dataTemp;
  }