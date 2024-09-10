import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faBars } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import BasicModal from "../Modal/BasicModal/BasicModal";
import { withRouter } from "../../utils/withRouter";
import { listarDirectos } from "../../api/directos";
import ModificarDirectos from "./ModificarDirectos";

function BtnApagarDirecto(props) {
  const [listDir, setListDir] = useState([]);
  const [loading, setLoading] = useState(true);
  const { location, history } = props;

  //Para el modal
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [titulosModal, setTitulosModal] = useState(null);

  const modificarDirecto = (content) => {
    setTitulosModal("Modificar directo");
    setContentModal(content);
    setShowModal(true);
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

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        display: "excluded", // "excluded" significa oculto por defecto
      },
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
              <Dropdown>
                <Dropdown.Toggle className="botonDropdown" id="dropdown-basic">
                  <FontAwesomeIcon icon={faBars} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      modificarDirecto(
                        <ModificarDirectos
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
      <MUIDataTable
        title={"Lista Lives"}
        data={listDir}
        columns={columns}
        options={options}
      />
      <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
        {contentModal}
      </BasicModal>
    </>
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

export default withRouter(BtnApagarDirecto);
