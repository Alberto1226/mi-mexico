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
import { eliminarPatrocinadores } from "../../api/patrocinadores";

export default function EliminarPatorcinadores({ data }) {

  const dataTemp = {
    nombre: data[1],
    urlWeb: data[3],
    urlFacebook: data[4],
    urlInstagram: data[5],
    urlTwitter: data[6],
    nivel: data[7]
  };
  console.log(dataTemp)

  const [formData, setFormData] = useState(initialFormValue(dataTemp));

  console.log(formData)

  console.log(data)
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
      eliminarPatrocinadores(data[0]).then((response) => {
        const { data } = response;
        //notificacion

        toast.success(data.mensaje);

        window.location.reload();
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
      <div className="contact-form">
        <Form onSubmit={onSubmit} onChange={onChange}>
          <br />
          <Form.Control
            placeholder="Nombre"
            type="text"
            name="nombrePatrocinador"
            defaultValue={formData.nombrePatrocinador}
            disabled
          />
          <br />
          <Form.Control
            placeholder="URL sitio web"
            type="text"
            name="swPatrocinador"
            defaultValue={formData.swPatrocinador}
            disabled
          />
          <br />

          <Form.Control
            placeholder="URL sitio Facebook"
            type="text"
            name="fbPatrocinador"
            defaultValue={formData.fbPatrocinador}
            disabled
          />
          <br />

          <Form.Control
            placeholder="URL sitio Instagram"
            type="text"
            name="inPatrocinador"
            defaultValue={formData.inPatrocinador}
            disabled
          />
          <br />

          <Form.Control
            placeholder="URL sitio Twitter"
            type="text"
            name="twPatrocinador"
            defaultValue={formData.twPatrocinador}
            disabled
          />

          <br />

          <Form.Control
            as="select"
            defaultValue={formData.nivel}
            name="nivel"
            disabled
          >
            <option>Elige un nivel</option>
            <option value="1" selected={formData.nivel == "1"}>1</option>
            <option value="2" selected={formData.nivel == "2"}>2</option>
            <option value="3" selected={formData.nivel == "3"}>3</option>
          </Form.Control>

          <label></label>
          <input className="submit" value="Eliminar" type="submit" />
        </Form>
      </div>
    </>
  );
}

function initialFormValue(data) {
  return {
    nombrePatrocinador: data.nombre,
    imgPatrocinador: "",
    swPatrocinador: data.urlWeb,
    fbPatrocinador: data.urlFacebook,
    inPatrocinador: data.urlInstagram,
    twPatrocinador: data.urlTwitter,
    nivel: data.nivel
  };
}
