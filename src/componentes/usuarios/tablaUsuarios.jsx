import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { TblUsers } from "../tables/tableUsuarios";

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
    }, 500);
  }, []);
  return (
    <>
      {loading && <Load />}
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
    </>
  );
}
