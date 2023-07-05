import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { TblPatrocinadores } from "../tables/tablaPatrocinadores";
import { eliminarCategorias } from "../../api/categorias";
import queryString from "query-string";

export default function EliminarCategorias({ data, history, setShow }) {
  const idCategoria = data[0];

  const dataTemp = {
    nombre: data[1],
    descripcion: data[2],
    estado: data[3],
  };

  const [formData, setFormData] = useState(initialFormValue(dataTemp));
  //load
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  //notification
  const notify = () => toast("Wow so easy!");

  //insert
  const onSubmit = (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Sube a cloudinary la imagen principal del producto
      eliminarCategorias(data[0]).then((response) => {
        const { data } = response;
        //notificacion

        toast.success(data.mensaje);

        history({
          search: queryString.stringify(""),
        });
        setLoading(false);
        setShow(false);
        //cancelarRegistro()
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading && <Load />}
      <div className="contact-form">
        <Form onSubmit={onSubmit} onChange={onChange}>


          <h6>Nombre</h6>
          <Form.Control
            placeholder="Nombre"
            type="text"
            name="nombreCategoria"
            defaultValue={formData.nombreCategoria}
            disabled
          />
          <br />
          <h6>Descripción</h6>
          <Form.Control
            placeholder="URL sitio web"
            type="text"
            name="descripcionCategoria"
            defaultValue={formData.descripcionCategoria}
            disabled
          />
          <br />
          <h6>Status</h6>
          <Form.Select aria-label="Default select example"
            name="estadoCategoria"
            defaultValue={formData.estadoCategoria}
            disabled
          >
            <option>Selecciona un status</option>
            <option value="true">Activo</option>
            <option value="false">Inhabilitado</option>
          </Form.Select>

          <br />


          <label></label>
          <input className="submit" value="Eliminar" type="submit" />
        </Form>
      </div>
    </>
  );
}

function initialFormValue(data) {
  return {
    nombreCategoria: data.nombre,
    descripcionCategoria: data.descripcion,
    estadoCategoria: data.estado,
  };
}
