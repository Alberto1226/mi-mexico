import { CardHeader } from "../cardsHeader/cardsHeader";
import { NavPrincipal } from "../navBar/nav";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import queryString from "query-string";

export function ResultadoBusqueda() {
    const locations = useLocation();
    const { id, capitulo, temporada, img1 } = queryString.parse(locations.search);

    const [listarSer, setListSeries] = useState([]);
    const [listarPelicula, setListPelicula] = useState([]);
    const [listarDocumentales, setListDocumentales] = useState([]);

    console.log(id, capitulo, temporada, img1)

    return (<>
        <div>
            <NavPrincipal
                listarDocumentales={listarDocumentales}
                listarPeliculas={listarPelicula}
                listarSeries={listarSer}
            />
            <h3>Resultado</h3>
            <CardHeader
                id={id}
                nombre={capitulo}
                des={temporada}
                img1={img1}
            />
        </div>
    </>)
}