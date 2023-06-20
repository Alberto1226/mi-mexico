import {ENDPOINTListarPatrocinadores} from './endpoints';
import axios from 'axios';
import {API_HOST} from '../utils/constants';
//import {getTokenApi} from ".auth"

export async function listarPatrocinadores(){
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPatrocinadores, config);
}