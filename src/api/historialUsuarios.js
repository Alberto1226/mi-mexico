import { API_HOST } from "../utils/constants";
import {
    ENDPOINTRegistrarHistorialUsuario
} from "./endpoints";
import axios from 'axios';

export async function registraHistorialUsuario(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistrarHistorialUsuario, data, config);
}