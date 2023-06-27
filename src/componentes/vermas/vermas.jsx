import React, { useEffect, useState } from "react";
import { CardHeader } from "../cardsHeader/cardsHeader";
import {CardsVermas} from "./cardsVemas";
import de1 from "../../assets/img/ber.jpeg";
import { listarSeries } from "../../api/series";
import { Link } from "react-router-dom";
export function VerMas() {
  return (
    <>
      <section className="main-container">
        <div class="location" id="home">
          
          <div class="box">
           
           <CardsVermas/>
              
          </div>
        </div>
      </section>
    </>
  );
}


