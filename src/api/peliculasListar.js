import {
    ENDPOINTListarPeliculas,
} from './endpoints';
import axios from 'axios';
import {API_HOST} from '../utils/constants';
//import {getTokenApi} from ".auth"

export async function listarPeliculas(){
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPeliculas, config);
}
