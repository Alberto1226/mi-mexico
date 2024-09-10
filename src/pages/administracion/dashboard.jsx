import { Link } from "react-router-dom";
import "../../css/dashboard.css";
import { Nav, NavDropdown } from "react-bootstrap";
import { TblUsers } from "../../componentes/tables/tableUsuarios";
import TblEspeciales from "../../componentes/tables/tablaEspeciales";
import TblDocumentales from "../../componentes/tables/tablaDocumentales";
import TblSeries from "../../componentes/tables/tablaSeries";
import TblSeriesEspeciales from "../../componentes/tables/tablaSeriesEspeciales";
import TblPeliculas from "../../componentes/tables/tablePeliculas";
import TblCategorias from "../../componentes/tables/tableCategorias";
import TblPatrocinadores from "../../componentes/tables/tablaPatrocinadores";
import React, { useState, useEffect } from "react";
import { Load } from "../../componentes/load/load";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/img/MXtvMas.png";
import logo2 from "../../assets/img/MX.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { obtenerUsuario } from "../../api/usuarios";
import {
  getTokenApi,
  obtenidusuarioLogueado,
  logoutApi,
} from "../../api/auth";
import { NavPrincipal } from "../../componentes/navBar/nav";
import { Error } from "../error/error404";
import BtnApagarDirecto from "../../componentes/ModalLive/BotonApagarDirecto";


export function Dashboard() {

  const [tipoUsuario, setTipoUsuario] = useState();

  const obtenerDatosUsuario = () => {
    try {
      obtenerUsuario(obtenidusuarioLogueado(getTokenApi())).then(response => {
        const { data } = response;
        setTipoUsuario(data.admin);
      }).catch((e) => {
        if (e.message === 'Network Error') {
          //console.log("No hay internet")
          console.log("Conexión al servidor no disponible");
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

  const [listarSer, setListSeries] = useState([]);
  const [listarPelicula, setListPelicula] = useState([]);
  const [listarDocumentales, setListDocumentales] = useState([]);
  const [listarSerEsp, setListSeriesEspeciales] = useState([]);
  const [listarEspeciales, setListEspeciales] = useState([]);

  const [activeMenu, setActiveMenu] = useState("home");
  const [showComponent, setShowComponent] = useState(false);
  const [showComponent1, setShowComponent1] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);
  const [showComponent3, setShowComponent3] = useState(false);
  const [showComponent4, setShowComponent4] = useState(false);
  const [showComponent5, setShowComponent5] = useState(false);
  const [showComponent6, setShowComponent6] = useState(false);
  const [showComponent7, setShowComponent7] = useState(false);
  const [showComponent8, setShowComponent8] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(false);
    setShowComponent4(false);
    setShowComponent5(false);
    setShowComponent6(false);
    setShowComponent7(false);
    setShowComponent8(false);
  };
  const handleClick1 = () => {
    setShowComponent(false);
    setShowComponent1(true);
    setShowComponent2(false);
    setShowComponent3(false);
    setShowComponent4(false);
    setShowComponent5(false);
    setShowComponent6(false);
    setShowComponent8(false);
    setShowComponent7(false);
  };
  const handleClick2 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(true);
    setShowComponent3(false);
    setShowComponent4(false);
    setShowComponent5(false);
    setShowComponent6(false);
    setShowComponent8(false);
    setShowComponent7(false);
  };
  const handleClick3 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(true);
    setShowComponent4(false);
    setShowComponent5(false);
    setShowComponent6(false);
    setShowComponent8(false);
    setShowComponent7(false);
  };
  const handleClick4 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(false);
    setShowComponent4(true);
    setShowComponent5(false);
    setShowComponent6(false);
    setShowComponent8(false);
    setShowComponent7(false);
  };

  const handleClick5 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(false);
    setShowComponent4(false);
    setShowComponent5(true);
    setShowComponent6(false);
    setShowComponent8(false);
    setShowComponent7(false);
  };

  const handleClick6 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(false);
    setShowComponent4(false);
    setShowComponent5(false);
    setShowComponent6(true);
    setShowComponent8(false);
    setShowComponent7(false);
  };

  const handleClick7 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(false);
    setShowComponent4(false);
    setShowComponent5(false);
    setShowComponent6(false);
    setShowComponent7(true);
    setShowComponent8(false);

  };

  const handleClick8 = () => {
    setShowComponent(false);
    setShowComponent1(false);
    setShowComponent2(false);
    setShowComponent3(false);
    setShowComponent4(false);
    setShowComponent5(false);
    setShowComponent6(false);
    setShowComponent7(false);
    setShowComponent8(true);

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
      {
        (tipoUsuario == "true") &&
        (
          <>
            <ToastContainer />
            {loading && <Load />}
            <NavPrincipal
              listarDocumentales={listarDocumentales}
              listarEspeciales={listarEspeciales}
              listarPeliculas={listarPelicula}
              listarSeries={listarSer}
              listarSeriesEspeciales={listarSerEsp}
            />
            <div class="contenedor">
              <div class="sidebar ancho">
                

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
                    <Nav.Link className="aa" eventKey="home" active={activeMenu === "user"}>
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
                  <Nav.Item className="listNav" onClick={handleClick6}>
                    <Nav.Link className="aa" eventKey="news" active={activeMenu === "news"}>
                      Especiales
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="listNav" onClick={handleClick2}>
                    <Nav.Link className="aa" eventKey="news" active={activeMenu === "news"}>
                      Series
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="listNav" onClick={handleClick7}>
                    <Nav.Link className="aa" eventKey="news" active={activeMenu === "news"}>
                      Series Especiales
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="listNav" onClick={handleClick8}>
                    <Nav.Link className="aa" eventKey="news" active={activeMenu === "news"}>
                      Lives
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div class="main bg-light">
                

                {showComponent && (
                  <div>
                    <TblUsers />
                  </div>
                )}
                {showComponent1 && (
                  <div>
                    <TblDocumentales />
                  </div>
                )}
                {showComponent2 && (
                  <div>
                    <TblSeries />
                  </div>
                )}
                {showComponent3 && (
                  <div>
                    <TblPeliculas />
                  </div>
                )}
                {showComponent4 && (
                  <div>
                    <TblCategorias />
                  </div>
                )}
                {showComponent5 && (
                  <div>
                    <TblPatrocinadores />
                  </div>
                )}
                {showComponent6 && (
                  <div>
                    <TblEspeciales />
                  </div>
                )}
                {showComponent7 && (
                  <div>
                    <TblSeriesEspeciales />
                  </div>
                )}
                {showComponent8 && (
                  <div>
                    <BtnApagarDirecto />
                  </div>
                )}
              </div>
            </div>
          </>
        )
      }
      {
        (tipoUsuario !== "true") &&
        (
          <>
            <Error />
          </>
        )
      }
    </>
  );
}
