import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiper.css";
import "../../css/cardHeader.css"

import {CardHeader} from "../cardsHeader/cardsHeader"
import { listarSeries } from "../../api/series";
import { Link } from "react-router-dom";
//imagenes
import de1 from "../../assets/img/portada.png";
import de2 from "../../assets/img/portada.png";
import de3 from "../../assets/img/portada.png";
import de4 from "../../assets/img/portada.png";
import de5 from "../../assets/img/portada.png";


SwiperCore.use([Pagination, Autoplay]);

export function SwiperHeader(props) {
  //imagen aleatoria
  // Array de imágenes aleatorias
  const [showPoster, setShowPoster] = useState(true);
  const randomImages = [
    de1,
    de2,
    de3,
    de4,
    de5,
   
    // Agrega aquí más nombres de imágenes
  ];
  const [randomIndex, setRandomIndex] = useState(0);
  useEffect(() => {
    const videoElement = document.getElementById('videoheader');

    if (videoElement) {
      setRandomIndex(Math.floor(Math.random() * randomImages.length));
      videoElement.poster = randomImages[randomIndex];
      setTimeout(() => {
        setShowPoster(false);
      }, 8200);
    }
  }, []);
  /**listar peliculas */
  const { location } = props;
  const [listarSer, setListSeries] = useState([]);

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
            const filteredSer = datosSer.filter((data) => data.header === "1");
            setListSeries(filteredSer);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerSeries();
  }, [location]);

  
  /**fin de listar */
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
      <div className="headerVideo">
        <video id="videoheader" src={props.videoh}  autoPlay playsinline loop muted className={`video-element ${showPoster ? 'show-poster' : ''}`}  ></video>
        <div className="areaswiper">
          
          <Swiper
            spaceBetween={10}
            slidesPerView={slides}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
          >
             {listarSer &&
              listarSer.map((serie) => (
            <SwiperSlide className="swiper-slide-header" key={serie.id}>
               <Link to={`/full?id=${serie.id}`} img={"datos"}>
              <CardHeader img1={serie.urlPortada}/>
              </Link>
            </SwiperSlide>
           
           ))}
          </Swiper>
        </div>
      </div>
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
      header: data.header,
      recomendado: data.recomendado,
      urlPortada: data.urlPortada,
      seccion: data.seccion,
      estado: data.estado,
    });
  });
  return dataTemp;
}
