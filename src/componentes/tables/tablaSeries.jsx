import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus, faEye, faFile, faTable, faBars } from "@fortawesome/free-solid-svg-icons";
import { listarSeries } from "../../api/series";
import ModificarSeries from "../contenidos/modificarSeries";
import EliminarSeries from "../contenidos/eliminarSeries";
import TblCapitulosSeries from "./tablaCapitulosSeries";
import InsertarCapitulosSerie from "../contenidos/insertarCapitulosSeries";
import { Image, Dropdown, Button } from "react-bootstrap";
import { withRouter } from "../../utils/withRouter";
import ActualizarTemporadas from "../contenidos/actualizarTemporadas";
import TblTemporadas from "./tablaTemporadas";
import BasicModal from "../Modal/BasicModal/BasicModal";
import "../../css/tables.css";
import Series from "../contenidos/series";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
//listar categorias
//listar categorias

function TblSeries(props) {
  const { location, history } = props;

  //Para el modal
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [titulosModal, setTitulosModal] = useState(null);

  const modificarSeries = (content) => {
    setTitulosModal("Modificar series");
    setContentModal(content);
    setShowModal(true);
  };

  const eliminarSeries = (content) => {
    setTitulosModal("Eliminar series");
    setContentModal(content);
    setShowModal(true);
  };

  const agregarCapitulo = (content) => {
    setTitulosModal("Aregar capitulo");
    setContentModal(content);
    setShowModal(true);
  };

  const visualizarCapitulos = (content) => {
    setTitulosModal("VisualizarCapitulos");
    setContentModal(content);
    setShowModal(true);
  };

  const agregarTemporada = (content) => {
    setTitulosModal("Actualizar temporadas");
    setContentModal(content);
    setShowModal(true);
  };

  const visualizarTemporadas = (content) => {
    setTitulosModal("Visualizar temporadas");
    setContentModal(content);
    setShowModal(true);
  };

  const agregarSerie = (content) => {
    setTitulosModal("Registrar serie");
    setContentModal(content);
    setShowModal(true);
  };

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
  }, [location]);
  // recargar

  // Configurando animacion de carga
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  const cargarDatos = () => {
    const timeout = setTimeout(() => {
      setRows(listarSer);
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
        customBodyRender: (listarSer) => {
          // Aquí puedes acceder a las propiedades del objeto y mostrarlas como desees
          return (
            <div>
              {listarSer &&
                listarSer.map((categorias) => (
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
      name: "sinopsis",
      label: "SINOPCIS",
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
      name: "datosTemporada",
      label: "DATOS DE TEMPORADAS",
      options: {
        display: "excluded", // "excluded" significa oculto por defecto
      },
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
            <p>No hay imagen de la serie</p>
          );
        },
      },
    },
    {
      name: "seccion",
      label: "SECCIÓN",
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
            <p>No hay imagen de la serie</p>
          );
        },
      },
    },
    {
      name: "ACCIONES",
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
                      modificarSeries(
                        <ModificarSeries
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
                      eliminarSeries(
                        <EliminarSeries
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
                  <Dropdown.Item
                    onClick={() =>
                      agregarCapitulo(
                        <InsertarCapitulosSerie
                          history={history}
                          setShow={setShowModal}
                          data={tableMeta.rowData}
                        />
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: "#1919e6" }}
                    /> &nbsp; Insertar capitulo
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      visualizarCapitulos(
                        <TblCapitulosSeries
                          history={history}
                          setShow={setShowModal}
                          data={tableMeta.rowData}
                        />
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ color: "#FFA500" }}
                    /> &nbsp; Capitulos
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      agregarTemporada(
                        <ActualizarTemporadas
                          history={history}
                          setShow={setShowModal}
                          data={tableMeta.rowData}
                        />
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faFile}
                      style={{ color: "#ff0080" }}
                    /> &nbsp; Actualizar temporadas
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      visualizarTemporadas(
                        <TblTemporadas
                          history={history}
                          setShow={setShowModal}
                          data={tableMeta.rowData}
                        />
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faTable}
                      style={{ color: "#A020F0" }}
                    /> &nbsp; Temporadas
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown >
            </>
          );
        },
      },
    },
  ];

  const theme = useTheme();
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'));

  const options = {
    filterType: "checkbox",
    responsive: isSmOrDown && 'standard',
    selectableRows: isSmOrDown ? 'none' : 'multiple',
    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `ordenar por ${column.label}`,
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Registros por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtros",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "RESTAURAR",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "row(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    },
    setTableProps: () => ({
      // Estilo global para encabezados de tabla
      style: {
        fontWeight: 'bold'
      }
    })
  };
  
  return (
    <>
      <h1 className="title">Series</h1>
      <div>
        <div className="divButton">
          <Button
            className="btnAddTables"
            onClick={() =>
              agregarSerie(
                <Series history={history} setShow={setShowModal} />
              )
            }
          >
            <FontAwesomeIcon icon={faPlus} /> Agregar
          </Button>
        </div>
      </div>
      <div className="divTabla">
        <MUIDataTable
          title={"Lista de series registradas"}
          data={listarSer}
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

export default withRouter(TblSeries);
