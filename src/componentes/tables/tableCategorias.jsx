import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { listarCategorias } from "../../api/categorias";

import ModificarCategorias from "../categoriasVideos/ModificarCategoria";
import EliminarCategorias from "../categoriasVideos/eliminarCategoria";

//listar categorias
//listar categorias

export function TblCategorias(props) {
  const { location } = props;
  const [listarCat, setListCategorias] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const obtenerCategorias = () => {
    try {
      listarCategorias()
        .then((response) => {
          const { data } = response;

          if (!listarCat && data) {
            setListCategorias(formatModelCategorias(data));
          } else {
            const datosCat = formatModelCategorias(data);
            setListCategorias(datosCat);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerCategorias();
  }, [location]);
  // recargar

  //modal show modificar
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (rowData) => {
    setShow(true);
    setSelectedRowData(rowData);
  };
  //fin modal show
  //modal delete
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (rowData) => {
    setShow2(true);
    setSelectedRowData(rowData);
  };
  //fin modal 
  // Configurando animacion de carga
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  const cargarDatos = () => {
    const timeout = setTimeout(() => {
      setRows(listarCat);
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
      name: "nombre",
      label: "NOMBRE",
    },
    {
      name: "descripcion",
      label: "DESCRICIÓN",
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
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Modificar Categoria</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ModificarCategorias data={selectedRowData} />
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
                    <Modal.Title>Eliminar Pelicula</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EliminarCategorias data={selectedRowData} />
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
    filterType: "checkbox",
  };
  return (
    <>
      <MUIDataTable
        title={"Lista Categorias"}
        data={listarCat}
        columns={columns}
        options={options}
      />
    </>
  );
}

function formatModelCategorias(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      estado: data.estado,
    });
  });
  return dataTemp;
}
