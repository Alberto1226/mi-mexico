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
import { CardHeader } from "../cardsHeader/cardsHeader";
import { listarCapitulosSeries } from "../../api/capitulosSeries";
import { Link } from "react-router-dom";

SwiperCore.use([Pagination, Autoplay]);
export function FullCapitulos(props) {
  const locations = useLocation();
  const { id } = queryString.parse(locations.search);

  const { location } = props;
 
   //listar capitulos
   const [listarCap, setListCap] = useState([]);

   const obtenerCapitulos = () => {
     try {
       listarCapitulosSeries(id)
         .then((response) => {
           const { data } = response;
 
           if (!listarCap && data) {
             setListCap(formatModelCapitulos(data));
             console.log(data);
           } else {
             const datosCap = formatModelCapitulos(data);
             const filteredCap = datosCap.filter((data) => data.id === id);
             setListCap(datosCap);
             console.log(datosCap);
           }
         })
         .catch((e) => {});
     } catch (e) {}
   };
 
   useEffect(() => {
     obtenerCapitulos();
   }, [location]);

   //listar temporada de capitulo seleccionado
   const [listartemcap, setListtemcap] = useState([]);

   const listartemcapitulos = () => {
     try {
       listarCapitulosSeries(id)
         .then((response) => {
           const { data } = response;
 
           if (!listartemcap && data) {
             setListCap(formatModelCapitulos(data));
             console.log(data);
           } else {
             const datostem = formatModelCapitulos(data);
             //const filteredCap = datosCap.filter((data) => data.id === id);
             setListtemcap(datostem);
             console.log(datostem);
           }
         })
         .catch((e) => {});
     } catch (e) {}
   };
 
   useEffect(() => {
    listartemcapitulos();
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
      {listarCap &&
        listarCap.map((cap) => (
          <div key={cap.id}>
            <video id="videoheader" src={video} autoPlay loop controls></video>
            <div className="informacionserie">
            <h6 className="tituloSerie">{cap.nombre}</h6>
            <h6 className="sinopsis">{cap.descripcion}</h6>
            <h6 className="añoserie">{cap.duracion}</h6>
            </div>
            
          </div>
        ))}
    </>
  );
}


function formatModelCapitulos(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      serie: data.serie,
      temporada: data.temporada,
      nombre: data.nombre,
      urlCapitulo: data.urlCapitulo,
      urlPortada: data.urlPortada,
      duracion: data.duracion,
      descripcion: data.descripcion,
      estado: data.estado,
    });
  });
  return dataTemp;
}
