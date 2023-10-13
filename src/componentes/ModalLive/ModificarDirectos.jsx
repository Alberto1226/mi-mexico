import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { actualizarDirectos } from "../../api/directos";

import queryString from "query-string";
import { Load } from "../load/load";

export default function ModificarDirectos({ data, history, setShow }) {
  const idDirecto = data[0];

  const dataTemp = {
    codigo: data[1],
    status: data[2]
    
  };

  const [formData, setFormData] = useState(initialFormValue(dataTemp));

  //Para almacenar la imagen del producto que se guardara a la bd
  //const [imagenProducto, setImagenProducto] = useState(data[2]);

  //load
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  //notification
  //const notify = () => toast("Wow so easy!");

  //insert
  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.codigo || !formData.status) {
      toast.warning("Completa el formulario");
    } else {
      try {
        setLoading(true);
        // Sube a cloudinary la imagen principal del producto

        const dataTemp = {
          codigo: formData.codigo,
          status: formData.status,

        };
        actualizarDirectos(idDirecto, dataTemp).then((response) => {
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


          <h6>Iframe</h6>
          <Form.Control
            placeholder="Nombre"
            type="text"
            name="codigo"
            defaultValue={formData.codigo}
          />
          <br />
          
          <h6>Status</h6>
          <Form.Select aria-label="Default select example"
            name="status"
            defaultValue={formData.status}
          >
            <option>Selecciona un status</option>
            <option value="true">Activo</option>
            <option value="false">Inhabilitado</option>
          </Form.Select>

          <br />


          <label></label>
          <input className="submit" value="Enviar" type="submit" />
        </Form>
      </div>
    </>
  );
}

function initialFormValue(data) {
    return {
        
        codigo: data.codigo,
        status: data.status,

    }}


