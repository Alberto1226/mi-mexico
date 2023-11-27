import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { CardPatrocinadores } from "../cardsPatrocinadores/cardPatrocinador";

import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
//import imgPatro from "../../assets/img/PMnegro.png";

import { listarPatrocinadores } from "../../api/patrocinadores";

import www from "../../assets/img/www.png";
import facebook from "../../assets/img/facebook.png";
import twitter from "../../assets/img/gorjeo.png";
import instagram from "../../assets/img/instagram.png";
import { Helmet } from "react-helmet";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export function SwiperPatrocinadores(props) {
  /**consulta listado de patrocinadore */
  const { location } = props;
  const [listarPatro, setListPatro] = useState([]);

  const obtenerPatrocinadores = () => {
    try {
      listarPatrocinadores()
        .then((response) => {
          const { data } = response;

          if (!listarPatro && data) {
            setListPatro(formatModelPatrocinadores(data));
          } else {
            const datosPatro = formatModelPatrocinadores(data);
            const filteredPel = datosPatro.filter(
              (data) => data.nivel === "1"
            );
            setListPatro(filteredPel);
          }
        })
        .catch((e) => {});
    } catch (e) {}
  };

  useEffect(() => {
    obtenerPatrocinadores();
  }, [location]);
  /**fin de consulta */

  const [slides, setSlides] = useState(10); // Número inicial de slides a mostrar

  useEffect(() => {
    calculateSlidesPerView();
    window.addEventListener("resize", calculateSlidesPerView);
    return () => {
      window.removeEventListener("resize", calculateSlidesPerView);
    };
  }, []);

  const calculateSlidesPerView = () => {
    const screenWidth = window.innerWidth;
    let slidesToShow = 10; // Número predeterminado de slides a mostrar

    if (screenWidth < 768) {
      slidesToShow = 5; // Si el ancho de la pantalla es menor a 768px, muestra solo 1 slide
    } else if (screenWidth < 1024) {
      slidesToShow = 8; // Si el ancho de la pantalla es menor a 1024px, muestra 2 slides
    }

    setSlides(slidesToShow);
  };

  return (
    <>
      
      <Helmet>
      <meta name="description" content="Descubre y conoce a los patrocinadores que hacen posible la experiencia en Turismo Méxicano. Nuestros colaboradores son parte fundamental de la promoción de destinos turísticos en México, contribuyendo a enriquecer la oferta de contenido y experiencias para nuestros usuarios." />
        {listarPatro.map((patrocinador, index) => (
          <meta
            key={index}
            name={`sponsor_${index}`} // Nombre único para cada patrocinador
            content={patrocinador.nombre} // Contenido del metadato
          />
        ))}
      </Helmet>
      <div className="location" id="home">
        <Swiper
          spaceBetween={10}
          slidesPerView={slides}
          navigation
          autoplay={{
            delay: 3000,
            loop: true,
            disableOnInteraction: false,
          }}
          className="mySwiperPatrocinadores"
        >
          {listarPatro &&
            listarPatro.map((patrocinadores) => (
              <SwiperSlide className="swiper-slide1" key={patrocinadores.id}>
                <CardPatrocinadores
                  imgpa={patrocinadores.urlImagen}
                  className="cardPatrocinadores"
                  name={patrocinadores.nombre}
                /> 
                <Container fluid className="footerCardPatro">
                  <Row className="gx-0">
                    <Col>
                      <a href={patrocinadores.urlWeb} target="_blank">
                        <img src={www} alt={`Web de ${patrocinadores.nombre}`} />
                      </a>
                    </Col>
                    <Col>
                      <a href={patrocinadores.urlFacebook} target="_blank">
                        <img src={facebook} alt={`Facebook de ${patrocinadores.nombre}`} />
                      </a>
                    </Col>
                    <Col>
                      <a href={patrocinadores.urlTwitter} target="_blank">
                        <img src={twitter} alt={`X de ${patrocinadores.nombre}`} />
                      </a>
                    </Col>
                    <Col>
                      {" "}
                      <a href={patrocinadores.urlInstagram} target="_blank">
                        <img src={instagram} alt={`Instagram de ${patrocinadores.nombre}`} />
                      </a>
                    </Col>
                  </Row>
                </Container>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}

function formatModelPatrocinadores(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      nombre: data.nombre,
      urlImagen: data.urlImagen,
      urlWeb: data.urlWeb,
      urlFacebook: data.urlFacebook,
      urlInstagram: data.urlInstagram,
      urlTwitter: data.urlTwitter,
      nivel: data.nivel,
      estado: data.estado,
    });
  });
  return dataTemp;
}
