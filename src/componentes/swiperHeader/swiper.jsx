import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiper.css";
import "../../css/cardHeader.css";
//imagenes
import de1 from "../../assets/img/51FIC01.jpg";

SwiperCore.use([Pagination, Autoplay]);

export function SwiperHeader(props) {
  //imagen aleatoria
  // Array de imágenes aleatorias
  const [showPoster, setShowPoster] = useState(true);
  const randomImages = [
    de1,
    
    // Agrega aquí más nombres de imágenes
  ];
  const [randomIndex, setRandomIndex] = useState(0);
  useEffect(() => {
    const videoElement = document.getElementById("videoheader");

    if (videoElement) {
      setRandomIndex(Math.floor(Math.random() * randomImages.length));
      videoElement.poster = randomImages[randomIndex];
      setTimeout(() => {
        setShowPoster(false);
      }, 9000);
    }
  }, []);

  const videoStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  const posterStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    opacity: showPoster ? 1 : 0, // Oculta la imagen de vista previa cuando showPoster es falso
  };

  const randomSlides = [
    {
      src: "https://www.mxtvmas.com:8443/mimexico/series/cervantino/Imperdibles.mp4",
      poster: randomImages[0],
    },
    /*{
      src: "https://www.mxtvmas.com:8443/mimexico/series/conciertos/concierto2.mp4",
      poster: randomImages[1],
    },
    {
      src: "https://www.mxtvmas.com:8443/mimexico/peliculas/trazos.mp4",
      poster: randomImages[0],
    },
    {
      src: "https://www.mxtvmas.com:8443/mimexico/series/pueblosMagicos/magico.mp4",
      poster: randomImages[1],
    },*/
    // Agrega más objetos de slide aquí
  ];

  const [currentSlides, setCurrentSlides] = useState(
    randomSlides.sort(() => Math.random() - 0.5)
  );

  return (
    <>
      <Swiper
        navigation
        pagination={{ clickable: true }}
        //autoplay={{ delay: 9000 }}
        speed={1000}
        effect="flip" // Utiliza el efecto de transición "flip"
        flipEffect={{
          slideShadows: false, // Desactiva las sombras en los lados
          limitRotation: true, // Limita la rotación a 90 grados
        }}
        className="mySwiperHeader"
        
      >
        {currentSlides.map((slide, index) => (
        <SwiperSlide className="swiper-slide-header2">
          <div className="headerVideo">
            <video
              id="videoheader"
              //src={slide.src}
              src="https://www.mxtvmas.com:8443/mimexico/series/cervantino/Imperdibles.mp4"
              autoPlay
              playsinline
              loop
              muted
              className={`video-element ${showPoster ? "show-poster" : ""}`}
              style={videoStyle}
            ></video>

            <img src={de1} alt="Poster" style={posterStyle} />
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
      
    </>
  );
}
