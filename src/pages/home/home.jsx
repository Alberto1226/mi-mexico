//componentes
import { NavPrincipal } from "../../componentes/navBar/nav";
import { SwiperHeader } from "../../componentes/swiperHeader/swiper";
import { SwiperPeliculas } from "../../componentes/swiperPeliculas/swiperPeliculas";
import { FooterApp } from "../../componentes/footer/footer";
import {SwiperPatrocinadores} from "../../componentes/swiperPatrocinadores/swPatrocinadores"
import {Load} from "../../componentes/load/load";
import {SwiperMasVistos} from "../../componentes/swiperMasVistos/swMasvistos";
import {VerMas} from "../../componentes/vermas/vermas";
import {VerMasD} from "../../componentes/vermasDocumentales/verMasDocumentales";
import {VerMasP} from "../../componentes/vermasPeliculas/vermasPeliculas";
import {LoadVideo} from "../../componentes/loadVideo/loadVideo";
import {SwiperPatrocinadoresN2} from "../../componentes/swiperPartocinadorNivel2/swiperNivel2";
import {SwiperPatrocinadoresN3} from "../../componentes/swiperPatNivel3/swiperNivel3";
import {SwiperPeliculasRecomendadas} from "../../componentes/swiperRecomendado/swiperRecomendados";
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
//api
import {listarSeries} from "../../api/series";


export function Home() {
  
  

  return (
    <>
    <LoadVideo/>
      <div>
        <ToastContainer/>
        <NavPrincipal />
        <SwiperHeader img={imgSwiper}/>
        <hr/>
        <SwiperPeliculasRecomendadas titulo={"Recomendados"}/>
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
        <SwiperPatrocinadoresN2 />
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
        <h4 id="home">Ver mas Series</h4>        
        <VerMas />
        <h4 id="home">Ver mas Peliculas</h4>        

        <VerMasP />
        <h4 id="home">Ver mas Documentales</h4>        

        <VerMasD />
        
        <section class="link">
          <div class="patrocinadores">
        <SwiperPatrocinadoresN3 />
        </div>
        </section>
        
        
     
        <FooterApp />

      </div>
      
    </>
  );
}
