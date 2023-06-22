import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


export function CardsUser(props) {
  //console.log(props);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      
        <div class="card">
          <div class="card__image">
            <img src={props.img1} alt="" />
            <h3>{props.titulo}</h3>
            <div class="card__heading-sub">
              <span class="age">18+</span>
              <span class="actor">{props.director}</span>
            </div>
          </div>
          <div class="panel">
            <div class="panel__row panel__buttons">
              <div class="panel__icons">
                <a
                  href="https://www.youtube.com/watch?v=bIGt-ueYHik"
                  target="_blank"
                >
                  <i class="">
                    <FontAwesomeIcon icon={faCirclePlay} />
                  </i>
                </a>
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
              <span class="rating">99% Match</span>
              <span class="year">{props.anio}</span>
              <b>{props.duracion}</b>
            </div>
            <div class="panel__row genres">
            {props.genero}
            </div>
          </div>
        </div>
      
      {/**Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body class="modalBackgound">
          <div class="card__modal-content">
            <div class="video-background">
              <div class="video-foreground">
              <iframe id="video" width="500" height="240" src="https://www.youtube.com/embed/bIGt-ueYHik" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
            <div class="video-description">
              <div class="video-description__header">
                <h3>{props.titulo}</h3>
              </div>
            </div>
            <div class="card__modal-container">
              <div class="video-description__headline-sub">
                <span class="rating">99% Match</span>
                <span class="year">{props.anio}</span>
                <span class="age">18+</span>
                <b>{props.duracion}</b>
                <span class="quality">HD</span>
              </div>
              <p>
              {props.sinopsis}
              </p>
              <span class="actor">
                {" "}
                {props.actores}
              </span>
              <span class="director"> {props.director}</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
