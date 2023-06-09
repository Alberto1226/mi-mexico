import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCircleInfo,
  faPlus,
  faThumbsDown,
  faThumbsUp,
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
            <h3>In the Mouth of Madness</h3>
            <div class="card__heading-sub">
              <span class="age">18+</span>
              <span class="actor">Sam Neill</span>
            </div>
          </div>
          <div class="panel">
            <div class="panel__row panel__buttons">
              <div class="panel__icons">
                <a
                  href="https://www.youtube.com/watch_popup?v=HWV5EsOVlpo&autoplay=1"
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
              <span class="year">1995</span>
              <b>1h 35m</b>
            </div>
            <div class="panel__row genres">
              Horror&nbsp • &nbspMystery&nbsp • &nbspThriller
            </div>
          </div>
        </div>
      
      {/**Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body class="modalBackgound">
          <div class="card__modal-content">
            <div class="video-background">
              <div class="video-foreground">
                <video
                  id="video"
                  width="320"
                  height="240"
                  controls
                  loop
                  muted
                  autoplay
                ></video>
              </div>
            </div>
            <div class="video-description">
              <div class="video-description__header">
                <h3>In the Mouth of Madness</h3>
              </div>
            </div>
            <div class="card__modal-container">
              <div class="video-description__headline-sub">
                <span class="rating">99% Match</span>
                <span class="year">1995</span>
                <span class="age">18+</span>
                <b>1h 35m</b>
                <span class="quality">HD</span>
              </div>
              <p>
                With the disappearance of hack horror writer Sutter Cane, all
                Hell is breaking loose...literally! Author Cane, it seems, has a
                knack for description that really brings his evil
                creepy-crawlies to life.
              </p>
              <span class="actor">
                {" "}
                Sam Neill, Jürgen Prochnow, Julie Carmen, David Warner, John
                Glover, Frances Bay
              </span>
              <span class="director"> John Carpenter</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
