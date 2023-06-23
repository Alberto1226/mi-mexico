import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { listarUsuarios } from "../../api/usuarios";

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
        .catch((e) => {});
    } catch (e) {}
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
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className="btndel">
                <FontAwesomeIcon icon={faTrash} />
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
