import React, { useEffect, useState } from "react";
import {listarPeliculasMasVista} from "../../api/peliculasListar";
import { Link } from "react-router-dom";
import { FullScrean } from "../fullScreen/fullScreen";
export function CardsVermasDocumentales(props) {
  const { location } = props;

  const [listarPel, setListPeliculas] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const obtenerPeliculas = () => {
    try {
      listarPeliculasMasVista("documentales")
        .then((response) => {
          const { data } = response;

          if (!listarPel && data) {
            setListPeliculas(formatModelPeliculas(data));
          } else {
            const datosPel = formatModelPeliculas(data);
            setListPeliculas(datosPel);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerPeliculas();
  }, [location]);


  return (
    <>
      {listarPel &&
        listarPel.map((documentales) => (
          <a key={documentales.id} img={"datos"}>

            <Link to={`/fullDoc?id=${documentales.id}`} img={"datos"}>
              <img
                className="imgVermas"
                src={documentales.urlPortada}
                alt=""

              />
            </Link>


          </a>
        ))}
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