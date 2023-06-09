import "../../css/registro.css";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  Link } from "react-router-dom";
export function Registro() {
    /**Modal */
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /**picker */
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      
    };
  return (
    <>
      <div class="content">
        <div class="container">
          <h2>
            Únete a la plataforma de videos que promueve los destinos y cultura
            de México para el mundo
          </h2>
          <h2 class="a">INFORMACIÓN BÁSICA SOBRE PROTECCIÓN DE DATOS</h2>
          <p>
            Para poder usar y registrarte en la aplicación debes ser mayor de 14
            años. Si quieres suscribirte a los servicios de pago debes ser mayor
            de 18 años. El responsable de tus datos es{" "}
            <a class="a">mimexicotv.com</a>, quien usará tus datos en calidad de
            responsable y los administrará dentro de está plataforma de
            videos.**
          </p>
          <h3 class="a">¿Para qué utilizaremos tus datos?</h3>
          <p>
            Con la aceptación de las condiciones de uso, mimexicotv.com tratará
            los datos que facilites para prestarte los servicios que se ofrecen
            para acceso a la plataforma a través de sus distintas formas de
            acceso.
          </p>
          <p>
            Con tu aprobación podremos usar los datos para estadísticas que
            permitan analizar el uso y funcionamiento del servicio con
            información específica y para realizar mejoras en la calidad de este
            medio.
          </p>
          <p>
            En cualquier momento puedes solicitarnos información adicional sobre
            el uso y tratamiento de tus datos personales; y puedes ejercer tus
            derechos conforme se menciona en la Política de Privacidad.
          </p>
          <p>
            Antes de continuar te pedimos que leas nuestra{" "}
            <a class="a">Política de Privacidad</a> y{" "}
            <a class="a">Términos de Uso</a>
          </p>
          <div class="check">
            <label>
              <input
                id="check"
                type="checkbox"
                class="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26px"
                height="23px"
              >
                <path
                  class="path-back"
                  d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"
                />
                <path
                  class="path-moving"
                  d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"
                />
              </svg>
            </label>
            <h5>
              Acepto la política de privacidad y los términos y condiciones
            </h5>
            <hr/>
            <div class="contenedor-flex">
              <div class="contenedor-grid">
                <Link to="/login">
                <input
                  class="btnPoliticas"
                  value="Volver al login"
                  type="submit"
                />
                </Link>
                <Link to="/registroPasodos">
                <input
                  className={`btnPoliticas ${isChecked ? '' : 'disabled'}`}
                  value="Aceptar y continuar"
                  type="submit"
                  disabled={!isChecked}
                  
                />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
