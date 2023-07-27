import { API_HOST } from "../utils/constants";
import {
    ENDPOINTRegistrarUsuario,
    ENDPOINTObtenerUsuarios,
    ENDPOINTObtenerUsuariosPorCorreo,
    ENDPOINTActualizarContraseña,
    ENDPOINTListarUsuario
} from "./endpoints";
import axios from 'axios';

export async function listarUsuarios(){
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarUsuario, config);
}

export async function registraUsuarios(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistrarUsuario, data, config);
}

// Para obtener todos los datos del usuario
export async function obtenerUsuario(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerUsuarios + `/${params}`, config);
}

// Para obtener todos los datos del usuario
export async function obtenerUsuarioPorCorreo(email) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerUsuariosPorCorreo + `/${email}`, config);
}

export async function actualizarContraseña(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarContraseña + `/${id}`, data, config);
}