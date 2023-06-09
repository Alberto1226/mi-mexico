import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../css/login.css";
export function Login() {
  return (
    <>
      <div class="content">
        <div class="container">
          <div class="menu">
            <label>
              Únete a la plataforma de videos que promueve los destinos y
              cultura de México para el mundo
            </label>
          </div>
          <div class="connexion">
            <div class="contact-form">
              <label>Inicio de sesión</label>
              <input placeholder="Usuario" type="text" />
              <br />
              <input placeholder="Contraseña" type="password" />
              <label>
                ¿Olvidaste la contraseña? <a class="a">Haz click aquí</a>
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
              <br />
              <Link to="/">   
                <input class="submit" value="Home" type="submit" />
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
