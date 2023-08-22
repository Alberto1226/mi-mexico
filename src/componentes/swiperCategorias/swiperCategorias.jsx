import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MasVistos } from "../cardsMasVistos/masVistos";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/cardVermas.css";
import { listarUltimosCincoSeriesEspeciales } from "../../api/seriesEspeciales";
import { listarDetallesCategoriasEspeciales } from "../../api/seriesEspeciales";
import { listarDetallesCategoriasPeliculas } from "../../api/peliculasListar";
import { listarDetallesCategoriasSeries } from "../../api/series";
import { listarCategorias } from "../../api/categorias";
import { Link } from "react-router-dom";
//import { listarPeliculas } from "../../api/peliculasListar";
//import imgPel from "../../assets/img/2.jpg";
import de1 from "../../assets/img/ber.jpeg";
import { map } from "lodash"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { VerMas } from "../vermas/vermas";

SwiperCore.use([Navigation, Pagination]);

export function SwiperCategorias(props) {
  const { location } = props;
  const [listarPel, setListPeliculas] = useState([]);
  const [listarDoc, setListDocumentales] = useState([]);
  const [listarEsp, setListEspeciales] = useState([]);
  const [listarSeriesEsp, setListSeriesEsp] = useState([]);
  const [listarSeries, setListSeries] = useState([]);

  const obtenerPeliculas = () => {
    try {
      listarDetallesCategoriasPeliculas("peliculas")
        .then((response) => {
          const { data } = response;
          if (!listarPel && data) {
            const datosPel = formatModelPeliculas(data);
            setListPeliculas(datosPel);
          } else {
            const datosPel = formatModelPeliculas(data);
            setListPeliculas(datosPel);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };



  const obtenerDocumentales = () => {
    try {
      listarDetallesCategoriasPeliculas("documentales")
        .then((response) => {
          const { data } = response;
          if (!listarDoc && data) {
            const datosPel = formatModelPeliculas(data);
            setListDocumentales(datosPel);
          } else {
            const datosPel = formatModelPeliculas(data);
            setListDocumentales(datosPel);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  const obtenerEspeciales = () => {
    try {
      listarDetallesCategoriasPeliculas("especiales")
        .then((response) => {
          const { data } = response;
          if (!listarEsp && data) {
            const datosPel = formatModelPeliculas(data);
            setListEspeciales(datosPel);
          } else {
            const datosPel = formatModelPeliculas(data);
            setListEspeciales(datosPel);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  const obtenerSeriesEspeciales = () => {
    try {
      listarDetallesCategoriasEspeciales()
        .then((response) => {
          const { data } = response;
          if (!listarSeriesEsp && data) {
            const datosPel = formatModelPeliculas(data);
            setListSeriesEsp(datosPel);
          } else {
            const datosPel = formatModelPeliculas(data);
            setListSeriesEsp(datosPel);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  const obtenerSeries = () => {
    try {
      listarDetallesCategoriasSeries()
        .then((response) => {
          const { data } = response;
          if (!listarSeries && data) {
            const datosPel = formatModelPeliculas(data);
            setListSeries(datosPel);
          } else {
            const datosPel = formatModelPeliculas(data);
            setListSeries(datosPel);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  const [listarCat, setListCategorias] = useState([]);

  const obtenerCategorias = () => {
    try {
      listarCategorias()
        .then((response) => {
          const { data } = response;

          if (!listarCat && data) {
            setListCategorias(formatModelCategorias(data));
          } else {
            const datosCat = formatModelCategorias(data);
            setListCategorias(datosCat);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerPeliculas();
    obtenerDocumentales();
    obtenerEspeciales();
    obtenerSeriesEspeciales();
    obtenerSeries();
    obtenerCategorias();
  }, [location]);

  const listaMultimedia = listarPel.concat(listarDoc, listarEsp, listarSeriesEsp, listarSeries);

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
    let slidesToShow = 4; // Número predeterminado de slides a mostrar

    if (screenWidth < 768) {
      slidesToShow = 3; // Si el ancho de la pantalla es menor a 768px, muestra solo 1 slide
    } else if (screenWidth < 1024) {
      slidesToShow = 4; // Si el ancho de la pantalla es menor a 1024px, muestra 2 slides
    }

    setSlides(slidesToShow);
  };

  const [groupedCategories, setGroupedCategories] = useState([]);

  useEffect(() => {
    // Crear el nuevo array de categorías y objetos coincidentes
    const groupedByCategory = [];

    listarCat.forEach(item1 => {
      const matchingItems = listaMultimedia.filter(item2 => item2.categoria === item1.nombre);
      if (matchingItems.length > 0) {
        groupedByCategory.push({
          categoria: item1.nombre,
          objetos: matchingItems,
        });
      }
    });

    setGroupedCategories(groupedByCategory);
  }, [listarCategorias, listaMultimedia]);

  console.log(groupedCategories)



  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
        <section className="main-container">
          <div className="location" id="home">

            <div>
            <ul className="categories-list">
        {groupedCategories.map(group => (
          <li
            key={group.categoria}
            className="category-item"
            onClick={() => setSelectedCategory(group.categoria)}
          >
            <span className="category-name">{group.categoria}</span>
            <FontAwesomeIcon icon={faChevronDown} className="expand-icon" />
          </li>
        ))}
      </ul>
            

            <div className="cards-container">
            <Swiper
              spaceBetween={20}
              slidesPerView={slides}
              navigation
              pagination={{
                clickable: true,
              }}>
        {selectedCategory &&
          groupedCategories.map(group => {
            if (group.categoria === selectedCategory) {
              return group.objetos.map(objeto => (
                <SwiperSlide key={objeto.id} className="swiper-slide-categorias">
                  <MasVistos className="imgcatlis" img1={objeto.urlPortada} nombre={objeto.titulo} />
                  
                </SwiperSlide>
              ));
            }
            return null;
          })}
          </Swiper>
      </div>
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
      id: data.id,
      titulo: data.titulo,
      categoria: data.categoria,
      urlPortada: data.urlPortada,
      urlVideo: data.urlVideo,
    });
  });
  return dataTemp;
}

function formatModelCategorias(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      estado: data.estado,
    });
  });
  return dataTemp;
}
