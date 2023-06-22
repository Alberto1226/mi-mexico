//componentes
import { NavPrincipal } from "../../componentes/navBar/nav";
import { SwiperHeader } from "../../componentes/swiperHeader/swiper";
import { SwiperPeliculas } from "../../componentes/swiperPeliculas/swiperPeliculas";
import { FooterApp } from "../../componentes/footer/footer";
import {SwiperPatrocinadores} from "../../componentes/swiperPatrocinadores/swPatrocinadores"
import {Load} from "../../componentes/load/load";
//assets

import imgSwiper from '../../assets/img/1.png'
//css
import '../../css/header.css'
import '../../css/cards.css'
import '../../css/cardPatconiadores.css'
//squeleton
import React, { useState, useEffect } from "react";
//toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function Home() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
    {loading && <Load />}
      <div>
        <ToastContainer/>
        <NavPrincipal />
        <SwiperHeader img={imgSwiper}/>
        <section class="link">
          <div class="patrocinadores">
        <SwiperPatrocinadores />
        </div>
        </section>
        <SwiperPeliculas titulo={"Lo mas visto"}/>
        <section class="link">
          <div class="patrocinadores">
        <SwiperPatrocinadores />
        </div>
        </section>
        <SwiperPeliculas titulo={"Favoritos"}/>
        <SwiperPeliculas titulo={"Mas"}/>
        <section class="link">
          <div class="patrocinadores">
        <SwiperPatrocinadores />
        </div>
        </section>
        
        
     
        <FooterApp />

      </div>
      
    </>
  );
}
