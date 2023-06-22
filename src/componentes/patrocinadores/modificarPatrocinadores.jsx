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
import { actualizarPatrocinadores } from "../../api/patrocinadores";
import { subeArchivosCloudinary } from "../../api/cloudinary";
import Dropzone from "../Dropzone/Dropzone";
import "./patrocinadores.css";

export default function ModificarPatorcinadores({data}) {
  
  const dataTemp = {
    nombre: data[1],
    urlWeb: data[3],
    urlFacebook: data[4],
    urlInstagram: data[5],
    urlTwitter: data[6],
  };

  const [formData, setFormData] = useState(initialFormValue(dataTemp));

  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenProducto, setImagenProducto] = useState(data[2]);

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

    if (!formData.nombrePatrocinador || !formData.swPatrocinador || !formData.fbPatrocinador || !formData.inPatrocinador || !formData.twPatrocinador) {
      toast.warning("Completa el formulario");
    } else {
      try {
        setLoading(true);
        // Sube a cloudinary la imagen principal del producto

        const dataTemp = {
          nombre: formData.nombrePatrocinador,
          urlImagen: formData.imgPatrocinador,
          urlWeb: formData.swPatrocinador,
          urlFacebook: formData.fbPatrocinador,
          urlInstagram: formData.inPatrocinador,
          urlTwitter: formData.twPatrocinador,
          estado: "true",
        };
        actualizarPatrocinadores(data[0], dataTemp).then((response) => {
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
            <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Sube tu imagen</h4>
                <div title="Seleccionar imagen de la categoría" className="imagenProducto">
                  <Dropzone
                    setImagenFile={setImagenProducto}
                    imagenProductoBD={data[2]}
                  />
                </div>
              </div>
              <br />
              <Form.Control
                placeholder="Nombre"
                type="text"
                name="nombrePatrocinador"
                defaultValue={formData.nombrePatrocinador}
              />
              <br />
              <Form.Control
                placeholder="URL sitio web"
                type="text"
                name="swPatrocinador"
                defaultValue={formData.swPatrocinador}
              />
              <br />

              <Form.Control
                placeholder="URL sitio Facebook"
                type="text"
                name="fbPatrocinador"
                defaultValue={formData.fbPatrocinador}
              />
              <br />

              <Form.Control
                placeholder="URL sitio Instagram"
                type="text"
                name="inPatrocinador"
                defaultValue={formData.inPatrocinador}
              />
              <br />

              <Form.Control
                placeholder="URL sitio Twitter"
                type="text"
                name="twPatrocinador"
                defaultValue={formData.twPatrocinador}
              />

              <label></label>
              <input className="submit" value="Enviar" type="submit" />
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
  };
}
