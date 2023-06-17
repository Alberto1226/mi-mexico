import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import {Load} from '../load/load';

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
  }, 2000);
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
          <table class="table text-nowrap">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col">Comentario</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto Hernandez</td>
                <td>@mdo</td>
                <td>Esto es un comentario</td>
              </tr>
            </tbody>
          </table>
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
              <br/>
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
