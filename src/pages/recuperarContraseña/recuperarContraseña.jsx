import React, { useState } from "react";
import { Link } from "react-router-dom";

export function RecuperarContraseña() {
  const [email, setEmail] = useState("");
  const [isInputEnabled, setIsInputEnabled] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsInputEnabled(event.target.value === "admin@gmail.com");
  };
  return (
    <>
      <div class="content">
        <div class="container">
          <div class="menu"></div>
          <label class="lblRecPass">
            Para recuperar su contraseña ingrese su email
          </label>
          <input
            type="text"
            className="recuperarPass"
            value={email}
            onChange={handleEmailChange}
          />
          <hr />
          {isInputEnabled && (
            <div className="desabilitarRecPass">
              <label className="lblRecPass">Ingrese su nueva contraseña</label>
              <input
                type="text"
                className="newPass"
                disabled={!isInputEnabled}
              />

              <label className="lblRecPass">Confirme contraseña</label>
              <input
                type="text"
                className="newPassConfirm"
                disabled={!isInputEnabled}
              />
              <br />
              <input class="submit" value="Cambiar contraseña" type="submit" />
            </div>
          )}
          <Link to="/">
            <input class="submit" value="Home" type="submit" />
          </Link>
        </div>
      </div>
    </>
  );
}
