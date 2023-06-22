import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner, Button, Form, Image, Row, Col } from "react-bootstrap";
import { obtenerUsuarioPorCorreo, actualizarContraseña } from "../../api/usuarios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function RecuperarContraseña() {
  const [email, setEmail] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [verificarEmail, setVerificarEmail] = useState("");
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [formData, setFormData] = useState(initialFormValue);
  const [loading, setLoading] = useState(false)

  // Para definir el enrutamiento
  const enrutamiento = useNavigate();

  const cancelarRegistro = () => {
    enrutamiento("/login");
  }

  const obtenerCorreo = () => {
    try {
      obtenerUsuarioPorCorreo(email).then(response => {
        const { data } = response;
        // console.log(data)
        const { _id, email } = data;
        setVerificarEmail(email);
        setIdUsuario(_id);
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    obtenerCorreo();
  }, [email]);

  console.log(verificarEmail)

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsInputEnabled(event.target.value === verificarEmail)
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!formData.contraseña || !formData.confirmarContraseña) {
      toast.warning("Completa el formulario");
    } else {
      if (formData.contraseña != formData.confirmarContraseña) {
        toast.warning("Las contraseñas no coinciden");
      } else {
        try {
          setLoading(true);
          // Sube a cloudinary la imagen principal del producto

          const dataTemp = {
            contraseña: formData.contraseña,
          }
          actualizarContraseña(idUsuario, dataTemp).then(response => {
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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div class="content">
        <div class="container">
          <div class="menu"></div>
          <label class="lblRecPass">
            Para recuperar su contraseña ingrese su email
          </label>
          <Form onChange={onChange} onSubmit={onSubmit}>
            <input
              type="text"
              className="recuperarPass"
              value={email}
              name="email"
              onChange={handleEmailChange}
            />
            <hr />
            {isInputEnabled && (
              <div className="desabilitarRecPass">
                <label className="lblRecPass">Ingrese su nueva contraseña</label>
                <Form.Control
                  type="password"
                  className="newPass"
                  name="contraseña"
                  defaultValue={formData.contraseña}
                  disabled={!isInputEnabled}
                />

                <label className="lblRecPass">Confirme contraseña</label>
                <Form.Control
                  type="password"
                  className="newPassConfirm"
                  name="confirmarContraseña"
                  defaultValue={formData.confirmarContraseña}
                  disabled={!isInputEnabled}
                />
                <br />
                <input class="submit" value="Cambiar contraseña" type="submit" />
              </div>
            )}
            <Link to="/">
              <input class="submit" value="Home" type="submit" />
            </Link>
          </Form>
        </div>

      </div>

    </>
  );
}

function initialFormValue() {
  return {
    contraseña: '',
    confirmarContraseña: '',
  }
}
