//componentes
import { NavPrincipal } from "../../componentes/navBar/nav";
import { SwiperHeader } from "../../componentes/swiperHeader/swiper";
import { SwiperPeliculas } from "../../componentes/swiperPeliculas/swiperPeliculas";
import { FooterApp } from "../../componentes/footer/footer";
import { SwiperPatrocinadores } from "../../componentes/swiperPatrocinadores/swPatrocinadores"
import { Load } from "../../componentes/load/load";
import { SwiperMasVistos } from "../../componentes/swiperMasVistos/swMasvistos";
import { VerMas } from "../../componentes/vermas/vermas";
import { VerMasD } from "../../componentes/vermasDocumentales/verMasDocumentales";
import { VerMasP } from "../../componentes/vermasPeliculas/vermasPeliculas";
import { ResultadoBusqueda } from "../../componentes/resultadoBusqueda/resultadoBusqueda";
import { LoadVideo } from "../../componentes/loadVideo/loadVideo";
import { SwiperPatrocinadoresN2 } from "../../componentes/swiperPartocinadorNivel2/swiperNivel2";
import { SwiperPatrocinadoresN3 } from "../../componentes/swiperPatNivel3/swiperNivel3";
import { SwiperPeliculasRecomendadas } from "../../componentes/swiperRecomendado/swiperRecomendados";
import imgSwiper from '../../assets/img/1.png'
import '../../css/header.css'
import '../../css/cards.css'
import '../../css/cardPatconiadores.css'
import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listarSeries } from "../../api/series";
import { listarPeliculas } from "../../api/peliculasListar";


export function Home() {

  const [listarDocumentales, setListDocumentales] = useState([]);

  const obtenerDocumentales = () => {
    try {
      listarPeliculas("documentales")
        .then((response) => {
          const { data } = response;

          if (!listarDocumentales && data) {
            setListDocumentales(formatModelPeliculas(data));
          } else {
            const datosDoc = formatModelPeliculas(data);
            setListDocumentales(datosDoc);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerDocumentales();
  }, []);

  const [listarPelicula, setListPelicula] = useState([]);

  const obtenerPeliculas = () => {
    try {
      listarPeliculas("peliculas")
        .then((response) => {
          const { data } = response;

          if (!listarPelicula && data) {
            setListPelicula(formatModelPeliculas(data));
          } else {
            const datosPel = formatModelPeliculas(data);
            setListPelicula(datosPel);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerPeliculas();
  }, []);

  const [listarSer, setListSeries] = useState([]);

  const obtenerSeries = () => {
    try {
      listarSeries()
        .then((response) => {
          const { data } = response;

          if (!listarSer && data) {
            setListSeries(formatModelSeries(data));
            console.log(data);
          } else {
            const datosSer = formatModelSeries(data);
            setListSeries(datosSer);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerSeries();
  }, []);

  return (
    <>
      <LoadVideo />
      <div>
        <ToastContainer />
        <NavPrincipal
          listarDocumentales={listarDocumentales}
          listarPeliculas={listarPelicula}
          listarSeries={listarSer}
        />
        <SwiperHeader img={imgSwiper} />
        <hr />
        <SwiperPeliculasRecomendadas titulo={"Recomendados"} />
        <hr />
        <section class="link">
          <div class="patrocinadores">
            <SwiperPatrocinadores />
          </div>
        </section>
        <hr />
        <SwiperMasVistos />
        <hr />
        <SwiperPeliculas titulo={"Lo mas visto"} />
        <hr />
        <section class="link">
          <div class="patrocinadores">
            <SwiperPatrocinadoresN2 />
          </div>
        </section>
        <hr />
        <SwiperPeliculas titulo={"Favoritos"} />
        <hr />
        <SwiperHeader img={imgSwiper} />
        <hr />
        {/**
        <SwiperPeliculas titulo={"Mas"}/>
        <SwiperPeliculas titulo={""}/>
        <SwiperPeliculas titulo={""}/>
        <SwiperPeliculas titulo={""}/>
        <SwiperPeliculas titulo={""}/> */}
        <h4 id="home">Ver mas Series</h4>
        <VerMas />

        <h4 id="home">Ver mas Peliculas</h4>
        <VerMasP />

        <h4 id="home">Ver mas Documentales</h4>
        <VerMasD />

        <h4 id="home">Resultado de la busqueda</h4>
        <ResultadoBusqueda />

        <section class="link">
          <div class="patrocinadores">
            <SwiperPatrocinadoresN3 />
          </div>
        </section>
        <FooterApp />

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
    });
  });
  return dataTemp;
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
      urlVideo: data.urlTrailer,
      urlPortada: data.urlPortada,
      seccion: data.seccion,
      estado: data.estado,
    });
  });
  return dataTemp;
}
