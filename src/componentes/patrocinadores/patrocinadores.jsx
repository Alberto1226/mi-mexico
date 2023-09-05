import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import TblPatrocinadores from "../tables/tablaPatrocinadores";
import { registraPatrocinadores } from "../../api/patrocinadores";
import { subeArchivosCloudinary } from "../../api/cloudinary";
import Dropzone from "../Dropzone/Dropzone";
import "./patrocinadores.css";
import { withRouter } from "../../utils/withRouter";
import queryString from "query-string";

function Patorcinadores({ history }) {
  const [formData, setFormData] = useState(initialFormValue());
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //load
  const [loading, setLoading] = useState(true);

  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenProducto, setImagenProducto] = useState(null);

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

    if (!formData.nombrePatrocinador || !formData.swPatrocinador || !formData.fbPatrocinador || !formData.inPatrocinador || !formData.twPatrocinador || !formData.nivel) {
      toast.warning("Completa el formulario");
    } else {
      try {
        // Sube a cloudinary la imagen principal del producto
        subeArchivosCloudinary(imagenProducto, "patrocionadores").then(response => {
          const { data } = response;
          setLoading(true);

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
          registraPatrocinadores(dataTemp).then((response) => {
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
      <div class="bg-white">
        <Button variant="primary" onClick={handleShow} className="btnadd">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <div>
          <button onClick={notify}>Notify!</button>
          <ToastContainer />
        </div>
        <h1 class="text-center">Listado de Patrocinador</h1>
        <TblPatrocinadores />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Insertar Patrocinador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contact-form">
            <Form onSubmit={onSubmit} onChange={onChange}>
              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Sube tu imagen</h4>
                <div title="Seleccionar imagen de la categoría" className="imagenProducto">
                  <Dropzone
                    setImagenFile={setImagenProducto}
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
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
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
                <option value="1">SI</option>
                <option value="0">NO</option>
              </Form.Control>
              <br />

              <label></label>
              <input className="submit" value="Enviar" type="submit" />
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

function initialFormValue() {
  return {
    nombrePatrocinador: "",
    imgPatrocinador: "",
    swPatrocinador: "",
    fbPatrocinador: "",
    inPatrocinador: "",
    twPatrocinador: "",
    nivel: "",
    numeroApariciones: "",
    prioridadAparicion: ""
  };
}

export default withRouter(Patorcinadores);
