import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faBars } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import { listarUsuarios } from "../../api/usuarios";
import "../../css/tables.css";
//listar categorias
//listar categorias

export function TblUsers(props) {
  const { location } = props;
  const [listarUser, setListUser] = useState([]);

  const obtenerUsuarios = () => {
    try {
      listarUsuarios()
        .then((response) => {
          const { data } = response;

          if (!listarUser && data) {
            setListUser(formatModelUsers(data));
          } else {
            const datosUser = formatModelUsers(data);
            setListUser(datosUser);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, [location]);
  // recargar

  // Configurando animacion de carga
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  const cargarDatos = () => {
    const timeout = setTimeout(() => {
      setRows(listarUser);
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
      name: "email",
      label: "EMAIL",
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
                  >
                    <FontAwesomeIcon icon={faPen}  style={{ color: "#ffc107" }} /> &nbsp; Modificar
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#dc3545" }} /> &nbsp; Eliminar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
    <h1 className="title">Usuarios</h1>
      <MUIDataTable
        title={"Lista Usuarios"}
        data={listarUser}
        columns={columns}
        options={options}
      />
    </>
  );
}

function formatModelUsers(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      nombre: data.nombre,
      email: data.email,
      estado: data.estado,
    });
  });
  return dataTemp;
}
