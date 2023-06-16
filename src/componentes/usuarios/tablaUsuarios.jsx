import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

export function TablaUsuarios() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      
        <div class="bg-white">
          <Button variant="primary" onClick={handleShow}>
            Agregar
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
