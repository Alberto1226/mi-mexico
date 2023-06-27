import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiper.css";
import "../../css/cardHeader.css"
import video from "../../assets/videos/intro.mp4";
import { CardsUser } from "../cardsPeliculas/cardsPeliculas";
import {CardHeader} from "../cardsHeader/cardsHeader"
import { listarPeliculas } from "../../api/peliculasListar";
//imagenes
import de1 from "../../assets/img/ber.jpeg";
import de2 from "../../assets/img/chi.jpeg";
import de3 from "../../assets/img/oax.jpeg";
import de4 from "../../assets/img/teq.jpeg";
import de5 from "../../assets/img/que.jpeg";

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
  const randomIndex = Math.floor(Math.random() * randomImages.length);
  useEffect(() => {
    

    

    const videoElement = document.getElementById('videoheader');

    if (videoElement) {
      videoElement.poster = randomImages[randomIndex];
      setTimeout(() => {
        setShowPoster(false);
      }, 1000);
    }
  }, []);
  /**listar peliculas */
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
            const filteredPel = datosPel.filter(
              (data) => data.recomendado === "1"
            );
            setListPeliculas(filteredPel);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerPeliculas();
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
        
        <div className="areaswiper">
          
        </div>
      </div>
    </>
  );
}


