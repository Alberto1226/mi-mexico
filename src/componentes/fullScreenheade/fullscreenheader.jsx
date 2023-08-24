
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/swiper.css";
import "../../css/cardHeader.css";
import {FullNav} from "../navcompleto/navCompleto";

SwiperCore.use([Pagination, Autoplay]);
export function FullVideoHeader(props) {
    const locations = useLocation();
    const { url } = queryString.parse(locations.search);

  return (
    <>
      <FullNav />
      
        <div >
          <video id="videofull" src="https://www.mxtvmas.com:8443/mimexico/series/cervantino/Imperdibles.mp4"  autoPlay controls width={"100%"} height={"100%"}></video>
        </div>
    </>
  );
}


