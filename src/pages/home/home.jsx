//componentes
import { NavPrincipal } from "../../componentes/navBar/nav";
import { SwiperHeader } from "../../componentes/swiperHeader/swiper";
import { SwiperPeliculas } from "../../componentes/swiperPeliculas/swiperPeliculas";
import { FooterApp } from "../../componentes/footer/footer";
//assets
import imgSwiper from '../../assets/img/203513.jpg'
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
        <SwiperPeliculas />
        <FooterApp img={imgSwiper}/>

      </div>
    </>
  );
}
