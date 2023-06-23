import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { actualizarCategoria } from "../../api/categorias";
import Dropzone from "../Dropzone/Dropzone";


export default function ModificarCategorias({data}) {
  
  const dataTemp = {
    nombre: data[1],
    descripcion: data[2],
    estado: data[3],
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

    if (!formData.nombreCategoria || !formData.descripcionCategoria || !formData.estadoCategoria ) {
      toast.warning("Completa el formulario");
    } else {
      try {
        setLoading(true);
        // Sube a cloudinary la imagen principal del producto

        const dataTemp = {
          nombre: formData.nombreCategoria,
          descripcion: formData.descripcionCategoria,
          estado: formData.estadoCategoria,
         
        };
        actualizarCategoria(data[0], dataTemp).then((response) => {
          const { data } = response;
          //notificacion

          toast.success(data.mensaje);

          window.location.reload();
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
          <div className="contact-form">
            <Form onSubmit={onSubmit} onChange={onChange}>
            
              
              <h6>Nombre</h6>
              <Form.Control
                placeholder="Nombre"
                type="text"
                name="nombreCategoria"
                defaultValue={formData.nombreCategoria}
              />
              <br/>
              <h6>Descripción</h6>
              <Form.Control
                placeholder="URL sitio web"
                type="text"
                name="descripcionCategoria"
                defaultValue={formData.descripcionCategoria}
              />
              <br/>
              <h6>Status</h6>
              <Form.Select aria-label="Default select example"
              name="estadoCategoria"
              defaultValue={formData.estadoCategoria}
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
    nombreCategoria: data.nombre,
    descripcionCategoria: data.descripcion,
    estadoCategoria: data.estado,
   
  };
}
