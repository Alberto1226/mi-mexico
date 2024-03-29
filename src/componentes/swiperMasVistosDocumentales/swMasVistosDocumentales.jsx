import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MasVistos } from "../cardsMasVistos/masVistos";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/cardVermas.css";
import { listarPeliculasMasVista } from "../../api/peliculasListar";
import { Link } from "react-router-dom";

//import { listarPeliculas } from "../../api/peliculasListar";
//import imgPel from "../../assets/img/2.jpg";
import de1 from "../../assets/img/ber.jpeg";

SwiperCore.use([Navigation, Pagination]);

export function SwiperMasVistosDoc(props) {
  const { location } = props;
  const [listarPel, setListPeliculas] = useState([]);
  const [camposRepetidos, setCamposRepetidos] = useState([]);

  const [screenResolution, setScreenResolution] = useState(window.innerWidth);

  // Función para actualizar la resolución cuando cambia el tamaño de la ventana
  const updateScreenResolution = () => {
    setScreenResolution(window.innerWidth);
  };

  // Agregar un event listener para actualizar la resolución cuando cambia el tamaño de la ventana
  useEffect(() => {
    window.addEventListener('resize', updateScreenResolution);

    // Limpieza del event listener cuando se desmonta el componente
    return () => {
      window.removeEventListener('resize', updateScreenResolution);
    };
  }, []);

  const obtenerPeliculas = () => {
    try {
      listarPeliculasMasVista("documentales")
        .then((response) => {
          const { data } = response;
          console.log(data);
          if (!listarPel && data) {
            const datosPel = formatModelPeliculas(data);
            setListPeliculas(datosPel);
            const propiedad = "categoria";

            // Objeto para realizar el conteo de ocurrencias
            const conteo = {};

            // Recorrer el array principal
            for (let i = 0; i < datosPel.length; i++) {
              const objeto = datosPel[i];
              console.log(objeto)

              // Recorrer los campos JSON dentro de campoArray
              for (let j = 0; j < objeto.categorias.length; j++) {
                const campo = objeto.categorias[j];
                console.log(campo)

                // Verificar si la propiedad existe en el campo
                if (propiedad in campo) {
                  const valor = campo[propiedad];
                  if (valor in conteo) {
                    conteo[valor].push(objeto);
                  } else {
                    conteo[valor] = [objeto];
                  }
                }
              }
            }

            const camposRepetidos = [];
            for (const valor in conteo) {
              if (conteo[valor].length > 1) {
                camposRepetidos.push(...conteo[valor]);
              }
            }

            // Imprimir la lista de campos repetidos
            console.log("Lista de campos repetidos:");
            console.log(camposRepetidos);
            setCamposRepetidos(camposRepetidos)

          } else {
            const datosPel = formatModelPeliculas(data);
            setListPeliculas(datosPel);
            const propiedad = "categoria";

            // Objeto para realizar el conteo de ocurrencias
            const conteo = {};

            // Recorrer el array principal
            for (let i = 0; i < datosPel.length; i++) {
              const objeto = datosPel[i];
              console.log(objeto)

              // Recorrer los campos JSON dentro de campoArray
              for (let j = 0; j < objeto.categorias.length; j++) {
                const campo = objeto.categorias[j];
                console.log(campo)

                // Verificar si la propiedad existe en el campo
                if (propiedad in campo) {
                  const valor = campo[propiedad];
                  if (valor in conteo) {
                    conteo[valor].push(objeto);
                  } else {
                    conteo[valor] = [objeto];
                  }
                }
              }
            }

            const camposRepetidos = [];
            for (const valor in conteo) {
              if (conteo[valor].length > 1) {
                camposRepetidos.push(...conteo[valor]);
              }
            }

            // Imprimir la lista de campos repetidos
            console.log("Lista de campos repetidos:");
            console.log(camposRepetidos);
            setCamposRepetidos(camposRepetidos)
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerPeliculas();
  }, []);

  console.log(camposRepetidos)

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

  return (
    <>
      <section className="main-container">
        <div className="location" id="home">
          <h1 id="home">{props.titulo}</h1>

          <div className="swiper-container">
            <Swiper
              spaceBetween={20}
              slidesPerView={slides}
              navigation
              pagination={{
                clickable: true,
              }}
            >
              {/* Agrega tus SwiperSlides aquí */}
              {listarPel &&
                listarPel.map((peli, index) => (
                  <SwiperSlide
                    key={peli.id}
                    className="swiper-slide"
                    data-slide-number={index + 1}
                  >
                    <Link to={ `/documentales?id=${peli.id}&titulo=${peli.titulo}&id2=${peli.id}`} >
                      <MasVistos
                        img1={screenResolution > 750 ? peli.urlPortada : peli.urlPortadaMovil}
                        nombre={peli.titulo}
                        duracion={peli.duracion}
                        des={peli.sinopsis}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              {/* ... Agrega el resto de los slides */}
            </Swiper>
          </div>
        </div>
      </section>
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
      urlPortadaMovil: data.urlPortadaMovil
    });
  });
  return dataTemp;
}
