
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import {FullNav} from "../navcompleto/navCompleto";


export function FullVideoHeader(props) {
    const locations = useLocation();
    const { url } = queryString.parse(locations.search);
    const iframeStyle = {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "49rem",
      zIndex: 1000,
    };
  return (
    <>
      
      
        <div >
        <iframe
                src={url}
                
                style={iframeStyle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
          
        </div>
    </>
  );
}


