import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MasVistos } from "../cardsMasVistos/masVistos";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/cardVermas.css";
import { listarUltimosCincoEspeciales } from "../../api/peliculasListar";
import { Link } from "react-router-dom";
//import { listarPeliculas } from "../../api/peliculasListar";
//import imgPel from "../../assets/img/2.jpg";
import de1 from "../../assets/img/ber.jpeg";

SwiperCore.use([Navigation, Pagination]);

export function SwiperEspeciales(props) {
  const { location } = props;
  const [listarPel, setListPeliculas] = useState(null);

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

  const obtenerPeliculas = () => {
    try {
      listarUltimosCincoEspeciales("especiales")
        .then((response) => {
          const { data } = response;
          console.log(data);
          if (!listarPel && data) {
            const datosPel = formatModelPeliculas(data);
            setListPeliculas(datosPel);
          } else {
            const datosPel = formatModelPeliculas(data);
            setListPeliculas(datosPel);
            console.log("especiales" + datosPel);
          }
        })
        .catch((e) => { });
    } catch (e) { }
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
      slidesToShow = 4; // Si el ancho de la pantalla es menor a 768px, muestra solo 1 slide
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
              {listarPel &&
                listarPel.map((peliculas, index) => (
                  <SwiperSlide
                    className="swiper-slide"
                    //descomentarear para var el indice
                    //data-slide-number={index + 1}
                    key={peliculas.id}
                  >
                    <Link to={`/epecialguela?id=${peliculas.id}`}>
                      <MasVistos
                        img1={screenResolution > 750 ? peliculas.urlPortada : peliculas.urlPortadaMovil}
                        nombre={peliculas.titulo}
                        duracion={peliculas.duracion}
                      //des={peliculas.sinopsis}
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
      urlPortadaMovil: data.urlPortadaMovil
    });
  });
  return dataTemp;
}
