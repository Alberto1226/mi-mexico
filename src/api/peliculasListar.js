import {
    ENDPOINTListarPeliculas,
    ENDPOINTRegistrarPeliculas,
    ENDPOINTModificarPeliculas,
    ENDPOINTEliminarPeliculas,
    ENDPOINTSubirVideo,
    ENDPOINTActualizarContadorPeliculas,
    ENDPOINTObtenerPelicula,
    ENDPOINTListarPeliculasMasVistas,
    ENDPOINTListarUltimosCincoEspeciales,
    ENDPOINTDetallesCategoriasPeliculas,
    ENDPOINTListarUltimaPelicula,
    ENDPOINTListarUltimasCincoPeliculas,
    ENDPOINTApiUploadPeliculas,
    ENDPOINTHolaPeliculas,
} from './endpoints';
import axios from 'axios';
import { API_HOST } from '../utils/constants';
//import {getTokenApi} from ".auth"

// Para obtener todos los datos de un acuses de recibo
export async function obtenerPeliculas(id) {
    //console.log(params)
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerPelicula + `/${id}`, config);
}

export async function actualizarContadorPeliculas(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarContadorPeliculas + `/${id}`, data, config);
}

export async function listarPeliculas(tipo) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPeliculas + `/?tipo=${tipo}`, config);
}

export async function listarUltimasCincoPeliculas(tipo) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarUltimasCincoPeliculas  + `/?tipo=${tipo}`, config);
}

export async function listarUltimaPelicula(tipo) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarUltimaPelicula + `/?tipo=${tipo}`, config);
}

export async function listarDetallesCategoriasPeliculas(tipo) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTDetallesCategoriasPeliculas + `/?tipo=${tipo}`, config);
}

export async function listarPeliculasMasVista(tipo) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPeliculasMasVistas + `/?tipo=${tipo}`, config);
}

export async function listarUltimosCincoEspeciales() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    };
    return await axios.get(API_HOST + ENDPOINTListarUltimosCincoEspeciales, config);
}

export async function registraPeliculas(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistrarPeliculas, data, config);
}

export async function HolaPeliculas(file) {
    const formData = new FormData();
    formData.append('file', file); // Agrega el archivo al FormData

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data', // Cambia a multipart/form-data para enviar archivos
            // Authorization: `Bearer ${getTokenApi()}` // Descomenta y usa el token si es necesario
        }
    };

    return await axios.post(API_HOST + ENDPOINTHolaPeliculas, formData, config);
}

// export async function subirPeliculas(file) {
//     const formData = new FormData();
//     formData.append('data', JSON.stringify(data)); // Agrega los datos de la película
//     if (file) {
//         formData.append('file', file); // Agrega el archivo de video si está presente
//     }

//     const config = {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'multipart/form-data', // Cambia a multipart/form-data para enviar archivos
//             // Authorization: `Bearer ${getTokenApi()}` // Descomenta y usa el token si es necesario
//         }
//     };

//     return await axios.post(`${API_HOST}${ENDPOINTApiUploadPeliculas}/${id}`, formData, config);
// }

export async function actualizarPeliculas(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTApiUploadPeliculas + `/${id}`, data, config);
}

export async function eliminarPeliculas(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarPeliculas + `/${id}`, data, config);
}

// Guardar archivos en cloudinary
export async function guardarVideo(video) {

    // Crear una instancia de FormData para enviar el archivo
    const data = new FormData();
    data.append("video", video);
    // Enviar el video al servidor

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    return await axios.post(API_HOST, ENDPOINTSubirVideo, data, config);
}