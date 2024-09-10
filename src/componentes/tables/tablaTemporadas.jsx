import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faBars } from "@fortawesome/free-solid-svg-icons";
import { listarSeries } from "../../api/series";
import BasicModal from "../Modal/BasicModal/BasicModal";
import { Dropdown } from "react-bootstrap";
import { withRouter } from "../../utils/withRouter";
import ModificacionTemporadas from "../contenidos/ModificarTemporadas";
import EliminacionTemporadas from "../contenidos/EliminarTemporadas";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
//listar categorias
//listar categorias

function TblTemporadas({ location, history, data }) {
  console.log(data)
  const idSerie = data[0];
  console.log(idSerie)
  const temporadas = data;

  //Para el modal
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [titulosModal, setTitulosModal] = useState(null);

  const modificarTemporadas = (content) => {
    setTitulosModal("Modificar temporadas");
    setContentModal(content);
    setShowModal(true);
  };

  const eliminarTemporadas = (content) => {
    setTitulosModal("Eliminar temporadas");
    setContentModal(content);
    setShowModal(true);
  };

  const [listarSer, setListSeries] = useState([]);

  const obtenerSeries = () => {
    try {
      listarSeries()
        .then((response) => {
          const { data } = response;

          // Filter data to include only the item with id equal to idSerie
          const filteredData = data.filter((item) => item._id === idSerie);

          if (!listarSer && filteredData.length > 0) {
            setListSeries(formatModelSeries(filteredData));
            console.log(filteredData); // Optional: Log the filtered data if needed
          } else if (filteredData.length > 0) {
            const datosSer = formatModelSeries(filteredData);
            setListSeries(datosSer);
          }
        })
        .catch((e) => {
          console.error("Error fetching series data:", e);
        });
    } catch (e) {
      console.error("Unexpected error:", e);
    }
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
      name: "temporada",
      label: "TEMPORADA",
    },
    {
      name: "nombre",
      label: "NOMBRE",
    },
    {
      name: "capitulos",
      label: "CAPITULOS",
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
                      modificarTemporadas(
                        <ModificacionTemporadas
                          data={tableMeta.rowData}
                          datos={temporadas}
                          history={history}
                          setShowModal={setShowModal}
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
                      eliminarTemporadas(
                        <EliminacionTemporadas
                          data={tableMeta.rowData}
                          datos={temporadas}
                          history={history}
                          setShowModal={setShowModal}
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
      <MUIDataTable
        title={"Lista Series"}
        data={listarSer[0]?.datosTemporada}
        columns={columns}
        options={options}
      />
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
      urlPortada: data.urlPortada,
      seccion: data.seccion,
      estado: data.estado,
      patrocinador: data.patrocinador,
      patrocinadorPortada: data.patrocinadorPortada,
      urlPortadaMovil: data.urlPortadaMovil,
    });
  });
  return dataTemp;
}

export default withRouter(TblTemporadas);
