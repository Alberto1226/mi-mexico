import { Link } from "react-router-dom";
import { Button, Col, Form, Row, Spinner, Container, Alert, Badge } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { registraUsuarios } from "../../api/usuarios";
import { useNavigate } from "react-router-dom";

export function RegistroPasodos() {

  const [formData, setFormData] = useState(initialFormValue());
  const [loading, setLoading] = useState(false);

  // Para definir el enrutamiento
  const enrutamiento = useNavigate();

  const cancelarRegistro = () => {
    enrutamiento("/");
  }

  const onSubmit = e => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.contraseña || !formData.confirmarContraseña) {
      toast.warning("Completa el formulario");
    } else {
      if (formData.contraseña != formData.confirmarContraseña) {
        toast.warning("Las contraseñas no coinciden");
      } else {
        try {
          setLoading(true);
          // Sube a cloudinary la imagen principal del producto

          const dataTemp = {
            nombre: formData.nombre,
            email: formData.correo,
            contraseña: formData.contraseña,
            estado: "true",
            verificacion: "false",
          }
          registraUsuarios(dataTemp).then(response => {
            const { data } = response;
            toast.success(data.mensaje);
            cancelarRegistro()
          })
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData)

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="menu">
            <label>
              Únete a la plataforma de videos que promueve los destinos y
              cultura de México para el mundo
            </label>
          </div>
          <div className="connexion">
            <div className="contact-form">
              <Form onSubmit={onSubmit} onChange={onChange}>
                <h3>Registro</h3>
                <br />
                <Form.Control
                  placeholder="Nombre"
                  type="text"
                  name="nombre"
                  defaultValue={formData.nombre}
                />
                <br />
                <Form.Control
                  placeholder="Email"
                  type="email"
                  name="correo"
                  defaultValue={formData.correo}
                />
                <br />
                <Form.Control
                  placeholder="Contraseña"
                  type="password"
                  name="contraseña"
                  defaultValue={formData.contraseña}
                />
                <br />
                <Form.Control
                  placeholder="Confirmar contraseña"
                  type="password"
                  name="confirmarContraseña"
                  defaultValue={formData.confirmarContraseña}

                />
                <label>

                </label>
                <input className="submit" value="Enviar" type="submit" />
              </Form>
            </div>

            <hr />
            <div>

              <Link to="/login">
                <input className="submit" value="Regresar" type="submit" />
              </Link>
              <label>
                © 2022-2023 Todos los Derechos Reservados por mimexico®
                mimexicotv®
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function initialFormValue() {
  return {
    nombre: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: ""
  }
}
