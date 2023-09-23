import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { listarSeries } from "../../api/series";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiper.css";
import "../../css/cardHeader.css";
import { CardHeader } from "../cardsHeader/cardsHeader";
import { listarCapitulosSeries, actualizarContadorCapitulos, obtenerCapitulosSeries } from "../../api/capitulosSeries";
import { Link } from "react-router-dom";
import { listarPatrocinadoresPrioridad, actualizarPatrocinadores, obtenerPatrocinador } from "../../api/patrocinadores";
import { FullNav } from "../navcompleto/navCompleto";
import { SwiperPatrocinadores } from "../swiperPatrocinadores/swPatrocinadores";
import { FooterApp } from "../footer/footer";

SwiperCore.use([Pagination, Autoplay]);
export function FullCapitulos(props) {
  const locations = useLocation();
  const { id } = queryString.parse(locations.search);
  const { temporada } = queryString.parse(locations.search);
  const { capitulo } = queryString.parse(locations.search); //igual al id de la serie
  const [contadorActual, setContadorActual] = useState(0);

  const { location } = props;

  const aumentarContador = () => {
    try {
      // console.log(data)
      obtenerCapitulosSeries(id).then(response => {
        const { data } = response;
        console.log(data)
        const dataTemp = {
          contador: parseInt(data.contador) + 1
        }
        actualizarContadorCapitulos(id, dataTemp).then(response => {
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
  //listar todos los capitulos de la teporada
  const [listarCap, setListCap] = useState([]);
  const [matchedIndex, setMatchedIndex] = useState(0);

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
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerCapitulos();
  }, [location]);

  //listar capitulo
  const [listarCap2, setListCap2] = useState([
    { id: "", urlVideo: "", nombre: "", descripcion: "", duracion: "" },
  ]);
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

            // Check if there is a match in the filtered data
            if (datosCap2.length > 0) {
              // Get the index of the first match in the filtered data
              const matchIndex = datosCap2.findIndex((data) => data.id === id);

              // Store the index in a variable (e.g., matchedIndex)
              // You need to declare the state variable for matchedIndex using useState before using it here.
              setMatchedIndex(matchIndex);
            } else {
              // No match found
              setMatchedIndex(-1);
            }

            setListCap2(datosCap2);
          }
        })
        .catch((e) => { });
    } catch (e) { }
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
            setListCap3(formatModelCapitulos(data));
            console.log(data);
          } else {
            const datosCap3 = formatModelCapitulos(data);
            const filteredCap3 = datosCap3.filter((item) => item.id == id);

            setListCap3(filteredCap3);
            console.log(filteredCap3);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerCapitulos3(capituloSeleccionado);
  }, [location, capituloSeleccionado]);

  const handleNextVideo = () => {
    // Increment the matchedIndex to show the next video
    setMatchedIndex((prevIndex) => (prevIndex + 1) % listarCap2.length);
  };

  const totalVistas = listarCap.reduce((amount, item) => (amount + parseInt(item.contador)), 0);
  const media = totalVistas / listarCap.length;
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


  useEffect(() => {
    window.scrollTo(0, 0); // Mueve la página al inicio
  }, []);

  const [show, setShow] = useState(true);

  const cerrarVentanaFlotante = () => {
    setShow(false);
  };
  return (
    <>
      <FullNav />
      {listarCap2 && (
        <div key={listarCap2[matchedIndex].id ?? ""}>
          <video
            ref={videoRef}
            id="videofull"
            src={
              listarCap2[matchedIndex].urlCapitulo == undefined
                ? ""
                : listarCap2[matchedIndex].urlCapitulo
            }
            autoPlay

            controls
            width={"100%"} height={"100%"}
          ></video>

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

          <div className="informacionserie">
            <h6 className="tituloSerie"><button onClick={handleNextVideo} className="nextvideo2">Next Video <FontAwesomeIcon icon={faArrowRight} /></button>
              {listarCap2[matchedIndex].nombre == undefined
                ? ""
                : listarCap2[matchedIndex].nombre}
            </h6>
            <h6 className="sinopsis">
              {listarCap2[matchedIndex].descripcion == undefined
                ? ""
                : listarCap2[matchedIndex].descripcion}
            </h6>
            <h6 className="añoserie">
              {listarCap2[matchedIndex].duracion == undefined
                ? ""
                : listarCap2[matchedIndex].duracion}
            </h6>
          </div>

        </div>
      )}

      <Swiper
        spaceBetween={20}
        slidesPerView={slides}
        navigation
        pagination={{ clickable: true }}
        className="mySwiper"
      >

        {listarCap &&
          listarCap.map((tem) => (
            <SwiperSlide
              key={tem.id}
              className="swiper-slide"
              onClick={miFuncion}
            >
              <Link
                to={`/fullCap?id=${tem.id}&capitulo=${tem.serie}&temporada=${tem.temporada}`}
                img={"datos"}
                onClick={() => setCapituloSeleccionado(tem.capitulo)}
              >
                <CardHeader
                  img1={tem.urlPortada}
                  //nombre={tem.nombre}
                  duracion={tem.duracion}
                //des={tem.descripcion}
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>

      {/**footer */}
      <FooterApp />
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
