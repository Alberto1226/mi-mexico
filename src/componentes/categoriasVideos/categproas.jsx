import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { useNavigate } from "react-router-dom";
import { registraCategoria, listarCategorias } from "../../api/categorias";
import { TblCategorias } from "../tables/tableCategorias";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Categorias(props) {
  const [formData, setFormData] = useState(initialFormValue());

  //modal
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

  //definimos enrutamiento

  //insert
  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombreCategoria || !formData.descripcionCategoria) {
      toast.warning("Completa el formulario");
    } else {
      try {
        setLoading(true);
        // Sube a cloudinary la imagen principal del producto

        const dataTemp = {
          nombre: formData.nombreCategoria,
          descripcion: formData.descripcionCategoria,
          estado: "true",
        };
        registraCategoria(dataTemp).then((response) => {
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
        <h1 class="text-center">Listado de Categorias</h1>
        <hr />
        <TblCategorias />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Insertar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contact-form">
            <Form onSubmit={onSubmit} onChange={onChange}>
              <br />
              <Form.Control
                placeholder="Nombre"
                type="text"
                name="nombreCategoria"
                defaultValue={formData.nombreCategoria}
              />
              <br />
              <Form.Control
                placeholder="Descripción"
                as="textarea"
                name="descripcionCategoria"
                defaultValue={formData.descripcionCategoria}
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
    nombreCategoria: "",
    descripcionCategoria: "",
  };
}
