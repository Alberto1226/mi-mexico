import React, { useEffect, useState } from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import "./img.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardsUser } from "../cardsPeliculas/cardsPeliculas";
//import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../css/swiperCards.css";
import { listarSeries } from "../../api/series";
import imgPel from "../../assets/img/2.jpg";
import { Helmet } from "react-helmet";
import { NavPrincipal } from "../navBar/nav";
import { FullNav } from "../navcompleto/navCompleto";
import { Link } from "react-router-dom";
import Regresar from "../regresar/Regresar";
import { Load } from "../load/load";
import IraInicio from "../iraInicio/IraInicio";



SwiperCore.use([Navigation, Pagination]);
const ListaRecomendados = (props) => {
  const { location } = props;
  const [listarSer, setListSeries] = useState([]);
  const [swiperRef, setSwiperRef] = useState(null);

  const [screenResolution, setScreenResolution] = useState(window.innerWidth);

  // Función para actualizar la resolución cuando cambia el tamaño de la ventana
  const updateScreenResolution = () => {
    setScreenResolution(window.innerWidth);
  };

  // Agregar un event listener para actualizar la resolución cuando cambia el tamaño de la ventana
  useEffect(() => {
    window.addEventListener("resize", updateScreenResolution);

    // Limpieza del event listener cuando se desmonta el componente
    return () => {
      window.removeEventListener("resize", updateScreenResolution);
    };
  }, []);

  /**
   * listar
   */
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
            setListSeries(datosSer);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerSeries();
  }, [location]);
  /**
   * fin listar
   */

//load
const [loading, setLoading] = useState(true);

useEffect(() => {
  // Simula una carga de datos
  setTimeout(() => {
    setLoading(false);
  }, 2000);
}, []);
 
  return (
    <>
    <Helmet>
      <meta name="description" content="Descubre en miMéxicoTv." />
        {listarSer &&
          listarSer.map((pelic, i) => (
            <meta
              key={i}
              name={`Recomendado_${i}`}
              content={pelic.titulo}
            />
          ))}
      </Helmet>
      <Helmet>
      <meta name="description" content="Descubre en miMéxicoTv." />
        {listarSer &&
          listarSer.map((pelic, i) => (
            <meta
              key={i}
              name={pelic.titulo}
              content={pelic.sinopsis}
            />
          ))}
      </Helmet>
    {loading && <Load />}
      <FullNav />
      <section class="main-containernet">
        <div class="location" id="home">
          <h1 id="home">Recomendadas de Mi MéxicoTV</h1>
          <Regresar/>
          <div class="boxnet">
            {listarSer &&
              listarSer.map((pelicula) => (
                <a href="" key={pelicula.id}>
                  <Link to={`/series?id=${pelicula.id}`}>
                    <img
                      className="imgnet"
                      src={
                        screenResolution > 750
                          ? pelicula.urlPortada
                          : pelicula.urlPortadaMovil
                      }
                      alt=""
                    />
                  </Link>
                </a>
              ))}
          </div>
        </div>
      </section>
      
    </>
  );
};

export default ListaRecomendados;

function formatModelSeries(data) {
  const filteredData = data.filter((item) => item.header === "1");

  const dataTemp = filteredData.map((data) => ({
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
    header: data.header,
    patrocinador: data.patrocinador,
    urlTrailer: data.urlTrailer,
    patrocinadorPortada: data.patrocinadorPortada,
    urlPortadaMovil: data.urlPortadaMovil,
  }));

  return dataTemp;
}
