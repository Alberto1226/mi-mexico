import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { listarSeriesEspeciales } from "../../api/seriesEspeciales";
import ModificarSeriesEspeciales from "../contenidos/modificarSeriesEspeciales";
import EliminarSeriesEspeciales from "../contenidos/eliminarSeriesEspeciales";
import TblCapitulosSeries from "./tablaCapitulosSeries";
import InsertarCapitulosSerie from "../contenidos/insertarCapitulosSeries";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "../../utils/withRouter";
//listar categorias
//listar categorias

function TblSeriesEspeciales(props) {
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

  const [listarSer, setListSeries] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const obtenerSeries = () => {
    try {
      listarSeriesEspeciales()
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
        .catch((e) => {});
    } catch (e) {}
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
    },
    {
      name: "calificacion",
      label: "CALIFICACIÓN",
    },
    {
      name: "datosTemporada",
      label: "DATOS DE TEMPORADAS",
      options: {
        customBodyRender: (listarSer) => {
          // Aquí puedes acceder a las propiedades del objeto y mostrarlas como desees
          return (
            <div>
              {listarSer &&
                listarSer.map((temporadas) => (
                  <div key={temporadas.id}>
                    <h6>Temporada: {temporadas.temporada}</h6>
                    <h6>Nombre: {temporadas.nombre}</h6>
                    <h6>Capitulos: {temporadas.capitulos}</h6>
                    <h6>-------------------</h6>
                  </div>
                ))}
            </div>
          );
        },
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
    
          if (estado=="true") {
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
      name: "urlPortada2",
      label: "URL PORTADA 2",
    },
    {
      name: "urlPortada3",
      label: "URL PORTADA 3",
    },
    {
      name: "urlPortada4",
      label: "URL PORTADA 4",
    },
    {
      name: "urlPortada5",
      label: "URL PORTADA 5",
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
                    <Modal.Title>Modificar Serie especial</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ModificarSeriesEspeciales data={selectedRowData} history={history} setShow={setShow} />
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
                    <Modal.Title>Eliminar Serie Especial</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EliminarSeriesEspeciales data={selectedRowData} history={history} setShow={setShow2}/>
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
                    <TblCapitulosSeries data={selectedRowData}/>
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
        title={"Lista Series Especiales"}
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
      urlPortada2: data.urlPortada2,
      urlPortada3: data.urlPortada3,
      urlPortada4: data.urlPortada4,
      urlPortada5: data.urlPortada5,
      patrocinador: data.patrocinador,
      patrocinadorPortada: data.patrocinadorPortada,
    });
  });
  return dataTemp;
}

export default withRouter(TblSeriesEspeciales);
