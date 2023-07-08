import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { listarSeries, obtenerSeries, actualizarContadorSeries } from "../../api/series";
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

SwiperCore.use([Pagination, Autoplay]);
export function FullScrean(props) {
  const locations = useLocation();
  const { id } = queryString.parse(locations.search);

  const { location } = props;
  const [listarSer, setListSeries] = useState([]);

  const aumentarContador = () => {
    try {
      // console.log(data)
      obtenerSeries(id).then(response => {
        const { data } = response;
        console.log(data)
        const dataTemp = {
          contador: parseInt(data.contador) + 1
        }
        actualizarContadorSeries(id, dataTemp).then(response => {
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
  }, [location]);

  const registrarHistorial = () => {
    try {
      // console.log(data)
      obtenerSeries(id).then(response => {
        const { data } = response;
        console.log(data)
        const dataTemp = {
          id_usuario: obtenidusuarioLogueado(getTokenApi()),
          id_reproduccion: data._id,
          nombre_reproduccion: data.titulo,
          tipo: "serie",
          url_reproduccion: data.urlTrailer
        }
        registraHistorialUsuario(dataTemp).then(response => {
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
    registrarHistorial();
  }, [location]);


  const obtenerSerie = () => {
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
            //console.log(filteredSer);
          }
        })
        .catch((e) => { });
    } catch (e) { }
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
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerCapitulos();
  }, [location]);
  return (
    <>
      {listarSer &&
        listarSer.map((series) => (
          <div key={series.id}>
            <video id="videoheader" src={video} autoPlay loop controls></video>
            <div className="informacionserie">
              <h6 className="tituloSerie">{series.titulo}</h6>
              <h6 className="sinopsis">{series.sinopsis}</h6>

              <h6 className="añoserie">{series.año}</h6>

            </div>
            <hr />
            {Array.isArray(series.datosTemporada) &&
              series.datosTemporada.map((temporada) => (
                <div key={temporada.temporada} className="temporadasslide">
                  <h6 className="añoserie">Temporada {temporada.temporada}</h6>
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
                          <SwiperSlide
                            key={capitulo.nombre}
                            className="swiper-slide"
                          >
                            <Link to={`/fullCap?id=${capitulo.id}&capitulo=${capitulo.serie}&temporada=${capitulo.temporada}`} img={"datos"}>
                              <CardHeader
                                img1={capitulo.urlPortada}
                                nombre={capitulo.nombre}
                                duracion={capitulo.duracion}
                                des={capitulo.descripcion}
                              />
                            </Link>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  ) : (
                    <p>No hay capítulos disponibles</p>
                  )}
                </div>
              ))}
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
