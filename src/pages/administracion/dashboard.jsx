import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../../css/dashboard.css";
import Dropdown from "react-bootstrap/Dropdown";
import { TablaUsuarios } from "../../componentes/usuarios/tablaUsuarios";
import { Documentales } from "../../componentes/contenidos/documentales";
import { Series } from "../../componentes/contenidos/series";
import { Peliculas } from "../../componentes/contenidos/peliculas";

export function Dashboard() {
  const [showComponent, setShowComponent] = useState(false);
  const [showComponent1, setShowComponent1] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);
  const [showComponent3, setShowComponent3] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(false);
  };
  const handleClick1 = () => {
    setShowComponent(false);
    setShowComponent1(true);
    setShowComponent2(false);
    setShowComponent3(false);
  };
  const handleClick2 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(true);
    setShowComponent3(false);
  };
  const handleClick3 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(true);
  };

  return (
    <>
      <div class="contenedor">
        <div class="sidebar ancho">
          <div class="logo text-warning">
            <i class="fa fa-ravelry fa-2x logo-sym"></i>
            <span class="logo-texto">Mi México</span>
          </div>

          <div class="user">
            <img
              src="https://source.unsplash.com/VM42AzcEBdI/50x50/?faces"
              alt=""
            />
            <span class="user-nombre">Administrador</span>
          </div>

          <nav class="menu-nav">
            <ul>
              <li class="menu-titles">principal</li>
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                >
                  Administracion
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link to="/usuariotb">
                    <Dropdown.Item onClick={handleClick}>
                      Usuarios
                    </Dropdown.Item>
                  </Link>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <li class="menu-titles">Contenidos</li>
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                >
                  Contenidos
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleClick3}>
                    Peliculas
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleClick2}>Series</Dropdown.Item>
                  <Dropdown.Item onClick={handleClick1}>
                    Documentales
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </nav>
        </div>
        <div class="main bg-light">
          <div class="barra">
            
          </div>

          {showComponent && (
            <div>
              <h2>Componente Cargado</h2>
              <TablaUsuarios />
            </div>
          )}
          {showComponent1 && (
            <div>
              <h2>Componente Cargado</h2>
              <Documentales />
            </div>
          )}
          {showComponent2 && (
            <div>
              <h2>Componente Cargado</h2>
              <Series />
            </div>
          )}
          {showComponent3 && (
            <div>
              <h2>Componente Cargado</h2>
              <Peliculas />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
