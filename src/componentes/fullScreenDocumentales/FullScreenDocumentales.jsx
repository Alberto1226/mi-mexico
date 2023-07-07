import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { listarPeliculas, obtenerPeliculas, actualizarContadorPeliculas } from "../../api/peliculasListar";
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
export function FullDocumentales(props) {
  const locations = useLocation();
  const [listarPel, setListPeliculas] = useState([]);
  const { id } = queryString.parse(locations.search);

  const { location } = props;

  const aumentarContador = () => {
    try {
      // console.log(data)
      obtenerPeliculas(id).then(response => {
        const { data } = response;
        console.log(data)
        const dataTemp = {
          contador: parseInt(data.contador) + 1
        }
        actualizarContadorPeliculas(id, dataTemp).then(response => {
          // console.log(response)
        }).catch(e => {
          console.log(e)
        })

      }).catch(e => {
        console.log(e)
      })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    aumentarContador();
  }, []);
 
   //listar capitulos
   const obtenerPelicula = () => {
    try {
      listarPeliculas("documentales")
        .then((response) => {
          const { data } = response;

          if (!listarPel && data) {
            setListPeliculas(formatModelPeliculas(data));
          } else {
            const datosPel = formatModelPeliculas(data);
            const filteredpel = datosPel.filter((data) => data.id === id);
            setListPeliculas(filteredpel);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerPelicula();
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
      {listarPel &&
        listarPel.map((pel) => (
          <div key={pel.id}>
            <video id="videoheader" src={video} autoPlay loop controls></video>
            <div className="informacionserie">
            <h6 className="tituloSerie">{pel.titulo}</h6>
            <h6 className="sinopsis">{pel.sinopsis}</h6>
            <h6 className="añoserie">{pel.duracion}</h6>
            </div>
            
          </div>
        ))}
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
      });
    });
    return dataTemp;
  }
