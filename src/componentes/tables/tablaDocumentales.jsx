import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { listarPeliculas } from "../../api/peliculasListar";

//listar categorias
//listar categorias

export function TblDocumentales(props) {
  const { location } = props;
  const [listarPel, setListPeliculas] = useState([]);

  const obtenerPeliculas = () => {
    try {
      listarPeliculas()
        .then((response) => {
          const { data } = response;

          if (!listarPel && data) {
            setListPeliculas(formatModelPeliculas(data));
            console.log(data);
          } else {
            const datosPel = formatModelPeliculas(data);
            setListPeliculas(datosPel);
            console.log(datosPel);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    obtenerPeliculas();
  }, [location]);
  // recargar

  // Configurando animacion de carga
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  const cargarDatos = () => {
    const timeout = setTimeout(() => {
      setRows(listarPel);
      setPending(false);
    }, 0);
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "titulo",
      label: "TITULO",
    },
    {
      name: "categorias",
      label: "CATEGORIAS",
    },
    {
      name: "actores",
      label: "ACTORES",
    },
    {
      name: "duracion",
      label: "DURACIÓN",
    },
    {
      name: "tipo",
      label: "TIPO",
    },
    {
      name: "sinopsis",
      label: "SINOPCIS",
    },
    {
      name: "calificacion",
      label: "CALIFICACIÓN",
    },
    {
      name: "año",
      label: "AÑO",
    },
    {
      name: "disponibilidad",
      label: "DISPONIBILIDAD",
    },
    {
      name: "recomendado",
      label: "RECOMENDADO",
    },
    {
      name: "urlVideo",
      label: "URL VIDEO",
    },
    {
      name: "urlPortada",
      label: "URL PORTADA",
    },

    {
      name: "estado",
      label: "STATUS",
    },
    {
      name: "Acciones",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <button className="btnup">
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className="btndel">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          );
        },
      },
    },
  ];

  const options = {
    //scroll: true, // Activar el desplazamiento
    //scrollX: 600,
    //scrollY: 500,
    filterType: "checkbox",
  };
  return (
    <>
      <MUIDataTable
        title={"Lista Peliculas"}
        data={listarPel}
        columns={columns}
        options={options}
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
