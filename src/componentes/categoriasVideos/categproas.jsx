
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Load } from "../load/load";
import { registraCategoria, listarCategorias } from "../../api/categorias";
import TblCategorias from "../tables/tableCategorias";
import { withRouter } from "../../utils/withRouter";
import queryString from "query-string";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Categorias({ history, setShow }) {
  const [formData, setFormData] = useState(initialFormValue());
  //load
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  //definimos enrutamiento

  //insert
  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombreCategoria || !formData.descripcionCategoria) {
      toast.warning("Completa el formulario");
    } else {
      try {
        setLoading(true);
        // Sube a cloudinary la imagen principal del producto

        const dataTemp = {
          nombre: formData.nombreCategoria,
          descripcion: formData.descripcionCategoria,
          estado: "true",
        };
        registraCategoria(dataTemp).then((response) => {
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
              <br />
              <Form.Control
                placeholder="Nombre"
                type="text"
                name="nombreCategoria"
                defaultValue={formData.nombreCategoria}
              />
              <br />
              <Form.Control
                placeholder="Descripción"
                as="textarea"
                name="descripcionCategoria"
                defaultValue={formData.descripcionCategoria}
              />

              <label></label>
              <input className="submit" value="Enviar" type="submit" />
            </Form>
          </div>
    </>
  );
}

function initialFormValue() {
  return {
    nombreCategoria: "",
    descripcionCategoria: "",
  };
}

export default withRouter(Categorias)