
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import {FullNav} from "../navcompleto/navCompleto";
import { listarDirectos } from "../../api/directos";

export function FullVideoHeader(props) {
    const locations = useLocation();
    const { location } = props;
    const { url } = queryString.parse(locations.search);
    const [listarDir, setListDir] = useState([]);

    const obtenerDirectos = () => {
      try {
        listarDirectos()
          .then((response) => {
            const { data } = response;
  
            if (!listarDir && data) {
              setListDir(formatModelDir(data));
            } else {
              const datosPatro = formatModelDir(data);
              const filteredPel = datosPatro.filter(
                (data) => data.status === "true"
              );
              setListDir(filteredPel);
            }
          })
          .catch((e) => {});
      } catch (e) {}
    };
  
    useEffect(() => {
      obtenerDirectos();
  
      // Establece un intervalo para actualizar los directos cada 5 minutos (300,000 milisegundos)
      const interval = setInterval(obtenerDirectos, 100000);
  
      // Limpia el intervalo cuando el componente se desmonta o cuando la ubicación cambia
      return () => clearInterval(interval);
    }, [location]);
    /**fin de consulta */


    const iframeStyle = {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100vh",
      zIndex: 1000,
    };
  return (
    <>
      {listarDir.map((dir) => (
        <div key={dir.id}>
            
          
            
              
            <iframe
                src={url}
                
                style={iframeStyle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
              
            
          
        </div>
      ))}
      
       
    </>
  );
}


function formatModelDir(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      codigo: data.codigo,
      status: data.status,
    });
  });
  return dataTemp;
}
