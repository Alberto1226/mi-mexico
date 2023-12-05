import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faUser,
  faArrowDown,
  faSearch,
  faPersonCircleMinus,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import "./ira.css"

const IraInicio = () => {
    const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const bottomOffset = 50; // Modifica este valor según quieras que aparezca el botón antes del final de la página

    if (documentHeight - scrollTop === windowHeight || documentHeight - scrollTop - windowHeight < bottomOffset) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
    <button
    className={`scroll-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: isVisible ? 'block' : 'none'
      }}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  </>
  )
}

export default IraInicio;