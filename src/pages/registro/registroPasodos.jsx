import { Link } from "react-router-dom";

export function RegistroPasodos() {
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
              <h3>Registro</h3>
                <br/>
              <input placeholder="Nombre" type="text" />
              <br />
              <input placeholder="Email" type="email" />
              <br />
              <input placeholder="Contraseña" type="password" />
              <br />
              <input placeholder="Contraseña" type="password" />
              <label>
                
              </label>
              <input class="submit" value="Enviar" type="submit" />
              
            </div>

            <hr />
            <div>
              
              <Link to="/login">   
                <input class="submit" value="Regresar" type="submit" />
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
