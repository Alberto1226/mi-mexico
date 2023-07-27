import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faUser,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { Form, Badge } from "react-bootstrap"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import logo from "../../assets/img/MXtvMas.png";
import {
  getTokenApi,
  obtenidusuarioLogueado,
  logoutApi,
} from "../../api/auth"
import { obtenerUsuario } from "../../api/usuarios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { map } from "lodash"

export function NavPrincipal({ listarSeries, listarPeliculas, listarDocumentales }) {
  const listaMultimedia = listarSeries.concat(listarPeliculas, listarDocumentales);
  console.log(listaMultimedia)
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const redirecciona = useNavigate();

  //Para cerrar la sesion
  const cerrarSesion = () => {
    logoutApi();
    redirecciona("");
    toast.success("Sesión cerrada");
    window.location.reload();
  }

  const [idUsuario, setIdeUsuario] = useState("");

  const obtenerDatosUsuario = () => {
    try {
      obtenerUsuario(obtenidusuarioLogueado(getTokenApi())).then(response => {
        const { data } = response;
        setIdeUsuario(data._id);
      }).catch((e) => {
        if (e.message === 'Network Error') {
          //console.log("No hay internet")
          toast.error("Conexión al servidor no disponible");
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

  console.log(idUsuario);

  const handleButtonClick = () => {
    setIsInputOpen(true);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsInputOpen(false);
  };

  const filteredItems = listaMultimedia.filter(
    item => item.titulo && item.titulo.toLowerCase() === searchValue.toLowerCase()
  );

  const [id, setId] = useState();
  const [titulo, setTitulo] = useState();
  const [sinopsis, setSinopsis] = useState();
  const [portada, setPortada] = useState();
  const [tipo, setTipo] = useState("");

  const obtenerTotales = () => {
    map(filteredItems, (item, index) => {
      const { id, tipo, titulo, sinopsis, urlPortada } = item
      setId(id)
      setTipo(tipo)
      setTitulo(titulo)
      setSinopsis(sinopsis)
      setPortada(urlPortada)
    })
  }


  useEffect(() => {
    obtenerTotales();
  }, [searchValue]);

  console.log(filteredItems)

  return (
    <>
    
      
        
        <Navbar bg="link" expand="xl" sticky="top" className="navboostrap sticky-top">
        <Container fluid>
          <Navbar.Brand href="#home" className="mexicoLogo" id="logo">
            <img src={logo} alt="" className="logomx" />


          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
         



          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            </Nav>
            <div className="buscar">
              <div className="flex items-center mb-1">
                <Form.Control
                  type="text"
                  value={searchValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  autoFocus
                  className="inputbuscar"
                  placeholder="Buscar..."
                />
              </div>
            </div>
            <div className="botonesnav">

              {
                tipo == "" &&
                (
                  <>
                    <Link>
                      <a className="icon" >
                        <Link to={`/`}><a className="icon">
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </a></Link>

                      </a>
                    </Link>
                  </>
                )
              }

              {
                tipo == "series" &&
                (
                  <>
                    <Link>
                      <a className="icon" >
                        <Link to={`/full?id=${id}&titulo=${titulo}`}><a className="icon">
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </a></Link>

                      </a>
                    </Link>
                  </>
                )
              }

              {
                tipo == "peliculas" &&
                (
                  <>
                    <Link>
                      <a className="icon" >
                        <Link to={`/fullPel?id=${id}&titulo=${titulo}`}><a className="icon">
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </a></Link>

                      </a>
                    </Link>
                  </>
                )
              }

              {
                tipo == "documentales" &&
                (
                  <>
                    <Link>
                      <a className="icon" >
                        <Link to={`/fullDoc?id=${id}&titulo=${titulo}&id2=${id}`}><a className="icon">
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </a></Link>

                      </a>
                    </Link>
                  </>
                )
              }

              <Link to={"/"}>
                <a className="icon">
                  <FontAwesomeIcon icon={faHouse} />
                </a>
              </Link>

              {idUsuario == "" && (
                <>
                  <Link to="/login">
                    <a className="icon">
                      <FontAwesomeIcon icon={faUser} className="userIcon" />
                    </a>
                  </Link>
                </>
              )}

              {idUsuario != "" && (
                <>
                  <a className="icon">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="userIcon"
                      onClick={() => cerrarSesion()}
                    />
                  </a>
                </>
              )}

            </div>
          </Navbar.Collapse>

          </Container>
        </Navbar>

       
      {/**  <section className="header">
      <div className="barraRosa"></div>
      <div className="mexicoLogo">
        <a id="logo" href="#home">
          Mexico
        </a>
      </div>
      <nav className="main-nav"></nav>
      <nav className={`sub-nav ${isInputOpen ? 'open' : ''}`}>
        <Link to={"/"}>
          <a className="icon">
            <FontAwesomeIcon icon={faHouse} />
          </a>
        </Link>
        <a className="icon" onClick={handleButtonClick}>
          {!isInputOpen && (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          )}
        </a>
        <Link to="/login">
          <a className="icon">
            <FontAwesomeIcon icon={faUser} className="userIcon" />
          </a>
        </Link>
        {isInputOpen && (
          <div className="buscar">
            <input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              autoFocus
            />
          </div>
        )}
      </nav>
    </section>*/}
    </>
  );
}

