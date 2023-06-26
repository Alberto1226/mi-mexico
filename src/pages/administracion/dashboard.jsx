import { Link } from "react-router-dom";
import "../../css/dashboard.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Nav, NavDropdown } from "react-bootstrap";
import { TablaUsuarios } from "../../componentes/usuarios/tablaUsuarios";
import { Documentales } from "../../componentes/contenidos/documentales";
import { Series } from "../../componentes/contenidos/series";
import { Peliculas } from "../../componentes/contenidos/peliculas";
import { Categorias } from "../../componentes/categoriasVideos/categproas";
import { Patorcinadores } from "../../componentes/patrocinadores/patrocinadores";
import React, { useState, useEffect } from "react";
import { Load } from "../../componentes/load/load";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/img/MXtvMas.png"
import logo2 from "../../assets/img/MX.png"
export function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [showComponent, setShowComponent] = useState(false);
  const [showComponent1, setShowComponent1] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);
  const [showComponent3, setShowComponent3] = useState(false);
  const [showComponent4, setShowComponent4] = useState(false);
  const [showComponent5, setShowComponent5] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(false);
    setShowComponent4(false);
    setShowComponent5(false);
  };
  const handleClick1 = () => {
    setShowComponent(false);
    setShowComponent1(true);
    setShowComponent2(false);
    setShowComponent3(false);
    setShowComponent4(false);
    setShowComponent5(false);
  };
  const handleClick2 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(true);
    setShowComponent3(false);
    setShowComponent4(false);
    setShowComponent5(false);
  };
  const handleClick3 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(true);
    setShowComponent4(false);
    setShowComponent5(false);
  };
  const handleClick4 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(false);
    setShowComponent4(true);
    setShowComponent5(false);
  };

  const handleClick5 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(false);
    setShowComponent4(false);
    setShowComponent5(true);
  };

  //menu

  const handleMenuSelect = (menu) => {
    setActiveMenu(menu);
  };
  //load
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <ToastContainer />
      {loading && <Load />}
      <div class="contenedor">
        <div class="sidebar ancho">
          <div class="logo text-warning">
            <i class="fa fa-ravelry fa-2x logo-sym"></i>
            <span class="logo-texto"><img src={logo} alt="" /></span>
          </div>

          <div class="user">
            <img
              src={logo2}
              alt=""
            />
            <span class="user-nombre">Administrador</span>
          </div>
          
          <hr />
          <Nav className="flex-column">
            <Nav.Item className="listNav">
              <Nav.Link className="aa" eventKey="home" active={activeMenu === "home"}>
                <Link to="/">Inicio</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="listNav" onClick={handleClick}>
              <Nav.Link className="aa" eventKey="user" active={activeMenu === "user"}>
                Usuarios
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="listNav" onClick={handleClick4}>
              <Nav.Link className="aa" eventKey="cat" active={activeMenu === "cat"}>
                Categorias
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="listNav" onClick={handleClick5}>
              <Nav.Link className="aa" eventKey="news" active={activeMenu === "news"}>
                Patrocinadores
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="listNav" onClick={handleClick3}>
              <Nav.Link className="aa" eventKey="news" active={activeMenu === "news"}>
                Peliculas
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="listNav" onClick={handleClick1}>
              <Nav.Link className="aa" eventKey="news" active={activeMenu === "news"}>
                Documentales
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="listNav" onClick={handleClick2}>
              <Nav.Link className="aa" eventKey="news" active={activeMenu === "news"}>
                Insertar Nueva Serie
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
          {showComponent4 && (
            <div>
              <Categorias />
            </div>
          )}
          {showComponent5 && (
            <div>
              <Patorcinadores />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
