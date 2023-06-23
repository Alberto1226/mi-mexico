import {SwiperPatrocinadores} from '../swiperPatrocinadores/swPatrocinadores';
import imgfooter from "../../assets/img/MX.png";
export function FooterApp(props) {
    return (
      <>
        <section class="link">
          <div class="patrocinadores">
            {/*<SwiperPatrocinadores img={props.img}/>*/}
          </div>
        </section>
  
        <footer>
         
          <p>© 2022-2023 Todos los Derechos Reservados por mxtvmas®</p>
          <img src={imgfooter} alt=""  className='imgfooter'/>
        </footer>
      </>
    );
  }
  