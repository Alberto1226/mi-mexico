import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { listarPatrocinadores } from "../../api/patrocinadores";
import { Image, Dropdown, Button } from "react-bootstrap";
import ModificarPatorcinadores from "../patrocinadores/modificarPatrocinadores";
import EliminarPatorcinadores from "../patrocinadores/eliminarPatrocinadores";
import Patrocinadores from "../patrocinadores/patrocinadores";
import { withRouter } from "../../utils/withRouter";
import BasicModal from "../Modal/BasicModal/BasicModal";
import "../../css/tables.css";
//listar categorias
//listar categorias

function TblPatrocinadores(props) {
  const { location, history } = props;

  //Para el modal
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [titulosModal, setTitulosModal] = useState(null);

  const modificarPatrocinadores = (content) => {
    setTitulosModal("Modificar patrocinador");
    setContentModal(content);
    setShowModal(true);
  };

  const eliminarPatrocinadores = (content) => {
    setTitulosModal("Eliminar patrocinador");
    setContentModal(content);
    setShowModal(true);
  };

  const agregarPatrocinador = (content) => {
    setTitulosModal("Registrar patrocinador");
    setContentModal(content);
    setShowModal(true);
  };

  const [listarPatro, setListPatro] = useState([]);

  const obtenerPatrocinadores = () => {
    try {
      listarPatrocinadores()
        .then((response) => {
          const { data } = response;

          if (!listarPatro && data) {
            setListPatro(formatModelPatrocinadores(data));
          } else {
            const datosPatro = formatModelPatrocinadores(data);
            setListPatro(datosPatro);
          }
        })
        .catch((e) => { });
    } catch (e) { }
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
      options: {
        display: "excluded", // "excluded" significa oculto por defecto
      },
    },
    {
      name: "nombre",
      label: "NOMBRE",
    },
    {
      name: "urlImagen",
      label: "PORTADA",
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
            <p>No hay imagen del patrocinador</p>
          );
        },
      },
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
      name: "nivel",
      label: "NIVEL",
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
      name: "numeroApariciones",
      label: "NUMERO DE APARICIONES"
    },
    {
      name: "prioridadAparicion",
      label: "PRIORIDAD DE APARICION",
      options: {
        customBodyRender: (value) => {
          const estado = value;

          let estiloTexto = "";
          let estadoTexto = "";

          if (estado == "1") {
            estiloTexto = "Prioritario";
            estadoTexto = "Prioritario";
          } else {
            estiloTexto = "No prioritario";
            estadoTexto = "No prioritario";
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
              <Dropdown>
                <Dropdown.Toggle className="botonDropdown" id="dropdown-basic">
                  <FontAwesomeIcon icon={faBars} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      modificarPatrocinadores(
                        <ModificarPatorcinadores
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
                      eliminarPatrocinadores(
                        <EliminarPatorcinadores
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

  const options = {
    filterType: "checkbox",
  };
  return (
    <>
      <h1 className="title">Patrocinadores</h1>
      <div>
        <div className="divButton">
          <Button
            className="btnAddTables"
            onClick={() =>
              agregarPatrocinador(
                <Patrocinadores history={history} setShow={setShowModal} />
              )
            }
          >
            <FontAwesomeIcon icon={faPlus} /> Agregar
          </Button>
        </div>
      </div>
      <div className="divTabla">
        <MUIDataTable
          title={"Lista de patrocinadores registrados"}
          data={listarPatro}
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

function formatModelPatrocinadores(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      nombre: data.nombre,
      urlImagen: !data.urlImagen ? "Sin Imagen" : data.urlImagen,
      urlWeb: data.urlWeb,
      urlFacebook: data.urlFacebook,
      urlInstagram: data.urlInstagram,
      urlTwitter: data.urlTwitter,
      nivel: data.nivel,
      estado: data.estado,
      numeroApariciones: data.numeroApariciones,
      prioridadAparicion: data.prioridadAparicion
    });
  });
  return dataTemp;
}

export default withRouter(TblPatrocinadores);
