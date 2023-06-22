import {
    ENDPOINTListarPatrocinadores,
    ENDPOINTRegistrarPatrocinadores,
    ENDPOINTModificarPatrocinadores,
    ENDPOINTEliminarPatrocinadores
} from './endpoints';
import axios from 'axios';
import { API_HOST } from '../utils/constants';
//import {getTokenApi} from ".auth"

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