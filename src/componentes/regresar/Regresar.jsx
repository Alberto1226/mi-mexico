import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faUser,
  faArrowDown,
  faSearch,
  faPersonCircleMinus,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import "./reg.css"

const Regresar = () => {
    const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega hacia atrás en la pila de historial
  };
  return (
    <div>
      <button className="back-button" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
};

export default Regresar;
