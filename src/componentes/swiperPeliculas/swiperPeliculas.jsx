import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardsUser } from "../cardsPeliculas/cardsPeliculas";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiperCards.css";
import { listarPeliculas } from "../../api/peliculasListar";
import imgPel from "../../assets/img/2.jpg";
import imgPel1 from "../../assets/img/3.jpg";
import imgPel2 from "../../assets/img/4.png";
SwiperCore.use([Navigation, Pagination]);

export function SwiperPeliculas(props) {
  const { location } = props;
  const [listarPel, setListPeliculas] = useState(null);

  
    const obtenerPeliculas = ()=>{
      try {
        listarPeliculas()
          .then((response) => {
            const { data } = response;
            
            if (!listarPel && data) {
              setListPeliculas(formatModelPeliculas(data));
              console.log(data);
            } else {
              const datosPel = formatModelPeliculas(data);
              setListPeliculas(datosPel);
              console.log(datosPel);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    }
    
    useEffect(() => {
      obtenerPeliculas();
  }, [location]);

  /*useEffect(() => {
    try {
      listarPeliculas().then(response=>{
        const { data } = response;
  
        if (!listarPel && data) {
          setListPeliculas(formatModelPeliculas(data));
          console.log(data);
        } else {
          const datosLog = formatModelPeliculas(data);
         
          setListPeliculas(datosLog);
          console.log(datosLog);
        }
      })
    }catch(e){
      console.log(e)
    } 
  });*/

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
    let slidesToShow = 4; // Número predeterminado de slides a mostrar

    if (screenWidth < 768) {
      slidesToShow = 1; // Si el ancho de la pantalla es menor a 768px, muestra solo 1 slide
    } else if (screenWidth < 1024) {
      slidesToShow = 2; // Si el ancho de la pantalla es menor a 1024px, muestra 2 slides
    }

    setSlides(slidesToShow);
  };

  return (
    <>
      <section className="main-container">
        <div className="location" id="home">
          <h4 id="home">{props.titulo}</h4>

          <Swiper
            spaceBetween={10}
            slidesPerView={slides}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            <SwiperSlide className="swiper-slide">
              <CardsUser img1={imgPel} />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <CardsUser img1={imgPel1} />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <CardsUser img1={imgPel2} />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <CardsUser img1={imgPel} />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <CardsUser img1={imgPel2} />
            </SwiperSlide>
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
      genero: data.genero,
      actores: data.actores,
      director: data.director,
      duracion: data.duracion,
      sinopsis: data.sinopsis,
      calificacion: data.calificacion,
      año: data.año,
      disponibilidad: data.disponibilidad,
      estado: data.estado,
    });
    
  });
  return dataTemp;
  
}
