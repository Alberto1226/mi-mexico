import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { listarPatrocinadores } from "../../api/patrocinadores";
import Modal from "react-bootstrap/Modal";
import ModificarPatorcinadores from "../patrocinadores/modificarPatrocinadores";
import EliminarPatorcinadores from "../patrocinadores/eliminarPatrocinadores";
//listar categorias
//listar categorias

export function TblPatrocinadores(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { location } = props;
  const [listarPatro, setListPatro] = useState([]);

  const obtenerPatrocinadores = () => {
    try {
      listarPatrocinadores()
        .then((response) => {
          const { data } = response;

          if (!listarPatro && data) {
            setListPatro(formatModelPatrocinadores(data));
            console.log(data);
          } else {
            const datosPatro = formatModelPatrocinadores(data);
            setListPatro(datosPatro);
            console.log(datosPatro);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    obtenerPatrocinadores();
  }, [location]);
  // recargar

  // Configurando animacion de carga
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  const cargarDatos = () => {
    const timeout = setTimeout(() => {
      setRows(listarPatro);
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
      name: "urlImagen",
      label: "PORTADA",
    },
    {
      name: "urlWeb",
      label: "WEB",
    },
    {
      name: "urlFacebook",
      label: "FACEBOOK",
    },
    {
      name: "urlInstagram",
      label: "INSTAGRAM",
    },
    {
      name: "urlTwitter",
      label: "TWITTER",
    },
    {
      name: "estado",
      label: "STATUS",
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
              <div>
                <button className="btnup">
                  <FontAwesomeIcon icon={faPen} onClick={handleShow} />
                </button>

                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modificar Patrocinador</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ModificarPatorcinadores data={tableMeta.rowData} />
                  </Modal.Body>
                </Modal>
              </div>

              <div>
                <button className="btndel">
                  <FontAwesomeIcon icon={faTrash} onClick={handleShow} />
                </button>

                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Eliminar Patrocinador</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EliminarPatorcinadores data={tableMeta.rowData} />
                  </Modal.Body>
                </Modal>
              </div>
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
        title={"Lista Patrocinadores"}
        data={listarPatro}
        columns={columns}
        options={options}
      />
    </>
  );
}

function formatModelPatrocinadores(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      nombre: data.nombre,
      urlImagen: data.urlImagen,
      urlWeb: data.urlWeb,
      urlFacebook: data.urlFacebook,
      urlInstagram: data.urlInstagram,
      urlTwitter: data.urlTwitter,
      estado: data.estado,
    });
  });
  return dataTemp;
}
