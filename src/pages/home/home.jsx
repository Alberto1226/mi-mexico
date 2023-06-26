//componentes
import { NavPrincipal } from "../../componentes/navBar/nav";
import { SwiperHeader } from "../../componentes/swiperHeader/swiper";
import { SwiperPeliculas } from "../../componentes/swiperPeliculas/swiperPeliculas";
import { FooterApp } from "../../componentes/footer/footer";
import {SwiperPatrocinadores} from "../../componentes/swiperPatrocinadores/swPatrocinadores"
import {Load} from "../../componentes/load/load";
import {SwiperMasVistos} from "../../componentes/swiperMasVistos/swMasvistos";
import {VerMas} from "../../componentes/vermas/vermas"
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
        <hr/>
        <SwiperPeliculas titulo={"Recomendados"}/>
        <hr/>
        <section class="link">
          <div class="patrocinadores">
        <SwiperPatrocinadores />
        </div>
        </section>
        <hr/>
        <SwiperMasVistos/>
        <hr/>
        <SwiperPeliculas titulo={"Lo mas visto"}/>
        <hr/>
        <section class="link">
          <div class="patrocinadores">
        <SwiperPatrocinadores />
        </div>
        </section>
        <hr/>
        <SwiperPeliculas titulo={"Favoritos"}/>
        <hr/>
        <SwiperHeader img={imgSwiper}/>
        <hr/>
        {/**
        <SwiperPeliculas titulo={"Mas"}/>
        <SwiperPeliculas titulo={""}/>
        <SwiperPeliculas titulo={""}/>
        <SwiperPeliculas titulo={""}/>
        <SwiperPeliculas titulo={""}/> */}
        <VerMas/>
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
