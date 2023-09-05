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
import queryString from "query-string";

export default function ModificarPatorcinadores({ data, history, setShow }) {
  const idPatrocinador = data[0];

  const dataTemp = {
    nombre: data[1],
    urlWeb: data[3],
    urlFacebook: data[4],
    urlInstagram: data[5],
    urlTwitter: data[6],
    nivel: data[7],
    numeroApariciones: data[9],
    prioridadAparicion: data[10]
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

    if (!formData.nombrePatrocinador || !formData.swPatrocinador || !formData.nivel || !formData.fbPatrocinador || !formData.inPatrocinador || !formData.twPatrocinador) {
      toast.warning("Completa el formulario");
    } else {
      try {
        subeArchivosCloudinary(imagenProducto, "patrocionadores").then(response => {
          const { data } = response;
          setLoading(true);
          // Sube a cloudinary la imagen principal del producto

          const dataTemp = {
            nombre: formData.nombrePatrocinador,
            urlImagen: data.secure_url,
            urlWeb: formData.swPatrocinador,
            urlFacebook: formData.fbPatrocinador,
            urlInstagram: formData.inPatrocinador,
            urlTwitter: formData.twPatrocinador,
            nivel: formData.nivel,
            estado: "true",
            numeroApariciones: formData.numeroApariciones,
            prioridadAparicion: formData.prioridadAparicion
          };
          actualizarPatrocinadores(idPatrocinador, dataTemp).then((response) => {
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
        }).then(e => {
          console.log(e)
        })
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

          <br />

          <Form.Control
            as="select"
            defaultValue={formData.nivel}
            name="nivel"
          >
            <option>Elige un nivel</option>
            <option value="1" selected={formData.nivel == "1"}>1</option>
            <option value="2" selected={formData.nivel == "2"}>2</option>
            <option value="3" selected={formData.nivel == "3"}>3</option>
          </Form.Control>

          <br />

          <Form.Control
            placeholder="Numero de apariciones"
            type="number"
            name="numeroApariciones"
            defaultValue={formData.numeroApariciones}
          />
          <br />
          <Form.Control
            id="prioridadAparicion"
            as="select"
            name="prioridadAparicion"
            defaultValue={formData.prioridadAparicion}
          >
            <option>¿Prioritario?</option>
            <option value="1" selected={formData.prioridadAparicion == "1"}>SI</option>
            <option value="0" selected={formData.prioridadAparicion == "0"}>NO</option>
          </Form.Control>
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
    nombrePatrocinador: data.nombre,
    imgPatrocinador: "",
    swPatrocinador: data.urlWeb,
    fbPatrocinador: data.urlFacebook,
    inPatrocinador: data.urlInstagram,
    twPatrocinador: data.urlTwitter,
    nivel: data.nivel,
    numeroApariciones: data.numeroApariciones,
    prioridadAparicion: data.prioridadAparicion
  };
}
