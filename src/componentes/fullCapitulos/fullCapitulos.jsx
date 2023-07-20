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
  const { temporada } = queryString.parse(locations.search);
  const { capitulo } = queryString.parse(locations.search);//igual al id de la serie

  const { location } = props;
 
    //listar todos los capitulos de la teporada
  const [listarCap, setListCap] = useState([]);

  const obtenerCapitulos = () => {
    try {
      listarCapitulosSeries(capitulo)
        .then((response) => {
          const { data } = response;

          if (!listarCap && data) {
            setListCap(formatModelCapitulos(data));
            console.log(data);
          } else {
            const datosCap = formatModelCapitulos(data);
            const filteredCap = datosCap.filter(
              (item) => item.temporada == temporada
            );

            setListCap(filteredCap);
            console.log(filteredCap);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerCapitulos();
  }, [location]);

  //listar capitulo
  const [listarCap2, setListCap2] = useState([]);
  const [listarCap3, setListCap3] = useState([]);

  const obtenerCapitulos2 = () => {
    try {
      listarCapitulosSeries(capitulo)
        .then((response) => {
          const { data } = response;

          if (!listarCap2 && data) {
            setListCap2(formatModelCapitulos(data));
            console.log(data);
          } else {
            const datosCap2 = formatModelCapitulos(data);
            const filteredCap2 = datosCap2.filter((item) => item.id == id);

            setListCap2(filteredCap2);
            console.log(filteredCap2);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerCapitulos2();
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
 
  /**
 * 
 * actualizar componente
 */
const [capituloSeleccionado, setCapituloSeleccionado] = useState(capitulo);

useEffect(() => {
  setCapituloSeleccionado(capitulo);
  

}, []);
const miFuncion = () => {
  window.location.reload();
};


const obtenerCapitulos3 = (capitulo) => {
  try {
    listarCapitulosSeries(capitulo)
      .then((response) => {
        const { data } = response;

        if (!listarCap3 && data) {
          setListCap2(formatModelCapitulos(data));
          console.log(data);
        } else {
          const datosCap3 = formatModelCapitulos(data);
          const filteredCap3 = datosCap3.filter((item) => item.id == id);

          setListCap3(filteredCap3);
          console.log(filteredCap3);
          
        }
      })
      .catch((e) => {});
  } catch (e) {}
};



useEffect(() => {
  obtenerCapitulos3(capituloSeleccionado);

}, [location, capituloSeleccionado]);
  return (
    
      <>
      
        {listarCap2 &&
          listarCap2.map((cap) => (
            <div key={cap.id}>
              <video id="videoheader" src={cap.urlCapitulo} autoPlay loop controls></video>
              <div className="informacionserie">
                <h6 className="tituloSerie">{cap.nombre}</h6>
                <h6 className="sinopsis">{cap.descripcion}</h6>
                <h6 className="añoserie">{cap.duracion}</h6>
              </div>
            </div>
          ))}
        <Swiper
          spaceBetween={10}
          slidesPerView={slides}
          navigation
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {listarCap &&
          listarCap.map((tem) => (
          <SwiperSlide key={tem.id} className="swiper-slide" onClick={miFuncion}>
            <Link
              to={`/fullCap?id=${tem.id}&capitulo=${tem.serie}&temporada=${tem.temporada}`}
              img={"datos"}
              onClick={() => setCapituloSeleccionado(tem.capitulo)}
            >
              <CardHeader
                img1={tem.urlPortada}
                nombre={tem.nombre}
                duracion={tem.duracion}
                des={tem.descripcion}
              />
            </Link>
          </SwiperSlide>
           ))}
        </Swiper>
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
