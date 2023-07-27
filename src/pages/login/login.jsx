import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../css/login.css";
import { useState, useEffect } from 'react';
import { login, setTokenApi } from "../../api/auth";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { Spinner, Button, Form, Image, Row, Col } from "react-bootstrap";
import { obtenerUsuario } from "../../api/usuarios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import img from "../../assets/img/MXtvMas.png"

export function Login({ setRefreshCheckLogin }) {
  const [formData, setFormData] = useState(initialFormValue)
  const [signInLoading, setSignInLoading] = useState(false)

  const [mostrarPassword, setMostrarPassword] = useState(false)
  const togglePasswordVisiblity = () => {
    setMostrarPassword((val) => !val)
  }

  // Para definir el enrutamiento
  const enrutamiento = useNavigate();

  const cancelarRegistro = () => {
    enrutamiento("/");
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!formData.usuario || !formData.password) {
      toast.warning('Completa todos los campos del formulario.')
    } else {
      setSignInLoading(true)
      try {
        const dataTemp = {
          email: formData.usuario,
          contraseña: formData.password
        }
        login(dataTemp)
          .then((response) => {
            const {
              data: { token },
            } = response
            setTokenApi(token)
            const { _ } = jwtDecode(token)
            const idUdsuario = _
            try {
              obtenerUsuario(idUdsuario).then(response => {
                const { data } = response;
                //setRefreshCheckLogin(true)
                toast.success('Bienvenido ' + data.nombre)
                cancelarRegistro()
              }
              )
            } catch (ex) {
              toast.error('Error al obtener el usuario')
            }
          })
          .catch((ex) => {
            if (ex.message === 'Network Error') {
              toast.error('Conexión al servidor no disponible')
              setSignInLoading(false)
            } else {
              if (ex.response && ex.response.status === 401) {
                const { mensaje } = ex.response.data
                toast.error(mensaje)
                setSignInLoading(false)
              }
            }
          })
      } catch (ex) {
        toast.error('Error al iniciar sesión')
        setSignInLoading(false)
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
          <div class="menu">
            <img src={img} alt="" className="imglogin" />
            <label>
              Únete a la plataforma de videos que promueve los destinos y
              cultura de México para el mundo
            </label>
          </div>

          <div class="connexion">
            <Form onSubmit={onSubmit} onChange={onChange}>
              <div class="contact-form">
                <label>Inicio de sesión</label>
                <Form.Control
                  placeholder="Usuario"
                  name="usuario"
                  defaultValue={formData.usuario}
                  type="text"
                />
                <br />
                <div className="flex items-center mb-6">
                  <Form.Control
                    placeholder="Contraseña"
                    type={mostrarPassword ? 'text' : 'password'}
                    name="password"
                    defaultValue={formData.password}
                  />
                  <FontAwesomeIcon
                    title="Mostrar contraseña"
                    className="cursor-pointer py-2 -ml-6"
                    icon={!mostrarPassword ? faEyeSlash : faEye}
                    onClick={togglePasswordVisiblity}
                  />
                </div>
                <label>
                  ¿Olvidaste la contraseña?
                  <Link to="/recuperarPass">
                    <a class="a">Haz click aquí</a>
                  </Link>
                </label>
                <input class="submit" value="Entrar" type="submit" />
                <label>
                  Al pulsar ''Entrar'' usted confirma que es mayor de 18 años y
                  que acepta los
                </label>
                <a class="a">Términos de Uso </a>|
                <a class="a"> Política de Privacidad</a>
              </div>

              <hr />
              <div>
                <h3>¿Todavía sin cuenta?</h3>
                <Link to="/registro">
                  <input class="submit" value="Crear tu cuenta" type="submit" />
                </Link>
                
                <Link to="/">
                  <input class="submit" value="Home" type="submit" />
                </Link>
                <label>
                  © 2022-2023 Todos los Derechos Reservados por mxtvmas®
                  mxtvmas®
                </label>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

function initialFormValue() {
  return {
    usuario: '',
    password: '',
  }
}
