import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardsUser } from "../cardsPeliculas/cardsPeliculas";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiperCards.css";
import { listarPeliculas } from "../../api/peliculasListar";
import imgPel from "../../assets/img/2.jpg";

SwiperCore.use([Navigation, Pagination]);

export function SwiperFooterCards(props) {
  console.log("HOLA")
  const { location } = props;
  const [listarPel, setListPeliculas] = useState([]);

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
      listarPeliculas("documentales")
        .then((response) => {
          const { data } = response;
          console.log(data);
          if (!listarPel && data) {
            const datosPel = formatModelPeliculas(data);
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
            setListPeliculas(camposRepetidos)

          } else {
            const datosPel = formatModelPeliculas(data);
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
            setListPeliculas(camposRepetidos)
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerPeliculas();
  }, [location]);

  console.log(listarPel)

  const [slides, setSlides] = useState(4); // Número inicial de slides a mostrar

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
      <div className="footerCard">
        <div className="areaswiperFooter">
          <h4 id="home">Sugerencias</h4>
          <Swiper
            spaceBetween={10}
            slidesPerView={slides}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            <SwiperSlide className="swiper-slide-header">
              <CardsUser
                img1={screenResolution > 750 ? listarPel[0]?.urlPortada ?? "" : listarPel[0]?.urlPortadaMovil ?? ""}
                titulo={listarPel[0]?.titulo ?? ""}
                director={listarPel[0]?.director ?? ""}
                anio={listarPel[0]?.año ?? ""}
                duracion={listarPel[0]?.duracion ?? ""}
                genero={listarPel[0]?.categorias[0].categoria ?? ""}
                urlVideo={listarPel[0]?.urlVideo ?? ""}
              />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide-header">
              <CardsUser
                img1={screenResolution > 750 ? listarPel[1]?.urlPortada ?? "" : listarPel[1]?.urlPortadaMovil ?? ""}
                titulo={listarPel[1]?.titulo ?? ""}
                director={listarPel[1]?.director ?? ""}
                anio={listarPel[1]?.año ?? ""}
                duracion={listarPel[1]?.duracion ?? ""}
                genero={listarPel[1]?.categorias[0].categoria ?? ""}
                urlVideo={listarPel[1]?.urlVideo ?? ""}
              />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide-header">
              <CardsUser
                img1={screenResolution > 750 ? listarPel[2]?.urlPortada ?? "" : listarPel[2]?.urlPortadaMovil ?? ""}
                titulo={listarPel[2]?.titulo ?? ""}
                director={listarPel[2]?.director ?? ""}
                anio={listarPel[2]?.año ?? ""}
                duracion={listarPel[2]?.duracion ?? ""}
                genero={listarPel[2]?.categorias[0].categoria ?? ""}
                urlVideo={listarPel[2]?.urlVideo ?? ""}
              />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide-header">
              <CardsUser
                img1={screenResolution > 750 ? listarPel[3]?.urlPortada ?? "" : listarPel[3]?.urlPortadaMovil ?? ""}
                titulo={listarPel[3]?.titulo ?? ""}
                director={listarPel[3]?.director ?? ""}
                anio={listarPel[3]?.año ?? ""}
                duracion={listarPel[3]?.duracion ?? ""}
                genero={listarPel[3]?.categorias[0].categoria ?? ""}
                urlVideo={listarPel[3]?.urlVideo ?? ""}
              />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide-header">
              <CardsUser
                img1={screenResolution > 750 ? listarPel[4]?.urlPortada ?? "" : listarPel[4]?.urlPortadaMovil ?? ""}
                titulo={listarPel[4]?.titulo ?? ""}
                director={listarPel[4]?.director ?? ""}
                anio={listarPel[4]?.año ?? ""}
                duracion={listarPel[4]?.duracion ?? ""}
                genero={listarPel[4]?.categorias[0].categoria ?? ""}
                urlVideo={listarPel[4]?.urlVideo ?? ""}
              />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide-header">
              <CardsUser
                img1={screenResolution > 750 ? listarPel[5]?.urlPortada ?? "" : listarPel[5]?.urlPortadaMovil ?? ""}
                titulo={listarPel[5]?.titulo ?? ""}
                director={listarPel[5]?.director ?? ""}
                anio={listarPel[5]?.año ?? ""}
                duracion={listarPel[5]?.duracion ?? ""}
                genero={listarPel[5]?.categorias[0].categoria ?? ""}
                urlVideo={listarPel[5]?.urlVideo ?? ""}
              />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide-header">
              <CardsUser
                img1={screenResolution > 750 ? listarPel[6]?.urlPortada ?? "" : listarPel[6]?.urlPortadaMovil ?? ""}
                titulo={listarPel[6]?.titulo ?? ""}
                director={listarPel[6]?.director ?? ""}
                anio={listarPel[6]?.año ?? ""}
                duracion={listarPel[6]?.duracion ?? ""}
                genero={listarPel[6]?.categorias[0].categoria ?? ""}
                urlVideo={listarPel[6]?.urlVideo ?? ""}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
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
