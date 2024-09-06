import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import EliminarCapitulos from "../contenidos/EliminarCapitulos";
import ModificarCapitulosSerie from "../contenidos/modificarCapitulosSeries";
import { listarCapitulosSeries } from "../../api/capitulosSeries";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus, faEye, faFile, faTable } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "../../utils/withRouter";
//listar categorias
//listar categorias

function TblCapitulosSeries(props) {
  const { location, data, history } = props;
  const series = data;

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

  const [listarSer, setListSeries] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

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
    },
    {
      name: "urlPortada",
      label: "URLPORTADA",
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
                  onClick={() => handleShow2(tableMeta.rowData)}
                />
                <Modal
                  size="lg"
                  show={show2}
                  onHide={handleClose2}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Modificar capitulo</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ModificarCapitulosSerie data={selectedRowData} datos={series} history={history} setShow={setShow2} />
                  </Modal.Body>
                </Modal>
              </button>
              <button className="btndel">
                <FontAwesomeIcon
                  icon={faTrash}
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
                    <Modal.Title>Eliminar capitulo</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EliminarCapitulos data={selectedRowData} history={history} setShow={setShow} />
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
        title={"Lista de capitulos de Series"}
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
      serie: data.serie,
      temporada: data.temporada,
      nombre: data.nombre,
      urlCapitulo: data.urlCapitulo,
      urlPortada: data.urlPortada,
      duracion: data.duracion,
      descripcion: data.descripcion,
      estado: data.estado,
      urlPortadaMovil: data.urlPortadaMovil
    });
  });
  return dataTemp;
}

export default withRouter(TblCapitulosSeries);