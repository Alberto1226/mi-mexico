
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import {Load} from '../load/load';

export function Peliculas() {
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
          <h1 class="text-center">Listado de Peliculas</h1>
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
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Header className="modalback" closeButton>
          <Modal.Title>Insertar Pelicula</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className="contact-form">
            <Form>
              <Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    placeholder="Titulo"
                    type="text"
                    name="nombre"
                    // defaultValue={formData.nombre}
                  />
                </Col>
                <Col xs={6} md={4}>
                  <Form.Control
                    placeholder="Genero"
                    type="text"
                    name="genero"
                    //defaultValue={formData.correo}
                  />
                </Col>
              </Row>
              <br />
              <Form.Control
                placeholder="Actores"
                as="textarea"
                name="actores"
                // defaultValue={formData.nombre}
              />
              <br />
              <Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    placeholder="Director"
                    type="text"
                    name="director"
                    //defaultValue={formData.correo}
                  />
                </Col>
                <Col xs={6} md={4}>
                  <Form.Control
                    placeholder="Duración"
                    type="text"
                    name="duracion"
                    //defaultValue={formData.correo}
                  />
                </Col>
              </Row>
              <br />
              <Form.Control
                placeholder="Sinopsis"
                as="textarea"
                name="sinopsis"
                //defaultValue={formData.contraseña}
              />
              <br />
              <Form.Control
                placeholder="Año"
                type="text"
                name="anio"
                //defaultValue={formData.confirmarContraseña}
              />
              <br />
              <Form.Control
                placeholder="Archivo"
                type="file"
                name="archPelicula"
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
