import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { listarPeliculas } from "../../api/peliculasListar";
import ModificarEspeciales from "../contenidos/ModificarEspeciales";
import EliminarEspeciales from "../contenidos/EliminarEspeciales";
import { Image, Dropdown, Button } from "react-bootstrap";
import { withRouter } from "../../utils/withRouter";
import BasicModal from "../Modal/BasicModal/BasicModal";
import "../../css/tables.css";
import Especiales from "../contenidos/especiales";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
//listar categorias
//listar categorias

function TblEspeciales(props) {
  const { location, history } = props;

  //Para el modal
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [titulosModal, setTitulosModal] = useState(null);

  const modificarEspeciales = (content) => {
    setTitulosModal("Modificar especial");
    setContentModal(content);
    setShowModal(true);
  };

  const eliminarEspeciales = (content) => {
    setTitulosModal("Eliminar especial");
    setContentModal(content);
    setShowModal(true);
  };

  const agregarEspeciales = (content) => {
    setTitulosModal("Registrar especial");
    setContentModal(content);
    setShowModal(true);
  };

  const [listarPel, setListPeliculas] = useState([]);

  const obtenerPeliculas = () => {
    try {
      listarPeliculas("especiales")
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
            <p>No hay imagen del articulo</p>
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
            <p>No hay imagen del especial</p>
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
                      modificarEspeciales(
                        <ModificarEspeciales
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
                      eliminarEspeciales(
                        <EliminarEspeciales
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
      <h1 className="title">Especiales</h1>
      <div>
        <div className="divButton">
          <Button
            className="btnAddTables"
            onClick={() =>
              agregarEspeciales(
                <Especiales history={history} setShow={setShowModal} />
              )
            }
          >
            <FontAwesomeIcon icon={faPlus} /> Agregar
          </Button>
        </div>
      </div>
      <div className="divTabla">
        <MUIDataTable
          title={"Lista de especiales registrados"}
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

export default withRouter(TblEspeciales);
