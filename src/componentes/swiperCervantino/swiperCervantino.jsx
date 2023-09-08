import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MasVistos } from "../cardsMasVistos/masVistos";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/cardVermas.css";
import { listarUltimosCincoSeriesEspeciales } from "../../api/seriesEspeciales";
import { Link } from "react-router-dom";
//import { listarPeliculas } from "../../api/peliculasListar";
//import imgPel from "../../assets/img/2.jpg";
import de1 from "../../assets/img/ber.jpeg";

SwiperCore.use([Navigation, Pagination]);

export function SwiperCervantino(props) {
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
      listarUltimosCincoSeriesEspeciales()
        .then((response) => {
          const { data } = response;
          console.log(data);
          if (!listarPel && data) {
            const datosPel = formatModelPeliculas(data);
            setListPeliculas(datosPel);
          } else {
            const datosPel = formatModelPeliculas(data);
            setListPeliculas(datosPel);
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
              spaceBetween={30}
              slidesPerView={slides}
              navigation
              pagination={{
                clickable: true,
              }}
            >
              {listarPel &&
                listarPel.map((peli, index) => (
                  <>
                    <SwiperSlide
                      className="swiper-slide"
                    >
                      <Link to={`/fullSeriesEspeciales?id=${peli?.id}&titulo=${peli?.titulo}`}>
                        <MasVistos
                          img1={screenResolution > 750 ? peli.urlPortada5 : peli.urlPortadaMovil5}
                          nombre={peli.titulo}
                          duracion={peli.duracion}
                        //des={peli.sinopsis} 
                        />
                      </Link>
                    </SwiperSlide>
                    <SwiperSlide
                      className="swiper-slide"
                    >
                      <Link to={`/fullSeriesEspeciales?id=${peli.id}&titulo=${peli.titulo}`}>
                        <MasVistos
                          img1={screenResolution > 750 ? peli.urlPortada4 : peli.urlPortadaMovil4}
                          nombre={peli.titulo}
                          duracion={peli.duracion}
                        //des={peli.sinopsis}
                        />
                      </Link>
                    </SwiperSlide>
                    <SwiperSlide
                      className="swiper-slide"
                    >
                      <Link to={`/fullSeriesEspeciales?id=${peli.id}&titulo=${peli.titulo}`}>
                        <MasVistos
                          img1={screenResolution > 750 ? peli.urlPortada3 : peli.urlPortadaMovil3}
                          nombre={peli.titulo}
                          duracion={peli.duracion}
                        //des={peli.sinopsis}
                        />
                      </Link>
                    </SwiperSlide>
                    <SwiperSlide
                      className="swiper-slide"
                    >
                      <Link to={`/fullSeriesEspeciales?id=${peli.id}&titulo=${peli.titulo}`}>
                        <MasVistos
                          img1={screenResolution > 750 ? peli.urlPortada2 : peli.urlPortadaMovil2}
                          nombre={peli.titulo}
                          duracion={peli.duracion}
                        //des={peli.sinopsis}
                        />
                      </Link>
                    </SwiperSlide>
                    <SwiperSlide
                      className="swiper-slide"
                    >
                      <Link to={`/fullSeriesEspeciales?id=${peli.id}&titulo=${peli.titulo}`}>
                        <MasVistos
                          img1={screenResolution > 750 ? peli.urlPortada : peli.urlPortadaMovil}
                          nombre={peli.titulo}
                          duracion={peli.duracion}
                        //des={peli.sinopsis}
                        />
                      </Link>
                    </SwiperSlide>
                  </>
                ))}
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
      sinopsis: data.sinopsis,
      calificacion: data.clasificacion,
      datosTemporada: data.datosTemporada,
      año: data.año,
      disponibilidad: data.disponibilidad,
      masVisto: data.masVisto,
      header: data.header,
      recomendado: data.recomendado,
      urlPortada: data.urlPortada,
      urlTrailer: data.urlTrailer,
      contador: data.contador,
      seccion: data.seccion,
      estado: data.estado,
      urlPortada2: data.urlPortada2,
      urlPortada3: data.urlPortada3,
      urlPortada4: data.urlPortada4,
      urlPortada5: data.urlPortada5,
      urlPortadaMovil: data.urlPortadaMovil,
      urlPortadaMovil2: data.urlPortadaMovil2,
      urlPortadaMovil3: data.urlPortadaMovil3,
      urlPortadaMovil4: data.urlPortadaMovil4,
      urlPortadaMovil5: data.urlPortadaMovil5,
    });
  });
  return dataTemp;
}
