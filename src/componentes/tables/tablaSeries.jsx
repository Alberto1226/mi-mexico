import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus, faEye, faFile, faTable } from "@fortawesome/free-solid-svg-icons";
import { listarSeries } from "../../api/series";
import ModificarSeries from "../contenidos/modificarSeries";
import EliminarSeries from "../contenidos/eliminarSeries";
import TblCapitulosSeries from "./tablaCapitulosSeries";
import ModificarCapitulosTemporadas from "../contenidos/modificarCapitulosSeries";
import InsertarCapitulosSerie from "../contenidos/insertarCapitulosSeries";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "../../utils/withRouter";
import ActualizarTemporadas from "../contenidos/actualizarTemporadas";
import TblTemporadas from "./tablaTemporadas";
//listar categorias
//listar categorias

function TblSeries(props) {
  const { location, history } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (rowData) => {
    setShow(true);
    setSelectedRowData(rowData);
  };

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (rowData) => {
    setShow2(true);
    setSelectedRowData(rowData);
  };

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = (rowData) => {
    setShow3(true);
    setSelectedRowData(rowData);
  };

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = (rowData) => {
    setShow4(true);
    setSelectedRowData(rowData);
  };

  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = (rowData) => {
    setShow5(true);
    setSelectedRowData(rowData);
  };

  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = (rowData) => {
    setShow6(true);
    setSelectedRowData(rowData);
  };

  const [listarSer, setListSeries] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

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
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={() => handleShow(tableMeta.rowData)}
                />
                <Modal
                  size="lg"
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Modificar Serie</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ModificarSeries data={selectedRowData} history={history} setShow={setShow} />
                  </Modal.Body>
                </Modal>
              </button>
              <button className="btndel">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleShow2(tableMeta.rowData)}
                />
                <Modal
                  show={show2}
                  onHide={handleClose2}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Eliminar Serie</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EliminarSeries data={selectedRowData} history={history} setShow={setShow2} />
                  </Modal.Body>
                </Modal>
              </button>
              <button className="btndel">
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={() => handleShow3(tableMeta.rowData)}
                />
                <Modal
                  show={show3}
                  size="xl"
                  onHide={handleClose3}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Actualizar Capitulos</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <InsertarCapitulosSerie data={selectedRowData} />
                  </Modal.Body>
                </Modal>
              </button>
              <button className="btnup">
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => handleShow4(tableMeta.rowData)} />
                <Modal
                  show={show4}
                  size="xl"
                  onHide={handleClose4}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Lista de los capitulos de la serie</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <TblCapitulosSeries data={selectedRowData} />
                  </Modal.Body>
                </Modal>
              </button>
              <button className="btnup">
                <FontAwesomeIcon
                  icon={faFile}
                  onClick={() => handleShow5(tableMeta.rowData)} />
                <Modal
                  show={show5}
                  size="xl"
                  onHide={handleClose5}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Agregar temporadas a las series</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ActualizarTemporadas data={selectedRowData} setShow={setShow5} />
                  </Modal.Body>
                </Modal>
              </button>
              <button className="btnup">
                <FontAwesomeIcon
                  icon={faTable}
                  onClick={() => handleShow6(tableMeta.rowData)} />
                <Modal
                  show={show6}
                  size="xl"
                  onHide={handleClose6}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Lista de las temporadas de la serie</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <TblTemporadas data={selectedRowData} setShow={setShow6} />
                  </Modal.Body>
                </Modal>
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
        title={"Lista Series"}
        data={listarSer}
        columns={columns}
        options={options}
      />
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

export default withRouter(TblSeries);
