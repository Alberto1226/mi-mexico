import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SwiperFooterCards } from "../swiperFooterCards/sfc";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
export function CardsUser(props) {

  //console.log(props);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**full screean */
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleWatchClick = (url) => {
    setVideoUrl(url);
    setIsFullScreenOpen(true);
  };
  return (
    <>
      <div class="card">
        <div class="card__image">
          <img src={props.img1} alt="" />
          <h3 className="titulomovil">{props.titulo}</h3>
          <div class="card__heading-sub">
          
            <span class="actor">{props.director}</span>
          </div>
        </div>
        <div class="panel">
          <div class="panel__row panel__buttons">
            <div class="panel__icons">
              <Button
                variant="link"
              >
              <Link to={`/fullPel?id=${props.id}`} >
                <a>
                  <i className="">
                    <FontAwesomeIcon icon={faCirclePlay} />
                  </i>
                </a>
                </Link>
              </Button>
              {isFullScreenOpen && (
                <div className="fullscreen-component">
                  <iframe src={videoUrl} frameBorder="0" allowFullScreen />
                </div>
              )}
            </div>

            {/**Button card */}
            <div class="panel__icons">
              <Button variant="link" onClick={handleShow}>
                <a>
                  <i class="">
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </i>
                </a>
              </Button>
            </div>
            
            {/** Fin Button card */}
          </div>
          <div class="panel__row info">
          
            <span class="year">Año: {props.anio}</span>
            <b>Durcaión: {props.duracion}</b>
            
          </div>
          <div class="panel__row genres">{props.genero}</div>
        </div>
      </div>

      {/**Modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body class="modalBackgound">
          <div class="card__modal-content">
            <div class="video-background">
              <div class="video-foreground">
                <ReactPlayer
                id="video"
                url={props.urlVideo}
                controls
                volume="0.3"
                width="100%"
                height="100%"
                />
                
              </div>
            </div>
            <div class="video-description">
              <div class="video-description__header">
                <h3>{props.titulo}</h3>
              </div>
            </div>
            <div class="card__modal-container">
              <div class="video-description__headline-sub">
                <span class="year">{props.anio}</span>
                <span class="age">18+</span>
                <b>{props.duracion}</b>
                <span class="quality">HD</span>
              </div>
              <span className="sinopsis">{props.sinopsis}</span><br/>
              <span class="actor"> {props.actores}</span>
              <span class="director"> {props.director}</span>
              <div className="footerCard">
                <SwiperFooterCards />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}