export function MasVistos(props) {
  return (
    <>
       <div class="item item-3">
      <img className="imgsw" src={props.img1} alt="" />
        <div class="body-item">
        
          <div class="body-item-1">
          
            <div class="play">
              <i class="icon-play"></i>
            </div>
          </div>
          <div class="title body-item-3">Black Mirror</div>
          <div class="properties body-item-3">
            <span class="time">2h 13m</span>
          </div>
          <p class="description body-item-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias
            libero..
          </p>
          <div class="body-item-3">
            <i class="details-icon icon-chevron-down"></i>
          </div>
          <div class="icon-set body-item-6">
            <i class="icon-thumbs-up"></i>
            <i class="icon-thumbs-down"></i>
            <i class="icon-plus"></i>
          </div>
        </div>
      </div>
    </>
  );
}
