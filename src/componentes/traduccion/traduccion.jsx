import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGlobe
} from "@fortawesome/free-solid-svg-icons";

function Traduction() {
    const [currentLanguage, setCurrentLanguage] = useState('en'); // Idioma predeterminado
    const apiKey = 'TU_CLAVE_DE_API'; // Reemplaza con tu propia clave de API
  
    const changeLanguage = (targetLanguage) => {
      if (targetLanguage !== currentLanguage) {
        setCurrentLanguage(targetLanguage);
  
        // Usa la API de Google Translate para traducir el contenido de la página
        const googleTranslateScript = document.createElement('script');
        googleTranslateScript.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
        googleTranslateScript.async = true;
        document.head.appendChild(googleTranslateScript);
      }
    };
  
    // La función para inicializar Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: currentLanguage,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };
  

  return (
    <div>
      <div className="language-dropdown">
        <button id="languageDropdownButton" className="iconTrad">
        <FontAwesomeIcon icon={faGlobe} /> 
        </button>
        <div className="language-dropdown-content">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('es')}>Español</button>
          {/* Agrega más idiomas según tus necesidades */}
        </div>
      </div>
      <div id="google_translate_element"></div>
      
     
    </div>
  );
}

export default Traduction;
