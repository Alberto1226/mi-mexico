import { API_HOST } from "../utils/constants";
import {
    ENDPOINTRegistrarCategoria,
    ENDPOINTObtenerCategorias,
    ENDPOINTActualizarCategoria
} from "./endpoints";
import axios from 'axios';

export async function registraCategoria(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistrarCategoria, data, config);
}


export async function listarCategorias(){
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerCategorias, config);
}

export async function actualizarCategoria(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarCategoria + `/${id}`, data, config);
}