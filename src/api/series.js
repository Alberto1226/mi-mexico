import {
    ENDPOINTListarSeries,
    ENDPOINTRegistrarSeries,
    ENDPOINTModificarSeries,
    ENDPOINTEliminarSeries,
    ENDPOINTActualizarContador,
    ENDPOINTObtenerSerie,
    ENDPOINTListarSeriesMasVistas,
    ENDPOINTDetallesCategoriasSeries,
    ENDPOINTListarUltimaSerie
} from './endpoints';
import axios from 'axios';
import { API_HOST } from '../utils/constants';
//import {getTokenApi} from ".auth"

// Para obtener todos los datos de un acuses de recibo
export async function obtenerSeries(id) {
    //console.log(params)
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerSerie + `/${id}`, config);
}

export async function listarSeries() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarSeries, config);
}

export async function listarUltimaSerie() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarUltimaSerie, config);
}

export async function listarDetallesCategoriasSeries() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTDetallesCategoriasSeries, config);
}

export async function listarSeriesMasVistas() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarSeries, config);
}

export async function registraSeries(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistrarSeries, data, config);
}

export async function actualizarSeries(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTModificarSeries + `/${id}`, data, config);
}

export async function actualizarContadorSeries(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarContador + `/${id}`, data, config);
}

export async function eliminarSeries(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarSeries + `/${id}`, data, config);
}