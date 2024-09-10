import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { listarPeliculas } from "../../api/peliculasListar";
import ModificarPeliculas from "../contenidos/ModificarPeliculas";
import EliminarPeliculas from "../contenidos/EliminarPeliculas";
import { Image, Dropdown, Button } from "react-bootstrap";
import { withRouter } from "../../utils/withRouter";
import BasicModal from "../Modal/BasicModal/BasicModal";
import Peliculas from "../contenidos/peliculas"
import "../../css/tables.css";

function TblPeliculas(props) {
  const { location, history } = props;

  //Para el modal
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [titulosModal, setTitulosModal] = useState(null);

  const modificarPeliculas = (content) => {
    setTitulosModal("Modificar peliculas");
    setContentModal(content);
    setShowModal(true);
  };

  const eliminarPeliculas = (content) => {
    setTitulosModal("Eliminar peliculas");
    setContentModal(content);
    setShowModal(true);
  };

  const agregarPelicula = (content) => {
    setTitulosModal("Registrar pelicula");
    setContentModal(content);
    setShowModal(true);
  };

  const [listarPel, setListPeliculas] = useState([]);

  const obtenerPeliculas = () => {
    try {
      listarPeliculas("peliculas")
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
      options: {
        display: "excluded", // "excluded" significa oculto por defecto
      },
    },
    {
      name: "titulo",
      label: "TITULO",
    },
    {
      name: "categorias",
      label: "CATEGORIAS",
      options: {
        customBodyRender: (listarPel) => {
          // Aquí puedes acceder a las propiedades del objeto y mostrarlas como desees
          return (
            <div>
              {listarPel &&
                listarPel.map((categorias) => (
                  <div key={categorias.id}>
                    <h6>Nombre: {categorias.categoria}</h6>
                    <h6>-------------------</h6>
                  </div>
                ))}
            </div>
          );
        },
      },
    },
    {
      name: "actores",
      label: "ACTORES",
    },
    {
      name: "director",
      label: "DIRECTOR",
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
      label: "SINOPSIS",
      options: {
        customBodyRender: (value) => {
          if (value.length <= 20) {
            return value;
          } else {
            return value.substr(0, 20) + '...';
          }
        }
      }
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
      options: {
        customBodyRender: (value) => {
          const imagen = value;

          return imagen != "Sin Imagen" ? (
            <Image
              src={imagen}
              alt={`Imagen de ${imagen}`}
              style={{ maxWidth: "100px" }}
            />
          ) : (
            <p>No hay imagen de la pelicula</p>
          );
        },
      },
    },
    {
      name: "estado",
      label: "STATUS",
      options: {
        customBodyRender: (value) => {
          const estado = value;

          let estiloTexto = "";
          let estadoTexto = "";

          if (estado == "true") {
            estiloTexto = "activo";
            estadoTexto = "Activo";
          } else {
            estiloTexto = "inhabilitado";
            estadoTexto = "Inhabilitado";
          }

          return (
            <div className={estiloTexto}>
              {estadoTexto}
            </div>
          );
        },
      },
    },
    {
      name: "urlPortadaMovil",
      label: "URL PORTADA MOVIL",
      options: {
        customBodyRender: (value) => {
          const imagen = value;

          return imagen != "Sin Imagen" ? (
            <Image
              src={imagen}
              alt={`Imagen de ${imagen}`}
              style={{ maxWidth: "100px" }}
            />
          ) : (
            <p>No hay imagen de la pelicula</p>
          );
        },
      },
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
              <Dropdown>
                <Dropdown.Toggle className="botonDropdown" id="dropdown-basic">
                  <FontAwesomeIcon icon={faBars} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      modificarPeliculas(
                        <ModificarPeliculas
                          history={history}
                          setShow={setShowModal}
                          data={tableMeta.rowData}
                        />
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: "#ffc107" }}
                    /> &nbsp; Modificar
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      eliminarPeliculas(
                        <EliminarPeliculas
                          history={history}
                          setShow={setShowModal}
                          data={tableMeta.rowData}
                        />
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#dc3545" }}
                    /> &nbsp; Eliminar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown >
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
  };

  return (
    <>
      <h1 className="title">Peliculas</h1>
      <div>
        <div className="divButton">
          <Button
            className="btnAddTables"
            onClick={() =>
              agregarPelicula(
                <Peliculas history={history} setShow={setShowModal} />
              )
            }
          >
            <FontAwesomeIcon icon={faPlus} /> Agregar
          </Button>
        </div>
      </div>
      <div className="divTabla">
        <MUIDataTable
          title={"Lista de peliculas registradas"}
          data={listarPel}
          columns={columns}
          options={options}
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
        {contentModal}
      </BasicModal>
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
      urlPortada: !data.urlPortada ? "Sin Imagen" : data.urlPortada,
      seccion: data.seccion,
      estado: data.estado,
      patrocinador: data.patrocinador,
      patrocinadorPortada: data.patrocinadorPortada,
      urlPortadaMovil: !data.urlPortadaMovil ? "Sin Imagen" : data.urlPortadaMovil,
    });
  });
  return dataTemp;
}

export default withRouter(TblPeliculas);
