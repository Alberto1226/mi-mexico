import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import {
  listarSeriesEspeciales,
  obtenerSeriesEspeciales,
  actualizarContadorSeriesEspeciales,
} from "../../api/seriesEspeciales";
import video from "../../assets/videos/intro.mp4";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiper.css";
import "../../css/cardHeader.css";
import { CardHeader } from "../cardsHeader/cardsHeader";
import { listarCapitulosSeries } from "../../api/capitulosSeries";
import { registraHistorialUsuario } from "../../api/historialUsuarios";
import { getTokenApi, obtenidusuarioLogueado } from "../../api/auth";
import { Link } from "react-router-dom";
import { FullNav } from "../navcompleto/navCompleto";
import { SwiperPatrocinadores } from "../swiperPatrocinadores/swPatrocinadores";
import { FooterApp } from "../footer/footer";
import { Helmet } from "react-helmet";
import Regresar from "../regresar/Regresar";
import { Stream } from "@cloudflare/stream-react";

SwiperCore.use([Pagination, Autoplay]);
export function FullScreanSeriesEspeciales(props) {
  console.log("🚀 ~ FullScreanSeriesEspeciales ~ props:", props)
  const locations = useLocation();
  const { id } = queryString.parse(locations.search);

  const { location } = props;
  const [listarSer, setListSeries] = useState([]);
  console.log("🚀 ~ FullScreanSeriesEspeciales ~ listarSer:", listarSer);

  const aumentarContador = () => {
    try {
      // console.log(data)
      obtenerSeriesEspeciales(id)
        .then((response) => {
          const { data } = response;
          console.log("🚀 ~ .then ~ data:", data)
          console.log(data);
          const dataTemp = {
            contador: parseInt(data.contador) + 1,
          };
          actualizarContadorSeriesEspeciales(id, dataTemp)
            .then((response) => {
              // console.log(response)
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    aumentarContador();
  }, [location]);

  const registrarHistorial = () => {
    try {
      // console.log(data)
      obtenerSeriesEspeciales(id)
        .then((response) => {
          const { data } = response;
          console.log(data);
          const dataTemp = {
            id_usuario: obtenidusuarioLogueado(getTokenApi()),
            id_reproduccion: data._id,
            nombre_reproduccion: data.titulo,
            tipo: "serie",
            url_reproduccion: data.urlTrailer,
          };
          registraHistorialUsuario(dataTemp)
            .then((response) => {
              // console.log(response)
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    registrarHistorial();
  }, [location]);

  const obtenerSerie = () => {
    try {
      listarSeriesEspeciales()
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
            //console.log(filteredSer);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerSerie();
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

  useEffect(() => {
    window.scrollTo(0, 0); // Mueve la página al inicio
  }, []);
  return (
    <>
      <Helmet>
        <title>Especiales</title>
        <link rel="canonical" href="https://mimexicotv.com/" />
      </Helmet>
      <FullNav />
      {/**nuevo */}
      {listarSer &&
        listarSer.map((series) => (
          <div key={series.id}>
            <Stream id="videofull" src={series.urlTrailer} controls />
            <video
              style={{ display: "none" }}
              id="videofull"
              src={series.urlTrailer}
              autoPlay
              loop
              controls
              width={"100%"}
              height={"100%"}
            ></video>
            <div className="informacionserie">
              <h6 className="tituloSerie">{series.titulo}</h6>
              <div
                className="fuentecervantino"
                dangerouslySetInnerHTML={{ __html: series.sinopsis || "" }}
              />
              <h6 className="añoserie">Año de lanzamineto: {series.año}</h6>
            </div>
            <hr />
            {Array.isArray(series.datosTemporada) &&
              series.datosTemporada.map((temporada) => {
                // Filtrar las temporadas que tienen capítulos
                const capitulosTemporada = listarCap.filter(
                  (capitulo) => capitulo.temporada === temporada.temporada
                );
                if (capitulosTemporada.length > 0) {
                  return (
                    <div key={temporada.temporada} className="temporadasslide">
                      <h6 className="añoserie">
                        Temporada {temporada.temporada}
                      </h6>
                      {Array.isArray(listarCap) && listarCap.length > 0 ? (
                        <Swiper
                          spaceBetween={10}
                          slidesPerView={slides}
                          navigation
                          pagination={{ clickable: true }}
                          className="mySwiper"
                        >
                          {listarCap
                            .filter(
                              (capitulo) =>
                                capitulo.temporada === temporada.temporada
                            )
                            .map((capitulo) => (
                              <a key={capitulo.nombre} img={"datos"}>
                                <Link
                                  to={`/capitulos?id=${capitulo.id}&capitulo=${capitulo.serie}&temporada=${capitulo.temporada}`}
                                  img={"datos"}
                                >
                                  <img
                                    className="imgVermas"
                                    src={capitulo.urlPortada}
                                    alt=""
                                  />
                                </Link>
                              </a>
                            ))}
                        </Swiper>
                      ) : (
                        <p>No hay capítulos disponibles</p>
                      )}
                    </div>
                  );
                }
                return null; // No se renderiza si no hay capítulos
              })}
          </div>
        ))}
      {/**<iframe width="100%" height="700px" src="https://www.youtube.com/embed/Bg01tyI0rWs?si=kzUCiL7HjwQcaQHo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
      <FooterApp />
      <Regresar />
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
      contador: data.contador,
      urlPortada: data.urlPortada,
      urlTrailer: data.urlTrailer,
      seccion: data.seccion,
      estado: data.estado,
      patrocinador: data.patrocinador,
      patrocinadorPortada: data.patrocinadorPortada,
    });
  });
  return dataTemp;
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
