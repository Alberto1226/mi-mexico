import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { TblPeliculas } from "../tables/tablePeliculas";
import { actualizarPeliculas } from "../../api/peliculasListar";
import { ToastContainer, toast } from "react-toastify";

export default function ModificarPeliculas({data, data2}) {

  const dataTemp = {
    nombre: data[1],
    actores: data[3],
    director: data[4],
    duracion: data[5],
    sinopsis: data[7],
    anio: data[9],
    archPelicula: data[12]
  };

  console.log(data2)

  const [formData, setFormData] = useState(initialFormValue(dataTemp));
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

    if (!formData.nombre || !formData.actores || !formData.director || !formData.duracion || !formData.sinopsis || !formData.anio) {
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
          recomendado: "",
          urlVideo: formData.archPelicula,
          urlPortada: "",
          seccion: "",
          estado: "true"
        };
        actualizarPeliculas(data[0], dataTemp).then((response) => {
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
    </>
  );
}

function initialFormValue(data) {
  return {
    nombre: data.nombre,
    actores: data.actores,
    director: data.director,
    duracion: data.duracion,
    sinopsis: data.sinopsis,
    anio: data.anio,
    archPelicula: data.archPelicula
  };
}
