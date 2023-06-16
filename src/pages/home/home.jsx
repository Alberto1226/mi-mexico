//componentes
import { NavPrincipal } from "../../componentes/navBar/nav";
import { SwiperHeader } from "../../componentes/swiperHeader/swiper";
import { SwiperPeliculas } from "../../componentes/swiperPeliculas/swiperPeliculas";
import { FooterApp } from "../../componentes/footer/footer";
import {SwiperPatrocinadores} from "../../componentes/swiperPatrocinadores/swPatrocinadores"
//assets

import imgSwiper from '../../assets/img/1.png'
//css
import '../../css/header.css'
import '../../css/cards.css'
import '../../css/cardPatconiadores.css'
export function Home() {
  return (
    <>
      <div>
        <NavPrincipal />
        <SwiperHeader img={imgSwiper}/>
        <SwiperPeliculas titulo={"Recomendaciones"}/>
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
