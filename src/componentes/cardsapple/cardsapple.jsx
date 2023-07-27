import React, { useEffect, useState } from 'react';
import '../../css/apple.css';
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiperCards.css";
import {SwiperPeliculasRecomendadas} from "../swiperRecomendado/swiperRecomendados";
import { CardHeader } from "../cardsHeader/cardsHeader";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { listarPeliculas } from "../../api/peliculasListar";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, Pagination]);


export function Apple(props) {


const marquees = Array.from(document.querySelectorAll(".marquee"));

class Marquee {
  constructor({ el }) {
    this.el = el;
    this.marqueeAnimation = [
      { transform: "translateX(0)" },
      { transform: `translateX(calc(-100% - var(--gap,0)))` }
    ];

    this.marqueeTiming = {
      duration: this.el.dataset.duration * 10000,
      direction: this.el.dataset.reverse ? "reverse" : "normal",
      iterations: Infinity
    };
    this.animations = [];
    this.SLOWDOWN_RATE = 0.2;
    this.cloneMarqueeGroup();
    this.init();
  }

  init() {
    for (const m of this.marquee__groups) {
      let q = m.animate(this.marqueeAnimation, this.marqueeTiming);

      this.animations.push(q);
    }

    this.initEvents();
  }
  slowDownAnimations() {
    for (const a of this.animations) {
      a.playbackRate = this.SLOWDOWN_RATE;
    }
  }
  resumeAnimationSpeed() {
    for (const a of this.animations) {
      a.playbackRate = true;
    }
  }
  initEvents() {
    this.el.addEventListener("mouseenter", () => this.slowDownAnimations());
    this.el.addEventListener("mouseleave", () => this.resumeAnimationSpeed());
  }

  cloneMarqueeGroup() {
    let clone = this.el.querySelector(".marquee__group").cloneNode(true);
    clone.classList.add("clone");
    this.el.appendChild(clone);
    this.marquee__groups = Array.from(
      this.el.querySelectorAll(".marquee__group")
    );
  }
}

for (const m of marquees) new Marquee({ el: m });

    const { location } = props;
    const [listarPel, setListPeliculas] = useState(null);
  
    const obtenerPeliculas = () => {
      try {
        listarPeliculas("peliculas")
          .then((response) => {
            const { data } = response;
            //console.log(data);
            if (!listarPel && data) {
              setListPeliculas(formatModelPeliculas(data));
              //console.log(data);
            } else {
              const datosPel = formatModelPeliculas(data);
              const filteredPel = datosPel.filter(
                  (data) => data.recomendado === "1"
                );
              setListPeliculas(datosPel);
            }
          })
          .catch((e) => {});
      } catch (e) {}
    };
  
    useEffect(() => {
      obtenerPeliculas();
    }, [location]);
  
    //const [slides, setSlides] = useState(4); // Número inicial de slides a mostrar
  
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
      
        <section className="marquees__wrapper">
        <center><h4 id="home">{props.titulo}</h4></center>
          <div className="marquee" data-duration="5" data-reverse="true">
          <div className="marquee__group">
              {/* ... (Marquee content for the first marquee) */}
              {listarPel &&
              listarPel.map((pelicula) => (
              <div class="item">
                <Link to={`/fullPel?id=${pelicula.id}`} >
                <CardHeader img1={pelicula.urlPortada}/>
                </Link>
               </div>
             ))}
            </div>
        </div>
          
          <div className="marquee" data-duration="7">
            <div className="marquee__group">
              {/* ... (Marquee content for the third marquee) */}
              {listarPel &&
              listarPel.map((pelicula) => (
              <div class="item">
                <Link to={`/fullPel?id=${pelicula.id}`} >
                <CardHeader img1={pelicula.urlPortada}/>
                </Link>
               </div>
             ))}
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
      });
    });
    return dataTemp;      
}
