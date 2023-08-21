import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
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
import { listarUltimosCincoEspeciales } from "../../api/peliculasListar";

SwiperCore.use([Pagination, Autoplay]);
export function GuelaguetzaFull(props) {
  const locations = useLocation();
  const [listarPel, setListPeliculas] = useState([{id: "", urlVideo: "", titulo: "", sinopsis: "", duracion: ""}]);
  const [matchedIndex, setMatchedIndex] = useState(0);
  const { id } = queryString.parse(locations.search);

  const { location } = props;



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
        listarUltimosCincoEspeciales("especiales")
        .then((response) => {
          const { data } = response;
  
          if (!listarPel && data) {
            setListPeliculas(formatModelPeliculas(data));
          } else {
            const datosPel = formatModelPeliculas(data);
  
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
  }, [location]);
  console.log(matchedIndex)

  const registrarHistorial = () => {
    try {
      // console.log(data)
      obtenerPeliculas(id).then(response => {
        const { data } = response;
        console.log(data)
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

  const handleNextVideo = () => {
    // Increment the matchedIndex to show the next video
    setMatchedIndex((prevIndex) => (prevIndex + 1) % listarPel.length);
  };



  //modal
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <FullNav />
      
      
      
      {listarPel.length > 0 && (
        <div key={listarPel[matchedIndex].id ?? ""}>
          <video  ref={videoRef} id="videoheader" src={listarPel[matchedIndex].urlVideo == undefined ? "" : listarPel[matchedIndex].urlVideo} autoPlay controls></video>
        <button onClick={handleNextVideo} className="nextvideo">Next Video</button>
          <div className="informacionserie">
            <h6 className="tituloSerie">{listarPel[matchedIndex].titulo == undefined ? "" : listarPel[matchedIndex].titulo}</h6>
            <h6 className="sinopsis">{listarPel[matchedIndex].sinopsis == undefined ? "" : listarPel[matchedIndex].sinopsis}</h6>
            <h6 className="añoserie">{listarPel[matchedIndex].duracion == undefined ? "" : listarPel[matchedIndex].duracion}</h6>
          </div>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Patrocinador oficial</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src={listarPel[matchedIndex].patrocinadorPortada == undefined ? "" : listarPel[matchedIndex].patrocinadorPortada} /></Modal.Body>
        
      </Modal>
        </div>
        
      )}
     
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
      patrocinador: data.patrocinador,
      patrocinadorPortada: data.patrocinadorPortada,
    });
  });
  return dataTemp;
}
