import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState, useRef } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { listarPeliculas, obtenerPeliculas, actualizarContadorPeliculas } from "../../api/peliculasListar";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiper.css";
import "../../css/cardHeader.css";
import { registraHistorialUsuario } from "../../api/historialUsuarios";
import { getTokenApi, obtenidusuarioLogueado } from "../../api/auth";
import { FullNav } from "../navcompleto/navCompleto";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import { SwiperPatrocinadores } from "../swiperPatrocinadores/swPatrocinadores";
import { FooterApp } from "../footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { listarPatrocinadoresPrioridad, actualizarPatrocinadores, obtenerPatrocinador } from "../../api/patrocinadores";
import { RecomendadosCat } from "../swiperCategoria/swCategoriaRecomendada";
import { Helmet } from "react-helmet";
import www from "../../assets/img/www.png";
import facebook from "../../assets/img/facebook.png";

SwiperCore.use([Pagination, Autoplay]);
export function FullPeliculas(props) {
  const locations = useLocation();
  const history = useNavigate();
  const [listarPel, setListPeliculas] = useState([{ id: "", urlVideo: "", titulo: "", sinopsis: "", duracion: "" }]);
  const [matchedIndex, setMatchedIndex] = useState(0);
  const [contadorActual, setContadorActual] = useState(0);
  const { id } = queryString.parse(locations.search);

  const { location } = props;

  /**landscape */
  const toggleFullScreen = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }
    }
  };
  /**fin */

  /**regresar */
  useEffect(() => {
    const handleBackButton = (event) => {
      // Tu lógica de navegación aquí
      // Por ejemplo, puedes utilizar react-router o cambiar de ruta manualmente
       history.push('/');
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);
  /**fin */

  const videoRef = useRef(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    const percentagePlayed = (video.currentTime / video.duration) * 100;

    if (percentagePlayed >= 90) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  };

  const handleFullscreenChange = () => {
    const video = videoRef.current;

    if (document.fullscreenElement || document.webkitFullscreenElement) {
      setShowNextButton(true);
    } else {
      setShowNextButton(true);
    }
  };
  //ver boton
  useEffect(() => {
    const video = videoRef.current;

    video.addEventListener('timeupdate', handleVideoTimeUpdate);

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', handleVideoTimeUpdate);

      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

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

  const obtenerPelicula = () => {
    try {
      listarPeliculas("peliculas")
        .then((response) => {
          const { data } = response;

          if (!listarPel && data) {
            setListPeliculas(formatModelPeliculas(data));
          } else {
            const datosPel = formatModelPeliculas(data);
            console.log(datosPel)
            // Check if there is a match in the filtered data
            if (datosPel.length > 0) {
              // Get the index of the first match in the filtered data
              const matchIndex = datosPel.findIndex((data) => data.id === id);

              // Store the index in a variable (e.g., matchedIndex)
              // You need to declare the state variable for matchedIndex using useState before using it here.
              setMatchedIndex(matchIndex);
            } else {
              // No match found
              setMatchedIndex(-1);
            }

            // Update the state with the filtered data
            setListPeliculas(datosPel);
          }
        })
        .catch((e) => {
          // Handle errors appropriately
        });
    } catch (e) {
      // Handle errors appropriately
    }
  };

  useEffect(() => {
    obtenerPelicula();
  }, []);
  console.log(matchedIndex)

  const totalVistas = listarPel.reduce((amount, item) => (amount + parseInt(item.contador)), 0);
  const media = totalVistas / listarPel.length;
  function redondearDecimal(numero) {
    return numero < 0.5 ? Math.floor(numero) : Math.ceil(numero);
  }
  console.log(media)
  console.log(redondearDecimal(media))
  console.log(totalVistas)
  console.log(contadorActual)
  console.log(listarPel[matchedIndex].id)

  useEffect(() => {
    obtenerPelicula();
  }, []);

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

  console.log(listarPatrocinadores)

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

  const registrarHistorial = () => {
    try {
      // console.log(data)
      obtenerPeliculas(id).then(response => {
        const { data } = response;
        console.log(data)
        setContadorActual(parseInt(data.contador));
        const dataTemp = {
          id_usuario: obtenidusuarioLogueado(getTokenApi()),
          id_reproduccion: data._id,
          nombre_reproduccion: data.titulo,
          tipo: "pelicula",
          url_reproduccion: data.urlVideo
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
  }, []);

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

  const handleNextVideo = () => {
    // Increment the matchedIndex to show the next video
    setMatchedIndex((prevIndex) => (prevIndex + 1) % listarPel.length);
  };



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
    <Helmet>
        <title>Peliculas</title>
        <link rel="canonical" href="https://mimexicotv.com/" />
      </Helmet>
      <FullNav />
      {listarPel.length > 0 && (
        <div key={listarPel[matchedIndex].id ?? ""}>
          <video onClick={toggleFullScreen} ref={videoRef} id="videofull" src={listarPel[matchedIndex].urlVideo == undefined ? "" : listarPel[matchedIndex].urlVideo} autoPlay controls width={"100%"} height={"100%"} ></video>

          <div className="informacionserie">
            <h6 className="tituloSerie">{listarPel[matchedIndex].titulo == undefined ? "" : listarPel[matchedIndex].titulo}<button onClick={handleNextVideo} className="nextvideo2">Next Video <FontAwesomeIcon icon={faArrowRight} /></button></h6>
            <h6 className="sinopsis">{listarPel[matchedIndex].sinopsis == undefined ? "" : listarPel[matchedIndex].sinopsis}</h6>
            <h6 className="añoserie">{listarPel[matchedIndex].duracion == undefined ? "" : listarPel[matchedIndex].duracion}</h6>
          </div>
          {/**patrocinador */}
          <div>
              {show && (
                <div
                  style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    width: "200px", // Ancho deseado del recuadro
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    zIndex: 9999,
                  }}
                >
                  <button
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={cerrarVentanaFlotante}
                  >
                    X
                  </button>

                  <div>
                    <div style={{ padding: "10px" }}>
                      <h6>Patrocinador oficial</h6>
                      <img
                        src={
                          patrocinadoresPagados[numeroAleatorio]?.urlImagen ==
                          undefined
                            ? ""
                            : patrocinadoresPagados[numeroAleatorio]?.urlImagen
                        }
                        alt="Patrocinador"
                        style={{ maxWidth: "100%", height: "80%" }}
                      />
                    </div>
                    <div
                      style={{
                        backgroundColor: "#FDB421",
                        margin: 0,
                        padding: "1vw 1vw 0 0",
                        borderRadius: "2vw 2vw 0 0",
                      }}
                    >
                      <p style={{ fontSize: "10px", textAlign: "center" }}>
                        Redes sociales del patrocinador
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "50%",
                              width: "35px",
                              height: "35px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: "5px",
                              marginLeft: "1vw",
                            }}
                          >
                            <a
                              href={
                                patrocinadoresPagados[numeroAleatorio]
                                  ?.urlWeb == undefined
                                  ? ""
                                  : patrocinadoresPagados[numeroAleatorio]
                                      ?.urlWeb
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={www}
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                              />
                            </a>
                          </div>
                          <p style={{ fontSize: "10px" }}>Web</p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "50%",
                              width: "35px",
                              height: "35px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: "5px",
                            }}
                          >
                            <a
                              href={
                                patrocinadoresPagados[numeroAleatorio]
                                  ?.urlFacebook == undefined
                                  ? ""
                                  : patrocinadoresPagados[numeroAleatorio]
                                      ?.urlFacebook
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src={facebook} />
                            </a>
                          </div>
                          <p style={{ fontSize: "10px" }}>Facebook</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/**fin patrocinador */}
        </div>
      )}

      {/**<h6>Recomendados</h6>
       <RecomendadosCat/>*/}
      <FooterApp />
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
      contador: data.contador,
      urlPortada: data.urlPortada,
      seccion: data.seccion,
      estado: data.estado,
      patrocinador: data.patrocinador,
      patrocinadorPortada: data.patrocinadorPortada,
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
