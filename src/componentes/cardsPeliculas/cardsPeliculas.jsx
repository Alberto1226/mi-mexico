import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SwiperFooterCards } from "../swiperFooterCards/sfc";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { Stream } from "@cloudflare/stream-react";
export function CardsUser(props) {
console.log("🚀 ~ CardsUser ~ props:", props)

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
      <div className="card">
        <div className="card__image">
          <img src={props.img1} alt="Turismo Méxicano - {props.titulo}" />
          
          
        </div>
        <div className="panel">
          <div className="panel__row panel__buttons">
            <div className="panel__icons">
              <Button
                variant="link"
              >
              <Link to={`/peliculas?id=${props.id}`} >
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
            <div className="panel__icons">
              <Button variant="link" onClick={handleShow}>
                <a>
                  <i className="">
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </i>
                </a>
              </Button>
            </div>
            
            {/** Fin Button card */}
          </div>
          <div className="panel__row info">
          
            <span className="year">Año: {props.anio}</span>
            {/** <b>Durcaión: {props.duracion}</b>*/}
            
          </div>
          <div className="panel__row genres">{props.genero}</div>
        </div>
      </div>

      {/**Modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body className="modalBackgound">
          <div className="card__modal-contentPel">
            <div className="video-background">
              <div className="video-foreground">
                <Stream controls src={props.urlVideo}/>
                {/* <ReactPlayer
                id="video"
                url={props.urlVideo}
                controls
                volume="0.3"
                width="100%"
                height="100%"
                Autoplay
                /> */}
                
              </div>
            </div>
            <div className="video-description">
              <div className="video-description__header">
                <h3>{props.titulo}</h3>
              </div>
            </div>
            <div className="card__modal-container">
              <div className="video-description__headline-sub">
                <span className="year">{props.anio}</span>
                <span className="age">18+</span>
                <b>{props.duracion}</b>
                <span className="quality">HD</span>
              </div>
              <div className="sinopsis" dangerouslySetInnerHTML={{ __html: props.sinopsis || "" }}/>
              
              <span className="actor"> {props.actores}</span>
              <span className="director"> {props.director}</span>
              <div className="footerCard">
                
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}