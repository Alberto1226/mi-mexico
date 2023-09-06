import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faUser,
  faArrowDown,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { Form, Badge } from "react-bootstrap"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import logo from "../../assets/img/MXtvMas.png";
import { useLocation } from "react-router-dom";
import {
  getTokenApi,
  obtenidusuarioLogueado,
  logoutApi,
} from "../../api/auth"
import { obtenerUsuario } from "../../api/usuarios";
import { listarDetallesCategoriasSeries } from "../../api/series";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { map } from "lodash"
import { SwiperCategorias } from "../swiperCategorias/swiperCategorias";

import UserProfile from './perfil';
//GOOGLE
import { googleLogout } from "@react-oauth/google";

//iconos

import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export function NavPrincipal({ listarSeries, listarPeliculas, listarDocumentales, listarSeriesEspeciales }) {
  const listaMultimedia = listarSeries.concat(listarPeliculas, listarDocumentales, listarSeriesEspeciales);
  console.log(listaMultimedia)
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };




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

  /*const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };*/
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);

    // Filtrar sugerencias basadas en la entrada del usuario
    const sugerenciasFiltradas = listaMultimedia.filter((item) =>
      item.titulo.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Actualizar la lista de sugerencias
    setSugerencias(sugerenciasFiltradas);
  };

  const handleSugerenciaSeleccionada = (sugerencia) => {
    // Llenar el campo de búsqueda con la sugerencia seleccionada
    setSearchValue(sugerencia.titulo);

    // Limpiar la lista de sugerencias y restablecer la selección
    setSugerencias([]);
    setSelectedSuggestion(null);
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


  /**
   * google
   */

  const location = useLocation();
  const userData = location.state && location.state.userData;

  /**
   * CERRAR SESION GOOGLE
   */
  const navigate = useNavigate();
  const handleLogoutSuccess = () => {
    googleLogout();
    console.log("Sesión de Google cerrada correctamente");
    toast.success("Sesión de Google cerrada correctamente");
    navigate("/");
  };

  return (
    <>
      <Navbar bg="link" expand="xl" sticky="top" className="navboostrap sticky-top">

        <Container fluid>
          <Link to={`/home2`}>
            <Navbar.Brand href="#home" className="mexicoLogo" id="logo">
              <a href="">
                <img src={logo} alt="" className="logomx" />
              </a>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <div className="position-relative buscar">
              <div >
                <div className="flex items-center mb-1">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    autoFocus
                    className="inputbuscar"
                    placeholder="Buscar..."
                  />
                </div>
              </div>
              {sugerencias.length > 0 && (
                <div className="position-absolute mt-2">
                  <ul className="list-group">
                    {sugerencias.map((sugerencia) => (
                      <li
                        key={sugerencia.id}
                        className={`list-group-item ${sugerencia === selectedSuggestion ? 'active' : ''
                          }`}
                        onClick={() => handleSugerenciaSeleccionada(sugerencia)}
                      >
                        {sugerencia.titulo}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="botonesnav">
              <a className="icon" onClick={() => handleShow()}>
                <FontAwesomeIcon
                  icon={faArrowDown}
                />
              </a>
              <Modal
                size="xl"
                show={show}
                onHide={handleClose}
                dialogClassName="modal-90w"
                backdrop="static"
                keyboard={false}
                className="mdlCategorias"
              >
                <Modal.Header closeButton className="modalcategory">

                </Modal.Header>
                <Modal.Body>
                  <SwiperCategorias />
                </Modal.Body>
              </Modal>


              {/**  <Link>
                <a className="icon" >
                  <Link to={`/`}><a className="icon">
                    <FontAwesomeIcon icon={faArrowDown} />
                  </a></Link>

                </a>
              </Link>*/}
              {
                tipo == "" &&
                (
                  <>
                    <Link>

                      <Link to={`/home2`}><a className="icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </a></Link>


                    </Link>
                  </>
                )
              }

              {
                tipo == "series" &&
                (
                  <>
                    <Link>

                      <Link to={`/full?id=${id}&titulo=${titulo}`}><a className="icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </a></Link>


                    </Link>
                  </>
                )
              }

              {
                tipo == "seriesEspeciales" &&
                (
                  <>
                    <Link>

                      <Link to={`/fullSeriesEspeciales?id=${id}&titulo=${titulo}`}><a className="icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </a></Link>


                    </Link>
                  </>
                )
              }

              {
                tipo == "peliculas" &&
                (
                  <>
                    <Link>

                      <Link to={`/fullPel?id=${id}&titulo=${titulo}`}><a className="icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </a></Link>


                    </Link>
                  </>
                )
              }

              {
                tipo == "especiales" &&
                (
                  <>
                    <Link>

                      <Link to={`/fullEsp?id=${id}&titulo=${titulo}`}><a className="icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </a></Link>


                    </Link>
                  </>
                )
              }

              {
                tipo == "documentales" &&
                (
                  <>
                    <Link>

                      <Link to={`/fullDoc?id=${id}&titulo=${titulo}&id2=${id}`}><a className="icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </a></Link>


                    </Link>
                  </>
                )
              }

              <Link to={"/home2"}>
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
                  <a className="icon" onClick={() => cerrarSesion()}>

                    <FontAwesomeIcon
                      icon={faUser}
                      className="userIcon"

                    />
                  </a>
                </>
              )}

            </div>
          </Navbar.Collapse>

        </Container>
      </Navbar>



    </>
  );
}

