import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export function NavPrincipal() {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleButtonClick = () => {
    setIsInputOpen(true);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsInputOpen(false);
  };

  return (
    <section className="header">
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
    </section>
  );
}
