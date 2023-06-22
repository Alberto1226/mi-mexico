import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { TblSeries } from "../tables/tablaSeries";
export function Series() {
  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //capitulos Dinamicos
  const [temporadas, setTemporadas] = useState("");
  const [capitulos, setCapitulos] = useState([]);

  const handleTemporadasChange = (event) => {
    const numTemporadas = parseInt(event.target.value);
    setTemporadas(numTemporadas);

    const nuevosCapitulos = [...capitulos];
    while (nuevosCapitulos.length < numTemporadas) {
      nuevosCapitulos.push("");
    }
    while (nuevosCapitulos.length > numTemporadas) {
      nuevosCapitulos.pop();
    }
    setCapitulos(nuevosCapitulos);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes hacer algo con los datos ingresados, como enviarlos a un servidor
    console.log("Temporadas:", temporadas);
    console.log("Capítulos:", capitulos);
  };

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
        <h1 class="text-center">Listado de Series</h1>
        <TblSeries />
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
          <Modal.Title>Insertar Serie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contact-form">
            <Form>
              <Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    placeholder="Titulo"
                    type="text"
                    name="tituloSerie"
                    // defaultValue={formData.nombre}
                  />
                </Col>
                <Col xs={6} md={4}>
                  <Form.Control
                    placeholder="Genero"
                    type="text"
                    name="generoSerie"
                    //defaultValue={formData.correo}
                  />
                </Col>
              </Row>
              <br />
              <Form.Control
                placeholder="Actores"
                as="textarea"
                name="actoresSerie"
                // defaultValue={formData.nombre}
              />
              <br />
              <Form.Control
                placeholder="Director"
                type="text"
                name="directorSerie"
                //defaultValue={formData.correo}
              />
              <br />
              <Row>
                <Col xs={12} md={6}>
                  <Form.Control
                    placeholder="Temporadas"
                    type="number"
                    name="temporadasSerie"
                    value={temporadas}
                    onChange={handleTemporadasChange}
                  />
                </Col>
                <Col xs={12} md={6}>
                  {capitulos.map((capitulo, index) => (
                    <Form.Group key={index}>
                      <Form.Label>Capítulos Temporada {index + 1}</Form.Label>
                      <Form.Control
                        placeholder="Capítulos"
                        type="number"
                        name="capitulosSerie"
                      />
                    </Form.Group>
                  ))}
                </Col>
              </Row>
              <br />
              <Form.Control
                placeholder="Sinopsis"
                as="textarea"
                name="sinopsisSerie"
                //defaultValue={formData.contraseña}
              />
              <br />
              <Form.Control
                placeholder="Año"
                type="text"
                name="anioSerie"
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
