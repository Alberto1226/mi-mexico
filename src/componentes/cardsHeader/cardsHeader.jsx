
export function CardHeader(props) {
  return (
    <>
      <div className="item item-3">
      <img className="imgsw" src={props.img1} alt="Turismo Méxicano - {props.nombre}" />
        <div className="body-item">
        
          <div className="body-item-1">
          
            <div className="play">
              <i className="icon-play"></i>
            </div>
          </div>
          <div className="title body-item-3">{props.nombre}</div>
          <div className="properties body-item-3">
            <span className="time">{props.duracion}</span>
          </div>
          <p className="description body-item-3">
           {props.des}
          </p>
          <div className="body-item-3">
            <i className="details-icon icon-chevron-down"></i>
          </div>
          <div className="icon-set body-item-6">
            <i className="icon-thumbs-up"></i>
            <i className="icon-thumbs-down"></i>
            <i className="icon-plus"></i>
          </div>
        </div>
      </div>
    </>
  );
}
