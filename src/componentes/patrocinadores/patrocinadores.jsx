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

export function Patorcinadores() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
            <Form>
              <br />
              <Form.Control
                placeholder="Nombre"
                type="text"
                name="nombrePatrocinador"
                // defaultValue={formData.nombre}
              />
              <br />
              <h6>Imagen</h6>
              <Form.Control
                placeholder="Imagen"
                type="file"
                name="imgPatrocinador"
                // defaultValue={formData.nombre}
              />
              <br />
              <Form.Control
                placeholder="URL sitio web"
                type="text"
                name="swPatrocinador"
                // defaultValue={formData.nombre}
              />
              <br />

              <Form.Control
                placeholder="URL sitio Facebook"
                type="text"
                name="fbPatrocinador"
                // defaultValue={formData.nombre}
              />
              <br />

              <Form.Control
                placeholder="URL sitio Instagram"
                type="text"
                name="inPatrocinador"
                // defaultValue={formData.nombre}
              />
              <br />

              <Form.Control
                placeholder="URL sitio Twitter"
                type="text"
                name="twPatrocinador"
                // defaultValue={formData.nombre}
              />

              <label></label>
              <input className="submit" value="Enviar" type="submit" />
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
