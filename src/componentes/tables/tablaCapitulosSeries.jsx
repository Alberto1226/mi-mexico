import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import EliminarCapitulos from "../contenidos/EliminarCapitulos";
import ModificarCapitulosSerie from "../contenidos/modificarCapitulosSeries";
import { listarCapitulosSeries } from "../../api/capitulosSeries";
import { Dropdown, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faBars } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "../../utils/withRouter";
import BasicModal from "../Modal/BasicModal/BasicModal";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
//listar categorias
//listar categorias

function TblCapitulosSeries(props) {
  const { location, data, history } = props;
  const series = data;

  //Para el modal
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [titulosModal, setTitulosModal] = useState(null);

  const modificarCapitulosSeries = (content) => {
    setTitulosModal("Modificar capitulos");
    setContentModal(content);
    setShowModal(true);
  };

  const eliminarCapitulosSeries = (content) => {
    setTitulosModal("Eliminar capitulos");
    setContentModal(content);
    setShowModal(true);
  };

  const [listarSer, setListSeries] = useState([]);

  const obtenerSeries = () => {
    try {
      listarCapitulosSeries(data[0])
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
      name: "temporada",
      label: "TEMPORADA",
    },
    {
      name: "nombre",
      label: "NOMBRE",
    },
    {
      name: "urlCapitulo",
      label: "URLCAPITULO",
    },
    {
      name: "urlPortadaMovil",
      label: "URLPORTADA MOVIL",
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
            <p>No hay imagen del captitulo</p>
          );
        },
      },
    },
    {
      name: "urlPortada",
      label: "URLPORTADA",
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
            <p>No hay imagen del capitulo</p>
          );
        },
      },
    },
    {
      name: "duracion",
      label: "DURACIÓN",
    },

    {
      name: "descripcion",
      label: "DESCRIPCION",
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
                      modificarCapitulosSeries(
                        <ModificarCapitulosSerie
                          data={tableMeta.rowData}
                          datos={series}
                          history={history}
                          setShow={setShowModal}
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
                      eliminarCapitulosSeries(
                        <EliminarCapitulos
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
      <MUIDataTable
        title={"Lista de capitulos de Series"}
        data={listarSer}
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
      serie: data.serie,
      temporada: data.temporada,
      nombre: data.nombre,
      urlCapitulo: data.urlCapitulo,
      urlPortada: !data.urlPortada ? "Sin Imagen" : data.urlPortada,
      duracion: data.duracion,
      descripcion: data.descripcion,
      estado: data.estado,
      urlPortadaMovil: !data.urlPortadaMovil ? "Sin Imagen" : data.urlPortadaMovil
    });
  });
  return dataTemp;
}

export default withRouter(TblCapitulosSeries);