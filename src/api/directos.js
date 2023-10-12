import { API_HOST } from "../utils/constants";
import {
    ENDPOINTRegistrarDirectos,
    ENDPOINTObtenerDirectos,
    ENDPOINTActualizarDirectos,
    ENDPOINTEliminarDirectos,
    ENDPOINTDeshabilitarDirectos
} from "./endpoints";
import axios from 'axios';

export async function registraDirectos(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistrarDirectos, data, config);
}

export async function listarDirectos(){
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerDirectos, config);
}

export async function actualizarDirectos(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarDirectos + `/${id}`, data, config);
}

export async function deshabilitarDirectos(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTDeshabilitarDirectos + `/${id}`, data, config);
}

export async function eliminarDirectos(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarDirectos + `/${id}`, data, config);
}