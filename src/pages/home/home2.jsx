//componentes
import { NavPrincipal } from "../../componentes/navBar/nav";
import { SwiperHeader } from "../../componentes/swiperHeader/swiper";
import { SwiperPeliculas } from "../../componentes/swiperPeliculas/swiperPeliculas";
import { FooterApp } from "../../componentes/footer/footer";
import { SwiperPatrocinadores } from "../../componentes/swiperPatrocinadores/swPatrocinadores";
import { Load } from "../../componentes/load/load";
import { Apple } from "../../componentes/cardsapple/cardsapple";
//mas vistos
import { SwiperMasVistos } from "../../componentes/swiperMasVistos/swMasvistos";
import { SwiperMasVistosSer } from "../../componentes/swiperMasVistosSeries/swMasVistosSeries";
import { SwiperMasVistosDoc } from "../../componentes/swiperMasVistosDocumentales/swMasVistosDocumentales";
//ver mas
import { VerMas } from "../../componentes/vermas/vermas";
import { VerMasD } from "../../componentes/vermasDocumentales/verMasDocumentales";
import { VerMasP } from "../../componentes/vermasPeliculas/vermasPeliculas";
import { LoadVideo } from "../../componentes/loadVideo/loadVideo";
import { SwiperPatrocinadoresN2 } from "../../componentes/swiperPartocinadorNivel2/swiperNivel2";
import { SwiperPatrocinadoresN3 } from "../../componentes/swiperPatNivel3/swiperNivel3";
import { SwiperPeliculasRecomendadas } from "../../componentes/swiperRecomendado/swiperRecomendados";
import { SwiperEspeciales } from "../../componentes/swiperEspeciales/swiperEspeciales";
import { SwiperEspeciales2 } from "../../componentes/swiperEspeciales2/swiperEspeciales2";
import { SwiperCervantino } from "../../componentes/swiperCervantino/swiperCervantino";
import imgSwiper from "../../assets/img/1.png";
import "../../css/header.css";
import "../../css/cards.css";
import "../../css/cardPatconiadores.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { listarSeries } from "../../api/series";
import { listarPeliculas } from "../../api/peliculasListar";
//imagenes
import portada2 from "../../assets/img/PORTADA2.jpg";
import { Especiales3 } from "../../componentes/especiales3/especiales3";

//GOOGLE
import { googleLogout } from "@react-oauth/google";

//iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export function Home2() {
  const [listarDocumentales, setListDocumentales] = useState([]);

  const obtenerDocumentales = () => {
    try {
      listarPeliculas("documentales")
        .then((response) => {
          const { data } = response;

          if (!listarDocumentales && data) {
            setListDocumentales(formatModelPeliculas(data));
          } else {
            const datosDoc = formatModelPeliculas(data);
            setListDocumentales(datosDoc);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerDocumentales();
  }, []);

  const [listarPelicula, setListPelicula] = useState([]);

  const obtenerPeliculas = () => {
    try {
      listarPeliculas("peliculas")
        .then((response) => {
          const { data } = response;

          if (!listarPelicula && data) {
            setListPelicula(formatModelPeliculas(data));
          } else {
            const datosPel = formatModelPeliculas(data);
            setListPelicula(datosPel);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerPeliculas();
  }, []);

  const [listarSer, setListSeries] = useState([]);

  const obtenerSeries = () => {
    try {
      listarSeries()
        .then((response) => {
          const { data } = response;

          if (!listarSer && data) {
            setListSeries(formatModelSeries(data));
            console.log(data);
          } else {
            const datosSer = formatModelSeries(data);
            setListSeries(datosSer);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerSeries();
  }, []);

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

  //ver mas
  const [mostrarComponentes, setMostrarComponentes] = useState(false);

  const toggleComponentes = () => {
    setMostrarComponentes(!mostrarComponentes);
  };
  return (
    <>
      
      <div>
        <ToastContainer />
        <div>
          {userData && (
            <div className="user-profile">
              <img
                src={userData.picture}
                alt="Imagen de perfil"
                className="profile-image"
              />
              <div className="user-info">
                <p className="user-name">
                  {userData.name}, Bienvenido a MXTVMAS{" "}
                </p>
              </div>

              <button className="logout-button" onClick={handleLogoutSuccess}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Salir
              </button>
            </div>
          )}
        </div>
        <NavPrincipal
          listarDocumentales={listarDocumentales}
          listarPeliculas={listarPelicula}
          listarSeries={listarSer}
        />

        <div className="swvideoheader">
          <SwiperHeader
            img={imgSwiper}
            videoh={"https://www.mxtvmas.com:8443/mimexico/peliculas/cerro.mp4"}
          />
        </div>
         <SwiperCervantino titulo={"Estrenos"} />
        {/*<img src={portada2} alt="" className="especialespor"/>*/}
        <SwiperEspeciales titulo={"Especiales"} />
        <hr />
        <Especiales3 titulo={"Series"} />
        <hr />
        {/*userData && (
                    <div>
                      <img src={userData.imageUrl} alt="Imagen de perfil" />
                      <p>Nombre: {userData.name}</p>
                    </div>
        )*/}
        {/*<Apple titulo={""}/>*/}

        {/**<SwiperPeliculasRecomendadas titulo={"Recomendados"} /> */}

        <SwiperPeliculas titulo={""} />
        {/*<Especiales3 titulo={"Series"}/>
        <hr/>
        <div className="margindiv">
        <h4>Series +</h4>
        </div>
        <VerMas />
        <hr />*/}
        {/** <SwiperMasVistos titulo={"Top Peliculas mas vistas"}/>
        <hr />
        <SwiperMasVistosSer titulo={"Top Series mas vistas"}/>
        <hr/>
        <SwiperMasVistosDoc titulo={"Top documentales mas vistas"}/>
        <hr/>*/}
        {/** <section class="link">
          <div class="patrocinadores">
            <SwiperPatrocinadoresN2 />
          </div>
        </section>*/}
        {/*<hr />
        <SwiperPeliculas titulo={"Reportajes"} />*/}

        {/** 
        <SwiperHeader img={imgSwiper} videoh={"https://www.mxtvmas.com:8443/mimexico/vinicio/teotihuacan.mp4"}/>
        */}
        <hr />
        <div>
          <div className="margindiv">
            <h4>
              Ver mas
              <button className="ver-mas-button" onClick={toggleComponentes}>
            +
          </button>
            </h4>
          </div>
          <div
            className={`componentes-container ${
              mostrarComponentes ? "mostrar" : ""
            }`}
          >
            <VerMas />
            <VerMasP />
            <VerMasD />
            <hr />
          </div>
        </div>
        

        {/** <section class="link">
          <div class="patrocinadores">
            <SwiperPatrocinadoresN3 />
          </div>
        </section>*/}
        <section class="link">
          <div class="patrocinadores">
            <SwiperPatrocinadores />
          </div>
        </section>

        <FooterApp />
      </div>
    </>
  );
}

function formatModelPeliculas(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      titulo: data.titulo,
      categorias: data.categorias,
      actores: data.actores,
      director: data.director,
      duracion: data.duracion,
      tipo: data.tipo,
      sinopsis: data.sinopsis,
      calificacion: data.calificacion,
      año: data.año,
      disponibilidad: data.disponibilidad,
      masVisto: data.masVisto,
      recomendado: data.recomendado,
      urlVideo: data.urlVideo,
      urlPortada: data.urlPortada,
      seccion: data.seccion,
      estado: data.estado,
    });
  });
  return dataTemp;
}

function formatModelSeries(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      titulo: data.titulo,
      categorias: data.categorias,
      actores: data.actores,
      director: data.director,
      duracion: data.duracion,
      tipo: "series",
      sinopsis: data.sinopsis,
      calificacion: data.calificacion,
      datosTemporada: data.datosTemporada,
      año: data.año,
      disponibilidad: data.disponibilidad,
      masVisto: data.masVisto,
      recomendado: data.recomendado,
      urlVideo: data.urlTrailer,
      urlPortada: data.urlPortada,
      seccion: data.seccion,
      estado: data.estado,
    });
  });
  return dataTemp;
}
