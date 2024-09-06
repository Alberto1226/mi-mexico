import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus, faEye, faFile } from "@fortawesome/free-solid-svg-icons";
import { listarSeries } from "../../api/series";
import ModificarSeries from "../contenidos/modificarSeries";
import EliminarSeries from "../contenidos/eliminarSeries";
import TblCapitulosSeries from "./tablaCapitulosSeries";
import ModificarCapitulosTemporadas from "../contenidos/modificarCapitulosSeries";
import InsertarCapitulosSerie from "../contenidos/insertarCapitulosSeries";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "../../utils/withRouter";
import ActualizarTemporadas from "../contenidos/actualizarTemporadas";
//listar categorias
//listar categorias

function TblTemporadas(props, data) {
  const idSerie = data[0];
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

  const [listarSer, setListSeries] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const obtenerSeries = () => {
    try {
      listarSeries()
        .then((response) => {
          const { data } = response;
  
          // Filter data to include only the item with id equal to idSerie
          const filteredData = data.filter((item) => item.id === idSerie);
  
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
    /*{
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
                    <Modal.Title>Lista de las temporadas de la serie</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ActualizarTemporadas data={selectedRowData} setShow={setShow5} />
                  </Modal.Body>
                </Modal>
              </button>
            </>
          );
        },
      },
    },*/
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
        data={listarSer[0]?.datosTemporada}
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

export default withRouter(TblTemporadas);
