
import imgfooter from "../../assets/img/MX.png";
import des from "../../assets/img/dispositivos/desktop.png";
import des2 from "../../assets/img/dispositivos/movil.png";
import des3 from "../../assets/img/dispositivos/tablets.png";
import des4 from "../../assets/img/dispositivos/web.png";
import BottomNavigation from "../navBar/navMovil";
export function FooterApp(props) {
    return (
      <>
        <section class="link">
          <div class="patrocinadores">
            {/*<SwiperPatrocinadores img={props.img}/>*/}
          </div>
        </section>
        <section>
          <center><h1>Disfruta tu contenido estés donde estés.</h1></center>
          <div class="center-container">
          <div class="grid-containerfoo">
          <img src={des} alt="" />
          <img src={des2} alt="" />
          <img src={des3} alt="" />
          <img src={des4} alt="" />
          </div>
          </div>
        </section>
        <footer>
         
          <p>© 2022-2023 Todos los Derechos Reservados por miMéxico®</p>
          <img src={imgfooter} alt=""  className='imgfooter'/>
        </footer>
        {/** <BottomNavigation/> */}
      </>
    );
  }
  