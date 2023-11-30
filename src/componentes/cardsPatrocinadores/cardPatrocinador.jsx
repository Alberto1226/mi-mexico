import { Helmet } from "react-helmet";


export function CardPatrocinadores(props) {
  return (
    <>
     <Helmet>
        {/* Etiqueta Open Graph para la imagen del patrocinador */}
        <meta property="og:image" content={props.imgpa} />
        <meta property="og:image:alt" content={props.name} />
      </Helmet>
      <div class="liders">
          <div class="capos">
            <img class="imgPatrocinador" src={props.imgpa} alt={props.name} />
            
          </div>
      </div>
    </>
  );
}
