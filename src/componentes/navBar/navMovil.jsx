import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";





function BottomNavigation() {
  const [activeItem, setActiveItem] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const checkIsMobile = () => {
    const mobileWidth = 768;
    setIsMobile(window.innerWidth <= mobileWidth);
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  if (!isMobile) {
    return null;
  }


  

  return (
    
    <div className="navMovil">
      <Link to="/home2">
        <div  id="elementosnav">

          <FontAwesomeIcon icon={faHome} className="iconNavMovil" />
          
        </div>
      </Link>
    </div>
    
  );
}

export default BottomNavigation;

