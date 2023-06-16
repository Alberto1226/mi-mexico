import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../../css/dashboard.css";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Nav, NavDropdown } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { TablaUsuarios } from "../../componentes/usuarios/tablaUsuarios";
import { Documentales } from "../../componentes/contenidos/documentales";
import { Series } from "../../componentes/contenidos/series";
import { Peliculas } from "../../componentes/contenidos/peliculas";

export function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("home");
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

  //menu

  const handleMenuSelect = (menu) => {
    setActiveMenu(menu);
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
          <hr />
          <Nav className="flex-column">
            <Nav.Item className="listNav">
              <Nav.Link eventKey="home" active={activeMenu === "home"}>
              <Link to="/">
                Inicio
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="listNav">
              <Nav.Link eventKey="news" active={activeMenu === "news"}>
                <Link to="/usuariotb">
                  <Dropdown.Item onClick={handleClick}>Usuarios</Dropdown.Item>
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="listNav">
              <Nav.Link eventKey="news" active={activeMenu === "news"}>
                <Dropdown.Item onClick={handleClick3}>Peliculas</Dropdown.Item>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="listNav">
              <Nav.Link eventKey="news" active={activeMenu === "news"}>
                <Dropdown.Item onClick={handleClick1}>
                  Documentales
                </Dropdown.Item>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="listNav">
              <Nav.Link eventKey="news" active={activeMenu === "news"}>
                <Dropdown.Item onClick={handleClick2}>
                  Insertar Nueva Serie
                </Dropdown.Item>
              </Nav.Link>
            </Nav.Item>
            <NavDropdown
              title="Series Existentes"
              id="series-dropdown"
              active={activeMenu.startsWith("series")}
              onSelect={handleMenuSelect}
              className="listNav"
            >
              <NavDropdown.Item eventKey="serie1">Hidalgo</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
        <div class="main bg-light">
          <div class="barra"></div>

          {showComponent && (
            <div>
              <TablaUsuarios />
            </div>
          )}
          {showComponent1 && (
            <div>
              <Documentales />
            </div>
          )}
          {showComponent2 && (
            <div>
              <Series />
            </div>
          )}
          {showComponent3 && (
            <div>
              <Peliculas />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
