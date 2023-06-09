import {SwiperPatrocinadores} from '../swiperPatrocinadores/swPatrocinadores';

export function FooterApp(props) {
    return (
      <>
        <section class="link">
          <div class="patrocinadores">
            <SwiperPatrocinadores img={props.img}/>
          </div>
        </section>
  
        <footer>
         
          <p>© 2022-2023 Todos los Derechos Reservados por mimexico® mimexicotv®</p>
        </footer>
      </>
    );
  }
  