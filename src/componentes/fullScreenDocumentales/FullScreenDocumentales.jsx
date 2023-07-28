import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { listarPeliculas, obtenerPeliculas, actualizarContadorPeliculas } from "../../api/peliculasListar";
import video from "../../assets/videos/intro.mp4";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiper.css";
import "../../css/cardHeader.css";
import { registraHistorialUsuario } from "../../api/historialUsuarios";
import { getTokenApi, obtenidusuarioLogueado } from "../../api/auth";
import {FullNav} from "../navcompleto/navCompleto";

SwiperCore.use([Pagination, Autoplay]);
export function FullDocumentales(props) {
  const locations = useLocation();
  const [listarPel, setListPeliculas] = useState([{id: "", urlVideo: "", titulo: "", sinopsis: "", duracion: ""}]);
  const [matchedIndex, setMatchedIndex] = useState(0);
  const { id } = queryString.parse(locations.search);

  const { location } = props;

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

  //listar capitulos
  const obtenerPelicula = () => {
    try {
      listarPeliculas("documentales")
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
          tipo: "documental",
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

  return (
    <>
      <FullNav />
      {listarPel.length > 0 && (
        <div key={listarPel[matchedIndex].id ?? ""}>
          <video id="videoheader" src={listarPel[matchedIndex].urlVideo == undefined ? "" : listarPel[matchedIndex].urlVideo} autoPlay loop controls></video>
          <div className="informacionserie">
            <h6 className="tituloSerie">{listarPel[matchedIndex].titulo == undefined ? "" : listarPel[matchedIndex].titulo}</h6>
            <h6 className="sinopsis">{listarPel[matchedIndex].sinopsis == undefined ? "" : listarPel[matchedIndex].sinopsis}</h6>
            <h6 className="añoserie">{listarPel[matchedIndex].duracion == undefined ? "" : listarPel[matchedIndex].duracion}</h6>
          </div>
          <button onClick={handleNextVideo}>Next Video</button>
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
    });
  });
  return dataTemp;
}
