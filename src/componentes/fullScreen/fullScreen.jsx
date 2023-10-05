import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Modal from "react-bootstrap/Modal";
import { listarSeries, obtenerSeries, actualizarContadorSeries } from "../../api/series";
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
import { listarPatrocinadoresPrioridad, actualizarPatrocinadores, obtenerPatrocinador } from "../../api/patrocinadores";

SwiperCore.use([Pagination, Autoplay]);
export function FullScrean(props) {
  const locations = useLocation();
  const { id } = queryString.parse(locations.search);
    const [contadorActual, setContadorActual] = useState(0);

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

  const totalVistas = listarSer.reduce((amount, item) => (amount + parseInt(item.contador)), 0);
  const media = totalVistas / listarSer.length;
  function redondearDecimal(numero) {
    return numero < 0.5 ? Math.floor(numero) : Math.ceil(numero);
  }

  console.log(media)
  console.log(redondearDecimal(media))
  console.log(totalVistas)
  console.log(contadorActual)

  const [listarPatrocinadores, setListPatrocinadores] = useState([]);

  const obtenerPatrocinadoresPrioritarios = () => {
    try {
      listarPatrocinadoresPrioridad("1")
        .then((response) => {
          const { data } = response;

          if (!listarPatrocinadores && data) {
            setListPatrocinadores(formatModelPatrocinadores(data));
          } else {
            const datosPel = formatModelPatrocinadores(data);
            setListPatrocinadores(datosPel);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  const obtenerPatrocinadoresNoPrioritarios = () => {
    try {
      listarPatrocinadoresPrioridad("0")
        .then((response) => {
          const { data } = response;

          if (!listarPatrocinadores && data) {
            setListPatrocinadores(formatModelPatrocinadores(data));
          } else {
            const datosPel = formatModelPatrocinadores(data);
            setListPatrocinadores(datosPel);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    if (contadorActual >= redondearDecimal(media)) {
      obtenerPatrocinadoresPrioritarios()
    } 
    else {
      obtenerPatrocinadoresNoPrioritarios()
    }
  }, [media]);

  const patrocinadoresPagados = listarPatrocinadores.filter(patrocinador => parseInt(patrocinador.numeroApariciones) >= 0);

  console.log(patrocinadoresPagados)

  function generarNumeroAleatorio(minimo, maximo) {
    // Genera un número aleatorio entre 0 y 1 (no incluido)
    return Math.floor(Math.random() * (maximo - minimo)) + minimo;

    // Redondea el número si es necesario (opcional)
    // const numeroRedondeado = Math.round(numeroEnRango);
  }

  console.log(patrocinadoresPagados.length)

  // Ejemplo de uso:
  let numeroAleatorio = 0;
  numeroAleatorio = generarNumeroAleatorio(0, patrocinadoresPagados.length); // Genera un número entre 1 y 10 (incluyendo 1, excluyendo 10)
  console.log(numeroAleatorio);

  const disminuirCantidadApariciones = () => {
    try {
      // console.log(data)
      obtenerPatrocinador(patrocinadoresPagados[numeroAleatorio]?.id).then(response => {
        const { data } = response;
        console.log(data)
        const dataTemp = {
          numeroApariciones: parseInt(data.numeroApariciones) - 1
        }
        actualizarPatrocinadores(patrocinadoresPagados[numeroAleatorio]?.id, dataTemp).then(response => {
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
    disminuirCantidadApariciones();
  }, [numeroAleatorio]);

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



  //modal
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    window.scrollTo(0, 0); // Mueve la página al inicio
  }, []);

  const cerrarVentanaFlotante = () => {
    setShow(false);
  };
  return (
    <>
      <FullNav />
      {listarSer &&
        listarSer.map((series) => (
          <div key={series.id}>
            <video id="videofull" src={series.urlTrailer} autoPlay loop controls width={"100%"} height={"100%"}></video>
            <div className="informacionserie">
              <h6 className="tituloSerie">{series.titulo}</h6>
              <h6 className="sinopsis" 
              dangerouslySetInnerHTML={{
                
                __html:series.sinopsis
                
                
              }}
              ></h6>

              <h6 className="añoserie">{series.año}</h6>

            </div>


            <div>
              {show && (
                <div
                  style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    width: '200px', // Ancho deseado del recuadro
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    zIndex: 9999,
                  }}
                >
                  <button
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      border: 'none',
                    }}
                    onClick={cerrarVentanaFlotante}
                  >
                    X
                  </button>
                  <div style={{ padding: '10px' }}>
                  <h2>Patrocinador oficial</h2>
                  <img
                    src={
                      patrocinadoresPagados[numeroAleatorio]?.urlImagen == undefined
                        ? ''
                        : patrocinadoresPagados[numeroAleatorio]?.urlImagen
                    }
                    alt="Patrocinador"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
                </div>
              )}
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
                        <a key={capitulo.nombre} img={"datos"}>
                          <Link to={`/fullCap?id=${capitulo.id}&capitulo=${capitulo.serie}&temporada=${capitulo.temporada}`} img={"datos"}>
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

      {/**footer */}
      <section class="link">
        <div class="patrocinadores">
          <SwiperPatrocinadores />
        </div>
      </section>

      <FooterApp />
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
      contador: data.contador,
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

function formatModelPatrocinadores(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      nombre: data.nombre,
      urlImagen: data.urlImagen,
      urlWeb: data.urlWeb,
      urlFacebook: data.urlFacebook,
      urlInstagram: data.urlInstagram,
      urlTwitter: data.urlTwitter,
      nivel: data.nivel,
      estado: data.estado,
      numeroApariciones: data.numeroApariciones,
      prioridadAparicion: data.prioridadAparicion
    });
  });
  return dataTemp;
}
