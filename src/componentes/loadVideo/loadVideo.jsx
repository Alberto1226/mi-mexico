import React, { useEffect, useState } from "react";
import videoSrc from "../../assets/videos/animacion.mp4";
export function LoadVideo() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulando el tiempo de carga
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 6000);
  
      return () => clearTimeout(timer);
    }, []);
  
    if (isLoading) {
      return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000', zIndex: 9999 }}>
          <video style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '100%', maxHeight: '100%' }} autoPlay loop>
            <source src={videoSrc} type="video/mp4" />
            {/* Aquí puedes agregar más fuentes de video si deseas */}
          </video>
        </div>
      );
    }
  
    return null;
  };
