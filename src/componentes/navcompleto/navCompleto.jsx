import { NavPrincipal } from "../../componentes/navBar/nav";
import { listarSeries } from "../../api/series";
import { listarPeliculas } from "../../api/peliculasListar";
import { listarSeriesEspeciales } from "../../api/seriesEspeciales";
import React, { useState, useEffect } from "react";
export function FullNav() {
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
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerDocumentales();
  }, []);

  const [listarEspeciales, setListEspeciales] = useState([]);

  const obtenerEspeciales = () => {
    try {
      listarPeliculas("especiales")
        .then((response) => {
          const { data } = response;

          if (!listarEspeciales && data) {
            setListEspeciales(formatModelPeliculas(data));
          } else {
            const datosDoc = formatModelPeliculas(data);
            setListEspeciales(datosDoc);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerEspeciales();
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
        .catch((e) => {});
    } catch (e) {}
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
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerSeries();
  }, []);

  const [listarSerEsp, setListSeriesEspeciales] = useState([]);

  const obtenerSeriesEspeciales = () => {
    try {
      listarSeriesEspeciales()
        .then((response) => {
          const { data } = response;

          if (!listarSerEsp && data) {
            setListSeriesEspeciales(formatModelSeriesEspeciales(data));
            console.log(data);
          } else {
            const datosSer = formatModelSeriesEspeciales(data);
            setListSeriesEspeciales(datosSer);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerSeriesEspeciales();
  }, []);

  return (
    <>
      <NavPrincipal
        listarDocumentales={listarDocumentales}
        listarEspeciales={listarEspeciales}
        listarPeliculas={listarPelicula}
        listarSeries={listarSer}
        listarSeriesEspeciales={listarSerEsp}
      />
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
      tipo: "series",
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

function formatModelSeriesEspeciales(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      titulo: data.titulo,
      categorias: data.categorias,
      actores: data.actores,
      director: data.director,
      duracion: data.duracion,
      tipo: "seriesEspeciales",
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