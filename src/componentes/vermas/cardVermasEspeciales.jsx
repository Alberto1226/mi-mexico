import React, { useEffect, useState } from "react";
import { listarSeries } from "../../api/series";
import { Link } from "react-router-dom";
import { FullScrean } from "../fullScreen/fullScreen";
export function CardsVermas(props) {
  const { location } = props;
  const [listarSer, setListSeries] = useState([]);

  const obtenerSeries = () => {
    try {
      listarSeries()
        .then((response) => {
          const { data } = response;

          if (!listarSer && data) {
            setListSeries(formatModelSeries(data));
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
  }, [location]);


  return (
    <>
      {listarSer &&
        listarSer.map((series) => (
          <a key={series.id} img={"datos"}>

            <Link to={`/full?id=${series.id}`} img={"datos"}>
              <img
                className="imgVermas"
                src={series.urlPortada}
                alt=""

              />
            </Link>


          </a>
        ))}
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
      seccion: data.seccion,
      estado: data.estado,
    });
  });
  return dataTemp;
}