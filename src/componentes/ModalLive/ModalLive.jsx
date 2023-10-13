import React, { useEffect, useState } from "react";

import { listarDirectos } from "../../api/directos";
import "./live.css";

export function VerDirecto(props) {
  const { location } = props;
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

  // Función para traducir HTML
  const iframeStyle = {
    position: "relative",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: 1000,
  };

  return (
    <>
      {listarDir.map((dir) => (
        <div key={dir.id}>
            
          <div id="vidtop-content">
          
            <div className="vid-info">
            <iframe
                src={dir.codigo}
                className="envivo"
                style={iframeStyle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
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
