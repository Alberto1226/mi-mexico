import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { TblPeliculas } from "../tables/tablePeliculas";
import { registraPeliculas } from "../../api/peliculasListar";
import { ToastContainer, toast } from "react-toastify";

export function Peliculas() {
  const [formData, setFormData] = useState(initialFormValue());
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

  //insert
  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.actores || !formData.director || !formData.duracion || !formData.sinopsis || !formData.anio || !formData.archPelicula) {
      toast.warning("Completa el formulario");
    } else {
      try {
        setLoading(true);
        // Sube a cloudinary la imagen principal del producto

        const dataTemp = {
          titulo: formData.nombre,
          categorias: "",
          actores: formData.actores,
          director: formData.director,
          duracion: formData.duracion,
          tipo: "",
          sinopsis: formData.sinopsis,
          calificacion: "",
          año: formData.anio,
          disponibilidad: "",
          masVisto: "",
          tipo: "peliculas",
          recomendado: "",
          urlVideo: formData.archPelicula,
          urlPortada: "",
          seccion: "",
          estado: "true"
        };
        registraPeliculas(dataTemp).then((response) => {
          const { data } = response;
          //notificacion

          toast.success(data.mensaje);

          window.location.reload();
          //cancelarRegistro()
        });
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
        <h1 class="text-center">Listado de Peliculas</h1>
        <TblPeliculas />
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
        <Modal.Body>
          <div className="contact-form">
            <Form onSubmit={onSubmit} onChange={onChange}>
              <Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    placeholder="Titulo"
                    type="text"
                    name="nombre"
                    defaultValue={formData.nombre}
                  />
                </Col>
              </Row>
              <br />
              <Form.Control
                placeholder="Actores"
                as="textarea"
                name="actores"
                defaultValue={formData.actores}
              />
              <br />
              <Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    placeholder="Director"
                    type="text"
                    name="director"
                    defaultValue={formData.director}
                  />
                </Col>
                <Col xs={6} md={4}>
                  <Form.Control
                    placeholder="Duración"
                    type="text"
                    name="duracion"
                    defaultValue={formData.duracion}
                  />
                </Col>
              </Row>
              <br />
              <Form.Control
                placeholder="Sinopsis"
                as="textarea"
                name="sinopsis"
                defaultValue={formData.sinopsis}
              />
              <br />
              <Form.Control
                placeholder="Año"
                type="text"
                name="anio"
                defaultValue={formData.anio}
              />
              <br />
              <Form.Control
                placeholder="Archivo"
                type="text"
                name="archPelicula"
                defaultValue={formData.archPelicula}
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

function initialFormValue() {
  return {
    nombre: "",
    genero: "",
    actores: "",
    director: "",
    duracion: "",
    sinopsis: "",
    anio: "",
    archPelicula: ""
  };
}
