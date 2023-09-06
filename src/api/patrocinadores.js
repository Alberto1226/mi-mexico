import {
    ENDPOINTListarPatrocinadores,
    ENDPOINTRegistrarPatrocinadores,
    ENDPOINTModificarPatrocinadores,
    ENDPOINTEliminarPatrocinadores,
    ENDPOINTListarPatrocinadoresPrioridad,
    ENDPOINTObtenerPatrocinadores
} from './endpoints';
import axios from 'axios';
import { API_HOST } from '../utils/constants';
//import {getTokenApi} from ".auth"

// Para obtener todos los datos de un acuses de recibo
export async function obtenerPatrocinador(id) {
    //console.log(params)
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerPatrocinadores + `/${id}`, config);
}

export async function registraPatrocinadores(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistrarPatrocinadores, data, config);
}

export async function listarPatrocinadores() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPatrocinadores, config);
}

export async function listarPatrocinadoresPrioridad(prioridadAparicion) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPatrocinadoresPrioridad + `/?prioridadAparicion=${prioridadAparicion}`, config);
}

export async function actualizarPatrocinadores(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTModificarPatrocinadores + `/${id}`, data, config);
}

export async function eliminarPatrocinadores(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarPatrocinadores + `/${id}`, data, config);
}