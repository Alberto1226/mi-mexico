import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { listarSeries } from "../../api/series";
import video from "../../assets/videos/intro.mp4";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiper.css";
import "../../css/cardHeader.css";
import {CardHeader} from "../cardsHeader/cardsHeader"
SwiperCore.use([Pagination, Autoplay]);
export function FullScrean(props) {
  const locations = useLocation();
  const { id } = queryString.parse(locations.search);

  const { location } = props;
  const [listarSer, setListSeries] = useState([]);

  const obtenerSeries = () => {
    try {
      listarSeries()
        .then((response) => {
          const { data } = response;

          if (!listarSer && data) {
            setListSeries(formatModelSeries(data));
           // console.log(data);
          } else {
            const datosSer = formatModelSeries(data);

            //console.log(data);
            const filteredSer = datosSer.filter((data) => data.id === id);
            setListSeries(filteredSer);
            console.log(filteredSer);
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
      slidesToShow = 2; // Si el ancho de la pantalla es menor a 768px, muestra solo 1 slide
    } else if (screenWidth < 1024) {
      slidesToShow = 3; // Si el ancho de la pantalla es menor a 1024px, muestra 2 slides
    }

    setSlides(slidesToShow);
  };

  return (
    <>
     {listarSer &&
              listarSer.map((series) => (
      <div key={series.id}>          
      <div className="headerVideo" >
        <video id="videoheader" src={video} autoPlay loop controls></video>
        <div className="areaswiper"> 
         <h6>{series.titulo}</h6>
         <h6>{series.sinopsis}</h6>
        

         <h6>{series.año}</h6>
         <h6>{series.categorias}</h6>
        

        </div>
       
      </div>
        <h6>{series.datosTemporada.temporada}</h6>
        <Swiper
            spaceBetween={10}
            slidesPerView={slides}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            <SwiperSlide className="swiper-slide-header">
              <CardHeader />
            </SwiperSlide>      
          </Swiper>
      </div>
      ))}
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
