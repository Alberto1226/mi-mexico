import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import {Load} from '../load/load';
export function TablaUsuarios() {
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
  return (
    <>
      {loading && <Load />}
        <div class="bg-white">
        <Button variant="primary" onClick={handleShow} className="btnadd">
          <FontAwesomeIcon icon={faPlus} />
          </Button>
          <h1 class="text-center">Listado de Usuarios</h1>
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
          <Modal.Title>Insertar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contact-form">
            <Form>
              <br />
              <Form.Control
                placeholder="Nombre"
                type="text"
                name="nombreUser"
                // defaultValue={formData.nombre}
              />
              <br />
              <Form.Control
                placeholder="Apellido"
                type="email"
                name="apUser"
                //defaultValue={formData.correo}
              />
              <br />
              <Form.Control
                placeholder="Rol"
                type="text"
                name="rolUser"
                //defaultValue={formData.correo}
              />
              <br />
              <Form.Control
                placeholder="Email"
                type="email"
                name="correoUser"
                //defaultValue={formData.correo}
              />
              <br />
              <Form.Control
                placeholder="Contraseña"
                type="password"
                name="contraseñaUser"
                //defaultValue={formData.contraseña}
              />
              <br />
              <Form.Control
                placeholder="Confirmar contraseña"
                type="password"
                name="confirmarContraseña"
                //defaultValue={formData.confirmarContraseña}
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
