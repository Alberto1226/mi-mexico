import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";

import { withRouter } from "../../utils/withRouter";
import { listarDirectos } from "../../api/directos";
import ModificarDirectos from "./ModificarDirectos";


export function BtnApagarDirecto(props) {
  const [listDir, setListDir] = useState([]);
  const [loading, setLoading] = useState(true);
  const { location, history } = props;
  const [selectedRowData, setSelectedRowData] = useState(null);
  //modal acciones
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (rowData) => {
    setShow(true);
    setSelectedRowData(rowData);
  };
  //fin
  const obtenerDirectos = () => {
    try {
      listarDirectos()
        .then((response) => {
          const { data } = response;

          if (data) {
            setListDir(formatModelDir(data));
          }
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerDirectos();
  }, [location]); // Cambiado para que se ejecute solo una vez al montar el componente

  const formatStatus = (status) => {
    return status === "true" ? "activo" : "inactivo";
  };



  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "codigo",
      label: "IFRAME",
    },
    
   
    {
      name: "status",
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
                    <Modal.Title>Modificar Live</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ModificarDirectos data={selectedRowData} history={history} setShow={setShow}/>
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
    <MUIDataTable
        title={"Lista Lives"}
        data={listDir}
        columns={columns}
        options={options}
      />
  );
}

function formatModelDir(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      codigo: data.codigo,
      status: data.status,
    });
  });
  return dataTemp;
}
