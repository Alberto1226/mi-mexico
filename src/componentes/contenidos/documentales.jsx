import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { TblDocumentales } from "../tables/tablaDocumentales";
export function Documentales() {
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
      <div class="bg-white">
        <Button variant="primary" onClick={handleShow} className="btnadd">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <h1 class="text-center">Listado de Documentales</h1>
        <TblDocumentales />
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
          <Modal.Title>Insertar Documental</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contact-form">
            <Form>
              <Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    placeholder="Titulo Documetal"
                    type="text"
                    name="tituloDocumental"
                    // defaultValue={formData.nombre}
                  />
                </Col>
                <Col xs={6} md={4}>
                  <Form.Control
                    placeholder="Genero"
                    type="text"
                    name="generoDocumental"
                    //defaultValue={formData.correo}
                  />
                </Col>
              </Row>
              <br />
              <Form.Control
                placeholder="Actores"
                as="textarea"
                name="actoresDocumental"
                // defaultValue={formData.nombre}
              />
              <br />
              <Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    placeholder="Director"
                    type="text"
                    name="directorDocumental"
                    //defaultValue={formData.correo}
                  />
                </Col>
                <Col xs={6} md={4}>
                  <Form.Control
                    placeholder="Duración"
                    type="text"
                    name="duracionDocumental"
                    //defaultValue={formData.correo}
                  />
                </Col>
              </Row>
              <br />
              <Form.Control
                placeholder="Sinopsis"
                as="textarea"
                name="sinopsisDocumental"
                //defaultValue={formData.contraseña}
              />
              <br />
              <Form.Control
                placeholder="Año"
                type="text"
                name="anioDocumental"
                //defaultValue={formData.confirmarContraseña}
              />
              <br />
              <Form.Control
                placeholder="Archivo"
                type="file"
                name="archPeliculaDocumental"
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
