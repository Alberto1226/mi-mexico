import {
    ENDPOINTListarSeriesEspeciales,
    ENDPOINTRegistrarSeriesEspeciales,
    ENDPOINTModificarSeriesEspeciales,
    ENDPOINTEliminarSeriesEspeciales,
    ENDPOINTActualizarContadorEspeciales,
    ENDPOINTObtenerSerieEspeciales,
    ENDPOINTListarSeriesMasVistasEspeciales,
    ENDPOINTListarUltimosCincoSeriesEspeciales,
    ENDPOINTDetallesCategoriasSeriesEspeciales
} from './endpoints';
import axios from 'axios';
import { API_HOST } from '../utils/constants';
//import {getTokenApi} from ".auth"

// Para obtener todos los datos de un acuses de recibo
export async function obtenerSeriesEspeciales(id) {
    //console.log(params)
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerSerieEspeciales + `/${id}`, config);
}

export async function listarSeriesEspeciales() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarSeriesEspeciales, config);
}

export async function listarDetallesCategoriasEspeciales() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTDetallesCategoriasSeriesEspeciales, config);
}

export async function listarSeriesMasVistasEspeciales() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarSeriesEspeciales, config);
}

export async function registraSeriesEspeciales(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistrarSeriesEspeciales, data, config);
}

export async function actualizarSeriesEspeciales(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTModificarSeriesEspeciales + `/${id}`, data, config);
}

export async function actualizarContadorSeriesEspeciales(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarContadorEspeciales + `/${id}`, data, config);
}

export async function eliminarSeriesEspeciales(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarSeriesEspeciales + `/${id}`, data, config);
}

export async function listarUltimosCincoSeriesEspeciales() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarUltimosCincoSeriesEspeciales, config);
}
